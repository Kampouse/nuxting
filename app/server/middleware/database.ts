import { initializeDrizzle, localDB } from "../db/drizzle"
import type { DrizzleD1Database } from "drizzle-orm/d1"




export const useDb = () => drizzle

let drizzle: ReturnType<typeof initializeDrizzle>

export default defineEventHandler(async (event) => {
      const { DB } = event.context.cf
  event.context.db = drizzle
})

declare module "h3" {
  interface H3EventContext {
    db: DrizzleD1Database
  }
}