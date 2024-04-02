import { createClient } from '@libsql/client';
// @ts-ignore
import Database from 'better-sqlite3'
import { join } from 'pathe'
import { drizzle as drizzleLibSQL, LibSQLDatabase } from 'drizzle-orm/libsql'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { consola } from 'consola'
import { H3Event } from 'h3'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import type { DrizzleD1Database } from "drizzle-orm/d1"
export let _db: BetterSQLite3Database | LibSQLDatabase | D1Database | null = null
export interface Env {
  DB: D1Database;

}
declare module "h3" {
  interface H3EventContext {
    db: BetterSQLite3Database<Record<string, never>> | DrizzleD1Database<Record<string, never>> | undefined
  }
}

export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../db/schema'

export const tables = schema


export const localDB = () => {
  consola.info('Using local database')
  const sqlite = new Database(join(process.cwd(), './db.sqlite'))
  return drizzle(sqlite)

}
export function initializeDrizzle(D1: D1Database) {

  if (import.meta.dev) {
    return localDB()

    return drizzleD1(D1)
  }


}



