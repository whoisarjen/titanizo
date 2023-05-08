<template>
    <article>
        <NuxtLink class="group">
            <nuxt-img src="https://media.deante.pl/decor/BATERIE/Baterie%20%C5%82azienkowe/ARNIKA_BQA/BQA_D21K.jpg" fit="contain" class="w-2/3 mx-auto mix-blend-darken py-8"/>
            <h5 class="text-xl uppercase tracking-tighter font-medium line-clamp-1 mb-1 group-hover:underline">Deante Arnika Bateria umywalkowa wysoka</h5>
            <h6 class="tracking-tight line-clamp-2">Bateria umywalkowa wysoka</h6>
            <ProductPrice :price="699.99" :promo-price="549.99"/>
            <span class="text-xs tracking-tight mt-2 leading-snug block">Najniższa cena z ostatnich 30 dni przed wprowadzeniem obniżki: <b>569,99 zł</b></span>
            <div class="invisible group-hover:visible block py-4 uppercase text-white bg-sky-600 mt-4 rounded-full text-center font-medium cursor-pointer hover:bg-sky-800 transition-colors">
                Do koszyka
                <font-awesome-icon size="xl" class="ml-2" icon="fa-light fa-bag-shopping" />
            </div>
        </NuxtLink>
    </article>
</template>