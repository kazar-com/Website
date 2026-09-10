import http from 'node:http';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import worker from './worker.mjs';
import {openDatabase} from './database.mjs';
export function createApp({port=3000,host='127.0.0.1',origin=`http://${host}:${port}`,dataDir='.data',user='',password='',reviewOrigin=''}={}){
 if(!['127.0.0.1','localhost','::1'].includes(host)&&(!user||password.length<20))throw new Error('Non-loopback staging requires STAGING_USER and a STAGING_PASSWORD of at least 20 characters.');
 mkdirSync(dataDir,{recursive:true,mode:0o700});const secretPath=path.join(dataDir,'app-secret');if(!existsSync(secretPath))writeFileSync(secretPath,randomBytes(32).toString('hex'),{mode:0o600,flag:'wx'});
 const DB=openDatabase(path.join(dataDir,'enquiries.sqlite'));const root=path.resolve('dist/client');
 const routes=JSON.parse(readFileSync('dist/server/routes.json','utf8'));
 const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.txt':'text/plain'};
 const ASSETS={async fetch(req){const pathname=new URL(req.url).pathname;if(req.method!=='GET'&&req.method!=='HEAD')return new Response('Method not allowed',{status:405});
 let file=routes[pathname]||(pathname.startsWith('/assets/')||['/approved.css','/fonts.css','/implementation.css','/app.js','/validation.js','/robots.txt'].includes(pathname)?pathname.slice(1):null);
 if(file&&!path.resolve(root,file).startsWith(root+path.sep))file=null;
 if(!file||!existsSync(path.join(root,file)))return new Response(readFileSync(path.join(root,'404.html')),{status:404,headers:{'Content-Type':mime['.html']}});
 return new Response(req.method==='HEAD'?null:readFileSync(path.join(root,file)),{headers:{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}})}};
 const server=http.createServer(async(req,res)=>{
 const localOrigin=port===0?`http://127.0.0.1:${server.address().port}`:origin;
 const requestOrigin=reviewOrigin && req.headers.host===new URL(reviewOrigin).host ? reviewOrigin : localOrigin;
 const security={'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; img-src 'self'; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"};
 if(user){const got=Buffer.from(req.headers.authorization||''),expected=Buffer.from('Basic '+Buffer.from(user+':'+password).toString('base64'));if(got.length!==expected.length||!timingSafeEqual(got,expected)){res.writeHead(401,{...security,'WWW-Authenticate':'Basic realm="KAZAR private staging", charset="UTF-8"'});res.end('Protected review');return}}
 let size=0,chunks=[];try { for await(const chunk of req){size+=chunk.length;if(size>32768){res.writeHead(413,security);res.end('Request too large');return}chunks.push(chunk)} } catch { if(!res.destroyed){res.writeHead(400,security);res.end('Request interrupted');} return; }
 const target=new URL(req.url,requestOrigin);if(target.origin!==requestOrigin){res.writeHead(403,security);res.end();return}
 if(req.headers.host!==new URL(requestOrigin).host){res.writeHead(403,security);res.end('Unrecognised host');return}
 const method=req.method;const request=new Request(target,{method,headers:req.headers,body:['GET','HEAD'].includes(method)?undefined:Buffer.concat(chunks)});
 const response=await worker.fetch(request,{DB,ASSETS,APP_SECRET:readFileSync(secretPath,'utf8'),APP_ORIGIN:requestOrigin,CLIENT_IP:req.socket.remoteAddress});
 res.writeHead(response.status,{...security,...Object.fromEntries(response.headers)});res.end(Buffer.from(await response.arrayBuffer()));
 });server.requestTimeout=15000;server.headersTimeout=10000;
 return {server,DB,async close(){await new Promise(r=>server.close(r));DB.close()}};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const cliPort=process.argv.indexOf('--port');const port=Number(process.env.PORT||(cliPort>=0?process.argv[cliPort+1]:3000)),host=process.env.HOST||'127.0.0.1';const app=createApp({port,host,origin:process.env.APP_ORIGIN||`http://${host}:${port}`,dataDir:process.env.DATA_DIR||'.data',user:process.env.STAGING_USER||'',password:process.env.STAGING_PASSWORD||'',reviewOrigin:process.argv.includes('--agent-preview')?'http://terminal.local:4173':''});
 app.server.listen(port,host,()=>console.log(`KAZAR local implementation: http://${host}:${app.server.address().port} — test data only; email/uploads not connected.`));
 process.on('SIGTERM',()=>app.close().then(()=>process.exit(0)));process.on('SIGINT',()=>app.close().then(()=>process.exit(0)));
}
