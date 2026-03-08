// https://nuxt.com/docs/api/configuration/nuxt-config
const ARTICLE_CHUNKS = 3   // CHUNK_SIZE 1000 → handles up to 3000 articles
const CATEGORY_CHUNKS = 2  // CHUNK_SIZE 500  → handles up to 1000 categories

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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
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

  sitemap: {
    sitemaps: {
      pages: { includeAppSources: true },
      ...Object.fromEntries(
        Array.from({ length: ARTICLE_CHUNKS }, (_, i) => [
          `articles-${i}`,
          { sources: [`/api/__sitemap__/articles?chunk=${i}`], includeAppSources: false },
        ]),
      ),
      ...Object.fromEntries(
        Array.from({ length: CATEGORY_CHUNKS }, (_, i) => [
          `categories-${i}`,
          { sources: [`/api/__sitemap__/categories?chunk=${i}`], includeAppSources: false },
        ]),
      ),
    },
    cacheMaxAgeSeconds: 3600,
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
    routeRules: {
      '/__sitemap__/**': { isr: 604800 }, // 7 days ISR
    },
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
