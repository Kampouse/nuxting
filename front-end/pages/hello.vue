





<template>
    <main>
        <input ref="fileInput" type="file" @change="handleFileChange" />
        <button @click="doSomething">do something</button>
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
</script>

