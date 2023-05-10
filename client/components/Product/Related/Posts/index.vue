<template>
    <section class="container mx-auto mb-16" v-if="posts?.data.length">
        <h2 class="heading text-center">Powiązane posty</h2>
        <div class="grid mt-4 gap-20 overflow-auto max-w-screen" :class="`grid-cols-${gridSize}`">
            <div v-for="post in posts?.data">
                {{ post.attributes.title }}
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
const { gridSize, product } = withDefaults(defineProps<{
    gridSize?: number,
    product: Product,
}>(), {
    gridSize: 5,
})

type GetPosts = {
    data: Post[]
    meta: Meta
}

const filters = product.attributes.subcategories.data.reduce((prev, curr) => ({
    ...prev,
    'filters[subcategories][id][$eq]': `${curr.id}`,
}), {})

const { data: posts } = await useGetApi<GetPosts>(`/posts`, {
    'populate[0]': 'image',
    'pagination[page]': '1',
    'pagination[pageSize]': `${gridSize}`,
    ...filters,
})

</script>