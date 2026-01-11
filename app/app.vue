<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Prevent flash of wrong theme by applying dark class immediately
useHead({
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}})()`,
      tagPosition: 'head',
    },
  ],
  htmlAttrs: {
    class: 'dark',
  },
})
</script>
