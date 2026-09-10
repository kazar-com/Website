import {validate,fields,detailFields} from '/validation.js';
const main=document.querySelector('main');
function size(){document.body.classList.toggle('phone',innerWidth<600);document.body.classList.toggle('tablet',innerWidth>=600&&innerWidth<1100)}size();addEventListener('resize',size);
addEventListener('scroll',()=>document.body.classList.toggle('scrolled',scrollY>40),{passive:true});
const menu=document.getElementById('menu'),toggle=document.getElementById('menu-toggle'),close=document.getElementById('menu-close'),header=document.querySelector('header');
function closeMenu(){menu.hidden=true;main.inert=false;header.inert=false;document.body.style.overflow='';toggle.setAttribute('aria-expanded','false')}
if(toggle){toggle.onclick=()=>{menu.hidden=false;main.inert=true;header.inert=true;document.body.style.overflow='hidden';toggle.setAttribute('aria-expanded','true');close.focus()};close.onclick=()=>{closeMenu();toggle.focus()};menu.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();toggle.focus()}if(e.key==='Tab'){const a=[...menu.querySelectorAll('a,button')],first=a[0],last=a.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}})}
document.querySelectorAll('.desktop-nav a,#menu nav a').forEach(a=>{if(a.pathname===location.pathname)a.setAttribute('aria-current','page')});
document.querySelector('.skip')?.addEventListener('click',e=>{e.preventDefault();main.tabIndex=-1;main.focus()});
document.querySelectorAll('[data-anchor]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById(a.dataset.anchor)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}));
// Native details/summary preserves keyboard support without a custom accordion state.
let receipt;
async function getReceipt(){const r=await fetch('/api/enquiry-session',{cache:'no-store'});if(!r.ok)throw new Error('Your edit session is unavailable. Your original enquiry remains saved.');return r.json()}
if(document.getElementById('receipt-reference'))getReceipt().then(r=>document.getElementById('receipt-reference').textContent='Enquiry reference / '+r.enquiryReference).catch(()=>location.replace('/contact/'));
for(const form of document.querySelectorAll('#initial,#details-form')){
 const isDetails=form.id==='details-form',mapping=isDetails?detailFields:fields,summary=form.querySelector('.error-summary'),status=form.querySelector('.form-status'),button=form.querySelector('[type=submit]');
 const draftKey='kz-draft-'+form.id;let startedAt=Date.now(),busy=false;
 let key=sessionStorage.getItem('kz-idempotency')||crypto.randomUUID();if(!isDetails)sessionStorage.setItem('kz-idempotency',key);
 try{const draft=JSON.parse(sessionStorage.getItem(draftKey)||'{}');for(const el of form.elements)if(el.name&&el.type!=='file'&&draft[el.name]!==undefined)el.value=draft[el.name]}catch{}
 function draft(){const value={};for(const el of form.elements)if(el.name&&el.type!=='file'&&el.name!=='website')value[el.name]=el.value;sessionStorage.setItem(draftKey,JSON.stringify(value))}
 form.addEventListener('input',draft);
 function showErrors(errors){summary.replaceChildren();summary.hidden=!Object.keys(errors).length;for(const [label,[field]]of Object.entries(mapping)){const el=form.elements.namedItem(label),msg=errors[field]||'';if(!el)continue;el.setAttribute('aria-invalid',String(!!msg));const err=document.getElementById(el.id+'-error');if(err){err.textContent=msg;el.setAttribute('aria-describedby',err.id)}if(msg){const a=document.createElement('a');a.href='#'+el.id;a.textContent=label+': '+msg;a.onclick=e=>{e.preventDefault();el.focus()};summary.append(a)}}if(!summary.hidden){summary.prepend(document.createTextNode('Please check the following fields.'));summary.focus()}}
 form.addEventListener('submit',async e=>{
 e.preventDefault();if(busy)return;
 const input={};for(const [label,[key]]of Object.entries(mapping))input[key]=form.elements.namedItem(label)?.value||'';
 const {errors}=validate(input,isDetails);showErrors(errors);if(Object.keys(errors).length)return;
 busy=true;button.disabled=true;form.setAttribute('aria-busy','true');status.textContent='Saving your enquiry…';draft();
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
 try{
 let endpoint='/api/enquiries',method='POST';if(isDetails){receipt=await getReceipt();endpoint+=`/${receipt.enquiryReference}/details`;method='PATCH'}
 else{input.startedAt=startedAt;input.website=form.elements.namedItem('website').value;input.context=new URLSearchParams(location.search).get('context')||''}
 const response=await fetch(endpoint,{method,headers:{'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify(input),signal:controller.signal});
 let result;try{result=await response.json()}catch{throw new Error('We could not confirm the save. Your entries are retained. Please retry.')}
 if(!response.ok){if(result.errors){showErrors(result.errors);status.textContent='Please correct the highlighted fields.';return}throw new Error(result.error||'We could not confirm the save. Please retry.')}
 if(!result.enquiryReference)throw new Error('No save confirmation was returned. Please retry.');
 sessionStorage.removeItem(draftKey);if(!isDetails)sessionStorage.removeItem('kz-idempotency');
 location.assign(isDetails?'/contact/finished/':'/contact/received/');
 }catch(err){status.textContent=err.name==='AbortError'?'The connection timed out. Your entries are retained. Retry to check or complete the same submission.':err.message||'We could not confirm the save. Your entries are retained. Please retry.';status.tabIndex=-1;status.focus()}
 finally{clearTimeout(timeout);busy=false;button.disabled=false;form.removeAttribute('aria-busy')}
 });
}
