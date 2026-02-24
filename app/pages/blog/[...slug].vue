<template>
  <!-- Article View -->
  <article v-if="resolved?.type === 'article'">
    <nav v-if="resolved.breadcrumbs.length" class="mb-8">
      <ol class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 flex-wrap">
        <li>
          <NuxtLink to="/" class="hover:text-neutral-900 dark:hover:text-neutral-100">
            Strona glowna
          </NuxtLink>
        </li>
        <li v-for="crumb in resolved.breadcrumbs" :key="crumb.path" class="flex items-center gap-1.5">
          <span aria-hidden="true">/</span>
          <NuxtLink :to="crumb.path" class="hover:text-neutral-900 dark:hover:text-neutral-100">
            {{ crumb.name }}
          </NuxtLink>
        </li>
      </ol>
    </nav>

    <header class="mb-10">
      <div class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 mb-3">
        <span v-if="resolved.data.category">{{ resolved.data.category.name }}</span>
        <span v-if="resolved.data.category && resolved.data.publishedAt" aria-hidden="true">&middot;</span>
        <time v-if="resolved.data.publishedAt" :datetime="resolved.data.publishedAt">
          {{ formatDate(resolved.data.publishedAt) }}
        </time>
      </div>

      <h1 class="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight mb-3">
        {{ resolved.data.title || resolved.data.keyword }}
      </h1>

      <p v-if="resolved.data.description" class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {{ resolved.data.description }}
      </p>
    </header>

    <div
      v-if="resolved.data.content"
      class="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-p:leading-relaxed prose-a:underline-offset-2"
      v-html="renderedContent"
    />
    <p v-else class="text-sm text-neutral-400 dark:text-neutral-500 italic">
      Brak tresci artykulu.
    </p>
  </article>

  <!-- Category View -->
  <div v-else-if="resolved?.type === 'category'">
    <nav v-if="resolved.breadcrumbs.length" class="mb-8">
      <ol class="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 flex-wrap">
        <li>
          <NuxtLink to="/" class="hover:text-neutral-900 dark:hover:text-neutral-100">
            Strona glowna
          </NuxtLink>
        </li>
        <li v-for="(crumb, index) in resolved.breadcrumbs" :key="crumb.path" class="flex items-center gap-1.5">
          <span aria-hidden="true">/</span>
          <NuxtLink v-if="index < resolved.breadcrumbs.length - 1" :to="crumb.path" class="hover:text-neutral-900 dark:hover:text-neutral-100">
            {{ crumb.name }}
          </NuxtLink>
          <span v-else class="text-neutral-900 dark:text-neutral-100">{{ crumb.name }}</span>
        </li>
      </ol>
    </nav>

    <h1 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mb-8">
      {{ resolved.data.name }}
    </h1>

    <section v-if="resolved.children.length" class="mb-10">
      <h2 class="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
        Podkategorie
      </h2>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1">
        <NuxtLink
          v-for="child in resolved.children"
          :key="child.id"
          :to="`${currentPath}/${child.slug}`"
          class="py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          {{ child.name }}
        </NuxtLink>
      </div>
    </section>

    <section v-if="resolved.articles.length">
      <h2 class="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
        Artykuly
      </h2>
      <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
        <NuxtLink
          v-for="article in resolved.articles"
          :key="article.id"
          :to="`${currentPath}/${article.slug}`"
          class="group block py-3.5 first:pt-0"
        >
          <h3 class="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 mb-0.5">
            {{ article.title || article.keyword }}
          </h3>
          <p v-if="article.description" class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-1">
            {{ article.description }}
          </p>
          <time
            v-if="article.publishedAt"
            :datetime="article.publishedAt"
            class="text-xs text-neutral-400 dark:text-neutral-500"
          >
            {{ formatDate(article.publishedAt) }}
          </time>
        </NuxtLink>
      </div>

      <Pagination
        v-if="resolved.pagination"
        :page="resolved.pagination.page"
        :total-pages="resolved.pagination.totalPages"
        :base-url="currentPath"
      />
    </section>

    <div v-if="!resolved.children.length && !resolved.articles.length" class="py-16">
      <p class="text-sm text-neutral-400 dark:text-neutral-500">
        Brak artykulow w tej kategorii.
      </p>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="py-20">
    <h1 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
      Strona nie znaleziona
    </h1>
    <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
      Strona, ktorej szukasz, nie istnieje.
    </p>
    <NuxtLink
      to="/"
      class="text-sm text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-100"
    >
      Wroc do strony glownej
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

interface Breadcrumb {
  name: string
  slug: string
  path: string
}

interface ArticleData {
  id: string
  keyword: string
  slug: string
  title: string | null
  description: string | null
  content: string | null
  categoryId: string
  category: { id: string; name: string; slug: string } | null
  isPublished: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

interface CategoryData {
  id: string
  name: string
  slug: string
  parentId: string | null
}

interface CategoryChild {
  id: string
  name: string
  slug: string
}

interface CategoryArticle {
  id: string
  keyword: string
  slug: string
  title: string | null
  description: string | null
  publishedAt: string | null
}

interface Pagination {
  page: number
  totalPages: number
  total: number
}

type ResolvedContent =
  | { type: 'article'; data: ArticleData; breadcrumbs: Breadcrumb[] }
  | { type: 'category'; data: CategoryData; children: CategoryChild[]; articles: CategoryArticle[]; pagination: Pagination; breadcrumbs: Breadcrumb[] }
  | null

const route = useRoute()
const slugParts = route.params.slug as string[]
const currentPath = `/blog/${slugParts.join('/')}`

const page = computed(() => Number(route.query.page) || 1)

const { data: resolved, error } = await useFetch<ResolvedContent>('/api/resolve', {
  query: { path: slugParts.join('/'), page },
  watch: [page],
})

if (error.value || !resolved.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Strona nie znaleziona',
  })
}

const renderedContent = computed(() => {
  if (resolved.value?.type === 'article' && resolved.value.data.content) {
    return marked(resolved.value.data.content)
  }
  return ''
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const pageTitle = computed(() => {
  if (resolved.value?.type === 'article') {
    return `${resolved.value.data.title || resolved.value.data.keyword} | Titanizo`
  }
  if (resolved.value?.type === 'category') {
    return `${resolved.value.data.name} | Titanizo`
  }
  return 'Titanizo'
})

const pageDescription = computed(() => {
  if (resolved.value?.type === 'article') {
    return resolved.value.data.description || ''
  }
  if (resolved.value?.type === 'category') {
    return `Przegladaj artykuly w kategorii ${resolved.value.data.name}`
  }
  return ''
})

useSeoMeta({
  title: pageTitle.value,
  description: pageDescription.value,
  ogTitle: pageTitle.value,
  ogDescription: pageDescription.value,
  ogType: resolved.value?.type === 'article' ? 'article' : 'website',
})
</script>
