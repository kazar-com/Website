import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=async p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const pages=JSON.parse(await read('source/approved-pages.json'));
const contact=JSON.parse(await read('contracts/public-contact.json'));
const routes={home:'/',services:'/services/','private-clients':'/private-clients/','for-architects':'/for-architects/',standard:'/kazar-standard/',about:'/about/',diagnostic:'/project-diagnostic/',contact:'/contact/',projects:'/projects/',received:'/contact/received/',details:'/contact/details/',finished:'/contact/finished/',privacy:'/privacy/',terms:'/terms/',accessibility:'/accessibility/','intake-access':'/diagnostic/intake/','future-case':'/review/case-study/'};
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const links=s=>s.replace(/href="#([^"?]+)(\?[^" ]*)?"/g,(_,key,q='')=>`href="${routes[key]||'/projects/'}${q}"`).replaceAll('src="assets/','src="/assets/');
const placeholder=`<figure class="evidence"><div class="evidence-top"><span>EVIDENCE PLACEHOLDER</span><span>LOCAL REVIEW ONLY</span></div><div class="drawing-mat held-evidence"><p>Approved project evidence awaits publication permission.</p></div><figcaption>Source, evidence status, KAZAR role and designer credit will remain attached to the permitted asset.</figcaption></figure>`;
function releaseSafe(html){
 return html.replace(/<section\b[^>]*>[\s\S]*?<\/section>/g,section=>{
  if(!section.includes('Al Furjan')&&!section.includes('AL FURJAN'))return section;
  if(section.includes('class="project-grid"'))return section.replace(/<div class="project-grid">[\s\S]*?<\/section>$/,`<div class="project-grid"><div><h2>Selected project</h2><p class="editorial">Evidence-led case study</p><p>LOCAL REVIEW PLACEHOLDER / Publication permission pending.</p><a class="btn secondary" href="/review/case-study/">View case-study template</a></div>${placeholder}</div></div></section>`);
  section=section.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/g,placeholder);
  section=section.replace(/<p\b[^>]*>[^<]*Al Furjan[\s\S]*?<\/p>/g,'<p>Project-specific evidence is withheld pending publication permission.</p>');
  section=section.replace(/<div class="technical-copy">[\s\S]*?<\/section>$/,`<div class="technical-copy"><h2>Technical evidence</h2><p>LOCAL REVIEW PLACEHOLDER / The approved technical story will be shown after publication permission is confirmed.</p></div></div></div></section>`);
  return section.replaceAll('AL FURJAN','EVIDENCE').replaceAll('Al Furjan','Project evidence');
 });
}
const contactBlock=`<address class="public-contact"><a href="${contact.email_uri}">${contact.public_email}</a><br><a href="${contact.phone_uri}">${contact.public_phone}</a><p>${contact.public_address}</p><a href="${contact.kazar_instagram}">Instagram</a> · <a href="${contact.kazar_linkedin}">LinkedIn</a></address>`;
await rm('dist',{recursive:true,force:true});await mkdir('dist/client',{recursive:true});await mkdir('dist/server',{recursive:true});
await cp('public','dist/client',{recursive:true});
let header=links(await read('source/header.html'));
header=header.replace(/aria-current=page/g,'');
let manifest={};
for(const [id,route] of Object.entries(routes)){
 let html=releaseSafe(pages[id]);
 html=links(html).replaceAll('https://kazarbuild.com',contact.website_current).replaceAll('kazarbuild.com','kazar.build');
 html=html.replace('<p class="promise">Built as intended.</p>',`<p class="promise">Built as intended.</p>${contactBlock}`);
 if(id==='contact'){
 html=html.replace('<form id="initial" novalidate>','<form id="initial" novalidate><div class="honeypot" inert aria-hidden="true"><label>Leave empty<input name="website" tabindex="-1" autocomplete="off"></label></div>');
 const fields={'Name':['name',120],'Email':['email',254],'Project brief':['off',5000],'Company / role':['organization',200],'Phone':['tel',40]};
 for(const [name,[auto,max]]of Object.entries(fields))html=html.replace(`name="${name}"`,`name="${name}" autocomplete="${auto}" maxlength="${max}"`);
 html=html.replace('<p class="form-intro">','<p class="review-notice">TEST ONLY — Use synthetic details. This build saves to the review database; no email is sent.</p><p class="form-intro">');
 }
 if(id==='details')html=html.replace('type="file" multiple','type="file" disabled multiple').replaceAll('No files are transmitted in this review.','Uploads are not connected. You can save the other optional details.').replaceAll('Files are not transmitted in this review prototype.','Private file storage and safety scanning must be connected before uploads are enabled.');
 if(id==='received')html=html.replace('<p class="lead">','<p id="receipt-reference" class="status"></p><p class="review-notice">Saved in the review database. No notification email has been sent.</p><p class="lead">');
 let title=id==='home'?'KAZAR | Construction & Interiors':id.replaceAll('-',' ').replace(/\b\w/g,c=>c.toUpperCase())+' | KAZAR';
 let out=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title><meta name="description" content="KAZAR. Construction & Interiors in Dubai. Built as intended."><link rel="stylesheet" href="/approved.css"><link rel="stylesheet" href="/fonts.css"><link rel="stylesheet" href="/implementation.css"><script type="module" src="/app.js"></script></head><body><a class="skip" href="#main">Skip to content</a><div class="implementation-banner">PRIVATE IMPLEMENTATION REVIEW · Test data only · Not the public website</div>${header}<main id="main">${html}</main></body></html>`;
 let rel=route==='/'?'index.html':route.slice(1)+'index.html';await mkdir('dist/client/'+rel.slice(0,rel.lastIndexOf('/')+1),{recursive:true});await writeFile('dist/client/'+rel,out);manifest[route]=rel;
}
let notFound=links(pages['404']).replaceAll('kazarbuild.com','kazar.build');await writeFile('dist/client/404.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | KAZAR</title><link rel="stylesheet" href="/approved.css"><link rel="stylesheet" href="/fonts.css"><link rel="stylesheet" href="/implementation.css"><script type="module" src="/app.js"></script></head><body>${header}<main id="main">${notFound}</main></body></html>`);
await writeFile('dist/client/robots.txt','User-agent: *\nDisallow: /\n');
await writeFile('dist/server/routes.json',JSON.stringify(manifest,null,2));await writeFile('dist/server/index.js',(await read('server/worker.mjs')).replace("../public/validation.js","./validation.js"));await cp('public/validation.js','dist/server/validation.js');
await writeFile('docs/source-integrity.json',JSON.stringify({contact,logos:Object.fromEntries(await Promise.all(['logo.svg','logo-ivory.svg'].map(async n=>[n,createHash('sha256').update(await readFile('public/assets/'+n)).digest('hex')]))),source:'KAZAR_FOR_WEB_DEVELOPER.zip / approved pages.json and ui.css',alFurjan:'Not included in served assets; case route returns 404'},null,2));
console.log(`Built ${Object.keys(manifest).length} routes; Al Furjan remains withheld.`);
