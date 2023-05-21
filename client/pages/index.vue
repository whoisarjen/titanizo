<template>
  <div className="flex flex-col gap-8">
    <SliderHomePage />
    <SalesSelectedForYou />
    <SalesPopularCategories />

    <section class="container mx-auto h-[600px] bg-orange-600 flex justify-center items-center text-3xl text-white">
      Inspiracje
    </section>

    <BlogLatestPosts />
    <SalesLastWatched />
  </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Najlepszy sklep internetowy',
})
</script>
