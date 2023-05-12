<template>
  <nav class="sticky top-0 z-20">
    <section class="w-full py-3 text-center uppercase tracking-tight font-medium text-sm bg-neutral-900 text-white ">
      <div class="container mx-auto flex w-full justify-between items-center">
        <span class="tracking-tighter w-full sm:w-auto text-xs"><font-awesome-icon size="lg" class="mr-2" icon="fa-light fa-truck-fast" />Darmowa dostawa zakupów powyżej 499 ZŁ</span>
        <div class="flex-grow-1 hidden sm:block" />
        <aside class="gap-6 hidden sm:flex">
          <nuxt-link to="/blog">
            Blog
          </nuxt-link>
          <div>Inspiracje</div>
          <div>Kontakt</div>
        </aside>
      </div>
    </section>
    <nav class="w-full min-h-36 bg-white shadow-md">
      <section class="container mx-auto py-5 flex flex-row w-full justify-between"  @mouseover="mainCategory = null">
        <nuxt-link to="/" class="md:mr-10">
          <nuxt-img src="/assets/brand/default.svg" alt="Logo Titanizo - Dom i ogród" class="h-10 " />
        </nuxt-link>
        <label for="search" class="relative w-full hidden md:block">
          <font-awesome-icon icon="fa-light fa-magnifying-glass" class="absolute top-1/2 -translate-y-1/2 left-4" />
          <input id="search" type="text" placeholder="Szukaj w Titanizo..." class="w-full bg-neutral-100 rounded-full px-10 py-3 placeholder:text-neutral-900 tracking-tight">
        </label>
        <div class="md:ml-16 flex items-center">
          <font-awesome-icon size="xl" class="ml-5" icon="fa-light fa-user" />
          <font-awesome-icon size="xl" class="ml-5" icon="fa-light fa-heart" />
          <font-awesome-icon size="xl" class="ml-5" icon="fa-light fa-bag-shopping" />
        </div>
      </section>

      <section class="container mx-auto flex flex-row w-full gap-6 text-sm">
        <template v-if="categories?.data">
          <nuxt-link v-for="category in categories.data" @mouseover="mainCategory = category; mainCategory.attributes.categories?.data.length ? subCategory = mainCategory.attributes.categories.data[0] : false" :key="category.id" :to="`/kategoria/${category.id}--${slugify(category.attributes.name, { lower: true })}`" class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700" :class="{ 'text-rose-700': mainCategory === category}">
            {{ category.attributes.name }}
            <font-awesome-icon icon="fa-light fa-chevron-down" />
          </nuxt-link>
        </template>
        <div class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700">
          Promocje
        </div>
        <div class="flex-1" />
        <div class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700">
          Nowości
        </div>
        <div class="pt-4 pb-3 cursor-pointer transition-colors uppercase font-medium border-b-[3px] border-transparent hover:border-rose-700 hover:text-rose-700">
          <font-awesome-icon icon="fa-duotone fa-fire" size="lg" class="text-rose-700" />
          Bestsellery
        </div>
      </section>
    </nav>

    <transition>
      <nav v-if="mainCategory" class="bg-white fixed container mx-auto left-1/2 -translate-x-1/2 rounded-b" @mouseleave="mainCategory = null">
          <div class="flex" v-if="mainCategory.attributes.categories?.data">
              <aside class="bg-neutral-100 rounded-bl w-1/5 py-4">
                  <nuxt-link class="p-3 hover:text-rose-700 transition-colors text-sm flex justify-between items-center gap-10 tracking-tight cursor-pointer" :class="{'bg-white text-rose-600': subCategory === subcategory}" v-for="subcategory in mainCategory.attributes.categories.data" @mouseover="subcategory.attributes.categories?.data.length ? subCategory = subcategory : false">
                    <span>{{ subcategory.attributes.name }}</span>
                    <font-awesome-icon :icon="`fa-light ${subcategory.attributes.categories?.data.length ? 'fa-chevron-right' : 'fa-arrow-up-right-from-square'}`" size="sm"/>
                  </nuxt-link>
              </aside>
              <section class="w-4/5 p-5" v-if="subCategory?.attributes.categories?.data">
                  <nav>
                    <ul>
                      <li v-for="lowCategory in subCategory?.attributes.categories.data" class="py-1 text-sm tracking-tight hover:text-rose-600 cursor-pointer">
                        <nuxt-link>
                          {{ lowCategory.attributes.name }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </nav>
              </section>
          </div>
      </nav>
    </transition>
  </nav>
  <transition>
    <div class="fixed inset-0 bg-black/60 backdrop-blur z-10" v-if="mainCategory"></div>
  </transition>
</template>

<script setup lang="ts">
import slugify from 'slugify'

type GetCategories = {
    data: Category[]
    meta: Meta
}

const { data: categories } = await useGetApi<GetCategories>('/categories', {
    'filters[parent][id][$null]': 'true',
    'populate[0]': 'categories',
    'populate[1]': 'categories.categories',
})

const mainCategory = ref<null|Category>(null);
const subCategory = ref<null|Category>(null);

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>