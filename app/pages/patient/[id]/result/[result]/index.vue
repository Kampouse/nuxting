<script setup>
const  props = useRoute()
const id = props.params.id;
const result = props.params.result;
console.log(props.params)


</script>
<template>

      <h1>
{{  "id: " +  id +  " result:" +  result }}
      </h1>


</template>