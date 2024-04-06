<script lang="ts" setup>
async function handleLogout(e:Event) {
  e.preventDefault()
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