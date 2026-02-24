<template>
  <nav v-if="totalPages > 1" aria-label="Nawigacja stron" class="flex items-center justify-center gap-0.5 mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
    <NuxtLink
      :to="getPageUrl(page - 1)"
      :class="[
        'px-2.5 py-1.5 text-sm',
        page <= 1
          ? 'pointer-events-none text-neutral-300 dark:text-neutral-700'
          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
      ]"
      :aria-disabled="page <= 1"
    >
      &larr;
    </NuxtLink>

    <template v-for="p in visiblePages" :key="p">
      <span v-if="p === '...'" class="px-1.5 py-1.5 text-sm text-neutral-300 dark:text-neutral-600">
        &hellip;
      </span>
      <NuxtLink
        v-else
        :to="getPageUrl(p as number)"
        :class="[
          'px-2.5 py-1.5 text-sm min-w-[2rem] text-center',
          p === page
            ? 'text-neutral-900 dark:text-neutral-100 font-medium'
            : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100',
        ]"
        :aria-current="p === page ? 'page' : undefined"
      >
        {{ p }}
      </NuxtLink>
    </template>

    <NuxtLink
      :to="getPageUrl(page + 1)"
      :class="[
        'px-2.5 py-1.5 text-sm',
        page >= totalPages
          ? 'pointer-events-none text-neutral-300 dark:text-neutral-700'
          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
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
