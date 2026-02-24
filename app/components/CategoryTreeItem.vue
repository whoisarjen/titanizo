<template>
  <div>
    <div class="flex items-center gap-0.5">
      <button
        v-if="hasChildren"
        type="button"
        class="w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 shrink-0"
        :aria-label="isExpanded ? 'Zwi' : 'Rozwi'"
        @click.prevent="isExpanded = !isExpanded"
      >
        <svg
          class="w-2.5 h-2.5 transition-transform duration-150"
          :class="{ 'rotate-90': isExpanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <span v-else class="w-4 shrink-0" />

      <NuxtLink
        :to="categoryPath"
        :class="[
          'flex-grow py-1 px-1.5 truncate text-[13px]',
          isActive
            ? 'text-neutral-900 dark:text-neutral-100 font-medium'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
        ]"
      >
        {{ category.name }}
      </NuxtLink>
    </div>

    <div v-if="hasChildren && shouldShowChildren" class="ml-4">
      <CategoryTreeItem
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :depth="depth + 1"
        :parent-path="categoryPath"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface CategoryTree {
  id: string
  name: string
  slug: string
  childrenCount: number
  children?: CategoryTree[]
}

const props = defineProps<{
  category: CategoryTree
  depth: number
  parentPath?: string
}>()

const route = useRoute()

const categoryPath = computed(() => {
  if (props.parentPath) {
    return `${props.parentPath}/${props.category.slug}`
  }
  return `/blog/${props.category.slug}`
})

const isActive = computed(() => {
  const currentPath = route.path
  return currentPath === categoryPath.value || currentPath.startsWith(categoryPath.value + '/')
})

const hasChildren = computed(() => {
  return props.category.children && props.category.children.length > 0
})

const isExpanded = ref(isActive.value)

watch(() => route.path, () => {
  if (isActive.value && !isExpanded.value) {
    isExpanded.value = true
  }
})

const shouldShowChildren = computed(() => isExpanded.value)
</script>
