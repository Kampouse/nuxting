<script lang="ts" setup>
import { useUser } from '~/composables/auth';
  const user = useUser();
const data =  useFetch("/api/user/user")
async function logout(e:Event) {
  e.preventDefault();

	 $fetch("/api/user/logout", {
		method: "POST"
	}).then(async(res) => {
     
    
  }).catch((error) => {
    console.log(error);
  });
      navigateTo("/login");
}
</script>
<template>
  <h1> {{ data.data }}</h1>

<button @click="logout">logout</button>

</template>