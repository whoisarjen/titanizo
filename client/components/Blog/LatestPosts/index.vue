<template>
  <section v-if="posts?.data.length === 3" class="container mx-auto mb-4">
    <h2 class="heading">
      Blog
    </h2>
    <div class="flex flex-col md:flex-row">
      <NuxtLink class="flex flex-col md:grid md:grid-cols-2 md:w-3/5" :to="`/blog/${posts.data[0].id}--${slugify(posts.data[0].attributes.title as string, { lower: true })}`">
        <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${posts.data[0].attributes.image.data.attributes.formats.medium.url}`" class="aspect-square object-cover" />
        <div class="flex flex-col p-5">
          <div class="flex justify-between items-center">
            <span class="px-5 py-1 rounded-full bg-teal-600 text-white font-medium text-xs uppercase tracking-tight">{{ posts.data[0].attributes.categories?.data[0].attributes.name }}</span>
            <small class="text-neutral-500 text-xs">6 maj 2023</small>
          </div>
          <h5 class="mt-5 text-2xl font-medium uppercase tracking-tighter line-clamp-2">
            {{ posts.data[0].attributes.title }}
          </h5>
          <p class="text-sm leading-relaxed mt-5 line-clamp-6">
            {{ posts?.data[0].attributes.content }}
          </p>

          <span class="uppercase text-teal-600 text-sm font-bold mt-5">Czytaj <font-awesome-icon size="lg" class="ml-2" icon="fa-light fa-arrow-right" /></span>
        </div>
      </NuxtLink>
      <div class="md:w-2/5 flex flex-col gap-8">
        <NuxtLink class="flex" :to="`/blog/${posts.data[1].id}--${slugify(posts.data[1].attributes.title as string, { lower: true })}`">
          <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${posts.data[1].attributes.image.data.attributes.formats.small.url}`" class="aspect-square w-1/3 object-cover" />
          <div class="flex flex-col p-3">
            <div>
              <span class="px-5 py-1 rounded-full bg-teal-600 text-white font-medium text-xs uppercase tracking-tight">{{ posts.data[1].attributes.categories?.data[0].attributes.name }}</span>
            </div>
            <h5 class="mt-5 text-2xl font-medium uppercase tracking-tighter line-clamp-3">
              {{ posts.data[1].attributes.title }}
            </h5>
          </div>
        </NuxtLink>
        <NuxtLink class="flex" :to="`/blog/${posts.data[2].id}--${slugify(posts.data[2].attributes.title as string, { lower: true })}`">
          <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${posts.data[2].attributes.image.data.attributes.formats.small.url}`" class="aspect-square w-1/3 object-cover" />
          <div class="flex flex-col p-3">
            <div>
              <span class="px-5 py-1 rounded-full bg-teal-600 text-white font-medium text-xs uppercase tracking-tight">{{ posts.data[2].attributes.categories?.data[0].attributes.name }}</span>
            </div>
            <h5 class="mt-5 text-2xl font-medium uppercase tracking-tighter line-clamp-3">
              {{ posts.data[2].attributes.title }}
            </h5>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import slugify from 'slugify'

type GetData = {
    data: Post[]
    meta: Meta
}

const { data: posts, } = await useGetApi<GetData>('/posts', {
  populate: '*',
  'pagination[page]': '1',
  'pagination[pageSize]': '3',
  'sort[0]': 'id:desc',
})

</script>
