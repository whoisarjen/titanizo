<template>
    <section class="w-full md:w-[70vw] mx-auto h-[600px] bg-slate-600 flex justify-center items-center text-3xl text-white">
        Bannerki
    </section>
    <SalesSelectedForYou />
    <SalesPopularCategories />

    <section class="container mx-auto h-[600px] bg-orange-600 flex justify-center items-center text-3xl text-white">
       Inspiracje
    </section>

    <BlogLatestPosts />
    <SalesLastWatched />
</template>

<script setup lang="ts">
useHead({
    title: "Najlepszy sklep internetowy"
})
</script>