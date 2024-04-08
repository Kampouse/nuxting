<script setup lang="ts">
const username = ref("")
const password = ref("")
const re_password = ref("")
const isInvalid = computed(() => password.value !== re_password.value)
async function handleRegister(e: Event) {
    e.preventDefault()
  if (!username.value || !password.value) return
  const formData = new FormData()
  formData.append("username", username.value)
  formData.append("password", password.value)
    if (password.value !== re_password.value) {
        return
    }
  try {
       await $fetch("/api/login/password/signup", {
      method: "POST",
      body: formData,
    })
  } catch (error: any) {
      return error
  }
     await navigateTo("/app/profile")
}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-80">
      <div class="space-y-4  justify-center ">
        <div class="flex  justify-center items-center  ">
        </div>
         <form class=" flex   h-80 flex-col justify-center items-center gap-2   border border-gray-400 rounded-md  ">
        <input  v-model="username" class=" w-40  p-1 border rounded-md border-gray-400 " name="username" placeholder="username" icon="i-heroicons-user" />
        <input v-model="password" 
      :class="{'border-red-500': isInvalid}" 
       class="w-40 p-1 border rounded-md border-gray-400" 
        type="password" name="password" 
        placeholder="Password" 
        
        icon="i-heroicons-lock-closed" />
        <input v-model="re_password" class="w-40  p-1  border rounded-md border-gray-400 " type="password" name="password" placeholder="retype password" icon="i-heroicons-lock-closed" />
 
        <div clas=" flex  flex-end justify-end w-screen">
        </div>
        <button  type="submit" class=" bg-lime-300 w-40 rounded-md" @click="handleRegister">
        sign up 
        </button>
      </form>
      <div>
        <div class="flex flex-col  gap-3 justify-center">
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