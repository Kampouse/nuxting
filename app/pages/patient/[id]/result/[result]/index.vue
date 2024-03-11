<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const  props = useRoute()
const id = props.params.id;
const result = props.params.result;
const { data, pending, error } =  useFetch(`/api/result/${id}`)
const  filterData = computed(() => {
  if (data) {
    return data.value?.data.filter((test) => test.referenceRange != "")
  }
})


</script>
<template>
      <div>
    <div class="    flex  items-center justify-left pl-2    font-mono  from-neutral-950 text-3xl    h-12 bg-[#61A3BC]">
      
     <NuxtLink :to="`/`">patient=> </NuxtLink>result</div>
            
<Table>
    <TableHeader>
      <TableRow>
        <TableHead class="">
          test ID
        </TableHead>
        <TableHead class=""> Test name </TableHead>
        <TableHead class="text-left ">Test value</TableHead>
        <TableHead class="text-center"> Reference range </TableHead>
      </TableRow>
    </TableHeader>

<div v-if="pending"></div>
    <TableBody v-else>
      <TableRow class=""  v-if="data" v-for="test in  filterData">
        <TableCell class="font-medium" >
          {{ test.id}}
        </TableCell>
          <TableCell 
          > {{ test.test}}
            </TableCell>
        <TableCell    class=" text-left">
          {{ test.value}}

        </TableCell>
         <TableCell class="text-center">
          {{ test.referenceRange}}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
      </div>      
      
</template>