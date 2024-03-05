<script setup lang="ts" >

type Results = Array<{  test: string;
    value: string;
    units: string;
    referenceRange: string;
    resultStatus: string;
}>

 const props =  defineProps({
    results: Object as PropType<Results>})
</script>
<template>
<h1>
    hello
</h1>



      


</template>