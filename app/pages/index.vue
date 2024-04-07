<script lang="ts" setup>
  const user = useUser();


console.log( "hello",user.value);
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