import { MockData } from "../../parser/index.js";
import type { Mocky } from "../../parser/index.js";
import { InsertUser, userTable, orderInfoTable } from "../db/schema.js"
import { useDB } from "../db/drizzle.js"
import { eq } from "drizzle-orm";


export default defineEventHandler(async (event) => {
    const body = await readRawBody(event, "utf8");

});