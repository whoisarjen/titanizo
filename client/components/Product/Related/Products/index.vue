<template>
  <section v-if="product?.attributes.recommended_products.data.length" class="container mx-auto mb-16">
    <h2 class="heading">
      Pasuje do
    </h2>
    <div class="grid mt-4 gap-20 overflow-auto max-w-screen grid-cols-4" :class="`grid-cols-${gridSize}`">
      <ProductCard v-for="option in product.attributes.recommended_products.data.slice(0, gridSize)" :key="option.id" :product="option" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { gridSize, product, } = withDefaults(defineProps<{
    gridSize?: number,
    product?: Product,
}>(), {
    gridSize: 4,
})

</script>
