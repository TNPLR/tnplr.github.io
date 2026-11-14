// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2024-04-03',
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/cmbc', '/relay']
    }
  },
  devtools: { enabled: false },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    "/": {
      redirect: "/cmbc"
    }
  },
})
