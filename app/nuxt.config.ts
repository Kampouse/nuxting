// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'
export default defineNuxtConfig({

  runtimeConfig: {
    turso_key: process.env.TURSO_AUTH_TOKEN,
    turso_url: process.env.TURSO_CONNECTION_URL
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    },
  },
  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  hooks: {

    'pages:extend'(pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          // Checking if the page path starts with `/app`
          if (page.path.startsWith('/app')) {

            console.log("Page", page)
            page.meta ||= {}
            // Sets `auth` middleware, assuming 'auth' is the name of your authentication middleware
            // This will also include the previously set 'named' middleware if the condition is met
            page.meta.middleware = ['protected', ...(page.meta.middleware || [])];
          }
          // Additional condition to set 'named' middleware if needed
          // You can adjust this condition as per your requirements
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }




  },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', "nitro-cloudflare-dev"],
})
// config.SOME_PRIVATE_VAR
