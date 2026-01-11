<template>
  <div>
    <!-- Articles List -->
    <section class="py-8" aria-labelledby="articles-heading">
      <div class="max-w-2xl mx-auto px-4">
        <h1 id="articles-heading" class="sr-only">Artykuly</h1>

        <div class="divide-y divide-gray-100">
          <div v-for="post in posts" :key="post.slug" class="py-6 first:pt-0">
            <BlogCard :post="post" />
          </div>
        </div>

        <div v-if="posts.length === 0" class="text-center py-12 text-gray-500">
          Brak artykulow do wyswietlenia.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { getAllPosts } = useBlogPosts()
const posts = getAllPosts()

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
