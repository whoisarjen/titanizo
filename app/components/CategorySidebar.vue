<template>
  <aside>
    <nav class="lg:sticky lg:top-16 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
      <h2 class="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
        Kategorie
      </h2>

      <div v-if="categories && categories.length" class="space-y-px">
        <CategoryTreeItem
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :depth="0"
        />
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
