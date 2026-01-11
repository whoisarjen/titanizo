<template>
  <article class="group">
    <NuxtLink :to="`/blog/${post.slug}`" class="block">
      <div class="flex items-start gap-4">
        <!-- Image -->
        <figure class="w-20 sm:w-24 flex-shrink-0">
          <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <NuxtImg
              :src="post.image"
              :alt="post.imageAlt"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              format="webp"
              quality="80"
              sizes="96px"
              width="96"
              height="96"
            />
          </div>
        </figure>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h2 class="text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors mb-1 line-clamp-2">
            {{ post.title }}
          </h2>

          <p class="text-sm text-gray-600 line-clamp-2 mb-2">
            {{ post.description }}
          </p>

          <div class="text-xs text-gray-500">
            <time :datetime="post.publishedAt">
              {{ formatDate(post.publishedAt) }}
            </time>
            <span class="mx-1">&middot;</span>
            <span>{{ post.readingTime }} min</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

defineProps<{
  post: BlogPost
}>()

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>
