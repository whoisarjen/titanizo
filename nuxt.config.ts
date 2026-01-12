// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-11',
  devtools: { enabled: false },

  // Enable SSR/SSG for maximum performance
  ssr: true,

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: 'pl',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  // Sitemap configuration
  site: {
    url: 'https://titanizo.whoisarjen.com',
  },

  // Image optimization
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

  // Nitro configuration
  nitro: {
    compressPublicAssets: true,
  },

  // Experimental features for performance
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
