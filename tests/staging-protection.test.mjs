import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createApp} from '../server/local.mjs';
test('Review authentication protects pages, assets and API; private files remain inaccessible after login',async()=>{
 const root=mkdtempSync(path.join(tmpdir(),'kazar-auth-'));
 const app=createApp({port:0,dataDir:root,user:'synthetic-user',password:'synthetic-not-a-real-secret-123'});
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${app.server.address().port}`;
 const headers={Authorization:'Basic '+Buffer.from('synthetic-user:synthetic-not-a-real-secret-123').toString('base64')};
 try{
  for(const route of ['/','/contact/','/assets/logo.svg','/app.js','/api/enquiry-session','/.data/enquiries.sqlite'])assert.equal((await fetch(base+route)).status,401,route);
  assert.equal((await fetch(base+'/',{headers})).status,200);
  for(const route of ['/.env','/source/approved-pages.json','/server/local.mjs','/.data/enquiries.sqlite','/.data/app-secret'])assert.equal((await fetch(base+route,{headers})).status,404,route);
 }finally{await app.close();rmSync(root,{recursive:true,force:true})}
});
