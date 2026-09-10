import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {openDatabase} from '../server/database.mjs';
import {dispatchNotifications} from '../server/notifications.mjs';
test('Notification failure retains the enquiry; retry is separate and never claims mailbox receipt',async()=>{
 const root=mkdtempSync(path.join(tmpdir(),'kazar-mail-test-')),db=openDatabase(path.join(root,'test.sqlite'));
 try{
 db.raw.prepare('INSERT INTO enquiries(reference,idempotency_key,payload_hash,payload,token_hash,token_expires,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)').run('ref','key','hash','{}','hash',9999999999999,1,1);
 db.raw.prepare('INSERT INTO notification_outbox(enquiry_reference,created_at) VALUES (?,?)').run('ref',1);
 assert.equal((await dispatchNotifications(db.raw,null)).state,'NOT_CONNECTED');
 const keys=[];let calls=0;
 const syntheticTransport={async send(message){keys.push(message.idempotencyKey);assert.equal(message.to,'info@kazar.build');if(calls++===0)throw new Error('Synthetic failure');return {providerId:'SYNTHETIC_NOT_REAL_EMAIL'}}};
 await dispatchNotifications(db.raw,syntheticTransport,{now:1000});
 assert.equal(db.raw.prepare('SELECT state FROM notification_delivery').get().state,'RETRY');
 assert.equal(db.raw.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,1);
 assert.equal((await dispatchNotifications(db.raw,syntheticTransport,{now:2000})).processed,0);
 await dispatchNotifications(db.raw,syntheticTransport,{now:40000});
 assert.deepEqual(keys,['kazar-enquiry-ref','kazar-enquiry-ref']);
 assert.equal(db.raw.prepare('SELECT state FROM notification_delivery').get().state,'PROVIDER_ACCEPTED');
 assert.equal((await dispatchNotifications(db.raw,syntheticTransport,{now:50000})).processed,0);
 }finally{db.close();rmSync(root,{recursive:true,force:true})}
});
