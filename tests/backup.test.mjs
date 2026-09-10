import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {openDatabase} from '../server/database.mjs';
import {backupData,restoreData} from '../scripts/backup.mjs';
test('Online SQLite backup restores durable rows and session secret to a new directory',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'kazar-backup-'));
 const source=path.join(root,'source'),snapshot=path.join(root,'snapshot'),restored=path.join(root,'restored');
 await mkdir(source);await writeFile(path.join(source,'app-secret'),'synthetic-only-secret');
 const db=openDatabase(path.join(source,'enquiries.sqlite'));
 try{
  db.raw.prepare('INSERT INTO enquiries(reference,idempotency_key,payload_hash,payload,token_hash,token_expires,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)').run('synthetic-ref','synthetic-key','hash','{}','token',9999999999999,1,1);
  await backupData(source,snapshot);await restoreData(snapshot,restored);
  const copy=openDatabase(path.join(restored,'enquiries.sqlite'));
  try{assert.equal(copy.raw.prepare('SELECT reference FROM enquiries').get().reference,'synthetic-ref')}finally{copy.close()}
  assert.equal(await readFile(path.join(restored,'app-secret'),'utf8'),'synthetic-only-secret');
  await assert.rejects(restoreData(snapshot,restored),{code:'EEXIST'});
 }finally{db.close();await rm(root,{recursive:true,force:true})}
});
