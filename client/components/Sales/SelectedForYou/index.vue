<template>
    <section class="container mx-auto mb-16">
        <h2 class="heading">Wybrane dla Ciebie</h2>
        <div class="grid grid-cols-4 mt-4 gap-20 overflow-auto max-w-screen">
            <ProductCard v-for="i in 4" :key="i" />
        </div>
    </section>
</template>