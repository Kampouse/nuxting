import { MockData } from "../../../parser/index.js";
import type { Mocky } from "../../../parser/index.js";

export default defineEventHandler(async (event) => {

    if (event.context.params) {
        console.log(event.context.params);
        const id = event.context.params.result;
        const decoded = decodeURIComponent(id);



        const data = await MockData();





        if (data) {
            return data.transformed.find((result) => {


                console.log(result.orderInfo.testOrdered, decoded);
                return result.orderInfo.testOrdered === decoded;
            });
        }
        // Access the request data with typed properties (optional)
    }
});