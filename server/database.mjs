import {DatabaseSync} from 'node:sqlite';
import {readFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
export function openDatabase(filename){
 mkdirSync(path.dirname(filename),{recursive:true,mode:0o700});
 const db=new DatabaseSync(filename);db.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
 db.exec(readFileSync(new URL('../migrations/001_initial.sql',import.meta.url),'utf8'));
 function prepare(sql){return {sql,args:[],bind(...args){this.args=args;return this},async first(){return db.prepare(sql).get(...this.args)||null},async run(){return db.prepare(sql).run(...this.args)}}}
 return {raw:db,prepare,async batch(statements){db.exec('BEGIN IMMEDIATE');try{const result=statements.map(s=>db.prepare(s.sql).run(...s.args));db.exec('COMMIT');return result}catch(e){db.exec('ROLLBACK');throw e}},close(){db.close()}};
}
