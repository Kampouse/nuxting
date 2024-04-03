// drizzle.config.ts
import type { Config } from "drizzle-kit";

const {
	LOCAL_DB_PATH,
} = process.env;

// Use better-sqlite driver for local development
export default LOCAL_DB_PATH
	? ({
			schema: "./server/db/schema.ts",
			driver: "better-sqlite",
			dbCredentials: {
				url: LOCAL_DB_PATH,
			},
		} satisfies Config)
	: ({
			schema: "./server/db/schema.ts",
			out: "./server/database/migrations",
			driver: "d1",
			dbCredentials: {
				  wranglerConfigPath: "wrangler.toml",
    			  dbName: "nuxting-db",
			},
		} satisfies Config);
