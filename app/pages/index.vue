<script setup lang="ts">
 const data = useFetch('/api/mock')
</script>
<template>
  <div>
  {{ data.data.value }}
  </div>
</template>
<style scoped></style>
