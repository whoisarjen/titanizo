<template>
  <NuxtLink
    :to="`/blog/${category.slug}`"
    class="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
  >
    <h3 class="font-medium text-gray-900 dark:text-white mb-1">
      {{ category.name }}
    </h3>
    <p v-if="category.childrenCount" class="text-sm text-gray-500 dark:text-gray-400">
      {{ category.childrenCount }} {{ childrenLabel }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Category {
  id: string
  name: string
  slug: string
  childrenCount: number
}

const props = defineProps<{
  category: Category
}>()

const childrenLabel = computed(() => {
  const count = props.category.childrenCount
  if (count === 1) return 'podkategoria'
  if (count >= 2 && count <= 4) return 'podkategorie'
  return 'podkategorii'
})
</script>
