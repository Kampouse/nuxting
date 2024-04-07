
export default defineNuxtRouteMiddleware((to, from) => {
   const data = useFetch("/api/user/user")
   if (data && !data.data) {
      if (to.path !== '/login') {
         return navigateTo('/login')
      }


   }



});

