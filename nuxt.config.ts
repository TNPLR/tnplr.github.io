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
      script: [
        { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-CF4PHZ3M6F' },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CF4PHZ3M6F');`
        }
      ],
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
