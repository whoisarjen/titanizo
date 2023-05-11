<template>
  <section class="container mx-auto mb-16">
    <h2 class="heading">
      Popularne kategorie
    </h2>
    <div class="grid grid-cols-5 mt-4 gap-10 max-w-screen overflow-auto">
      <div class="group cursor-pointer">
        <div class="h-[300px]  relative overflow-hidden">
          <nuxt-img src="https://media.deante.pl/w600/ARANZE/RGB_CDL_6U4S_BQT_021K%2C%20NHC_031K%2C%20ADR_0411%2C%20ADR_0421.jpg" class="object-cover w-full h-full object-right group-hover:scale-125 transition-transform duration-700" />
        </div>
        <h6 class="text-xl bottom-0 uppercase font-medium mt-2 tracking-tighter">
          Baterie łazienkowe
        </h6>
      </div>
      <div class="group cursor-pointer">
        <div class="h-[300px]  relative overflow-hidden">
          <nuxt-img src="https://media.deante.pl/w600/ARANZE/RGB_NAC_N1BZ%2C%20KTS_N38P%2C%20ADI_N511%2C%20ADI_N111%2C%20CKS_N36A%2C%20CQS_AU4S%2C%20NHC_N31K%2C%20BBZ_N54L.jpg" class="object-cover w-full h-full object-right-top group-hover:scale-125 transition-transform duration-700" />
        </div>
        <h6 class="text-xl bottom-0 uppercase font-medium mt-2 tracking-tighter">
          Natryski
        </h6>
      </div>
      <div class="group cursor-pointer">
        <div class="h-[300px]  relative overflow-hidden">
          <nuxt-img src="https://media.deante.pl/w600/ARANZE/RGB_ZQE_N11B_BCA_B64M.jpg" class="object-cover w-full h-full object-left-bottom group-hover:scale-125 transition-transform duration-700" />
        </div>
        <h6 class="text-xl bottom-0 uppercase font-medium mt-2 tracking-tighter">
          Zlewozmywaki
        </h6>
      </div>
      <div class="group cursor-pointer">
        <div class="h-[300px]  relative overflow-hidden">
          <nuxt-img src="https://media.deante.pl/w600/ARANZE/RGB_KerriaPlus_nero_Brodzik_Arnika_Round.jpg" class="object-cover w-full h-full group-hover:scale-125 transition-transform duration-700" />
        </div>
        <h6 class="text-xl bottom-0 uppercase font-medium mt-2 tracking-tighter">
          Kabiny prysznicowe
        </h6>
      </div>
      <div class="group cursor-pointer">
        <div class="h-[300px]  relative overflow-hidden">
          <nuxt-img src="https://media.deante.pl/w600/ARANZE/RGB_ADM_N221.jpg" class="object-cover w-full h-full group-hover:scale-125 transition-transform duration-700" />
        </div>
        <h6 class="text-xl bottom-0 uppercase font-medium mt-2 tracking-tighter">
          Akcesoria
        </h6>
      </div>
    </div>
  </section>
</template>
