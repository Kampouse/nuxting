import { createClient } from '@libsql/client';
import { useRuntimeConfig } from 'nuxt/app';
// @ts-ignore
import Database from 'better-sqlite3'
import { join } from 'pathe'
import { drizzle as drizzleLibSQL, LibSQLDatabase } from 'drizzle-orm/libsql'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
let _db:  BetterSQLite3Database | LibSQLDatabase | null = null

export const useDB = () => {
  
  if (!_db) {

       const sqlite = new Database(join(process.cwd(), './db.sqlite'))
      _db = drizzle(sqlite)
  }
  console.log("what up", _db)
  return _db
}
