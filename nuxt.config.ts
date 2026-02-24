// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-11',
  devtools: { enabled: false },

  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'pl',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  site: {
    url: 'https://titanizo.whoisarjen.com',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    cacheMaxAgeSeconds: 3600,
  },

  image: {
    quality: 75,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    defaults: {
      nuxtLink: {
        prefetch: false,
      },
    },
  },
})
