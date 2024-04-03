<script lang="ts" setup>
const data = null
if ( data && !data.value) {
  navigateTo("/login")
}

async function handleLogout() {
  try {
    await $fetch("/api/logout", {
      method: "POST",
    })

    navigateTo("/login")
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
 <button @click="handleLogout">Logout</button>
</template>