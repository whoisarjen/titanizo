<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex-grow">
      <div class="max-w-6xl mx-auto px-4 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8 lg:py-12">
          <CategorySidebar class="order-2 lg:order-1 w-full lg:w-48 lg:shrink-0" />
          <main class="order-1 lg:order-2 flex-grow min-w-0">
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
