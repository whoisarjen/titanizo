import { prisma } from './prisma'

const ARTICLE_CHUNK_SIZE = 1000
const CATEGORY_CHUNK_SIZE = 500

// Build all category paths in memory efficiently (single DB query)
export async function getAllCategoryPaths(): Promise<Map<string, string>> {
  const categories = await prisma.category.findMany()
  const categoryMap = new Map<string, { slug: string; parentId: string | null }>()

  // Build lookup map
  categories.forEach((cat) => {
    categoryMap.set(cat.id, { slug: cat.slug, parentId: cat.parentId })
  })

  // Build paths for each category
  const pathMap = new Map<string, string>()

  const buildPath = (categoryId: string): string => {
    if (pathMap.has(categoryId)) {
      return pathMap.get(categoryId)!
    }

    const category = categoryMap.get(categoryId)
    if (!category) return ''

    if (category.parentId) {
      const parentPath = buildPath(category.parentId)
      const fullPath = `${parentPath}/${category.slug}`
      pathMap.set(categoryId, fullPath)
      return fullPath
    }

    pathMap.set(categoryId, category.slug)
    return category.slug
  }

  // Build all paths
  categories.forEach((cat) => buildPath(cat.id))

  return pathMap
}

// Get sitemap-ready article entries
export async function getArticleSitemapEntries(chunk: number = 0) {
  const categoryPaths = await getAllCategoryPaths()

  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
      publishedAt: {
        not: null,
        lte: new Date(),
      },
    },
    orderBy: { publishedAt: 'desc' },
    skip: chunk * ARTICLE_CHUNK_SIZE,
    take: ARTICLE_CHUNK_SIZE,
    select: {
      slug: true,
      categoryId: true,
      updatedAt: true,
    },
  })

  return articles.map((article) => {
    const categoryPath = categoryPaths.get(article.categoryId) || ''
    return {
      loc: `/blog/${categoryPath}/${article.slug}`,
      lastmod: article.updatedAt.toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.8,
    }
  })
}

// Get sitemap-ready category entries
export async function getCategorySitemapEntries(chunk: number = 0) {
  const categoryPaths = await getAllCategoryPaths()

  const categories = await prisma.category.findMany({
    skip: chunk * CATEGORY_CHUNK_SIZE,
    take: CATEGORY_CHUNK_SIZE,
    orderBy: { slug: 'asc' },
    select: { id: true },
  })

  return categories
    .map((cat) => {
      const path = categoryPaths.get(cat.id)
      if (!path) return null
      return {
        loc: `/blog/${path}`,
        changefreq: 'weekly' as const,
        priority: 0.6,
      }
    })
    .filter(Boolean)
}
