<template>
    <section class="border sticky top-[200px] p-5 bg-white">
        <Transition name="slide-fade">
            <article class="text-center" v-if="product.attributes.images?.data?.length && showDetails">
                <div class="w-1/2 mx-auto aspect-square">
                    <nuxt-img :src="`https://strapi.titanizo.pl${ product.attributes.images?.data[0].attributes.formats.thumbnail.url}`" class="w-full h-full object-contain"></nuxt-img>
                </div>
                <span class="text-lg font-semibold tracking-tight w-2/3">{{ product.attributes.name }}</span>
            </article>
        </Transition>
        <div class="flex justify-center mt-3">
            <ProductPrice :price="product.attributes.gross_price" :promo-price="3029.99"/>
        </div>
        <div class="flex text-xs mt-4 leading-relaxed">
            <div class="font-semibold line-through w-1/4 text-right mr-1">4399,99 zł</div>
            <div class="w-3/4 ">
                Najniższa cena, która obowiązywała w okresie 30 dni przed wprowadzeniem obniżki
            </div>
        </div>
        <div class="px-5 my-6 h-[2px] bg-slate-200" />
        <div class="flex text-sm mt-4 leading-relaxed" v-if="typeof product.attributes.quantity === 'number'">
            <div class="w-1/4 mr-1 mt-2 text-center"><font-awesome-icon size="2x" class="mr-2" icon="fa-light fa-truck-fast" /></div>
            <div class="w-3/4 flex flex-col">
                <strong class="font-semibold">Dostępność produktu</strong>
                <strong class="text-green-500 font-normal" v-if="product.attributes.quantity > 10">Dostępny ({{ product.attributes.quantity }} szt.)</strong>
                <strong class="text-orange-500 font-normal" v-else-if="product.attributes.quantity > 0">Ostatnie sztuki ({{ product.attributes.quantity }} szt.)</strong>
                <strong class="text-red-500 font-normal" v-else>Produkt niedostępny</strong>
            </div>
        </div>
        <button v-if="product.attributes.quantity" class="button">
            Dodaj do koszyka
            <font-awesome-icon size="xl" class="ml-2" icon="fa-light fa-bag-shopping" />
        </button>
        <button v-else disabled class="button">
            Produkt niedostępny
        </button>
    </section>
</template>

<script setup lang="ts">
const { y } = useScroll();

const { product } = defineProps<{
    product: Product,
    showDetails: boolean
}>()
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>