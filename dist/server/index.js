import {validate} from './validation.js';
const json=(body,status=200,headers={})=>Response.json(body,{status,headers:{'Cache-Control':'no-store',...headers}});
export const digest=async s=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))),b=>b.toString(16).padStart(2,'0')).join('');
async function sign(value,secret){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('')}
function equal(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let n=0;for(let i=0;i<a.length;i++)n|=a.charCodeAt(i)^b.charCodeAt(i);return n===0}
const cookie=req=>Object.fromEntries((req.headers.get('cookie')||'').split(';').map(s=>s.trim().split('=')));
function responseCookie(ref,token,url){return {'Set-Cookie':`kz_receipt=${ref}.${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=7200${url.protocol==='https:'?'; Secure':''}`}}
async function session(req,env){const s=cookie(req).kz_receipt||'';const [ref,token]=s.split('.');if(!ref||!token)return null;const row=await env.DB.prepare('SELECT reference, token_hash, token_expires FROM enquiries WHERE reference = ?').bind(ref).first();if(!row||row.token_expires<Date.now()||!equal(row.token_hash,await digest(token)))return null;return row}
async function readJson(req){if(!req.headers.get('content-type')?.startsWith('application/json'))throw Object.assign(new Error(),{status:415});const reader=req.body?.getReader();let size=0,parts=[];if(!reader)throw Object.assign(new Error(),{status:400});while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>32768){await reader.cancel();throw Object.assign(new Error(),{status:413})}parts.push(value)}const bytes=new Uint8Array(size);let off=0;for(const p of parts){bytes.set(p,off);off+=p.length}try{return JSON.parse(new TextDecoder().decode(bytes))}catch{throw Object.assign(new Error(),{status:400})}}
async function handle(req,env){
 const url=new URL(req.url),path=url.pathname;
 if(!env.APP_ORIGIN||url.origin!==env.APP_ORIGIN)return json({error:'Unrecognised host.'},403);
 if(path==='/api/health')return json({mode:'review',email:'NOT_CONNECTED',uploads:'NOT_CONNECTED'});
 if(path==='/api/enquiry-session'&&req.method==='GET'){const s=await session(req,env);return s?json({enquiryReference:s.reference}):json({error:'No current enquiry session.'},401)}
 if(path.startsWith('/api/')){
 if(req.headers.get('origin')!==env.APP_ORIGIN||req.headers.get('sec-fetch-site')==='cross-site')return json({error:'Please submit from this website.'},403);
 if(path.startsWith('/api/diagnostic/'))return json({error:'Private intake is not connected. Arrange the Diagnostic scope first.'},403);
 if(path.includes('/uploads'))return json({error:'Uploads are not connected. You can continue without documents.'},503);
 if(req.method!=='POST'&&req.method!=='PATCH')return json({error:'Method not allowed.'},405);
 const ip=env.CLIENT_IP||req.headers.get('CF-Connecting-IP')||'unknown';
 const bucket=await sign(ip+':'+Math.floor(Date.now()/600000),env.APP_SECRET);
 const rate=await env.DB.prepare('INSERT INTO rate_limits(bucket,count) VALUES (?,1) ON CONFLICT(bucket) DO UPDATE SET count=count+1 RETURNING count').bind(bucket).first();
 if(rate.count>30)return json({error:'Too many attempts. Please retry in 10 minutes.'},429,{'Retry-After':'600'});
 const input=await readJson(req);
 if(path==='/api/enquiries'&&req.method==='POST'){
 const key=req.headers.get('idempotency-key')||'';
 if(!/^[a-zA-Z0-9_-]{16,100}$/.test(key))return json({error:'Invalid request reference. Reload this form.'},400);
 const {data,errors}=validate(input);
 if(Object.keys(errors).length)return json({errors},422);
 if(input.website||!Number.isFinite(input.startedAt)||Date.now()-input.startedAt<800||input.startedAt>Date.now())return json({error:'Please review the form and try again.'},422);
 const hash=await digest(JSON.stringify(data));
 let existing=await env.DB.prepare('SELECT * FROM enquiries WHERE idempotency_key = ?').bind(key).first();
 if(existing&&existing.payload_hash!==hash)return json({error:'This request was already saved with different information. Start a new enquiry or contact KAZAR.'},409);
 const now=Date.now(),reference=existing?.reference||crypto.randomUUID();
 const token=await sign(reference+':'+key,env.APP_SECRET);
 if(!existing){
 await env.DB.batch([
 env.DB.prepare('INSERT INTO enquiries(reference,idempotency_key,payload_hash,payload,token_hash,token_expires,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(idempotency_key) DO NOTHING').bind(reference,key,hash,JSON.stringify(data),await digest(token),now+7200000,now,now),
 env.DB.prepare('INSERT OR IGNORE INTO notification_outbox(enquiry_reference,created_at) SELECT reference,created_at FROM enquiries WHERE idempotency_key = ?').bind(key)
 ]);
 existing=await env.DB.prepare('SELECT * FROM enquiries WHERE idempotency_key = ?').bind(key).first();
 if(!existing||existing.payload_hash!==hash)return json({error:'Request conflict. Your input has been retained.'},409);
 }
 if(existing.token_expires<now)return json({error:'This enquiry was saved, but the edit session expired. Please contact KAZAR; do not resubmit.'},409);
 const effectiveToken=await sign(existing.reference+':'+key,env.APP_SECRET);
 return json({enquiryReference:existing.reference,mode:'review',notification:'NOT_CONNECTED'},201,responseCookie(existing.reference,effectiveToken,url));
 }
 const match=path.match(/^\/api\/enquiries\/([a-f0-9-]+)\/details$/);
 if(match&&req.method==='PATCH'){
 const s=await session(req,env);if(!s||s.reference!==match[1])return json({error:'Your edit session is unavailable or expired. The original enquiry remains saved.'},401);
 const {data,errors}=validate(input,true);if(Object.keys(errors).length)return json({errors},422);
 if(input.documents)return json({error:'Uploads are not connected.'},503);
 await env.DB.prepare('UPDATE enquiries SET details=?, updated_at=? WHERE reference=?').bind(JSON.stringify(data),Date.now(),s.reference).run();
 return json({enquiryReference:s.reference,saved:true});
 }
 return json({error:'Not found.'},404);
 }
 if(['/contact/received/','/contact/details/','/contact/finished/'].includes(path)&&!(await session(req,env)))return Response.redirect(url.origin+'/contact/',303);
 return env.ASSETS.fetch(req);
}
export default {async fetch(req,env){try{return await handle(req,env)}catch(err){const code=err.status||503;return json({error:code===503?'We could not confirm the save. Your entries are retained. Retry using the same form.':code===413?'The request is too large.':code===415?'Send JSON data.':'The request could not be read.'},code)}}};
