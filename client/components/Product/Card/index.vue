<template>
  <article v-if="props.product">
    <NuxtLink class="group flex flex-col h-full" :to="`/produkt/${props.product.id}--${slugify(props.product.attributes.name, { lower: true })}`">
      <nuxt-img v-if="props.product.attributes.images?.data?.length" loading="lazy" :src="`https://strapi.titanizo.pl${props.product.attributes.images?.data[0].attributes.formats.small.url}`" class="w-4/5 aspect-square object-contain mx-auto mix-blend-darken py-8" />
      <h5 class="text-xl uppercase tracking-tighter font-medium line-clamp-1 mb-1 group-hover:underline break-all">
        {{ props.product.attributes.manufacturer.data.attributes.name }} {{ props.product.attributes.collection }} {{ props.product.attributes.name }}
      </h5>
      <h6 class="tracking-tight line-clamp-2 flex-grow mb-2">
        {{ props.product.attributes.name }}
      </h6>
      <ProductPrice :price="props.product.attributes.gross_price" />
      <!-- <span class="text-xs tracking-tight mt-2 leading-snug block">Najniższa cena z ostatnich 30 dni przed wprowadzeniem obniżki: <b>{{ }} zł</b></span> -->
      <button v-if="props.product.attributes.quantity" class="button invisible group-hover:visible">
        Dodaj do koszyka
        <font-awesome-icon size="xl" class="ml-2" icon="fa-light fa-bag-shopping" />
      </button>
      <button v-else disabled class="button invisible group-hover:visible">
        Produkt niedostępny
      </button>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import slugify from 'slugify'

const props = defineProps<{
    product: Product
}>()

</script>
