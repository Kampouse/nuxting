<script setup lang="ts">
 const data = useFetch('/api/mock')
</script>
<template>
  <h1> some average pages </h1>
  {{ data.data.value }}
</template>
<style scoped></style>
