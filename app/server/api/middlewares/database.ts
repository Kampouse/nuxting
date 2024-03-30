import { useDB } from "~/server/db/drizzle"

import { drizzle as drizzleLibSQL, LibSQLDatabase } from 'drizzle-orm/libsql'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
export default defineEventHandler
((event
) => { event.context.db = useDB()   })

type database = BetterSQLite3Database | LibSQLDatabase 

declare module 'h3' {
  interface H3EventContext {
    db: database
  }
}