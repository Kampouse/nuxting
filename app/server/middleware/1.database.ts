import { initializeDrizzle } from "../db/drizzle"
import type { DrizzleD1Database } from "drizzle-orm/d1"
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"

let drizzle: ReturnType<typeof initializeDrizzle>

export default defineEventHandler(async (event) => {
    const { DB } = event.context?.cloudflare?.env
    drizzle = initializeDrizzle(event.context?.cloudflare?.env?.DB)
    event.context.db = drizzle
    console.log("DB", drizzle)

})

declare module "h3" {
    interface H3EventContext {
        db: DrizzleD1Database | BetterSQLite3Database
    }
}