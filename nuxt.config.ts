// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/i18n",
      {
        legacy: false,
        locale: "en-us",
        defaultLocale: "en-us",
        fallbackLocale: "en-us",
        strategy: "prefix",
        detectBrowserLanguage: {
          fallbackLocale: "en-us",
        },
        lazy: true,
        langDir: "lang",
        locales: [
          {
            code: "en-us",
            name: "English",
            file: "en.json",
            countryCode: "us",
          },
          {
            code: "ar-ae",
            name: "Arabic",
            file: "ar.json",
            countryCode: "ae",
          },
        ],
      },
    ],
  ],
  imports: {
    dirs: ["store"],
  },
  app: {
    keepalive: true
  },
  css: [`~/assets/css/main.css`],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_DOMAIN: process.env.API_DOMAIN,
    },
  },
});
