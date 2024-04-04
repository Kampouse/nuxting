
export default defineNuxtRouteMiddleware((to, from) => {
   const { data } =  useFetch("/api/user/user")
if ( data && !data.value) {
    
  if (to.path !== '/login') {
   return navigateTo('/login')


}


}



});

