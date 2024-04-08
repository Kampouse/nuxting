<script setup lang="ts">
const username = ref("");
const password = ref("");

async function handlePasswordLogin(e: Event) {
  e.preventDefault();
  if (!username.value || !password.value) return;

  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  console.log(formData);
  try {
    const outpout = await $fetch("/api/login/password/signin", {
      method: "POST",
      body: formData,
    });
    if (outpout) {
      navigateTo("/profile");
    }
  } catch (error: any) {
    //toast.add({ title: error.response._data.message })
  }
}

async function handleRegister(e: Event) {
  e.preventDefault();
  navigateTo("/register");
}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-80">
      <div class="space-y-4 justify-center">

        <form class="flex h-80 flex-col justify-center items-center gap-2 border border-gray-400 rounded-md">
          <input v-model="username" class="w-40 border rounded-md border-gray-400" name="username"
            placeholder="Username" icon="i-heroicons-user" />
          <input v-model="password" class="w-40 border rounded-md border-gray-400" type="password" name="password"
            placeholder="Password" icon="i-heroicons-lock-closed" />

          <div clas=" flex  flex-end justify-end w-screen"></div>
          <button type="submit" class="bg-black rounded-md text-white w-40" @click="handlePasswordLogin">
            login
          </button>
          <button class="bg-lime-300 w-40 rounded-md" @click="handleRegister">
            sign up
          </button>
        </form>
        <div class="gap-3">
          <p class="text-center text-sm py-1 text-gray-400">OR</p>
          <div class="flex flex-col gap-3 justify-center">
            <hr>
          </div>
          <div class="flex justify-center items-center gap-2  pt-3">
            <NuxtLink class=" bg-black rounded-md p-2 text-white w-40 text-center" to="/api/login/github"
              icon="i-heroicons-oauth" :external="true">
              Login with github

            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
::placeholder {
  text-align: center;
}
</style>
