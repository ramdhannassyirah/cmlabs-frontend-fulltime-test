// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "@pinia/nuxt"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      apiBase:
        process.env.API_BASE_URL || "https://www.themealdb.com/api/json/v1/1/",
    },
  },
});