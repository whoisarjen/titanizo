<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  useHead({
    titleTemplate: title => title ? `${title} - Titanizo.pl - Dom i Ogród` : 'Sklep internetowy Titanizo.pl - Dom i ogród',
    bodyAttrs: {
      class: 'bg-neutral-50',
    },
  })

</script>
