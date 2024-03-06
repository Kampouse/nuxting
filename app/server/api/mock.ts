import { MockData } from "../../parser/index.js";
import type { Mocky } from "../../parser/index.js";
import { useDB } from "../db/drizzle"

	const db  = useDB()

export default defineEventHandler(async (event) => {
	const data = await MockData();
	// Access the request data with typed properties (optional)
	return { data };
});
