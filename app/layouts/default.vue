<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
    <AppHeader />
    <div class="flex-grow">
      <!-- Centered container -->
      <div class="max-w-6xl mx-auto px-4 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 py-6 lg:py-8">
          <!-- Sidebar - below content on mobile, left on desktop -->
          <CategorySidebar class="order-2 lg:order-1 w-full lg:w-56 lg:shrink-0" />
          <!-- Main content -->
          <main class="order-1 lg:order-2 flex-grow min-w-0 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <slot />
          </main>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>
