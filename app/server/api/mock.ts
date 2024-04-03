import { useDb as useDB } from '../middleware/database';
import { InsertUser, userTable, orderInfoTable } from "../db/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
	const db = event.context.db;
	const user: InsertUser = {

		name: "John who",
		dob: "01/01/2000",
		patientID: "1234"
	}
	const status = await db.insert(userTable).values(user).execute();
	const data = await db.select().from(userTable);
	//const data = await MockData();
	//const data = await event.context.db.select().from(userTable)
	//.leftJoin(orderInfoTable, eq(userTable.orderInfoTableId, orderInfoTable.id)).execute();
	//return { data };
	return { data: data};
}


);

