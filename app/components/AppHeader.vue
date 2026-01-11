<template>
  <header class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
    <nav class="max-w-6xl mx-auto px-4 lg:px-8 py-4" aria-label="Nawigacja glowna">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Titanizo
        </NuxtLink>

        <button
          type="button"
          class="p-2 -mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          :aria-label="colorMode === 'dark' ? 'Wlacz jasny motyw' : 'Wlacz ciemny motyw'"
          @click="toggleTheme"
        >
          <!-- Sun icon (show in dark mode) -->
          <svg
            v-if="colorMode === 'dark'"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <!-- Moon icon (show in light mode) -->
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { colorMode, toggleTheme } = useTheme()
</script>
