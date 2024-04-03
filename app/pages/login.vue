<script setup lang="ts">
const username = ref("")
const password = ref("")

async function handlePasswordLogin() {
  if (!username.value || !password.value) return

  const formData = new FormData()
  formData.append("username", username.value)
  formData.append("password", password.value)

  try {
    await $fetch("/api/login/password/signin", {
      method: "POST",
      body: formData,
    })
  } catch (error: any) {
    toast.add({ title: error.response._data.message })
  }

  navigateTo("/")
}

async function handleRegister() {
  if (!username.value || !password.value) return

  const formData = new FormData()
  formData.append("username", username.value)
  formData.append("password", password.value)

  try {
    await $fetch("/api/login/password/signup", {
      method: "POST",
      body: formData,
    })
  } catch (error: any) {
    toast.add({ title: error.response._data.message })
  }

  toast.add({ title: "User created!" })

  navigateTo("/")
}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-80">
      <div class="space-y-4">
        <button block label="Login with GitHub" icon="i-heroicons-oauth" to="/api/login/github" external />
        <p class="text-center text-sm py-1 text-gray-400">OR</p>
        <input v-model="username" name="username" placeholder="Username" icon="i-heroicons-user" />
        <input v-model="password" type="password" name="password" placeholder="Password" icon="i-heroicons-lock-closed" />
      </div>
      <div>
        <div class="flex gap-3 justify-end">
          <button label="Sign up" variant="outline" @click="handleRegister" />
          <button label="Login" @click="handlePasswordLogin" />
        </div>
      </div>
    </div>
  </div>

</template>