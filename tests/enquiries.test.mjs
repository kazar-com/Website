import {test} from 'node:test';import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,readFileSync} from 'node:fs';import {tmpdir} from 'node:os';import path from 'node:path';
import {createApp} from '../server/local.mjs';import worker from '../server/worker.mjs';
const payload={name:'Synthetic Test',email:'test@example.com',projectStage:'Design development',projectBrief:'Synthetic local acceptance test. No client information.',companyRole:'',preferredChannel:'Email',phone:'',startedAt:Date.now()-3000,website:''};
test('Local HTTP journey, validation, durable receipt, retry and evidence hold',async()=>{
 const dir=mkdtempSync(path.join(tmpdir(),'kazar-test-'));let app=createApp({port:0,dataDir:dir});await new Promise(r=>app.server.listen(0,'127.0.0.1',r));let base=`http://127.0.0.1:${app.server.address().port}`;
 const get=(url,extra={})=>fetch(base+url,{headers:{host:new URL(base).host,...extra},redirect:'manual'});
 const send=(data,key='acceptance-key-0001',extra={})=>fetch(base+'/api/enquiries',{method:'POST',headers:{host:new URL(base).host,origin:base,'content-type':'application/json','idempotency-key':key,...extra},body:JSON.stringify(data)});
 try{
 for(const url of ['/','/services/','/private-clients/','/for-architects/','/kazar-standard/','/about/','/project-diagnostic/','/contact/','/projects/','/review/case-study/']){const r=await get(url);assert.equal(r.status,200,url);const html=await r.text();assert.ok(html.includes('/contact/'));assert.ok(!html.includes('Al Furjan'));assert.ok(!html.includes('kazarbuild.com'));assert.equal(r.headers.get('x-robots-tag'),'noindex, nofollow')}
 assert.equal((await get('/projects/al-furjan/')).status,404);assert.equal((await get('/assets/plan.png')).status,404);assert.equal((await get('/source/approved-pages.json')).status,404);
 assert.equal((await get('/contact/received/')).status,303);
 let r=await send({...payload,email:'bad',name:''});assert.equal(r.status,422);const err=await r.json();assert.ok(err.errors.email&&err.errors.name);
 assert.equal((await send({...payload,projectBrief:123})).status,422);
 assert.equal((await send(payload,'origin-check-0001',{origin:'https://evil.example'})).status,403);
 assert.equal((await send({...payload,website:'spam'})).status,422);
 r=await send(payload);assert.equal(r.status,201);const saved=await r.json(),cookie=r.headers.get('set-cookie').split(';')[0];assert.ok(saved.enquiryReference);assert.ok(r.headers.get('set-cookie').includes('HttpOnly'));
 assert.equal(app.DB.raw.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,1);
 assert.equal(app.DB.raw.prepare('SELECT status FROM notification_outbox').get().status,'NOT_CONNECTED');
 r=await send(payload);assert.equal((await r.json()).enquiryReference,saved.enquiryReference);assert.equal(app.DB.raw.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,1);
 assert.equal((await send({...payload,projectBrief:'Changed payload'})).status,409);
 assert.equal((await get('/contact/received/',{cookie})).status,200);
 const detailsUrl='/api/enquiries/'+saved.enquiryReference+'/details';
 let dr=await fetch(base+detailsUrl,{method:'PATCH',headers:{host:new URL(base).host,origin:base,'content-type':'application/json',cookie},body:JSON.stringify({location:'Dubai',representation:'Synthetic test'})});assert.equal(dr.status,200);
 assert.equal(JSON.parse(app.DB.raw.prepare('SELECT details FROM enquiries').get().details).location,'Dubai');
 dr=await fetch(base+detailsUrl,{method:'PATCH',headers:{host:new URL(base).host,origin:base,'content-type':'application/json'},body:'{}'});assert.equal(dr.status,401);
 const concurrent=await Promise.all([send(payload,'concurrent-key-001'),send(payload,'concurrent-key-001')]);assert.deepEqual(concurrent.map(r=>r.status),[201,201]);assert.equal(app.DB.raw.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,2);
 await app.close();app=createApp({port:0,dataDir:dir});await new Promise(r=>app.server.listen(0,'127.0.0.1',r));base=`http://127.0.0.1:${app.server.address().port}`;
 assert.equal((await get('/contact/received/',{cookie})).status,200);assert.equal(app.DB.raw.prepare('SELECT COUNT(*) AS n FROM enquiries').get().n,2);
 const dbFail=await worker.fetch(new Request('http://local.test/api/enquiries',{method:'POST',headers:{origin:'http://local.test','content-type':'application/json','idempotency-key':'failure-test-0001'},body:JSON.stringify(payload)}),{APP_ORIGIN:'http://local.test',APP_SECRET:'test',DB:{prepare(){throw new Error('Synthetic unavailable storage')}}});assert.equal(dbFail.status,503);assert.ok(!(await dbFail.text()).includes('Synthetic unavailable'));
 }finally{await app.close();rmSync(dir,{recursive:true,force:true})}
});
test('Non-loopback bind is blocked without protection',()=>assert.throws(()=>createApp({host:'0.0.0.0'}),/STAGING_USER/));
test('Approved contact and eight-stage structure',()=>{
 const index=JSON.parse(readFileSync('docs/source-integrity.json'));assert.equal(index.contact.public_email,'info@kazar.build');
 const html=readFileSync('dist/client/kazar-standard/index.html','utf8');assert.equal((html.match(/<details class="stage"/g)||[]).length,8);
});
