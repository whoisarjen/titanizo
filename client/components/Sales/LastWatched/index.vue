<template>
    <section class="container mx-auto mb-16">
        <h2 class="heading text-center">Ostatnio przeglądane</h2>
        <div class="grid grid-cols-4 mt-4 gap-20 overflow-auto max-w-screen">
            <ProductCard v-for="product in products?.data" :key="product.id" :product="product" />
        </div>
    </section>
</template>


<script setup lang="ts">
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
    'pagination[page]': '1',
    'pagination[pageSize]': '2',
    'sort': 'name:desc'
})


</script>