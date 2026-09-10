import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,cp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {once} from 'node:events';

test('CLI starts and serves HTTP from a directory with spaces and encoded characters',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'KAZAR startup '));
 const project=path.join(root,'Project with spaces # percent %');
 const source=fileURLToPath(new URL('../',import.meta.url));
 await cp(source,project,{recursive:true,filter:p=>!['.data','.git','node_modules','.sites-runtime'].some(x=>p.split(path.sep).includes(x))});
 let child;
 try {
  child=spawn(process.execPath,['server/local.mjs'],{cwd:project,env:{...process.env,PORT:'0',HOST:'127.0.0.1',APP_ORIGIN:'',DATA_DIR:path.join(root,'Private data'),STAGING_USER:'',STAGING_PASSWORD:''},stdio:['ignore','pipe','pipe']});
  let stdout='',stderr='';child.stderr.on('data',b=>stderr+=b);
  const origin=await new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>reject(new Error('Startup timeout: '+stdout+' '+stderr)),10000);
   child.once('error',e=>{clearTimeout(timer);reject(e)});
   child.once('exit',code=>{clearTimeout(timer);reject(new Error('Server exited before startup: '+code+' '+stderr))});
   child.stdout.on('data',b=>{stdout+=b;const m=stdout.match(/http:\/\/127\.0\.0\.1:(\d+)/);if(m){clearTimeout(timer);resolve(m[0])}});
  });
  const response=await fetch(origin+'/services/');assert.equal(response.status,200);
  assert.match(await response.text(),/Construction/);
 } finally {
  if(child&&child.exitCode===null){const exited=once(child,'exit');child.kill();await exited}
  await rm(root,{recursive:true,force:true});
 }
});

test('Windows drive paths decode spaces without a leading URL slash',()=>{
 // Windows path semantics tested on any OS; not a native Windows startup test.
 const url='file:///C:/KAZAR%20Project/server/local.mjs';
 assert.equal(fileURLToPath(url,{windows:true}),path.win32.resolve('C:\\KAZAR Project\\server\\local.mjs'));
});
