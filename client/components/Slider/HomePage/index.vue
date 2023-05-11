<template>
  <section class="w-full aspect-square lg:aspect-auto lg:max-w-[1600px] mx-auto lg:h-[600px] bg-slate-600 flex justify-center items-center text-3xl text-white">
    <nuxt-img src="/assets/marketing/banner/Kolekcja_Silia_Deante_052023_desktop.jpg" class="hidden lg:block w-full h-full object-cover object-left" />
    <nuxt-img src="/assets/marketing/banner/Kolekcja_Silia_Deante_052023_mobile.jpg" class="block lg:hidden w-full h-full object-cover object-left" />
  </section>
  <nav class="flex justify-center gap-4 mt-4">
    <button class="w-12 h-2 bg-slate-300 rounded-full" :class="{'bg-rose-600': true}" />
    <button class="w-12 h-2 bg-slate-300 rounded-full" />
    <button class="w-12 h-2 bg-slate-300 rounded-full" />
  </nav>
</template>
