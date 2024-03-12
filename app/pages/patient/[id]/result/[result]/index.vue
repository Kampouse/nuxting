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

function scaleBetween(unscaledNum:number, minAllowed:number, maxAllowed:number, min:number, max:number) {
      return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    }




  const input = parseInt(value)

    
    const output =  scaleBetween(input, 0, 100, 0, 100)
    const rangedLow = scaleBetween(lower, 0, 100, 0, 100)
    const rangedAverage = scaleBetween((lower + higher) / 2, 0, 100, 0, 100)
    const rangedHigh = scaleBetween(higher, 0, 100, 0, 100)
     
  console.log("=>",rangedLow,  rangedLow, rangedAverage, rangedHigh, "<=")
   //check what is the closest to 0
   if( output  <= rangedLow * 1.05 ) {
     return "Low"
   }
   if( output * 1.05 < rangedAverage ) {
     return "average"
   }
    if( output <= rangedHigh) {
      return "High"
    }
    console.log("=>",output, rangedLow, rangedAverage, rangedHigh, "<=")


   
}

const  filterResult = computed(() => {
  if (data) {
    return data.value?.output
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
        <TableHead class="text-left "> Value</TableHead>
        <TableHead class="text-center"> Reference Range </TableHead>
        <TableHead class="text-center"> Everlab Range </TableHead>
        <TableHead class="text-center"> Reference </TableHead>
      </TableRow>
    </TableHeader>

<div v-if="pending"></div>
    <TableBody v-else>
      <TableRow class=""  v-if="data" v-for="test in  filterData">
        <TableCell class="font-medium" >
          {{ test?.results.id }}
        </TableCell>
          <TableCell 
          > {{ test?.results.test }}
            </TableCell>
        <TableCell    class=" text-left">
          {{ test?.results.value}}

        </TableCell>
         <TableCell class="text-center">
          {{ test?.results.referenceRange}}

        </TableCell>
          <TableCell class="text-center">
            {{ get_range(test?.results.value, test?.diagnostic_metric.standardLower, test?.diagnostic_metric.standardHigher, 0.35) }}

        </TableCell>
          <TableCell class="text-center">
          {{ test?.diagnostic_metric.standardLower }}-{{ test?.diagnostic_metric.standardHigher}}

        </TableCell>



      </TableRow>
    </TableBody>
  </Table>
      </div>      
      
</template>