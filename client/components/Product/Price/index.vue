<template>
    <div class="flex items-end">
        <div class=" tracking-tighter flex items-center leading-none" :class="{ 'text-rose-700': promoPrice }">
            <span class="text-3xl font-bold">{{ ((promoPrice || price) *100).toString().slice(0, -2) }}</span>
            <div class="flex flex-col  text-xs leading-tight ml-1 font-medium">
                <span>{{ ((promoPrice || price) *100).toString().slice(-2) }}</span>
                <span>zł</span>
            </div>
        </div>
        <div class=" tracking-tighter flex items-center leading-none ml-2" v-if="promoPrice" style="background: linear-gradient(to left top, transparent 47.75%, currentColor 49.5%, currentColor 50.5%, transparent 52.25%);">
            <span class="text-lg font-medium">{{ (price*100).toString().slice(0, -2) }}</span>
            <div class="flex flex-col text-[0.5rem] leading-tight font-medium">
                <span>{{ (price*100).toString().slice(-2) }}</span>
                <span>zł</span>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    price: {
        type: Number,
        required: true,
    },
    promoPrice: {
        type: Number
    }
})
</script>