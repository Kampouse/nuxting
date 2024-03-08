<script setup>
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
        <TableHead> Test name </TableHead>
        <TableHead>Test value</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class="cursor-pointer"  v-for="test in data?.data">
        <TableCell class="font-medium cursor-pointer" @click="selectUser(user.user.patientID)" >
          {{ test.id}}
        </TableCell>
          <TableCell 
          > {{ test.test}}
            </TableCell>
        <TableCell    class="cursor-pointer"
          >
          {{ test.value}}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
      </div>      
      </div>      
      </div>      
      
</template>