<script setup>
import { useFetch } from '#app';
const  props = useRoute()
const id = props.params.id;
const result = props.params.result;
const data =  useFetch(`/api/result/${id}`);
</script>
<template>

      <h1>
{{ "id: " +  data.data.value.id +  " result:" +  result }}
{{  "id: " +  id +  " result:" +  result }}
      </h1>


</template>