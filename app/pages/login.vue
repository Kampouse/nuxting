<script setup lang="ts">
const username = ref("")
const password = ref("")

async function handlePasswordLogin() {
  if (!username.value || !password.value) return

  const formData = new FormData()
  formData.append("username", username.value)
  formData.append("password", password.value)
    console.log(formData)
  try {
    await $fetch("/api/login/password/signin", {
      method: "POST",
      body: formData,
    })
  } catch (error: any) {
    //toast.add({ title: error.response._data.message })
  }

 // navigateTo("/")
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
    //toast.add({ title: error.response._data.message })
  }

  //toast.add({ title: "User created!" })

  navigateTo("/")
}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-80">
      <div class="space-y-4  justify-center ">
        <div class="flex  justify-center items-center  ">
        <button  icon="i-heroicons-oauth" to="/api/login/github">
            Login with GitHub 
        </button>



        </div>
        <p class="text-center text-sm py-1 text-gray-400">OR</p>
        <hr>
         <form class=" flex   h-80 flex-col justify-center items-center gap-2   border border-gray-400 rounded-md  ">
        <input  v-model="username" class=" w-40  border rounded-md border-gray-400 " name="username" placeholder="Username" icon="i-heroicons-user" />
        <input v-model="password" class="w-40   border rounded-md border-gray-400 " type="password" name="password" placeholder="Password" icon="i-heroicons-lock-closed" />
 
        <div clas=" flex  flex-end justify-end w-screen">

        </div>
          <button  type="submit" class=" bg-black rounded-md text-white  w-40 " @click="handlePasswordLogin">
            login
        </button>
        <button  class=" bg-lime-300 w-40 rounded-md" @click="handleRegister">
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