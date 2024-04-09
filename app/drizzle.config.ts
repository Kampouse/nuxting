// drizzle.config.ts
import type { Config } from "drizzle-kit";

const {
	LOCAL_DB_PATH,
} = process.env;






const LOCAL = {
	schema: "./server/db/schema.ts",
	driver: "better-sqlite",
	dbCredentials: {
		url: "db.sqlite", // just put it here cause you may not have a cloudflae
	},
} satisfies Config



const CF = {
	schema: "./server/db/schema.ts",
	out: "./server/database/migrations",
	driver: "d1",
	dbCredentials: {
		wranglerConfigPath: "wrangler.toml",
		dbName: "db", //rename it
	} satisfies Config
}



// by default i place it to local so you dont have to  use cf 
export default LOCAL
