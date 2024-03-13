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


import {Eye,User} from "lucide-vue-next"
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
  return`/patient/${encoded}`
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
function selectUserWithTest(user: number| undefined , test: string | null | undefined) {
  if (user === undefined || test === null) {
    return ""
  }
  if (test === undefined) {
    return ""
  }
  const encodedUser =  encodeURIComponent(user)
  const encodedTest =  encodeURIComponent(test)
  return `/patient/${encodedUser}/result/${encodedTest}`
}
 useHeadSafe({ title:"HLops - Patients"})

const { data, pending, error } = CurlMock()

 
// make a computed property to get the results from the orderInfo




</script>
<template>
  
  <main class="">

    <div class="    flex  items-center justify-left pl-2    font-mono  from-neutral-950 text-3xl    h-12 bg-[#61A3BC]">patient=>list</div>
    
<Table>

    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Patient ID
        </TableHead>
        <TableHead class=" text-center">Patient Name </TableHead>
        <TableHead class="text-left" >Test Ordered</TableHead>
        <TableHead class="text-left" >Observation date </TableHead>
      </TableRow>
    </TableHeader>


    <div v-if="pending"></div>
    <div v-else-if="error">Error: {{ error }}</div>

    <TableBody v-else>
      <TableRow   v-for="user in data?.data" :key="user.user.patientID">

        <TableCell class="font-medium">
          {{ user.user.patientID }}
        </TableCell>
          <TableCell class=" text-center"> 
          <NuxtLink  class=" cursor-pointer flex  justify-center   gap-3" :to="selectUser(user.user.patientID)">


        <User></User>
               {{ user.user.name}}

          </NuxtLink>
            </TableCell>
        <TableCell    class="  text-left flex flex-row">
          <NuxtLink class=" cursor-pointer flex flex-row gap-3 " :to="selectUserWithTest( user.order_info?.id, user.order_info?.testOrdered)"> 
        <Eye></Eye>
          {{user.order_info?.testOrdered }}
          </NuxtLink>

        </TableCell>
        <TableCell class="font-medium">
          {{ user.order_info?.observationDateTime }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </main>
</template>
<style scoped>

  



</style>

