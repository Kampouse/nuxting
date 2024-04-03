<script setup lang="ts">
 const data =  useFetch("/api/mock")
</script>
<template>
  <h1> some average pages </h1>
  {{ data }}
</template>
<style scoped></style>
