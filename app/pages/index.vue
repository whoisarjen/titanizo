<template>
  <div>
    <section aria-labelledby="articles-heading">
      <h1 id="articles-heading" class="text-[13px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-6">
        Najnowsze artykuly
      </h1>

      <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
        <div v-for="article in result?.articles || []" :key="article.slug" class="py-4 first:pt-0">
          <BlogCard :article="article" />
        </div>
      </div>

      <div v-if="!result?.articles?.length" class="py-16 text-sm text-neutral-400 dark:text-neutral-500">
        Brak artykulow do wyswietlenia.
      </div>

      <Pagination
        v-if="result"
        :page="result.page"
        :total-pages="result.totalPages"
        base-url="/"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/blog'

interface PaginatedArticles {
  articles: Article[]
  total: number
  page: number
  totalPages: number
}

const route = useRoute()
const page = computed(() => Number(route.query.page) || 1)

const { data: result } = await useFetch<PaginatedArticles>('/api/articles', {
  query: { page },
  watch: [page],
})

useSeoMeta({
  title: 'Titanizo - Blog',
  description:
    'Artykuly o nowoczesnym tworzeniu stron, designie i najlepszych praktykach programistycznych.',
  ogTitle: 'Titanizo - Blog',
  ogDescription:
    'Artykuly o nowoczesnym tworzeniu stron, designie i najlepszych praktykach programistycznych.',
  ogType: 'website',
  ogUrl: 'https://titanizo.whoisarjen.com',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Titanizo',
        description: 'Blog o nowoczesnym tworzeniu stron internetowych',
        url: 'https://titanizo.whoisarjen.com',
        inLanguage: 'pl-PL',
      }),
    },
  ],
})
</script>
