





<template>
    <main>
         
        <input ref="fileInput" type="file" @change="handleFileChange" />
        <button @click="doSomething">do something</button>

        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="data">

            <div v-for="item in data.data.input_data" >


                {{  item.PID.patientName.name + " " +  item.ORC.fillerOrderNumber }}


        </div>

        </div>

    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()

function handleFileChange() {
    files.value = fileInput.value?.files
}

function doSomething() {
    const file = files.value[0]
    console.log(file)
    // and do other things...
}
function CurlMock() {
     
     const { data, pending, error } = useFetch('/api/mock');


    return {  data, pending, error }
}

const {data,pending, error} = CurlMock()
</script>

