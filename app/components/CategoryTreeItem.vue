<template>
  <div>
    <div class="flex items-center gap-1">
      <!-- Toggle button -->
      <button
        v-if="hasChildren"
        type="button"
        class="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
        :aria-label="isExpanded ? 'Zwi' : 'Rozwi'"
        @click.prevent="isExpanded = !isExpanded"
      >
        <svg
          class="w-3 h-3 transition-transform duration-200"
          :class="{ 'rotate-90': isExpanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <span v-else class="w-5 shrink-0" />

      <NuxtLink
        :to="categoryPath"
        :class="[
          'flex-grow py-1 px-2 rounded transition-colors truncate',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          isActive ? 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-800' : 'text-gray-600 dark:text-gray-400',
          depthClasses
        ]"
      >
        {{ category.name }}
        <span v-if="category.childrenCount" class="text-gray-400 dark:text-gray-500 text-xs ml-1">
          ({{ category.childrenCount }})
        </span>
      </NuxtLink>
    </div>

    <!-- Children -->
    <div
      v-if="hasChildren && shouldShowChildren"
      class="ml-5 mt-0.5"
    >
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

// Build the category path based on parent
const categoryPath = computed(() => {
  if (props.parentPath) {
    return `${props.parentPath}/${props.category.slug}`
  }
  return `/blog/${props.category.slug}`
})

// Check if current route matches this category or is within it
const isActive = computed(() => {
  const currentPath = route.path
  return currentPath === categoryPath.value || currentPath.startsWith(categoryPath.value + '/')
})

// Check if has children
const hasChildren = computed(() => {
  return props.category.children && props.category.children.length > 0
})

// Auto-expand if current route is within this category path
const isExpanded = ref(isActive.value)

// Watch for route changes to auto-expand
watch(() => route.path, () => {
  if (isActive.value && !isExpanded.value) {
    isExpanded.value = true
  }
})

// Show children when expanded
const shouldShowChildren = computed(() => isExpanded.value)

// Size classes based on depth - deeper = smaller
const depthClasses = computed(() => {
  switch (props.depth) {
    case 0:
      return 'text-sm px-2'
    case 1:
      return 'text-xs px-2'
    case 2:
      return 'text-xs px-2 opacity-90'
    default:
      return 'text-xs px-2 opacity-80'
  }
})
</script>
