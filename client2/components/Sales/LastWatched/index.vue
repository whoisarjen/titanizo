<template>
    <section class="container mx-auto mb-16">
        <h2 class="heading text-center">Ostatnio przeglądane</h2>
        <div class="grid grid-cols-4 mt-4 gap-20">
            <ProductCard v-for="i in 2" :key="i"/>
        </div>
    </section>
</template>