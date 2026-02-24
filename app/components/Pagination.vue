<template>
  <nav v-if="totalPages > 1" aria-label="Nawigacja stron" class="flex items-center justify-center gap-1 mt-8">
    <NuxtLink
      :to="getPageUrl(page - 1)"
      :class="[
        'px-3 py-2 text-sm rounded-md transition-colors',
        page <= 1
          ? 'pointer-events-none text-gray-300 dark:text-gray-600'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      ]"
      :aria-disabled="page <= 1"
    >
      &larr;
    </NuxtLink>

    <template v-for="p in visiblePages" :key="p">
      <span v-if="p === '...'" class="px-2 py-2 text-sm text-gray-400 dark:text-gray-500">
        &hellip;
      </span>
      <NuxtLink
        v-else
        :to="getPageUrl(p as number)"
        :class="[
          'px-3 py-2 text-sm rounded-md transition-colors min-w-[2.25rem] text-center',
          p === page
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
        ]"
        :aria-current="p === page ? 'page' : undefined"
      >
        {{ p }}
      </NuxtLink>
    </template>

    <NuxtLink
      :to="getPageUrl(page + 1)"
      :class="[
        'px-3 py-2 text-sm rounded-md transition-colors',
        page >= totalPages
          ? 'pointer-events-none text-gray-300 dark:text-gray-600'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      ]"
      :aria-disabled="page >= totalPages"
    >
      &rarr;
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
  baseUrl?: string
}>()

const route = useRoute()

const getPageUrl = (p: number) => {
  const base = props.baseUrl ?? route.path
  return p <= 1 ? base : `${base}?page=${p}`
}

const visiblePages = computed(() => {
  const { page, totalPages } = props
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = [1]

  if (page > 3) pages.push('...')

  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (page < totalPages - 2) pages.push('...')

  pages.push(totalPages)
  return pages
})
</script>
