export default defineNuxtConfig({
  modules: ["../src/module", "@nuxt/devtools"],
  devtools: { enabled: true },
  pb: {
    pb_url: process.env.PB_URL,
  },
});
