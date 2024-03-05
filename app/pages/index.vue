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

const { data, pending, error } = CurlMock()
const users =  data.value?.data.transformed
const result =  data.value?.data.transformed[0].orderInfo.results


</script>
<template>
  <main>
    <input ref="fileInput" type="file" @change="handleFileChange" />
    <button @click="doSomething"> select file that is a o</button>
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
      <TableRow v-for="user in users">

      <NuxtLink to="/results">
        hello user
      </NuxtLink>
        <TableCell class="font-medium">
          {{ user.patientInfo.patientID }}
        </TableCell>
        <TableCell> {{user.patientInfo.name.middleName + " " + user.patientInfo.name.name }}</TableCell>
        <TableCell>{{user.orderInfo.testOrdered}}</TableCell>

      </TableRow>
    </TableBody>
  </Table>




  </main>
</template>




