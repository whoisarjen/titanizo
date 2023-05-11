<template>
  Kategoria: {{ category?.data.attributes.name }}
  <div v-for="product in products" :key="product.id">
    Produkt: {{ product.attributes.name }}
  </div>
</template>

<script setup lang="ts">
const { params, } = useRoute()
const categorySlug = params.categorySlug as string
const categoryId = categorySlug.substring(0, categorySlug.indexOf('--'))

if (!categoryId) {
    throw createError({ statusCode: 404, message: 'Nieprawidłowy URL produktu!', })
}

type GetCategory = {
    data: Category
    meta: Meta
}

type GetProducts = {
    data: Product[]
    meta: Meta
}

const [categoryResponse, productsResponse] = await Promise.all([
    useGetApi<GetCategory>(`/categories/${categoryId}`, {
        'populate[0]': 'images',
        'populate[1]': 'manufacturer',
        'populate[2]': 'categories',
        'populate[3]': 'recommended_products.images',
        'populate[4]': 'recommended_products.manufacturer',
    }),
    useGetApi<GetProducts>('/products', {
        'populate[0]': 'images',
        'populate[1]': 'manufacturer',
        'populate[2]': 'categories',
        'populate[3]': 'recommended_products.images',
        'populate[4]': 'recommended_products.manufacturer',
        'filters[categories][id]': categoryId,
    }),
])

if (!categoryResponse.data.value) {
    throw createError({ statusCode: 404, })
}

const category = categoryResponse.data.value
const products = productsResponse.data.value?.data

</script>
