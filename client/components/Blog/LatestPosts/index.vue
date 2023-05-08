<template>
    <section class="container mx-auto mb-16">
        <h2 class="heading">Blog</h2>
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-col md:grid md:grid-cols-2 md:w-3/5">
                <nuxt-img src="https://media.deante.pl/decor/ARANZE/RGB_ZRM_T113__BDH_072M__ZRM_010H__ZRM_060R__ZZMK011O.jpg" class="aspect-square"/>
                <div class="flex flex-col p-5">
                    <div class="flex justify-around items-center">
                        <span class="px-5 py-1 rounded-full bg-teal-600 text-white font-medium text-xs uppercase tracking-tight">Poradnik zakupowy</span>
                        <small class="text-neutral-500 text-xs">6 maj 2023</small>
                    </div>
                    <h5 class="mt-5 text-2xl font-medium uppercase tracking-tighter line-clamp-2">Zlewozmywaki - jak wybrać najlepszy produkt do swojego domu</h5>
                    <p class="text-sm leading-relaxed mt-5">Zlewozmywaki są jednym z najważniejszych elementów w każdej kuchni. To one pozwalają na mycie naczyń, warzyw i owoców oraz przygotowywanie posiłków. Dlatego wybór odpowiedniego zlewozmywaka jest niezwykle istotny. W tym artykule przedstawimy najważniejsze kwestie, na które należy zwrócić uwagę, aby wybrać najlepszy zlewozmywak dla swojego domu.</p>
                    <NuxtLink class="uppercase text-teal-600 text-sm font-bold mt-5">Czytaj <font-awesome-icon size="lg" class="ml-2" icon="fa-light fa-arrow-right" /></NuxtLink>
                </div>
            </div>
            <div class="md:w-2/5 flex flex-col gap-8">
                <div class="flex">
                    <nuxt-img src="https://media.deante.pl/decor/ARANZE/RGB_ZRM_T113__BDH_072M__ZRM_010H__ZRM_060R__ZZMK011O.jpg" class="aspect-square w-1/3"/>
                    <div class="flex flex-col p-3">
                        <div>
                            <span class="px-5 py-1 rounded-full bg-teal-600 text-white font-medium text-xs uppercase tracking-tight">Poradnik zakupowy</span>
                        </div>
                        <h5 class="mt-5 text-2xl font-medium uppercase tracking-tighter line-clamp-3">Zlewozmywaki - jak wybrać najlepszy produkt do swojego domu</h5>
                    </div>
                </div>
                <div class="flex">
                    <nuxt-img src="https://media.deante.pl/decor/ARANZE/RGB_ZRM_T113__BDH_072M__ZRM_010H__ZRM_060R__ZZMK011O.jpg" class="aspect-square w-1/3"/>
                    <div class="flex flex-col p-3">
                        <div>
                            <span class="px-5 py-1 rounded-full bg-teal-600 text-white font-medium text-xs uppercase tracking-tight">Poradnik zakupowy</span>
                        </div>
                        <h5 class="mt-5 text-2xl font-medium uppercase tracking-tighter line-clamp-3">Zlewozmywaki - jak wybrać najlepszy produkt do swojego domu</h5>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>