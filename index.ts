// read from a file 



// Import the promises API from the fs module
import { promises, createReadStream, readdir } from 'fs';
const fs = require('fs');
import { resolve } from 'path';
const csv = require('csv-parser')
async function readFile(filePath) {
    try {
        // Use fs.readFile in an async function with await
        const data = await promises.readFile(filePath, { encoding: 'utf8' });
        return data;
    } catch (err) {
        // Handle any errors that occur during the read operation
        console.error(err);
    }
}


function arrayDifference(array1, array2) {
    return array1.filter(x => !array2.includes(x)).concat(array2.filter(x => !array1.includes(x)));
}

const MshParser = (segment) => {
    const mshIntake = segment.split('|')
}

const HL7Parser = (fileName) => {

    const data = readFile(fileName).then((data) => {

        if (!data) {
            console.log('no data')
            return
        }
        const segments = data?.split('\n')
        const objectOutput = [];
        const output_data = segments.map((segment, index) => {
            const outPutTemplate = {
                MSH: {},
                PID: {},
                PV1: {},
                ORC: {},
                OBR: {},
                OBX: {}
            } as unknown as { MSH: {}, PID: {}, PV1: {}, ORC: {}, OBR: {}, OBX: {} }


            const list = [];
            if (segment.startsWith('MSH')) {
                // reset the object 
                //reset each value to empty object 

                const msh = segment.split('|')

                const mshObject = {
                    fiedlSeparator: msh[0],
                    encodingCharacters: msh[1],
                    sendingApplication: msh[2],
                    sendingFacility: msh[3],
                    receivingApplication: msh[4],
                    receivingFacility: msh[5],
                    dateTimeOfMessage: msh[6],
                    security: msh[7],
                    messageType: msh[8],
                    messageControlId: msh[9],
                    processingId: msh[10],
                    versionId: msh[11],
                    sequenceNumber: msh[12],
                    continuationPointer: msh[13],
                    acceptAcknowledgmentType: msh[14],
                    applicationAcknowledgmentType: msh[15],
                    countryCode: msh[16],
                }
                type mshType = keyof typeof mshObject;
                const data = arrayDifference(msh, Object.values(mshObject))
                //console.log(data)
                outPutTemplate.MSH = mshObject as { [key in mshType]: string }
                //console.log(mshObject)
            }
            if (segment.startsWith('PID')) {
                const pidFields = segment.split('|')

                const parsedData = {
                    setID: pidFields[1], // PID-1: Set ID
                    patientID: pidFields[3], // PID-3: Patient ID
                    patientName: {
                        name: pidFields[5], // PID-5: Last Name
                        middleName: " ", // PID-7: Middle Name
                        degree: pidFields[9] // PID-9: Degree
                    },
                    dateOfBirth: pidFields[7], // PID-11: Date of Birth
                    sex: pidFields[8], // PID-12: Sex
                    address: pidFields[11], // PID-13: Address
                    phoneNumber: pidFields[13] // PID-14: Phone Number
                    // Additional fields can be added as needed
                };

                const data = arrayDifference(pidFields, Object.values(parsedData))
                outPutTemplate.PID = parsedData


            } else if (segment.startsWith('PV1')) {
                const pv1Fields = segment.split('|')
                // Define an object to hold the parsed data
                const parsedData = {
                    setID: pv1Fields[1], // PV1-1: Set ID
                    patientClass: pv1Fields[2], // PV1-2: Patient Class
                    assignedLocation: pv1Fields[3], // PV1-3: Assigned Location
                    admissionType: pv1Fields[4], // PV1-4: Admission Type
                    preAdmitTestIndicator: pv1Fields[5], // PV1-5: Pre-Admit Test Indicator
                    priority: pv1Fields[3], // PV1-8: Priority
                    admitDateTime: pv1Fields[4], // PV1-9: Admit Date/Time
                    referralSource: pv1Fields[16], // PV1-16: Referral Source
                    attendingDoctor: pv1Fields[8], // PV1-17: Attending Doctor
                    admittingDoctor: pv1Fields[9], // PV1-18: Admitting Doctor
                    visitNumber: pv1Fields[19], // PV1-19: Visit Number
                    financialClass: pv1Fields[20], // PV1-20: Financial Class
                    chargePriceIndicator: pv1Fields[23], // PV1-23: Charge Price Indicator
                    courtesyCode: pv1Fields[24], // PV1-24: Courtesy Code
                    creditRating: pv1Fields[25], // PV1-25: Credit Rating
                    contractCode: pv1Fields[26], // PV1-26: Contract Code
                    contractEffectiveDate: pv1Fields[27], // PV1-27: Contract Effective Date
                    contractAmount: pv1Fields[28], // PV1-28: Contract Amount
                    contractPeriod: pv1Fields[29], // PV1-29: Contract Period
                    interestCode: pv1Fields[30], // PV1-30: Interest Code
                    transferToBadDebtCode: pv1Fields[31], // PV1-31: Transfer to Bad Debt Code
                    transferToBadDebtDate: pv1Fields[32], // PV1-32: Transfer to Bad Debt Date
                    badDebtAgencyCode: pv1Fields[33], // PV1-33: Bad Debt Agency Code
                    badDebtTransferAmount: pv1Fields[34], // PV1-34: Bad Debt Transfer Amount
                    badDebtRecoveryAmount: pv1Fields[35], // PV1-35: Bad Debt Recovery Amount
                    deleteAccountIndicator: pv1Fields[36], // PV1-36: Delete Account Indicator
                    deleteAccountDate: pv1Fields[37] // PV1-37: Delete Account Date
                    // Additional fields can be added as needed
                };
                const data = arrayDifference(pv1Fields, Object.values(parsedData))
                outPutTemplate.PV1 = parsedData
            }
            else if (segment.startsWith('ORC')) {
                const orcFields = segment.split('|');
                // Define an object to hold the parsed data
                const parsedData = {
                    orderControl: orcFields[1], // ORC-1: Order Control
                    placerOrderNumber: orcFields[2], // ORC-2: Placer Order Number
                    fillerOrderNumber: orcFields[3], // ORC-3: Filler Order Number
                    orderStatus: orcFields[5], // ORC-5: Order Status
                    quantityTiming: orcFields[7], // ORC-7: Quantity/Timing
                    enteredBy: orcFields[10], // ORC-10: Entered By
                    orderEffectiveDateTime: orcFields[15], // ORC-15: Order Effective Date/Time
                    orderingProvider: orcFields[12], // ORC-12: Ordering Provider
                    enteringOrganization: orcFields[17], // ORC-17: Entering Organization
                    enteringDevice: orcFields[18], // ORC-18: Entering Device
                    actionBy: orcFields[19] // ORC-19: Action By
                    // Additional fields can be added as needed
                };
                const data = arrayDifference(orcFields, Object.values(parsedData))
                outPutTemplate.ORC = parsedData
            }
            else if (segment.startsWith('OBR')) {
                const obrFields = segment.split('|');
                const parsedData = {
                    setID: obrFields[1], // OBR-1: Set ID
                    placerOrderNumber: obrFields[2], // OBR-2: Placer Order Number
                    fillerOrderNumber: obrFields[3], // OBR-3: Filler Order Number
                    universalServiceIdentifier: obrFields[4], // OBR-4: Universal Service Identifier
                    // OBR-5: Priority (deprecated as of v2.7)
                    requestedDateTime: obrFields[6], // OBR-6: Requested Date/Time
                    observationDateTime: obrFields[7], // OBR-7: Observation Date/Time
                    observationEndDateTime: obrFields[8], // OBR-8: Observation End Date/Time
                    collectionVolume: obrFields[9], // OBR-9: Collection Volume
                    collectorIdentifier: obrFields[10], // OBR-10: Collector Identifier
                    specimenActionCode: obrFields[11], // OBR-11: Specimen Action Code
                    dangerCode: obrFields[12], // OBR-12: Danger Code
                    relevantClinicalInfo: obrFields[13], // OBR-13: Relevant Clinical Info
                    specimenReceivedDateTime: obrFields[14], // OBR-14: Specimen Received Date/Time
                    // OBR-15: Specimen Source (deprecated as of v2.7)
                    orderingProvider: obrFields[16], // OBR-16: Ordering Provider
                    orderCallbackPhoneNumber: obrFields[17], // OBR-17: Order Callback Phone Number
                    placerField1: obrFields[18], // OBR-18: Placer Field   1
                    placerField2: obrFields[19], // OBR-19: Placer Field   2
                    fillerField1: obrFields[20], // OBR-20: Filler Field   1
                    fillerField2: obrFields[21], // OBR-21: Filler Field   2
                    resultStatusChangeDateTime: obrFields[22], // OBR-22: Result Status Change Date/Time
                    chargeToPractice: obrFields[23], // OBR-23: Charge to Practice
                    diagnosticServiceSectionID: obrFields[24], // OBR-24: Diagnostic Service Section ID
                    resultStatus: obrFields[25], // OBR-25: Result Status
                    parentResult: obrFields[26], // OBR-26: Parent Result
                    // OBR-27: Quantity/Timing (deprecated as of v2.7)
                    // OBR-28: Result Copies To (deprecated as of v2.9)
                    transportationMode: obrFields[30], // OBR-30: Transportation Mode
                    reasonForStudy: obrFields[31], // OBR-31: Reason for Study
                    // OBR-32: Principal Result Interpreter (deprecated as of v2.9)
                    // ... continue with other fields as needed
                };
                const data = arrayDifference(obrFields, Object.values(parsedData))
                outPutTemplate.OBR = parsedData
                //console.log(parsedData)
                //compare it tot eh base list 
            }
            else if (segment.startsWith('OBX')) {
                const obxFields = segment.split('|');
                //console.log(obxFields)
                const parsedData = {
                    setID: obxFields[1], // OBX-1: Set ID
                    valueType: obxFields[2], // OBX-2: Value Type
                    observationIdentifier: obxFields[3], // OBX-3: Observation Identifier
                    observationSubID: obxFields[4], // OBX-4: Observation Sub-ID
                    observationValue: obxFields[5], // OBX-5: Observation Value
                    units: obxFields[6], // OBX-6: Units
                    referenceRange: obxFields[7], // OBX-7: Reference Range
                    abbreviation: obxFields[8], // OBX-8: Abbreviation
                    dateLastObservationNormalValues: obxFields[9], // OBX-9: Date Last Observation Normal Values
                    userDefinedAccessChecks: obxFields[10], // OBX-10: User Defined Access Checks
                    observationResultsStatus: obxFields[11], // OBX-11: Observation Results Status
                    dateofObservation: obxFields[12], // OBX-12: Date of Observation
                    producerID: obxFields[13], // OBX-13: Producer ID
                    responsibleObserver: obxFields[14], // OBX-14: Responsible Observer
                    observationMethod: obxFields[15], // OBX-15: Observation Method
                    equipmentInstanceIdentifier: obxFields[16], // OBX-16: Equipment Instance Identifier
                    dateofAnalysis: obxFields[17], // OBX-17: Date of Analysis
                    component: obxFields[18], // OBX-18: Component
                    referencePointer: obxFields[19] // OBX-19: Reference Pointer
                    // Additional fields can be added as needed
                };
                outPutTemplate.OBX = parsedData
                const data = arrayDifference(obxFields, Object.values(parsedData))
            }
            return outPutTemplate

        })

        //make me a list of the index that contain MSH that is not  contain a empty object    
        const mshLocations = output_data.map((item, index) => {
            if (Object.keys(item.MSH).length > 0) {
                return index
            }
        }).filter((item) => item != undefined)

        const makePairs = (arr) => { return arr.map((v, i) => [v, arr[i + 1]]).slice(0, -1) }
        //now log the content of each slice 
        const formaTedObject = makePairs(mshLocations).map((item) => {
            return output_data.slice(item[0], item[1])

        })

        const mergerItoObject = (arr) => {
            const baseObject = { MSH: {}, PID: {}, PV1: {}, ORC: {}, OBR: {}, OBX: [] }
            const output = arr.reduce((acc, item) => {
                Object.keys(item).forEach((key) => {
                    if (key == 'OBX') {

                        if (Object.keys(item[key]).length > 0) {

                            acc.OBX.push(item[key])
                        }
                    } else {

                        //if the item empty do not add it to the object
                        if (Object.keys(item[key]).length > 0) {
                            acc[key] = item[key]
                        }
                    }
                })
                return acc
            }, baseObject)
            return output
        }
        const formattedData = formaTedObject.map((item) => { return mergerItoObject(item) })
        console.log(formattedData)
        //remove the empty value  from the object 

    })
}


const readCSV = async (fileName) => {
    return new Promise((resolve, reject) => {
        let results = [];

        fs.createReadStream(fileName)
            .pipe(csv()) // Assuming csv() is correctly configured if needed
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results); // Resolve the promise with the results on the end event
            })
            .on('error', (error) => {
                reject(error); // Reject the promise if there's an error
            });
    });
};




const getAllFile = async () => {






    const diag_group = await readCSV('./cvs/diagnostic_groups.csv');
    const diag_metric = await readCSV('./cvs/diagnostic_metrics.csv');
    const diag = await readCSV('./cvs/diagnostics.csv');
    const condition = await readCSV('./cvs/conditions.csv');


    return {


        diag_group,
        diag_metric,
        diag,
        condition





    }
}
getAllFile().then((data) => { console.log(data) })

//chech in the current dir
//read all the files in csv  folder 
