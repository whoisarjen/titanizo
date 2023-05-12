<template>
  <section class="container mx-auto mb-4">
    <h2 class="heading">
      Ostatnio przeglądane
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

type GetProducts = {
    data: Product[]
    meta: Meta
}

const { data: products, } = await useGetApi<GetProducts>('/products', {
    'populate[0]': 'images',
    'populate[1]': 'manufacturer',
    'populate[2]': 'subcategories.category',
    'populate[3]': 'recommended_products.images',
    'populate[4]': 'recommended_products.subcategories.category',
    'pagination[page]': '1',
    'filters[quantity][$not]': '0',
    'pagination[pageSize]': `${props.gridSize}`,
    sort: 'name:desc',
})

</script>
