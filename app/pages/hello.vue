

<template>
  <main>

    <input ref="fileInput" type="file" @change="handleFileChange" />
    <button @click="doSomething"> select file that is a o</button>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="data">
      <Table>
        <TableCaption>A list of your recent result from the file</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead> Patient ID</TableHead>
            <TableHead> Patient Name</TableHead>
            <TableHead> Test Ordered</TableHead>
            <TableHead> Test Result</TableHead>
            <TableHead> Date time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="font-medium">
              INV001
            </TableCell>
            <TableCell> </TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>
              $250.00
            </TableCell>

          </TableRow>


        </TableBody>

      </Table>
      <div class="text-lg font-medium" v-for="item in data.data.transformed">
        {{ item.patientInfo.name.middleName + " " + item.patientInfo.name.name }}


      </div>

    </div>

  </main>
</template>

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
</script>

