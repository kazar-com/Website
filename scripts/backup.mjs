import {DatabaseSync,backup} from 'node:sqlite';
import {mkdir,copyFile,stat,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export async function backupData(source,destination){
 // Exclusive directory creation prevents overwriting any existing backup.
 await mkdir(destination,{mode:0o700});
 const db=new DatabaseSync(path.join(source,'enquiries.sqlite'),{readOnly:true});
 try {
  await backup(db,path.join(destination,'enquiries.sqlite'));
  await copyFile(path.join(source,'app-secret'),path.join(destination,'app-secret'));
 } finally {db.close()}
}
export async function restoreData(source,destination){
 await stat(path.join(source,'app-secret'));
 const db=new DatabaseSync(path.join(source,'enquiries.sqlite'),{readOnly:true});
 try {if(db.prepare('PRAGMA integrity_check').get().integrity_check!=='ok')throw new Error('Backup integrity check failed')}finally{db.close()}
 // Restore to a NEW directory only. Stop the application before switching DATA_DIR.
 await mkdir(destination,{mode:0o700});
 await copyFile(path.join(source,'enquiries.sqlite'),path.join(destination,'enquiries.sqlite'));
 await copyFile(path.join(source,'app-secret'),path.join(destination,'app-secret'));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [operation,source,destination]=process.argv.slice(2);
 if(!['backup','restore'].includes(operation)||!source||!destination)throw new Error('Usage: node scripts/backup.mjs backup|restore SOURCE_DIR NEW_DESTINATION_DIR');
 await (operation==='backup'?backupData:restoreData)(path.resolve(source),path.resolve(destination));
 console.log(operation+' completed. Keep this directory private; it contains enquiry records and the session secret.');
}
