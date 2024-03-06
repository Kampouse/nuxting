<script setup lang="ts">
import { ref } from 'vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'


const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()

function handleFileChange() {
  files.value = fileInput.value?.files
}

function doSomething() {
  const file = files.value[0]
  console.log(file)
  // and do other things...
}
function CurlMock() {

  const { data, pending, error } = useFetch('/api/mock');


  return { data, pending, error }
}


function selectUser(user: string) {

// take the first part of the string until teh 
 user = user.split('^')[0]
  navigateTo(`/patient/${user}`)
}
type PatientInfo = {
  name: {
        name: string;
        middleName: string;
        degree: string;
    };
    dob: string;
    patientID: string;
}
function selectUserWithTest(user: String, test: string) {
  console.log(user)
  user = user.split('^')[0]
  navigateTo(`/patient/${user}/result/${convertToUrl(test)}`)
}

function removeSymbols(str: string) { 
 const  output =  str.split('^')
  return    output.reverse().join(' ')
}
function stripEnds(str: string) {
  return str.split('^')[0]
}
function convertToUrl(str: string) {
    return  str.split('^')[1]
}



const { data, pending, error } = CurlMock()
const users =  data.value?.data.transformed
 
// make a computed property to get the results from the orderInfo


const result =  data.value?.data.transformed[0].orderInfo.results


</script>
<template>
  <main>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
<Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Patient ID
        </TableHead>
        <TableHead>Patient Name </TableHead>
        <TableHead>Test Ordered</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>

      <TableRow class="cursor-pointer" v-for="user in users" :key="user.patientInfo.patientID">


        <TableCell class="font-medium" @click="selectUser(user.patientInfo.patientID)" >
          {{ stripEnds( user.patientInfo.patientID) }}
        </TableCell>
          <TableCell  @click="selectUser(user.patientInfo.patientID)"
          > {{ removeSymbols( user.patientInfo.name.middleName + " " + user.patientInfo.name.name) }}
            </TableCell>
        <TableCell    
          @click="selectUserWithTest(user.patientInfo.patientID,user.orderInfo.testOrdered )">
          {{convertToUrl( user.orderInfo.testOrdered)}}
        </TableCell>
      </TableRow>

    </TableBody>
  </Table>




  </main>
</template>
<style scoped>

  



</style>

