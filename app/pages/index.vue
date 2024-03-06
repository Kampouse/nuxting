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
  // and do other things...
}
function CurlMock() {

  const { data, pending, error } = useFetch('/api/mock');


  return { data, pending, error }
}

function selectUser(user: string) {

// take the first part of the string until teh 
const encoded =   encodeURIComponent(user)
  navigateTo(`/patient/${encoded}`)
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
function selectUserWithTest(user: string, test: string) {
  const encodedUser =  encodeURIComponent(user)
  //replace / with %2F
  const encodedTest =  encodeURIComponent(test)
  navigateTo(`/patient/${encodedUser}/result/${encodedTest}`)
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
        <TableCell class="font-medium cursor-pointer" @click="selectUser(user.patientInfo.patientID)" >
          {{ user.patientInfo.patientID }}
        </TableCell>
          <TableCell class="cursor-pointer" @click="selectUser(user.patientInfo.patientID)"
          > {{ user.patientInfo.name}}
            </TableCell>
        <TableCell    class="cursor-pointer"
          @click="selectUserWithTest(user.patientInfo.patientID,user.orderInfo.testOrdered )">
          {{ user.orderInfo.testOrdered}}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </main>
</template>
<style scoped>

  



</style>

