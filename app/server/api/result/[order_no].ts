import { text } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";
import { useDB } from "~/server/db/drizzle.js";
import * as tables from "~/server/db/schema.js";
export default defineEventHandler(async (event) => {

    if (event.context.params) {
        console.log(event.context.params);
        const id = event.context.params.order_no;
        const decoded = decodeURIComponent(id);
        const db = useDB();
        const data = await db.select().from(tables.results).where(eq(tables.results.orderInfoId, parseInt(id))).execute();
        eturn { data };
        // Access the request data with typed properties (optional)
    }
});