import {MockData } from  "./index"
import { useDB } from '~/server/db/drizzle';
import * as tables from '~/server/db/schema';




const main = () => {


    const db = useDB()

    const data = MockData().then((data) => {
        let sharedid = 0
        data?.transformed.forEach(async (element) => {




            const order_data = await db.insert(tables.orderInfoTable).values({
                testOrdered: element.orderInfo.testOrdered,
                observationDateTime: element.orderInfo.observationDateTime,
                orderStatus: element.orderInfo.orderStatus
            }).returning().execute()
            if (order_data) {
                order_data[0].id
                const patient_data = db.insert(tables.userTable).values({
                    patientID: element.patientInfo.patientID,
                    name: element.patientInfo.name,
                    dob: element.patientInfo.dob,
                    orderInfoTableId: order_data[0].id
                }).returning().execute()
            }

        })
    })



}


main()




