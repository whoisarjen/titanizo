<template>
  <section v-if="posts?.data.length" class="container mx-auto mb-16">
    <h2 class="heading text-center">
      Powiązane posty
    </h2>
    <div class="grid mt-4 gap-20 overflow-auto max-w-screen" :class="`grid-cols-${gridSize}`">
      <div v-for="post in posts?.data" :key="post.id">
        {{ post.attributes.title }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    gridSize?: number,
    product: Product,
}>(), {
    gridSize: 5,
})

type GetPosts = {
    data: Post[]
    meta: Meta
}

const filters = props.product.attributes.categories?.data.reduce((prev, curr) => ({
    ...prev,
    'filters[subcategories][id][$eq]': `${curr.id}`,
}), {}) || {}

const { data: posts, } = await useGetApi<GetPosts>('/posts', {
    'populate[0]': 'image',
    'pagination[page]': '1',
    'pagination[pageSize]': `${props.gridSize}`,
    ...filters,
})

</script>
