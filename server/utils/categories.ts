import type { Category } from '@prisma/client'

// Build full slug path for a category (e.g., ["kuchnia", "zlewozmywaki", "granitowe"])
export async function getCategoryFullPath(categoryId: string): Promise<string[]> {
  const path: string[] = []
  let current = await prisma.category.findUnique({ where: { id: categoryId } })

  while (current) {
    path.unshift(current.slug)
    if (current.parentId) {
      current = await prisma.category.findUnique({ where: { id: current.parentId } })
    } else {
      break
    }
  }
  return path
}

// Find category by traversing slug path array
export async function findCategoryByPath(slugs: string[]): Promise<Category | null> {
  let currentCategory: Category | null = null

  for (const slug of slugs) {
    const category = await prisma.category.findFirst({
      where: {
        slug,
        parentId: currentCategory?.id ?? null,
      },
    })
    if (!category) return null
    currentCategory = category
  }

  return currentCategory
}

// Build breadcrumbs from category ID (includes full path with URLs)
export async function buildCategoryBreadcrumbs(categoryId: string): Promise<Array<{ name: string; slug: string; path: string }>> {
  const breadcrumbs: Array<{ name: string; slug: string; path: string }> = []
  let current = await prisma.category.findUnique({ where: { id: categoryId } })

  while (current) {
    breadcrumbs.unshift({ name: current.name, slug: current.slug, path: '' })
    if (current.parentId) {
      current = await prisma.category.findUnique({ where: { id: current.parentId } })
    } else {
      break
    }
  }

  // Build paths for each breadcrumb
  let cumulativePath = '/blog'
  for (const crumb of breadcrumbs) {
    cumulativePath += `/${crumb.slug}`
    crumb.path = cumulativePath
  }

  return breadcrumbs
}

// Get the full URL path for an article
export async function getArticleFullPath(articleSlug: string, categoryId: string): Promise<string> {
  const categoryPath = await getCategoryFullPath(categoryId)
  return `/blog/${categoryPath.join('/')}/${articleSlug}`
}
