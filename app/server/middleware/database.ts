import { initializeDrizzle, localDB } from "../db/drizzle"
import type { DrizzleD1Database } from "drizzle-orm/d1"

let drizzle: ReturnType<typeof initializeDrizzle>



export const useDb = () => drizzle
export default defineEventHandler(async (event) => {


    /*if (!drizzle && import.meta.dev) {
        drizzle = localDB()
        event.context.db = drizzle
    }
    */
    if (!drizzle ) {

        const { DB } = event.context.cloudflare.env
        drizzle = initializeDrizzle(DB)
        event.context.db = drizzle
    }

})
