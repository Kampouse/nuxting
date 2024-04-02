import { useDb as useDB } from '../middleware/database';
import { InsertUser, userTable, orderInfoTable } from "../db/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
	console.log("Hej", event.context)
	const db = event.context.db;
	const user: InsertUser = {

		name: "John who",
		dob: "01/01/2000",
		patientID: "1234"
	}
	await db.insert(userTable).values(user).execute();
	console.log("Hej", event.context)
	//const data = await MockData();
	//const data = await event.context.db.select().from(userTable)
	//.leftJoin(orderInfoTable, eq(userTable.orderInfoTableId, orderInfoTable.id)).execute();
	//return { data };
	return { data: "Hello World" };
}


);

