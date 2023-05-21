<template>
  <div v-if="!!category.data.attributes.parent?.data" class="flex container mx-auto gap-4 p-4">
    <div class="flex bg-red-500 w-full max-w-xs">
      asdas
    </div>
    <div class="flex flex-col gap-4">
      <nuxt-link
        v-for="product in products"
        :key="product.id"
        :to="`/produkt/${product.id}--${slugify(product.attributes.name, { lower: true })}`"
        class="flex gap-4"
      >
        <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${product.attributes.images?.data?.[0].attributes.formats.small.url}`" class="max-w-xs aspect-square w-1/3 object-cover" />
        <div>
          <h1>{{ product.attributes.name }}</h1>
        </div>
      </nuxt-link>
    </div>
  </div>
  <div v-else>
    Tutaj gówniak sobie zrobi ładny grid dla main categories
  </div>
</template>

<script setup lang="ts">
import slugify from 'slugify'

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

const [categoryResponse, productsResponse,] = await Promise.all([
    useGetApi<GetCategory>(`/categories/${categoryId}`, {
        'populate[0]': 'images',
        'populate[1]': 'manufacturer',
        'populate[2]': 'parent',
        'populate[3]': 'categories',
        'populate[4]': 'recommended_products.images',
        'populate[5]': 'recommended_products.manufacturer',
    }),
    useGetApi<GetProducts>('/products', {
        'populate[0]': 'images',
        'populate[1]': 'manufacturer',
        'populate[2]': 'categories',
        'populate[3]': 'recommended_products.images',
        'populate[4]': 'recommended_products.manufacturer',
        'filters[categories][id]': categoryId,
        'pagination[page]': '1',
        'pagination[pageSize]': '18',
    }),
])

if (!categoryResponse.data.value) {
    throw createError({ statusCode: 404, })
}

const category = categoryResponse.data.value
const products = productsResponse.data.value?.data

</script>
