import { useDB } from '~/server/db/drizzle';
import { InsertUser, userTable, orderInfoTable } from "../db/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
	const db = useDB();
	const user : InsertUser = {
	
		name: "John Doe",
		dob: "01/01/2000",
		patientID: "1234"
	}
	await db.insert(userTable).values(user).execute();
	 
	//const data = await MockData();
//const data = await event.context.db.select().from(userTable)
		//.leftJoin(orderInfoTable, eq(userTable.orderInfoTableId, orderInfoTable.id)).execute();
	//return { data };
	return { data: "Hello World" };
}


);

