// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// interface CategorySeed {
//   name: string
//   slug: string
//   children?: CategorySeed[]
// }

// const categories: CategorySeed[] = [
//   // ============================================
//   // KUCHNIA
//   // ============================================
//   {
//     name: 'Kuchnia',
//     slug: 'kuchnia',
//     children: [
//       {
//         name: 'Zlewozmywaki',
//         slug: 'kuchnia-zlewozmywaki',
//         children: [
//           { name: 'Zlewozmywaki granitowe', slug: 'kuchnia-zlewozmywaki-granitowe' },
//           { name: 'Zlewozmywaki stalowe', slug: 'kuchnia-zlewozmywaki-stalowe' },
//           { name: 'Zlewozmywaki ceramiczne', slug: 'kuchnia-zlewozmywaki-ceramiczne' },
//           { name: 'Zlewozmywaki kompozytowe', slug: 'kuchnia-zlewozmywaki-kompozytowe' },
//         ],
//       },
//       {
//         name: 'Baterie kuchenne',
//         slug: 'kuchnia-baterie',
//         children: [
//           { name: 'Baterie z wyciąganą wylewką', slug: 'kuchnia-baterie-wyciagana-wylewka' },
//           { name: 'Baterie do filtrów', slug: 'kuchnia-baterie-do-filtrow' },
//           { name: 'Baterie pod okno', slug: 'kuchnia-baterie-pod-okno' },
//           { name: 'Baterie ścienne', slug: 'kuchnia-baterie-scienne' },
//         ],
//       },
//       {
//         name: 'Akcesoria kuchenne',
//         slug: 'kuchnia-akcesoria',
//         children: [
//           { name: 'Korki i syfony', slug: 'kuchnia-akcesoria-korki-syfony' },
//           { name: 'Dozowniki', slug: 'kuchnia-akcesoria-dozowniki' },
//           { name: 'Ociekacze', slug: 'kuchnia-akcesoria-ociekacze' },
//         ],
//       },
//     ],
//   },

//   // ============================================
//   // ŁAZIENKA - PRODUKTY
//   // ============================================
//   {
//     name: 'Łazienka',
//     slug: 'lazienka',
//     children: [
//       {
//         name: 'Prysznic',
//         slug: 'lazienka-prysznic',
//         children: [
//           { name: 'Kabiny prysznicowe', slug: 'lazienka-prysznic-kabiny' },
//           { name: 'Kabiny Walk-In', slug: 'lazienka-prysznic-walk-in' },
//           { name: 'Brodziki', slug: 'lazienka-prysznic-brodziki' },
//           { name: 'Deszczownice', slug: 'lazienka-prysznic-deszczownice' },
//           { name: 'Zestawy prysznicowe', slug: 'lazienka-prysznic-zestawy' },
//           { name: 'Baterie prysznicowe', slug: 'lazienka-prysznic-baterie' },
//           { name: 'Odpływy liniowe', slug: 'lazienka-prysznic-odplywy-liniowe' },
//           { name: 'Drzwi prysznicowe', slug: 'lazienka-prysznic-drzwi' },
//           { name: 'Ścianki prysznicowe', slug: 'lazienka-prysznic-scianki' },
//         ],
//       },
//       {
//         name: 'Wanna',
//         slug: 'lazienka-wanna',
//         children: [
//           { name: 'Wanny wolnostojące', slug: 'lazienka-wanna-wolnostojace' },
//           { name: 'Wanny do zabudowy', slug: 'lazienka-wanna-do-zabudowy' },
//           { name: 'Wanny narożne', slug: 'lazienka-wanna-narozne' },
//           { name: 'Parawany nawannowe', slug: 'lazienka-wanna-parawany' },
//           { name: 'Baterie wannowe', slug: 'lazienka-wanna-baterie' },
//         ],
//       },
//       {
//         name: 'Umywalka',
//         slug: 'lazienka-umywalka',
//         children: [
//           { name: 'Umywalki nablatowe', slug: 'lazienka-umywalka-nablatowe' },
//           { name: 'Umywalki wpuszczane', slug: 'lazienka-umywalka-wpuszczane' },
//           { name: 'Umywalki podwieszane', slug: 'lazienka-umywalka-podwieszane' },
//           { name: 'Umywalki stojące', slug: 'lazienka-umywalka-stojace' },
//           { name: 'Baterie umywalkowe', slug: 'lazienka-umywalka-baterie' },
//           { name: 'Szafki pod umywalkę', slug: 'lazienka-umywalka-szafki' },
//         ],
//       },
//       {
//         name: 'Toaleta',
//         slug: 'lazienka-toaleta',
//         children: [
//           { name: 'Miski WC wiszące', slug: 'lazienka-toaleta-miski-wiszace' },
//           { name: 'Miski WC stojące', slug: 'lazienka-toaleta-miski-stojace' },
//           { name: 'Kompakty WC', slug: 'lazienka-toaleta-kompakty' },
//           { name: 'Bidety', slug: 'lazienka-toaleta-bidety' },
//           { name: 'Stelaże podtynkowe', slug: 'lazienka-toaleta-stelaze' },
//           { name: 'Przyciski spłukujące', slug: 'lazienka-toaleta-przyciski' },
//           { name: 'Deski WC', slug: 'lazienka-toaleta-deski' },
//         ],
//       },
//       {
//         name: 'Meble łazienkowe',
//         slug: 'lazienka-meble',
//         children: [
//           { name: 'Szafki łazienkowe', slug: 'lazienka-meble-szafki' },
//           { name: 'Słupki łazienkowe', slug: 'lazienka-meble-slupki' },
//           { name: 'Lustra łazienkowe', slug: 'lazienka-meble-lustra' },
//           { name: 'Regały łazienkowe', slug: 'lazienka-meble-regaly' },
//         ],
//       },
//       {
//         name: 'Akcesoria łazienkowe',
//         slug: 'lazienka-akcesoria',
//         children: [
//           { name: 'Wieszaki i uchwyty', slug: 'lazienka-akcesoria-wieszaki' },
//           { name: 'Mydelniczki', slug: 'lazienka-akcesoria-mydelniczki' },
//           { name: 'Dozowniki łazienkowe', slug: 'lazienka-akcesoria-dozowniki' },
//           { name: 'Kosze i pojemniki', slug: 'lazienka-akcesoria-kosze' },
//         ],
//       },
//       {
//         name: 'Baterie specjalne',
//         slug: 'lazienka-baterie-specjalne',
//         children: [
//           { name: 'Baterie termostatyczne', slug: 'lazienka-baterie-termostatyczne' },
//           { name: 'Baterie podtynkowe', slug: 'lazienka-baterie-podtynkowe' },
//           { name: 'Baterie bezdotykowe', slug: 'lazienka-baterie-bezdotykowe' },
//           { name: 'Baterie bidetowe', slug: 'lazienka-baterie-bidetowe' },
//         ],
//       },
//     ],
//   },

//   // ============================================
//   // ARANŻACJE - STYLE ŁAZIENKOWE
//   // ============================================
//   {
//     name: 'Aranżacje',
//     slug: 'aranzacje',
//     children: [
//       // --- STYLE NOWOCZESNE ---
//       {
//         name: 'Łazienka industrialna / loftowa',
//         slug: 'aranzacje-lazienka-industrialna-loft',
//       },
//       {
//         name: 'Łazienka skandynawska / hygge',
//         slug: 'aranzacje-lazienka-skandynawska-hygge',
//       },
//       {
//         name: 'Łazienka minimalistyczna / nowoczesna',
//         slug: 'aranzacje-lazienka-minimalistyczna-nowoczesna',
//       },
//       {
//         name: 'Łazienka glamour',
//         slug: 'aranzacje-lazienka-glamour',
//       },
//       {
//         name: 'Łazienka boho',
//         slug: 'aranzacje-lazienka-boho',
//       },

//       // --- STYLE KLASYCZNE ---
//       {
//         name: 'Łazienka klasyczna / tradycyjna',
//         slug: 'aranzacje-lazienka-klasyczna-tradycyjna',
//       },
//       {
//         name: 'Łazienka retro / vintage',
//         slug: 'aranzacje-lazienka-retro-vintage',
//       },
//       {
//         name: 'Łazienka art deco',
//         slug: 'aranzacje-lazienka-art-deco',
//       },

//       // --- STYLE RUSTYKALNE ---
//       {
//         name: 'Łazienka rustykalna / wiejska',
//         slug: 'aranzacje-lazienka-rustykalna-wiejska',
//       },
//       {
//         name: 'Łazienka prowansalska',
//         slug: 'aranzacje-lazienka-prowansalska',
//       },

//       // --- STYLE NADMORSKIE ---
//       {
//         name: 'Łazienka Hampton / nadmorska',
//         slug: 'aranzacje-lazienka-hampton-nadmorska',
//       },

//       // --- STYLE AZJATYCKIE I ORIENTALNE ---
//       {
//         name: 'Łazienka zen / spa',
//         slug: 'aranzacje-lazienka-zen-spa',
//       },
//       {
//         name: 'Łazienka japońska',
//         slug: 'aranzacje-lazienka-japonska',
//       },
//       {
//         name: 'Łazienka orientalna',
//         slug: 'aranzacje-lazienka-orientalna',
//       },
//     ],
//   },

//   // ============================================
//   // ŁAZIENKI FUNKCJONALNE (SPECJALNE POTRZEBY)
//   // ============================================
//   {
//     name: 'Łazienki funkcjonalne',
//     slug: 'lazienki-funkcjonalne',
//     children: [
//       // --- DOSTĘPNOŚĆ ---
//       {
//         name: 'Łazienka dla osób niepełnosprawnych',
//         slug: 'lazienki-funkcjonalne-dla-niepelnosprawnych',
//       },
//       {
//         name: 'Łazienka bez barier',
//         slug: 'lazienki-funkcjonalne-bez-barier',
//       },
//       {
//         name: 'Łazienka dla seniorów',
//         slug: 'lazienki-funkcjonalne-dla-seniorow',
//       },

//       // --- RODZINA I DZIECI ---
//       {
//         name: 'Łazienka bezpieczna dla dzieci',
//         slug: 'lazienki-funkcjonalne-bezpieczna-dzieci',
//       },
//       {
//         name: 'Łazienka rodzinna',
//         slug: 'lazienki-funkcjonalne-rodzinna',
//       },

//       // --- ZDROWIE ---
//       {
//         name: 'Łazienka dla alergików',
//         slug: 'lazienki-funkcjonalne-dla-alergikow',
//       },

//       // --- SPECJALNE WARUNKI ---
//       {
//         name: 'Łazienka na twardą wodę',
//         slug: 'lazienki-funkcjonalne-twarda-woda',
//       },
//       {
//         name: 'Łazienka dla właścicieli zwierząt',
//         slug: 'lazienki-funkcjonalne-dla-zwierzat',
//       },

//       // --- LOKALIZACJA SPECJALNA ---
//       {
//         name: 'Łazienka na poddaszu',
//         slug: 'lazienki-funkcjonalne-na-poddaszu',
//       },
//       {
//         name: 'Łazienka w piwnicy',
//         slug: 'lazienki-funkcjonalne-w-piwnicy',
//       },
//       {
//         name: 'Łazienka w kamperze',
//         slug: 'lazienki-funkcjonalne-w-kamperze',
//       },

//       // --- PRZEZNACZENIE ---
//       {
//         name: 'Łazienka pod wynajem',
//         slug: 'lazienki-funkcjonalne-pod-wynajem',
//       },
//       {
//         name: 'Łazienka gościnna',
//         slug: 'lazienki-funkcjonalne-goscinna',
//       },

//       // --- EKOLOGIA ---
//       {
//         name: 'Łazienka ekologiczna',
//         slug: 'lazienki-funkcjonalne-ekologiczna',
//       },
//     ],
//   },

//   // ============================================
//   // ŁAZIENKI WEDŁUG ROZMIARU
//   // ============================================
//   {
//     name: 'Łazienki według rozmiaru',
//     slug: 'lazienki-rozmiar',
//     children: [
//       // --- MAŁE ---
//       {
//         name: 'Łazienka mikro (do 3m²)',
//         slug: 'lazienki-rozmiar-mikro-do-3m2',
//       },
//       {
//         name: 'Łazienka 3m²',
//         slug: 'lazienki-rozmiar-3m2',
//       },
//       {
//         name: 'Łazienka 4m²',
//         slug: 'lazienki-rozmiar-4m2',
//       },
//       {
//         name: 'Łazienka 5m²',
//         slug: 'lazienki-rozmiar-5m2',
//       },
//       {
//         name: 'Mała łazienka - optyczne powiększenie',
//         slug: 'lazienki-rozmiar-mala-optyczne-powiekszenie',
//       },

//       // --- KSZTAŁTY ---
//       {
//         name: 'Łazienka wąska i długa',
//         slug: 'lazienki-rozmiar-waska-dluga',
//       },
//       {
//         name: 'Łazienka ze skosem',
//         slug: 'lazienki-rozmiar-ze-skosem',
//       },
//       {
//         name: 'Łazienka o nieregularnym kształcie',
//         slug: 'lazienki-rozmiar-nieregularny-ksztalt',
//       },
//     ],
//   },

//   // ============================================
//   // ŁAZIENKI WEDŁUG WYPOSAŻENIA
//   // ============================================
//   {
//     name: 'Łazienki według wyposażenia',
//     slug: 'lazienki-wyposazenie',
//     children: [
//       { name: 'Łazienka z prysznicem', slug: 'lazienki-wyposazenie-z-prysznicem' },
//       { name: 'Łazienka z wanną', slug: 'lazienki-wyposazenie-z-wanna' },
//       { name: 'Łazienka z pralnią', slug: 'lazienki-wyposazenie-z-pralnia' },
//       { name: 'Łazienka z sauną', slug: 'lazienki-wyposazenie-z-sauna' },
//       { name: 'Łazienka z jacuzzi', slug: 'lazienki-wyposazenie-z-jacuzzi' },
//       { name: 'Łazienka z oknem', slug: 'lazienki-wyposazenie-z-oknem' },
//       { name: 'Łazienka bez okna', slug: 'lazienki-wyposazenie-bez-okna' },
//       { name: 'Łazienka z dwiema umywalkami', slug: 'lazienki-wyposazenie-dwie-umywalki' },
//     ],
//   },

//   // ============================================
//   // ŁAZIENKI WEDŁUG KOLORU
//   // ============================================
//   {
//     name: 'Łazienki według koloru',
//     slug: 'lazienki-kolor',
//     children: [
//       { name: 'Biała łazienka', slug: 'lazienki-kolor-biala' },
//       { name: 'Czarna łazienka', slug: 'lazienki-kolor-czarna' },
//       { name: 'Szara łazienka', slug: 'lazienki-kolor-szara' },
//       { name: 'Beżowa łazienka', slug: 'lazienki-kolor-bezowa' },
//       { name: 'Niebieska łazienka', slug: 'lazienki-kolor-niebieska' },
//       { name: 'Zielona łazienka', slug: 'lazienki-kolor-zielona' },
//       { name: 'Różowa łazienka', slug: 'lazienki-kolor-rozowa' },
//       { name: 'Złota łazienka', slug: 'lazienki-kolor-zlota' },
//       { name: 'Łazienka z drewnem', slug: 'lazienki-kolor-z-drewnem' },
//       { name: 'Łazienka z marmurem', slug: 'lazienki-kolor-z-marmurem' },
//       { name: 'Łazienka betonowa', slug: 'lazienki-kolor-betonowa' },
//     ],
//   },

//   // ============================================
//   // INSTALACJE
//   // ============================================
//   {
//     name: 'Instalacje',
//     slug: 'instalacje',
//     children: [
//       { name: 'Montaż armatury', slug: 'instalacje-montaz-armatury' },
//       { name: 'Montaż zlewozmywaków', slug: 'instalacje-montaz-zlewozmywakow' },
//       { name: 'Montaż kabin prysznicowych', slug: 'instalacje-montaz-kabin' },
//       { name: 'Montaż stelaży podtynkowych', slug: 'instalacje-montaz-stelaży' },
//       { name: 'Hydraulika', slug: 'instalacje-hydraulika' },
//       { name: 'Naprawy i serwis', slug: 'instalacje-naprawy' },
//     ],
//   },

//   // ============================================
//   // PIELĘGNACJA
//   // ============================================
//   {
//     name: 'Pielęgnacja',
//     slug: 'pielegnacja',
//     children: [
//       { name: 'Czyszczenie zlewozmywaków', slug: 'pielegnacja-czyszczenie-zlewozmywakow' },
//       { name: 'Czyszczenie armatury', slug: 'pielegnacja-czyszczenie-armatury' },
//       { name: 'Czyszczenie kabin prysznicowych', slug: 'pielegnacja-czyszczenie-kabin' },
//       { name: 'Czyszczenie ceramiki', slug: 'pielegnacja-czyszczenie-ceramiki' },
//       { name: 'Konserwacja', slug: 'pielegnacja-konserwacja' },
//       { name: 'Usuwanie kamienia', slug: 'pielegnacja-usuwanie-kamienia' },
//     ],
//   },

//   // ============================================
//   // TRENDY
//   // ============================================
//   {
//     name: 'Trendy',
//     slug: 'trendy',
//     children: [
//       { name: 'Kolory armatury', slug: 'trendy-kolory-armatury' },
//       { name: 'Nowości produktowe', slug: 'trendy-nowosci' },
//       { name: 'Trendy łazienkowe', slug: 'trendy-lazienkowe' },
//       { name: 'Trendy kuchenne', slug: 'trendy-kuchenne' },
//       { name: 'Ekologia i oszczędność', slug: 'trendy-ekologia' },
//     ],
//   },
// ]

// // ============================================
// // SEEDING FUNCTIONS
// // ============================================

// async function createCategory(
//   category: CategorySeed,
//   parentId: string | null = null
// ): Promise<void> {
//   const created = await prisma.category.upsert({
//     where: { slug: category.slug },
//     update: {
//       name: category.name,
//       parentId,
//     },
//     create: {
//       name: category.name,
//       slug: category.slug,
//       parentId,
//     },
//   })

//   console.log(`✅ ${parentId ? '  └─' : ''} ${category.name} (${category.slug})`)

//   if (category.children) {
//     for (const child of category.children) {
//       await createCategory(child, created.id)
//     }
//   }
// }

// async function main() {
//   console.log('🌱 Seeding categories for Deante SEO Blog...\n')

//   await prisma.category.deleteMany()

//   // Create all categories
//   for (const category of categories) {
//     await createCategory(category)
//     console.log('') // Empty line between main categories
//   }

//   // Summary
//   const count = await prisma.category.count()
//   console.log(`\n✨ Done! Created/updated ${count} categories.`)

//   // List all slugs for verification
//   const allCategories = await prisma.category.findMany({
//     select: { slug: true },
//     orderBy: { slug: 'asc' },
//   })
  
//   console.log('\n📋 All slugs:')
//   allCategories.forEach((c) => console.log(`   ${c.slug}`))
// }

// main()
//   .catch((e) => {
//     console.error('❌ Seed error:', e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })