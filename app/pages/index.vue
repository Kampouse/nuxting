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
  const encodedTest =  encodeURIComponent(test)
  return `/patient/${encodedUser}/result/${encodedTest}`
}

const { data, pending, error } = CurlMock()

 
// make a computed property to get the results from the orderInfo




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
      <TableRow class="cursor-pointer"  v-for="user in data?.data" :key="user.user.patientID">
        <TableCell class="font-medium cursor-pointer" @click="selectUser(user.user.patientID)" >
          {{ user.user.patientID }}
        </TableCell>
          <TableCell class="cursor-pointer" @click="selectUser(user.user.patientID)"
          > {{ user.user.name}}
            </TableCell>
        <TableCell    class="cursor-pointer"
          >
          {{user.order_info?.testOrdered }}
          <NuxtLink :to="selectUserWithTest( user.order_info?.id, user.order_info?.testOrdered )"> view</NuxtLink>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </main>
</template>
<style scoped>

  



</style>

