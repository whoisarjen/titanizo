<template>
  <article>
    <NuxtLink :to="articlePath" class="group block">
      <h2 class="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 leading-snug mb-1 group-hover:underline underline-offset-2 decoration-neutral-300 dark:decoration-neutral-600">
        {{ article.title || article.keyword }}
      </h2>

      <p v-if="article.description" class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-1.5">
        {{ article.description }}
      </p>

      <div class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
        <span v-if="article.category">{{ article.category.name }}</span>
        <span v-if="article.category && article.publishedAt" aria-hidden="true">&middot;</span>
        <time v-if="article.publishedAt" :datetime="article.publishedAt">
          {{ formatDate(article.publishedAt) }}
        </time>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Article } from '~/types/blog'

const props = defineProps<{
  article: Article
}>()

const articlePath = computed(() => {
  if (props.article.path) {
    return props.article.path
  }
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
