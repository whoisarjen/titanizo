import { prisma } from './prisma'

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
export async function getArticleSitemapEntries() {
  const categoryPaths = await getAllCategoryPaths()

  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
      publishedAt: {
        not: null,
        lte: new Date(),
      },
    },
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
export async function getCategorySitemapEntries() {
  const categoryPaths = await getAllCategoryPaths()

  return Array.from(categoryPaths.values()).map((path) => ({
    loc: `/blog/${path}`,
    changefreq: 'weekly' as const,
    priority: 0.6,
  }))
}
