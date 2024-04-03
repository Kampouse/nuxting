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
export { sql, eq, and, or } from 'drizzle-orm'

export function initializeDrizzle(D1: D1Database) {
/*
  if (import.meta.dev) {
    return localDB()
  }
  */

    return drizzleD1(D1)
  


}



