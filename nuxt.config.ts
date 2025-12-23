// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/color-mode'],
  i18n: {
    langDir: "locales/",
    defaultLocale: 'ar',
    locales: [
      { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'en', name: 'English', file: 'en.json', dir: 'ltr' },
    ],
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['./app/assets/css/main.css'],
})