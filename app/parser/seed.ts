import { eq } from 'drizzle-orm';
import { MockData } from "./index"
import { useDB } from '~/server/db/drizzle';
import * as tables from '~/server/db/schema';

const main = () => {
    let db = useDB()


    type Mockdata = ReturnType<typeof MockData>





    const injectBaseHL7Data = async (InputData: Mockdata) => {
        const dataExists = await checkIfDataExists()
        if (dataExists) {
            console.log("Data already exists in the database. Exiting...")
            return
        }
        InputData.then((data) => {
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
                    element.orderInfo.results.forEach(async (result) => {
                        const result_data = await db.insert(tables.results).values({
                            test: result.test,
                            value: result.value,
                            units: result.units,
                            referenceRange: result.referenceRange,
                            resultStatus: result.resultStatus,
                            orderInfoId: order_data[0].id
                        }).returning().execute()
                    })
                }
            })

        })

    }

    const checkIfDataExists = async () => {

        if (!db) {
            db = useDB()
        }
        return db.select().from(tables.userTable).execute().then((data) => {
            if (data.length > 0) {
                return true
            }
            return false
        })
    }

    const injectCSVdata = (input: Mockdata) => {


        input.then((data) => {
            data?.database_data.diag_metric.forEach(async (element) => {
                db.insert(tables.diagnosticMetricTable).values({
                    name: element.name,
                    oruSonicCodes: element.oru_sonic_codes,
                    diagnostic: element.diagnostic,
                    diagnosticGroups: element.diagnostic_groups,
                    oruSonicUnits: element.oru_sonic_units,
                    units: element.units,
                    minAge: element.min_age,
                    maxAge: element.max_age,
                    standardLower: element.standard_lower,
                    standardHigher: element.standard_higher,
                    everlabLower: element.everlab_lower,
                    everlabHigher: element.everlab_higher,
                    gender: element.gender
                }).execute()
            })
            data?.database_data.diag.forEach(async (element) => {
                db.insert(tables.diagnosticTable).values({
                    name: element.name,
                    diagnosticGroups: element.diagnostic_groups,
                    diagnosticMetrics: element.diagnostic_metrics
                }).execute()
            })
            data?.database_data.condition.forEach(async (element) => {
                db.insert(tables.conditionTable).values({
                    name: element.name,
                    diagnostic: element.diagnostic ?? ""
                }).execute()
            })





        })












    }
    const data = MockData();
    injectBaseHL7Data(data)
    injectCSVdata(data)

}


main()



