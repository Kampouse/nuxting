import { createClient } from '@libsql/client';
// @ts-ignore
import Database from 'better-sqlite3'
import { join } from 'pathe'
import { drizzle as drizzleLibSQL, LibSQLDatabase } from 'drizzle-orm/libsql'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import {consola} from 'consola'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
let _db: BetterSQLite3Database | LibSQLDatabase | null = null


export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../db/schema'

export const tables = schema

export const local = () => {

   consola.info('Using local database')
  if (!_db) {

    const sqlite = new Database(join(process.cwd(), './db.sqlite'))
    _db = drizzle(sqlite)
  }
  return _db
}



export function useDB() {
  return import.meta.dev ?  local() : drizzle(hubDatabase(), { schema }) 
}

