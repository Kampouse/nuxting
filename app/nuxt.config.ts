// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'
export default defineNuxtConfig({

  runtimeConfig: {
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
            page.meta ||= {}
            // Adding 'protected' middleware to the page  user is not authenticated 
            // and trying to access the page will be redirected to the login page
            page.meta.middleware = ['protected', ...(page.meta.middleware || [])];
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }
  },
  modules: ['@nuxtjs/tailwindcss', "nitro-cloudflare-dev"],
})
