<template>
  <article v-if="post" class="py-8">
    <div class="max-w-2xl mx-auto px-4">
      <!-- Article Header -->
      <header class="mb-6">
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <time :datetime="post.publishedAt">
            {{ formatDate(post.publishedAt) }}
          </time>
          <span aria-hidden="true">&middot;</span>
          <span>{{ post.readingTime }} min czytania</span>
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          {{ post.title }}
        </h1>

        <p class="text-gray-600">
          {{ post.description }}
        </p>
      </header>

      <!-- Featured Image -->
      <figure class="mb-6 -mx-4 sm:mx-0">
        <div class="aspect-[16/9] overflow-hidden sm:rounded-lg bg-gray-100">
          <NuxtImg
            :src="post.image"
            :alt="post.imageAlt"
            class="w-full h-full object-cover"
            format="webp"
            quality="85"
            sizes="(max-width: 672px) 100vw, 672px"
            width="672"
            height="378"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </figure>

      <!-- Article Content with Prose -->
      <div class="prose prose-gray max-w-none" v-html="post.content" />

      <!-- Tags -->
      <footer class="mt-8 pt-6 border-t border-gray-100">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </footer>

      <!-- Related Posts -->
      <section
        v-if="relatedPosts.length > 0"
        class="mt-8 pt-8 border-t border-gray-100"
        aria-labelledby="related-heading"
      >
        <h2
          id="related-heading"
          class="text-lg font-semibold text-gray-900 mb-4"
        >
          Powiazane artykuly
        </h2>
        <div class="divide-y divide-gray-100">
          <div v-for="relatedPost in relatedPosts" :key="relatedPost.slug" class="py-4 first:pt-0">
            <BlogCard :post="relatedPost" />
          </div>
        </div>
      </section>
    </div>
  </article>

  <!-- 404 -->
  <div v-else class="py-16 text-center">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-xl font-semibold text-gray-900 mb-2">
        Artykul nie znaleziony
      </h1>
      <p class="text-gray-600 mb-6">
        Artykul, ktorego szukasz, nie istnieje.
      </p>
      <NuxtLink
        to="/"
        class="text-sm font-medium text-gray-900 hover:text-gray-600 underline underline-offset-4"
      >
        Wróc do strony glownej
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { getPostBySlug, getRelatedPosts } = useBlogPosts()
const post = getPostBySlug(slug)
const relatedPosts = post ? getRelatedPosts(slug, 2) : []

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Artykul nie znaleziony',
  })
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// SEO
useSeoMeta({
  title: `${post.title} | Titanizo`,
  description: post.description,
  ogTitle: post.title,
  ogDescription: post.description,
  ogType: 'article',
  ogUrl: `https://yourdomain.com/blog/${post.slug}`,
  ogImage: post.image,
  ogArticlePublishedTime: post.publishedAt,
  ogArticleModifiedTime: post.updatedAt,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `https://yourdomain.com/blog/${post.slug}` }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.image,
        publisher: {
          '@type': 'Organization',
          name: 'Titanizo',
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: 'pl-PL',
      }),
    },
  ],
})
</script>
