<script setup>
import { useFetch } from '#app';
const  props = useRoute()
const id = props.params.id;
const result = props.params.result;
const data =  useFetch(`/api/result/${result}`);


</script>
<template>
      <div v-for="item in   data.data.value.orderInfo.results">
                  <h1> {{item.test  }}</h1>
             </div>
</template>