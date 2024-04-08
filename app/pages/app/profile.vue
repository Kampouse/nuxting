<script lang="ts" setup>
 const user = useUser();


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
  <main> 
    <h1> only  {{  user?.username ?? "should not be seeable" }}  </h1>
     <button @click="logout">logout</button>
  </main>
</template>


