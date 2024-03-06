<script setup>

const  props = useRoute()
 console.log(props.params.id)
</script>
<template>


<h1>
    user page
    {{  props.params.id }}
</h1>
</template>