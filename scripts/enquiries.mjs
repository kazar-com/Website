// Local authorised-operator utility. Never exposed as a web route.
import {DatabaseSync} from 'node:sqlite';import {existsSync} from 'node:fs';import path from 'node:path';
const file=path.join(process.env.DATA_DIR||'.data','enquiries.sqlite');if(!existsSync(file))throw new Error('No local enquiry database yet. Start the server first.');
const db=new DatabaseSync(file,{readOnly:true});const ref=process.argv[2];
if(ref){const row=db.prepare('SELECT reference,payload,details,created_at FROM enquiries WHERE reference=?').get(ref);console.log(row?JSON.stringify({...row,payload:JSON.parse(row.payload),details:JSON.parse(row.details)},null,2):'Reference not found.');}
else console.log(JSON.stringify(db.prepare('SELECT e.reference,e.created_at,n.status AS notification_status FROM enquiries e LEFT JOIN notification_outbox n ON n.enquiry_reference=e.reference ORDER BY e.created_at DESC LIMIT 100').all(),null,2));
db.close();
