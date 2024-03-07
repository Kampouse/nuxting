import { useDB } from "./drizzle";
import type { InsertUser } from "./schema";
import { userTable } from "./schema";

const db = useDB()
db.select().from(userTable).execute().then((result) => {
    console.log(result);
});