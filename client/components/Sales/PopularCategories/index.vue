<template>
  <section class="container mx-auto mb-4">
    <h2 class="heading">
      Popularne kategorie
    </h2>
    <nuxt-link class="grid grid-cols-5 mt-4 gap-10 max-w-screen overflow-auto" to="/#">
      <div v-for="category in categories?.data" :key="category.id" class="group cursor-pointer">
        <div class="h-[300px]  relative overflow-hidden">
          <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${category.attributes.image?.data?.attributes.formats.small.url}`" class="object-cover w-full h-full group-hover:scale-125 transition-transform duration-700" />
        </div>
        <h6 class="text-xl bottom-0 uppercase font-medium mt-2 tracking-tighter">
          {{ category.attributes.name }}
        </h6>
      </div>
    </nuxt-link>
  </section>
</template>

<script setup lang="ts">
type GetPosts = {
    data: Category[]
    meta: Meta
}

const { data: categories, } = await useGetApi<GetPosts>('/categories', {
    'populate[0]': 'image',
    'filters[isPopular][$eq]': 'true',
    'pagination[page]': '1',
    'pagination[pageSize]': '5',
})
</script>
