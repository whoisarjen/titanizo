<template>
    <article v-if="product">
        <NuxtLink class="group flex flex-col h-full" :to="`/produkt/${product.id}--${slugify(product.attributes.name, { lower: true })}`">
            <nuxt-img v-if="product.attributes.images?.data?.length" :src="`https://strapi.titanizo.pl${product.attributes.images?.data[0].attributes.formats.small.url}`" class="w-4/5 aspect-square object-contain mx-auto mix-blend-darken py-8"/>
            <h5 class="text-xl uppercase tracking-tighter font-medium line-clamp-1 mb-1 group-hover:underline break-all">{{ product.attributes.manufacturer.data.attributes.name }} {{ product.attributes.collection }} {{ product.attributes.name }} </h5>
            <h6 class="tracking-tight line-clamp-2 flex-grow mb-2">{{ product.attributes.name }}</h6>
            <ProductPrice :price="product.attributes.gross_price"/>
            <!-- <span class="text-xs tracking-tight mt-2 leading-snug block">Najniższa cena z ostatnich 30 dni przed wprowadzeniem obniżki: <b>{{ }} zł</b></span> -->
            <div class="invisible group-hover:visible block py-4 uppercase text-white bg-sky-600 mt-4 rounded-full text-center font-medium cursor-pointer hover:bg-sky-800 transition-colors">
                Do koszyka
                <font-awesome-icon size="xl" class="ml-2" icon="fa-light fa-bag-shopping" />
            </div>
        </NuxtLink>
    </article>
</template>

<script setup lang="ts">
import slugify from 'slugify';

const { product } = defineProps<{
    product: Product
}>()

</script>