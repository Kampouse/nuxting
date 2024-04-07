<script lang="ts" setup>

  const data =  useFetch("/api/user/user")
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
  console.log(data)
}
</script>
<template>
  <h1> {{ data.data }}</h1>
 <button @click="handleLogout">Logout</button>
</template>