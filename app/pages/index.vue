<template>
  <div class="p-6 lg:p-8">
    <!-- Recent Articles List -->
    <section aria-labelledby="articles-heading">
      <h1 id="articles-heading" class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Najnowsze artykuly
      </h1>

      <div class="divide-y divide-gray-100 dark:divide-gray-800">
        <div v-for="article in articles || []" :key="article.slug" class="py-5 first:pt-0">
          <BlogCard :article="article" />
        </div>
      </div>

      <div v-if="!articles || articles.length === 0" class="text-center py-12 text-gray-500 dark:text-gray-400">
        Brak artykulow do wyswietlenia.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/blog'

const { data: articles } = await useFetch<Article[]>('/api/articles')

// SEO Meta
useSeoMeta({
  title: 'Titanizo - Blog',
  description:
    'Artykuly o nowoczesnym tworzeniu stron, designie i najlepszych praktykach programistycznych.',
  ogTitle: 'Titanizo - Blog',
  ogDescription:
    'Artykuly o nowoczesnym tworzeniu stron, designie i najlepszych praktykach programistycznych.',
  ogType: 'website',
  ogUrl: 'https://yourdomain.com',
  twitterCard: 'summary_large_image',
})

// JSON-LD
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Titanizo',
        description: 'Blog o nowoczesnym tworzeniu stron internetowych',
        url: 'https://yourdomain.com',
        inLanguage: 'pl-PL',
      }),
    },
  ],
})
</script>
