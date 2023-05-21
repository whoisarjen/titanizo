<template>
  <section class="container mx-auto grid grid-cols-3 py-4">
    <div class="uppercase text-center font-medium tracking-tight">
      <font-awesome-icon size="3x" icon="fa-thin fa-medal" />
      <div class="mt-2">
        100% bezpieczne<br> zakupy
      </div>
    </div>
    <div class="uppercase text-center font-medium tracking-tight">
      <font-awesome-icon size="2x" icon="fa-light fa-truck-fast" class="py-2" />
      <div class="mt-2 leading-tight">
        Darmowa dostawa<br>
        <small>dla zamówień powyżej 499 ZŁ</small>
      </div>
    </div>
    <div class="uppercase text-center font-medium tracking-tight">
      <font-awesome-icon size="3x" icon="fa-thin fa-box-taped" />
      <div class="mt-2">
        14 dni na zwrot
      </div>
    </div>
  </section>
  <section class="border-t bg-neutral-100 py-3">
    <div class="container mx-auto text-xs uppercase font-bold tracking-tight">
      Metody płatności
    </div>
  </section>
  <section class="border-t bg-neutral-900 text-white">
    <div class="container mx-auto grid md:grid-cols-4 md:py-10 py-4  tracking-tight">
      <div>
        <nuxt-img loading="lazy" src="/assets/brand/white.svg" alt="Logo Titanizo - Dom i ogród" class="w-1/2" />
      </div>
      <div class="my-4 md:my-0">
        <span class="text-xs uppercase font-medium tracking-tighter">O Titanizo</span>
        <nav>
          <div class="text-sm py-2 md:py-1">
            Poznaj Titanizo
          </div>
          <div class="text-sm py-2 md:py-1">
            Regulaminy
          </div>
          <div class="text-sm py-2 md:py-1">
            Polityka Prywatności
          </div>
          <div class="text-sm py-2 md:py-1">
            Ustawienia plików cookies
          </div>
        </nav>
      </div>
      <div class="my-4 md:my-0">
        <span class="text-xs uppercase font-medium tracking-tighter">Oferta i aktualności</span>
        <nav>
          <div class="text-sm py-2 md:py-1">
            Najlepsze kategorie
          </div>
          <div class="text-sm py-2 md:py-1">
            Najlepsze produkty
          </div>
          <div class="text-sm py-2 md:py-1">
            Inspiracje
          </div>
          <nuxt-link to="/blog" class="text-sm py-2 md:py-1">
            Blog
          </nuxt-link>
          <div class="text-sm py-2 md:py-1">
            Nowości
          </div>
          <div class="text-sm py-2 md:py-1">
            Promocje
          </div>
        </nav>
      </div>
      <div class="my-4 md:my-0">
        <span class="text-xs uppercase font-medium tracking-tighter">Kontakt</span>
        <nav>
          <div class="text-sm py-2 md:py-1">
            FAQ
          </div>
          <div class="text-sm py-2 md:py-1">
            Biuro obsługi klienta
          </div>
          <div class="text-sm py-2 md:py-1">
            Dostawa
          </div>
          <div class="text-sm py-2 md:py-1">
            Metody płatności
          </div>
          <div class="text-sm py-2 md:py-1">
            Zwroty i reklamacje
          </div>
        </nav>
      </div>
    </div>

    <div class="text-xs tracking-tight text-center border-t border-white/10 py-3">
      @ {{ new Date().getFullYear() }} Titanizo Sp. z o.o.
    </div>
  </section>
</template>
