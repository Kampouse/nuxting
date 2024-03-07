import { MockData } from "../../parser/index.js";
import type { Mocky } from "../../parser/index.js";
import { InsertUser, userTable } from "../db/schema"
import { useDB } from "../db/drizzle"

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
	const data = await MockData();
	// Access the request data with typed properties (optional)
	return { data };
});
