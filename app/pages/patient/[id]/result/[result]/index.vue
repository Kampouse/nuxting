<script setup lang="ts">
import { useFetch } from '#app';
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
            <div v-if="pending">Loading...</div>
            <div v-else>
                  <div v-if="data">
<Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          test ID
        </TableHead>
        <TableHead class="w-[100px]"> Test name </TableHead>
        <TableHead class="text-center">Test value</TableHead>
        <TableHead class=""> Reference range </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class=""  v-for="test in  filterData">
        <TableCell class="font-medium" >
          {{ test.id}}
        </TableCell>
          <TableCell 
          > {{ test.test}}
            </TableCell>
        <TableCell    class=" text-center">
          {{ test.value}}

        </TableCell>
         <TableCell>
          {{ test.referenceRange}}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
      </div>      
      </div>      
      </div>      
      
</template>