import { MockData } from "../../../parser/index.js";
import type { Mocky } from "../../../parser/index.js";

export default defineEventHandler(async (event) => {

    if (event.context.params) {
        const id = event.context.params.id;
        const data = await MockData();
        // Access the request data with typed properties (optional)
        return { id: id };
    }
});


