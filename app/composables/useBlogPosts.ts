import type { BlogPost } from '~/types/blog'

const blogPosts: BlogPost[] = [
  {
    slug: 'jak-zaczac-z-nuxt-3',
    title: 'Jak zaczac z Nuxt 3: Kompletny przewodnik',
    description: 'Dowiedz sie, jak budowac nowoczesne aplikacje webowe z Nuxt 3. Ten kompleksowy przewodnik obejmuje wszystko od instalacji po wdrozenie.',
    content: `
      <p>Nuxt 3 to potezny framework, ktory sprawia, ze budowanie aplikacji Vue.js jest niezwykle proste. W tym przewodniku poznamy podstawy Nuxt 3 i dowiemy sie, jak rozpoczac pierwszy projekt.</p>

      <h2>Dlaczego Nuxt 3?</h2>
      <p>Nuxt 3 oferuje szereg zalet w porownaniu z tradycyjnym rozwojem Vue.js:</p>
      <ul>
        <li>Renderowanie po stronie serwera od razu po wyjsciu z pudelka</li>
        <li>Automatyczne dzielenie kodu</li>
        <li>Routing oparty na plikach</li>
        <li>Wbudowana obsluga TypeScript</li>
      </ul>

      <h2>Instalacja</h2>
      <p>Rozpoczecie pracy z Nuxt 3 jest proste. Uruchom ponizsze polecenie, aby utworzyc nowy projekt:</p>
      <pre><code>npx nuxi@latest init moja-aplikacja</code></pre>

      <h2>Struktura projektu</h2>
      <p>Nuxt 3 uzywa konwencjonalnej struktury katalogow, ktora sprawia, ze organizacja kodu jest intuicyjna. Katalog pages automatycznie tworzy trasy, a komponenty sa automatycznie importowane.</p>

      <h2>Podsumowanie</h2>
      <p>Nuxt 3 to doskonaly wybor do budowania nowoczesnych aplikacji webowych. Jego doswiadczenie deweloperskie i optymalizacje wydajnosci czynia go topowym wyborem dla programistow Vue.js.</p>
    `,
    image: 'https://placehold.co/800x450/e2e8f0/475569?text=Nuxt+3+Guide',
    imageAlt: 'Logo Nuxt 3 z edytorem kodu w tle',
    author: 'Anna Kowalska',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
    publishedAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
    readingTime: 5,
    tags: ['nuxt', 'vue', 'javascript'],
  },
  {
    slug: 'tailwind-css-szybki-rozwoj-ui',
    title: 'Tailwind CSS dla szybkiego tworzenia interfejsow',
    description: 'Odkryj, jak Tailwind CSS moze przyspieszyc Twoj proces tworzenia i pomoc w szybkim budowaniu pieknych, responsywnych projektow.',
    content: `
      <p>Tailwind CSS zrewolucjonizowal sposob, w jaki programisci podchodza do stylowania. Zamiast pisac niestandardowy CSS, mozesz uzywac klas narzedzi bezposrednio w swoim HTML.</p>

      <h2>Podejscie utility-first</h2>
      <p>Podejscie Tailwind oparte na narzedziach oznacza, ze komponujesz swoje projekty uzywajac malych klas o pojedynczym przeznaczeniu. Prowadzi to do bardziej utrzymywalnego i spojnego kodu.</p>

      <h2>Responsywny design</h2>
      <p>Budowanie responsywnych ukladow z Tailwind jest niezwykle intuicyjne. Wystarczy poprzedzic swoje narzedzia modyfikatorami breakpointow, takimi jak sm:, md: lub lg:.</p>

      <h2>Personalizacja</h2>
      <p>Chociaz Tailwind ma rozsadne wartosci domyslne, jest wysoce konfigurowalny. Mozesz rozszerzyc motyw, dodac niestandardowe kolory i tworzyc wlasne narzedzia.</p>

      <h2>Podsumowanie</h2>
      <p>Tailwind CSS to potezne narzedzie, ktore moze znacznie przyspieszyc Twoj proces tworzenia, zachowujac jednoczesnie spojnosc projektu.</p>
    `,
    image: 'https://placehold.co/800x450/dbeafe/1e40af?text=Tailwind+CSS',
    imageAlt: 'Paleta kolorow Tailwind CSS i przyklady kodu',
    author: 'Jan Nowak',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jan',
    publishedAt: '2025-01-08T14:30:00Z',
    updatedAt: '2025-01-09T09:00:00Z',
    readingTime: 4,
    tags: ['tailwind', 'css', 'design'],
  },
  {
    slug: 'seo-najlepsze-praktyki-2025',
    title: 'Najlepsze praktyki SEO dla aplikacji webowych w 2025',
    description: 'Wyprzedz konkurencje dzieki tym niezbednym strategiom SEO dla nowoczesnych aplikacji webowych, w tym optymalizacji Core Web Vitals.',
    content: `
      <p>Optymalizacja dla wyszukiwarek ciagle ewoluuje, a rok 2025 przynosi nowe wyzwania i mozliwosci. Poznajmy najlepsze praktyki, ktore musisz znac.</p>

      <h2>Core Web Vitals</h2>
      <p>Core Web Vitals od Google pozostaja kluczowe dla SEO. Skup sie na tych trzech metrykach:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> Powinien byc ponizej 2.5 sekundy</li>
        <li><strong>FID (First Input Delay):</strong> Powinien byc ponizej 100 milisekund</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> Powinien byc ponizej 0.1</li>
      </ul>

      <h2>Semantyczny HTML</h2>
      <p>Uzywanie wlasciwych semantycznych elementow HTML pomaga wyszukiwarkom zrozumiec strukture Twojej tresci. Uzywaj odpowiednio tagow article, section, header i innych semantycznych.</p>

      <h2>Dane strukturalne</h2>
      <p>Implementacja danych strukturalnych JSON-LD pomaga wyszukiwarkom wyswietlac bogate wyniki dla Twojej tresci.</p>

      <h2>Podsumowanie</h2>
      <p>Przestrzeganie tych najlepszych praktyk SEO pomoze Twojej aplikacji webowej osiagnac wyzsza pozycje w wynikach i zapewnic lepsze doswiadczenie uzytkownika.</p>
    `,
    image: 'https://placehold.co/800x450/dcfce7/166534?text=SEO+2025',
    imageAlt: 'Strona wynikow wyszukiwania z panelem analitycznym',
    author: 'Anna Kowalska',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna',
    publishedAt: '2025-01-05T08:00:00Z',
    updatedAt: '2025-01-06T16:00:00Z',
    readingTime: 6,
    tags: ['seo', 'wydajnosc', 'web'],
  },
]

export const useBlogPosts = () => {
  const getAllPosts = (): BlogPost[] => {
    return blogPosts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find((post) => post.slug === slug)
  }

  const getLatestPosts = (count: number = 3): BlogPost[] => {
    return getAllPosts().slice(0, count)
  }

  const getRelatedPosts = (currentSlug: string, count: number = 2): BlogPost[] => {
    const currentPost = getPostBySlug(currentSlug)
    if (!currentPost) return []

    return blogPosts
      .filter((post) => post.slug !== currentSlug)
      .filter((post) => post.tags.some((tag) => currentPost.tags.includes(tag)))
      .slice(0, count)
  }

  return {
    getAllPosts,
    getPostBySlug,
    getLatestPosts,
    getRelatedPosts,
  }
}
