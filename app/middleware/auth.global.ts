import { useUser } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async () => {
   const user = useUser();
   const data = await useRequestFetch()("/api/user/user").catch(() => null);
   if (data) {
      user.value = data;
   }
});
