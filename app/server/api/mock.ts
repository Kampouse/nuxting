import { InsertUser, userTable, orderInfoTable } from "../db/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
	//const data = await MockData();
const data = await event.context.db.select().from(userTable)
		.leftJoin(orderInfoTable, eq(userTable.orderInfoTableId, orderInfoTable.id)).execute();
	return { data };
});
