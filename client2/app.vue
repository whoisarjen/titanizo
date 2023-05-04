<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
  useHead({
    titleTemplate: (title) => title ? `${title} - Titanizo Polska` : `Titanizo Polska`,
  })
</script>
