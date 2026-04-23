// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
   runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "https://www.themealdb.com/api/json/v1/1/"
    }
  },
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/fonts", "@pinia/nuxt"],
  tailwindcss: {
    // Options
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  nitro: {
    preset: 'vercel'
  }
});