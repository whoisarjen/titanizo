<template>
  <section class="container mx-auto mb-4">
    <h2 class="heading">
      Wybrane dla Ciebie
    </h2>
    <div class="grid mt-4 gap-4 overflow-auto max-w-screen" :class="`grid-cols-${gridSize}`">
      <ProductCard v-for="product in products?.data" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    gridSize?: number,
}>(), {
    gridSize: 5,
})

type GetProduct = {
    data: Product[]
    meta: Meta
}

const { data: products, } = await useGetApi<GetProduct>('/products', {
    'populate[0]': 'images',
    'populate[1]': 'manufacturer',
    'populate[2]': 'categories',
    'populate[3]': 'recommended_products.images',
    sort: 'gross_price:desc',
    'filters[quantity][$not]': '0',
    'pagination[page]': '1',
    'pagination[pageSize]': `${props.gridSize}`,
})

</script>
