<script setup>
import { useFetch } from '#app';
const  props = useRoute()
const id = props.params.id;
const result = props.params.result;
console.log("hello",id)
const { data, pending, error } =  useFetch(`/api/result/${id}`)

</script>
<template>



      <div>
            
            <div v-if="pending">Loading...</div>
            <div v-else>

                  <div v-if="data">

                        <div v-for="item in data.data"  >
                               
                              {{ item.test }}
                              {{ item.resultStatus }}
                              {{ item.referenceRange }}
                              {{ item.units }}
                             "result" {{ item.value }}




                              <div/>
                              

      </div>      
      </div>      
      </div>      
      </div>      
      
</template>