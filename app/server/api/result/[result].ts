import { text } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";
import { MockData } from "../../../parser/index.js";
import type { Mocky } from "../../../parser/index.js";
import { useDB } from "~/server/db/drizzle.js";
import * as tables from "~/server/db/schema.js";
export default defineEventHandler(async (event) => {

    if (event.context.params) {
        console.log(event.context.params);
        const id = event.context.params.result;
        const decoded = decodeURIComponent(id);



        const data = await MockData();
        const db = useDB();
        db.select().from(tables.results).where(eq(tables.results.test, decoded)).execute();




        if (data) {
            return data.transformed.find((result) => {


                console.log(result.orderInfo.testOrdered, decoded);
                return result.orderInfo.testOrdered === decoded;
            });
        }
        // Access the request data with typed properties (optional)
    }
});