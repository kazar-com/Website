// Local Node adapter. No transport/provider is selected or connected by this module.
// Provider acceptance is NOT mailbox receipt. Never infer DELIVERED from send().
export function initialiseDelivery(db){
 db.exec(`CREATE TABLE IF NOT EXISTS notification_delivery (
 enquiry_reference TEXT PRIMARY KEY REFERENCES enquiries(reference),
 state TEXT NOT NULL DEFAULT 'PENDING', attempts INTEGER NOT NULL DEFAULT 0,
 next_attempt INTEGER NOT NULL DEFAULT 0, lease_until INTEGER NOT NULL DEFAULT 0,
 provider_id TEXT, last_error TEXT, accepted_at INTEGER
 )`);
}
export async function dispatchNotifications(db,transport,{now=Date.now(),limit=10}={}){
 if(!transport?.send)return {state:'NOT_CONNECTED',processed:0};
 initialiseDelivery(db);
 db.prepare('INSERT OR IGNORE INTO notification_delivery(enquiry_reference) SELECT enquiry_reference FROM notification_outbox').run();
 const candidates=db.prepare("SELECT enquiry_reference FROM notification_delivery WHERE state IN ('PENDING','RETRY','SENDING') AND next_attempt<=? AND lease_until<=? LIMIT ?").all(now,now,limit);
 let processed=0;
 for(const {enquiry_reference:reference} of candidates){
  const claim=db.prepare("UPDATE notification_delivery SET state='SENDING',lease_until=?,attempts=attempts+1 WHERE enquiry_reference=? AND state IN ('PENDING','RETRY','SENDING') AND lease_until<=? RETURNING attempts").get(now+120000,reference,now);
  if(!claim)continue;
  try{
   // Provider must support this idempotency key to prevent duplicate email on
   // an ambiguous network timeout. Adapter must impose a timeout below the lease.
   const result=await transport.send({to:'info@kazar.build',subject:'KAZAR project enquiry',text:'A project enquiry has been saved. Reference: '+reference,idempotencyKey:'kazar-enquiry-'+reference});
   if(!result?.providerId)throw new Error('Missing provider acknowledgement');
   db.prepare("UPDATE notification_delivery SET state='PROVIDER_ACCEPTED',provider_id=?,accepted_at=?,lease_until=0,last_error=NULL WHERE enquiry_reference=?").run(result.providerId,now,reference);
   db.prepare("UPDATE notification_outbox SET status='PROVIDER_ACCEPTED' WHERE enquiry_reference=?").run(reference);
  }catch{
   const state=claim.attempts>=5?'MANUAL_REVIEW':'RETRY';
   db.prepare('UPDATE notification_delivery SET state=?,next_attempt=?,lease_until=0,last_error=? WHERE enquiry_reference=?').run(state,now+Math.min(3600000,30000*2**(claim.attempts-1)),'Delivery attempt failed; verify provider logs securely.',reference);
   db.prepare('UPDATE notification_outbox SET status=? WHERE enquiry_reference=?').run(state,reference);
  }
  processed++;
 }
 return {state:'PROCESSED',processed};
}
