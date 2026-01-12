<template>
  <!-- Article View -->
  <article v-if="resolved?.type === 'article'" class="p-6 lg:p-8">
    <!-- Breadcrumbs -->
    <nav v-if="resolved.breadcrumbs.length" class="mb-6">
      <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <li>
          <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">
            Strona glowna
          </NuxtLink>
        </li>
        <li v-for="(crumb, index) in resolved.breadcrumbs" :key="crumb.path" class="flex items-center gap-2">
          <span aria-hidden="true" class="text-gray-300 dark:text-gray-600">/</span>
          <NuxtLink
            v-if="index < resolved.breadcrumbs.length"
            :to="crumb.path"
            class="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {{ crumb.name }}
          </NuxtLink>
        </li>
      </ol>
    </nav>

    <!-- Article Header -->
    <header class="mb-8">
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span v-if="resolved.data.category" class="text-gray-600 dark:text-gray-400">
          {{ resolved.data.category.name }}
        </span>
        <template v-if="resolved.data.publishedAt">
          <span v-if="resolved.data.category" aria-hidden="true">&middot;</span>
          <time :datetime="resolved.data.publishedAt">
            {{ formatDate(resolved.data.publishedAt) }}
          </time>
        </template>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
        {{ resolved.data.title || resolved.data.keyword }}
      </h1>

      <p v-if="resolved.data.description" class="text-gray-600 dark:text-gray-400 leading-relaxed">
        {{ resolved.data.description }}
      </p>
    </header>

    <!-- Article Content -->
    <div
      v-if="resolved.data.content"
      class="prose prose-gray dark:prose-invert max-w-none"
      v-html="renderedContent"
    />
    <div v-else class="prose prose-gray dark:prose-invert max-w-none">
      <p class="text-gray-500 dark:text-gray-400 italic">
        Brak tresci artykulu.
      </p>
    </div>
  </article>

  <!-- Category View -->
  <div v-else-if="resolved?.type === 'category'" class="p-6 lg:p-8">
    <!-- Breadcrumbs -->
    <nav v-if="resolved.breadcrumbs.length" class="mb-6">
      <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <li>
          <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">
            Strona glowna
          </NuxtLink>
        </li>
        <li v-for="(crumb, index) in resolved.breadcrumbs" :key="crumb.path" class="flex items-center gap-2">
          <span aria-hidden="true" class="text-gray-300 dark:text-gray-600">/</span>
          <template v-if="index < resolved.breadcrumbs.length - 1">
            <NuxtLink :to="crumb.path" class="hover:text-gray-900 dark:hover:text-white transition-colors">
              {{ crumb.name }}
            </NuxtLink>
          </template>
          <span v-else class="text-gray-900 dark:text-white font-medium">
            {{ crumb.name }}
          </span>
        </li>
      </ol>
    </nav>

    <!-- Category Header -->
    <header class="mb-8">
      <h1 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
        {{ resolved.data.name }}
      </h1>
    </header>

    <!-- Subcategories -->
    <section v-if="resolved.children.length" class="mb-8">
      <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
        Podkategorie
      </h2>
      <div class="grid grid-cols-2 gap-2">
        <NuxtLink
          v-for="child in resolved.children"
          :key="child.id"
          :to="`${currentPath}/${child.slug}`"
          class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            {{ child.name }}
          </span>
        </NuxtLink>
      </div>
    </section>

    <!-- Articles in category -->
    <section v-if="resolved.articles.length">
      <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
        Artykuly
      </h2>
      <div class="divide-y divide-gray-100 dark:divide-gray-800">
        <NuxtLink
          v-for="article in resolved.articles"
          :key="article.id"
          :to="`${currentPath}/${article.slug}`"
          class="block py-4 first:pt-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 -mx-2 px-2 rounded transition-colors"
        >
          <h3 class="font-medium text-gray-900 dark:text-white mb-1">
            {{ article.title || article.keyword }}
          </h3>
          <p v-if="article.description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ article.description }}
          </p>
          <time
            v-if="article.publishedAt"
            :datetime="article.publishedAt"
            class="text-xs text-gray-500 dark:text-gray-500 mt-2 block"
          >
            {{ formatDate(article.publishedAt) }}
          </time>
        </NuxtLink>
      </div>
    </section>

    <!-- Empty state -->
    <div v-if="!resolved.children.length && !resolved.articles.length" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">
        Brak artykulow w tej kategorii.
      </p>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="p-6 lg:p-8 text-center py-16">
    <h1 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Strona nie znaleziona
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Strona, ktorej szukasz, nie istnieje.
    </p>
    <NuxtLink
      to="/"
      class="text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-4"
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

type ResolvedContent =
  | { type: 'article'; data: ArticleData; breadcrumbs: Breadcrumb[] }
  | { type: 'category'; data: CategoryData; children: CategoryChild[]; articles: CategoryArticle[]; breadcrumbs: Breadcrumb[] }
  | null

const route = useRoute()
const slugParts = route.params.slug as string[]
const currentPath = `/blog/${slugParts.join('/')}`

// Fetch resolved content
const { data: resolved, error } = await useFetch<ResolvedContent>('/api/resolve', {
  query: { path: slugParts.join('/') },
})

if (error.value || !resolved.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Strona nie znaleziona',
  })
}

// Render markdown content
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

// SEO
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
