<template>
    <nav class="z-10 sticky top-0">
        <section class="w-full py-3 text-center uppercase tracking-tight font-medium text-sm bg-neutral-900 text-white ">
            <div class="container mx-auto flex w-full justify-between">
                <span class="tracking-tighter w-full sm:w-auto"><font-awesome-icon size="lg" class="mr-2" icon="fa-light fa-truck-fast"  />Darmowa dostawa od 499 ZŁ dla zalogowanych</span>
                <div class="flex-grow-1 hidden sm:block"></div>
                <aside class="gap-6 hidden sm:flex">
                    <div>Blog</div>
                    <div>Inspiracje</div>
                    <div>Kontakt</div>
                </aside>
            </div>
        </section>
        <nav class="w-full min-h-36 bg-white shadow-md">
            <section class="container mx-auto py-5 flex flex-row w-full justify-between">
                <nuxt-link to="/" class="md:mr-10">
                    <nuxt-img src="/assets/brand/default.svg" alt="Logo Titanizo - Dom i ogród" class="h-10 "/>
                </nuxt-link>
                <label for="search" class="relative w-full hidden md:block">
                    <font-awesome-icon icon="fa-light fa-magnifying-glass" class="absolute top-1/2 -translate-y-1/2 left-4" />
                    <input id="search" type="text" placeholder="Szukaj w Titanizo..." class="w-full bg-neutral-100 rounded-full px-10 py-3 placeholder:text-neutral-900 tracking-tight">
                </label>
                <div class="md:ml-16 flex items-center">
                    <font-awesome-icon size="xl" class="ml-5" icon="fa-light fa-user" />
                    <font-awesome-icon size="xl" class="ml-5" icon="fa-light fa-heart"  />
                    <font-awesome-icon size="xl" class="ml-5" icon="fa-light fa-bag-shopping" />
                </div>
            </section>

            <section class="container mx-auto flex flex-row w-full gap-6 text-sm">
                <div class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700">
                    Wszystkie kategorie
                    <font-awesome-icon icon="fa-light fa-chevron-down" />
                </div>
                <div class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700">Promocje</div>
                <div class="flex-1"></div>
                <div class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700">Nowości</div>
                <div class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700">
                    <font-awesome-icon icon="fa-duotone fa-fire" size="lg" class="text-rose-700" />
                    Bestsellery
                </div>
            </section>
        </nav>
    </nav>
</template>