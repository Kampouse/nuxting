import { initializeDrizzle, localDB } from "../db/drizzle"
import type { DrizzleD1Database } from "drizzle-orm/d1"





let drizzle: ReturnType<typeof initializeDrizzle>

export default defineEventHandler(async (event) => {
    if( event.context?.cloudflare?.env){
      const { DB } = event.context?.cloudflare.env
        drizzle = initializeDrizzle(DB )
        event.context.db = drizzle
    }      


})

declare module "h3" {
  interface H3EventContext {
    db: DrizzleD1Database
  }
}