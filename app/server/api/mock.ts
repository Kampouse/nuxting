import { } from "../db/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
	const db = event.context.db;

	//const status = await db.insert(userTable).values(user).execute();
	//const data = await db.select().from(userTable).execute();
	//const data = await MockData();
	//const data = await event.context.db.select().from(userTable).execute();
	//.leftJoin(orderInfoTable, eq(userTable.orderInfoTableId, orderInfoTable.id)).execute();
	//return { data };
	return { data: ":9" ?? "No data found" };
}


);

