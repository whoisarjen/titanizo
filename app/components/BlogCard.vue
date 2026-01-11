<template>
  <article class="group">
    <NuxtLink :to="articlePath" class="block">
      <div class="flex-1 min-w-0">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors mb-1 line-clamp-2">
          {{ article.title || article.keyword }}
        </h2>

        <p v-if="article.description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
          {{ article.description }}
        </p>

        <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
          <span v-if="article.category" class="text-gray-600 dark:text-gray-400">
            {{ article.category.name }}
          </span>
          <template v-if="article.publishedAt">
            <span v-if="article.category">&middot;</span>
            <time :datetime="article.publishedAt">
              {{ formatDate(article.publishedAt) }}
            </time>
          </template>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Article } from '~/types/blog'

const props = defineProps<{
  article: Article
}>()

// Use path if available, fallback to simple slug path
const articlePath = computed(() => {
  if (props.article.path) {
    return props.article.path
  }
  // Fallback for articles without path (e.g., from category listing)
  return `/blog/${props.article.category?.slug || ''}/${props.article.slug}`
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>
