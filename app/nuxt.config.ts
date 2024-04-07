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






  },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', "nitro-cloudflare-dev"],
})
// config.SOME_PRIVATE_VAR
