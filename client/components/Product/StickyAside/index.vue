<template>
  <section class="border sticky top-[200px] p-5 bg-white">
    <Transition name="slide-fade">
      <article v-if="props.product.attributes.images?.data?.length && showDetails" class="text-center">
        <div class="w-1/2 mx-auto aspect-square">
          <nuxt-img loading="lazy" :src="`https://strapi.titanizo.pl${ props.product.attributes.images?.data[0].attributes.formats.thumbnail.url}`" class="w-full h-full object-contain" />
        </div>
        <span class="text-lg font-semibold tracking-tight w-2/3">{{ props.product.attributes.name }}</span>
      </article>
    </Transition>
    <div class="flex justify-center mt-3">
      <ProductPrice :price="props.product.attributes.gross_price" :promo-price="3029.99" />
    </div>
    <div class="flex text-xs mt-4 leading-relaxed">
      <div class="font-semibold line-through w-1/4 text-right mr-1">
        4399,99 zł
      </div>
      <div class="w-3/4 ">
        Najniższa cena, która obowiązywała w okresie 30 dni przed wprowadzeniem obniżki
      </div>
    </div>
    <div class="px-5 my-6 h-[2px] bg-slate-200" />
    <div v-if="typeof props.product.attributes.quantity === 'number'" class="flex text-sm mt-4 leading-relaxed">
      <div class="w-1/4 mr-1 mt-2 text-center">
        <font-awesome-icon size="2x" class="mr-2" icon="fa-light fa-truck-fast" />
      </div>
      <div class="w-3/4 flex flex-col">
        <strong class="font-semibold">Dostępność produktu</strong>
        <strong v-if="props.product.attributes.quantity > 10" class="text-green-500 font-normal">Dostępny ({{ props.product.attributes.quantity }} szt.)</strong>
        <strong v-else-if="props.product.attributes.quantity > 0" class="text-orange-500 font-normal">Ostatnie sztuki ({{ props.product.attributes.quantity }} szt.)</strong>
        <strong v-else class="text-red-500 font-normal">Produkt niedostępny</strong>
      </div>
    </div>
    <button v-if="props.product.attributes.quantity" class="button">
      Dodaj do koszyka
      <font-awesome-icon size="xl" class="ml-2" icon="fa-light fa-bag-shopping" />
    </button>
    <button v-else disabled class="button">
      Produkt niedostępny
    </button>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
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
