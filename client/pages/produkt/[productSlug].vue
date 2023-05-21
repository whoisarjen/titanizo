<template>
  <div>
    <article v-if="product" class="container mx-auto flex pt-5 gap-10">
      <section class="w-full lg:w-3/4">
        <section class="border flex p-2 bg-white">
          <div class="basis-2/5 aspect-square">
            <div v-if="product.data.attributes.images?.data?.length" class="aspect-square w-4/5 mx-auto">
              <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${ product.data.attributes.images?.data[0].attributes.formats.thumbnail.url}`" class="w-full h-full object-contain" />
            </div>
          </div>
          <div class="basis-3/5 pt-10">
            <h1 class="text-2xl uppercase tracking-tighter font-semibold  mb-1 group-hover:underline break-word">
              {{ product.data.attributes.manufacturer.data.attributes.name }} {{ product.data.attributes.collection }} {{ product.data.attributes.name }}
            </h1>
            <h2 class="tracking-tight">
              {{ product.data.attributes.name }}
            </h2>
            <h4 class="text-sm">
              <strong>Kod producenta:</strong> {{ product.data.attributes.manufacturer_id }}
            </h4>
            <p class="text-sm tracking-tight leading-snug mt-4 line-clamp-4">
              {{ product.data.attributes.description }}
            </p>
            <span class="text-sm tracking-tight underline font-bold">Czytaj więcej</span>
          </div>
        </section>
        <ProductRelatedProducts :product="product?.data" :grid-size="4" />
        <SalesSelectedForYou :grid-size="4" />
        <ProductRelatedPosts v-if="product" :product="product.data" />
      </section>
      <aside class="min-h-full w-1/4 hidden lg:block">
        <ProductStickyAside :product="product?.data" :show-details="y > 0" />
      </aside>
    </article>
    <SalesLastWatched />
  </div>
</template>

<script setup lang="ts">
const { params, } = useRoute()
const productSlug = params.productSlug as string
const productId = productSlug.substring(0, productSlug.indexOf('--'))

if (!productId) { throw createError({ statusCode: 404, message: 'Nieprawidłowy URL produktu!', }) }

type GetProduct = {
    data: Product
    meta: Meta
}

const { data: product, } = await useGetApi<GetProduct>(`/products/${productId}`, {
    'populate[0]': 'images',
    'populate[1]': 'manufacturer',
    'populate[2]': 'categories',
    'populate[3]': 'recommended_products.images',
    'populate[4]': 'recommended_products.manufacturer',
})

if (!product.value) { throw createError({ statusCode: 404, }) }

const { y, } = useWindowScroll()
</script>
