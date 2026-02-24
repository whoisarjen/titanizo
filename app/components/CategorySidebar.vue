<template>
  <aside>
    <nav class="lg:sticky lg:top-20 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <h2 class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        Kategorie
      </h2>

      <div v-if="categories && categories.length" class="space-y-0.5">
        <CategoryTreeItem
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :depth="0"
        />
      </div>

      <div v-else class="text-sm text-gray-500 dark:text-gray-400">
        Ladowanie...
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
interface CategoryTree {
  id: string
  name: string
  slug: string
  childrenCount: number
  children: CategoryTree[]
}

const { data: categories } = await useFetch<CategoryTree[]>('/api/categories')
</script>
