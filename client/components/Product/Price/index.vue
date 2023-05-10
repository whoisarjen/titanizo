<template>
    <div class="flex items-end">
        <div class=" tracking-tighter flex items-center leading-none" :class="{ 'text-rose-700': !!formatedPromoPrice }">
            <span class="text-3xl font-bold">{{ formatedFinalPrice.slice(0, -3) }}</span>
            <div class="flex flex-col  text-xs leading-tight ml-1 font-medium">
                <span>{{ formatedFinalPrice.slice(-2) }}</span>
                <span>zł</span>
            </div>
        </div>
        <div class=" tracking-tighter flex items-center leading-none ml-2" v-if="formatedPromoPrice" style="background: linear-gradient(to left top, transparent 47.75%, currentColor 49.5%, currentColor 50.5%, transparent 52.25%);">
            <span class="text-lg font-medium">{{ formatedPrice.slice(0, -3) }}</span>
            <div class="flex flex-col text-[0.5rem] leading-tight font-medium">
                <span>{{ formatedPrice.slice(-2) }}</span>
                <span>zł</span>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
const { price, promoPrice } = defineProps({
    price: {
        type: Number,
        required: true,
    },
    promoPrice: {
        type: Number
    }
})

const formatedPrice = price.toFixed(2)
const formatedPromoPrice = promoPrice?.toFixed(2)
const formatedFinalPrice = formatedPromoPrice || formatedPrice
</script>