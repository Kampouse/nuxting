import { MockData } from "../../parser/index.js";
import type { Mocky } from "../../parser/index.js";
import { InsertUser, userTable, orderInfoTable } from "../db/schema"
import { useDB } from "../db/drizzle"
import { eq } from "drizzle-orm";

const db = useDB()






const insertUser: InsertUser = {
	patientID: "123",
	name: "John Doe",
	dob: "01/01/2000",
};







//db.insert(userTable).values(insertUser).execute().then((result) => {
//console.log(result);
//});



export default defineEventHandler(async (event) => {
	//const data = await MockData();
	const db = useDB();
	const data = await db.select().from(userTable).leftJoin(orderInfoTable, eq(userTable.orderInfoTableId, orderInfoTable.id)).execute();
	///get 
	//create an object with the data of both tables that match 




	// Access the request data with typed properties (optional)
	return { data };
});
