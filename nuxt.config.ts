// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "~/modules/socket.js",
        '@vueuse/nuxt',
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        // Private keys are only available on the server
        apiSecret: "123",
        // Public keys that are exposed to the client
        public: {
          wssUrl: process.env.WSS || "",
          apiBase: "", // can be overridden by NUXT_PUBLIC_API_BASE environment variable
        },
      },
      css: ["~/assets/css/main.css"],
      postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
})
