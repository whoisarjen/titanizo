<template>
    <section class="container mx-auto mb-16">
        <h2 class="heading">Wybrane dla Ciebie</h2>
        <div class="grid mt-4 gap-20 overflow-auto max-w-screen" :class="`grid-cols-${gridSize}`">
            <ProductCard v-for="product in products?.data" :key="product.id" :product="product" />
        </div>
    </section>
</template>


<script setup lang="ts">
const { gridSize } = withDefaults(defineProps<{
    gridSize?: number,
}>(), {
    gridSize: 5
})

type GetProduct = {
    data: Product[]
    meta: Meta
}

const { data: products } = await useGetApi<GetProduct>(`/products`, {
    'populate[0]': 'images',
    'populate[1]': 'manufacturer',
    'populate[2]': 'subcategories.category',
    'populate[3]': 'recommended_products.images',
    'populate[4]': 'recommended_products.subcategories.category',
    'sort': 'gross_price:desc',
    'filters[quantity][$not]': '0',
    'pagination[page]': '1',
    'pagination[pageSize]': `${gridSize}`,
})


</script>