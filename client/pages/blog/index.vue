<template>
  <div class="w-full container mx-auto grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <nuxt-link v-for="post in posts?.data" :key="post.id" class="flex flex-col gap-4" :to="`/blog/${post.id}--${slugify(post.attributes.title as string, { lower: true })}`">
      <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${post.attributes.image.data.attributes.formats.small.url}`" class="w-full h-full object-contain" />
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-medium uppercase tracking-tighter line-clamp-2">
          {{ post.attributes.title }}
        </h2>
        <p class="text-sm leading-relaxed line-clamp-6">
          {{ post.attributes.content }}
        </p>
        <span class="uppercase text-teal-600 text-sm font-bold">Czytaj <font-awesome-icon size="lg" class="ml-2" icon="fa-light fa-arrow-right" /></span>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import slugify from 'slugify'

type GetPost = {
    data: Post[]
    meta: Meta
}

const { data: posts, } = await useGetApi<GetPost>('/posts', {
    populate: '*',
})

</script>
