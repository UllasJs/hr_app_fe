// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  imports: {
    dirs: ["store"],
  },
  css: [
    `~/assets/css/main.css`,
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_DOMAIN: process.env.API_DOMAIN,
    },
  },
});