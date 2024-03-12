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
    const output = data.value?.data?.map((test) => {
    return  data.value?.output.filter((item) => {
        if (item.diagnostic_metric.oruSonicCodes === test.test) {
          return { ...test, diagnostic_metric: item.diagnostic_metric }
        }
      })
    }).flat().filter((item) => item?.results?.referenceRange !== "") 
    return output
  }
})

const get_range = (value: string, lower: number, higher: number, range: number) => {
function categorizeValue(value: number, rangeStart: number, rangeEnd: number, thresholdPercentage: number): string {
    // Normalize the value to a 0-1 scale
    const normalizedValue = (value - rangeStart) / (rangeEnd - rangeStart);
    // Convert thresholdPercentage into a decimal
    const threshold = thresholdPercentage / 100;
    if (normalizedValue <= threshold) {
        return 'low';
    } else if (normalizedValue >= 1 - threshold) {
        return 'high';
    } else {
        return 'normal';
    }
}
  const input = parseInt(value)
   return categorizeValue(input, lower, higher, range) 
}

const  filterResult = computed(() => {
  if (data) {
    return data.value?.output
  }
})
</script>
<template>
      <div>
    <div class="flex items-center justify-left pl-2 font-mono from-neutral-950 text-3xl h-12 bg-[#61A3BC]">
     <NuxtLink :to="`/`">patient=> </NuxtLink>result</div>
<Table>
    <TableHeader>
      <TableRow>
        <TableHead class="">
          test ID
        </TableHead>
        <TableHead class=""> Test name </TableHead>
        <TableHead class="text-left "> Value</TableHead>
        <TableHead class="text-center"> ref::ever </TableHead>
        <TableHead class="text-center"> Reference Range </TableHead>
        <TableHead class="text-center"> Everlab Range </TableHead>
      </TableRow>
    </TableHeader>
<div v-if="pending"></div>
    <TableBody v-else>
      <TableRow   v-if="data" v-for="test in  filterData">
        <TableCell class="font-medium" >
          {{ test?.results.id }}
        </TableCell>
          <TableCell >
             {{ test?.results.test }}
            </TableCell>
        <TableCell class=" text-left">
          {{ test?.results.value}}
        </TableCell>
         <TableCell class="text-center">
           {{ get_range(test?.results.value, test?.diagnostic_metric.standardLower, test?.diagnostic_metric.standardHigher, 30) }} ::
           
            {{ get_range(test?.results.value, test?.diagnostic_metric.everlabLower, test?.diagnostic_metric.everlabHigher, 30) }}
        </TableCell>
          <TableCell class="text-center">
          {{ test?.results.referenceRange}}
        </TableCell>
          <TableCell class="text-center">
          {{ test?.diagnostic_metric.everlabLower }}-{{ test?.diagnostic_metric.everlabHigher}}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
      </div>      
</template>