<template>
  <NuxtLink
    :to="`/blog/${category.slug}`"
    class="block py-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
  >
    <span class="text-sm font-medium">{{ category.name }}</span>
    <span v-if="category.childrenCount" class="text-xs text-neutral-400 dark:text-neutral-500 ml-1">
      {{ category.childrenCount }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Category {
  id: string
  name: string
  slug: string
  childrenCount: number
}

defineProps<{
  category: Category
}>()
</script>
