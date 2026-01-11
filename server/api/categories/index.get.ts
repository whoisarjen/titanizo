interface CategoryTree {
  id: string
  name: string
  slug: string
  childrenCount: number
  children: CategoryTree[]
}

// Recursive function to build category tree
function buildCategoryTree(category: any): CategoryTree {
  const children = category.children || []
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    childrenCount: children.length,
    children: children.map(buildCategoryTree),
  }
}

export default defineEventHandler(async () => {
  // Fetch all categories at once
  const allCategories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  console.log(`[API] Total categories in DB: ${allCategories.length}`)

  // Build a map for quick lookup
  const categoryMap = new Map<string, any>()
  allCategories.forEach((cat) => {
    categoryMap.set(cat.id, { ...cat, children: [] })
  })

  // Build the tree structure
  const rootCategories: any[] = []
  allCategories.forEach((cat) => {
    const category = categoryMap.get(cat.id)!
    if (cat.parentId) {
      const parent = categoryMap.get(cat.parentId)
      if (parent) {
        parent.children.push(category)
      }
    } else {
      rootCategories.push(category)
    }
  })

  // Sort children at each level
  const sortChildren = (cats: any[]) => {
    cats.sort((a, b) => a.name.localeCompare(b.name))
    cats.forEach((cat) => sortChildren(cat.children))
  }
  sortChildren(rootCategories)

  const result = rootCategories.map(buildCategoryTree)

  // Debug: count max depth
  const getMaxDepth = (cats: CategoryTree[], depth = 0): number => {
    if (!cats.length) return depth
    return Math.max(...cats.map((c) => getMaxDepth(c.children, depth + 1)))
  }
  console.log(`[API] Max depth: ${getMaxDepth(result)}`)
  console.log(`[API] Root categories: ${result.map((c) => c.name).join(', ')}`)

  return result
})
