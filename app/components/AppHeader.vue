<template>
  <header class="border-b border-neutral-200 dark:border-neutral-800">
    <nav class="max-w-6xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between" aria-label="Nawigacja glowna">
      <NuxtLink to="/" aria-label="Strona glowna">
        <svg class="w-7 h-7" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="4" class="fill-neutral-900 dark:fill-neutral-100" />
          <text x="16" y="23" font-family="system-ui,sans-serif" font-size="20" font-weight="700" text-anchor="middle" class="fill-white dark:fill-neutral-900">t</text>
        </svg>
      </NuxtLink>

      <button
        type="button"
        class="p-1.5 -mr-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        :aria-label="colorMode === 'dark' ? 'Wlacz jasny motyw' : 'Wlacz ciemny motyw'"
        @click="toggleTheme"
      >
        <svg v-if="colorMode === 'dark'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { colorMode, toggleTheme } = useTheme()
</script>
