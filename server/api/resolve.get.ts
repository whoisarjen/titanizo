export default defineEventHandler(async (event) => {
  const { path } = getQuery(event)

  if (!path || typeof path !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Path is required',
    })
  }

  const slugs = path.split('/').filter(Boolean)

  if (slugs.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid path',
    })
  }

  const lastSlug = slugs.at(-1)!
  const categorySlugPath = slugs.slice(0, -1)

  // 1. Try to find as article (last segment is article slug)
  const article = await prisma.article.findFirst({
    where: {
      slug: lastSlug,
      isPublished: true,
      publishedAt: {
        not: null,
        lte: new Date(),
      },
    },
    include: { category: true },
  })

  if (article) {
    // Validate that the category path matches
    const articleCategoryPath = await getCategoryFullPath(article.categoryId)

    // Check if the provided category path matches the article's category path
    const pathMatches =
      categorySlugPath.length === articleCategoryPath.length &&
      categorySlugPath.every((slug, index) => slug === articleCategoryPath[index])

    if (pathMatches) {
      const breadcrumbs = await buildCategoryBreadcrumbs(article.categoryId)
      return {
        type: 'article' as const,
        data: {
          id: article.id,
          keyword: article.keyword,
          slug: article.slug,
          title: article.title,
          description: article.description,
          content: article.content,
          categoryId: article.categoryId,
          category: article.category,
          isPublished: article.isPublished,
          publishedAt: article.publishedAt?.toISOString() || null,
          createdAt: article.createdAt.toISOString(),
          updatedAt: article.updatedAt.toISOString(),
        },
        breadcrumbs,
      }
    }
  }

  // 2. Try to find as category (all segments form category path)
  const category = await findCategoryByPath(slugs)

  if (category) {
    const page = Math.max(1, Number(getQuery(event).page) || 1)
    const limit = 12
    const skip = (page - 1) * limit

    const articleWhere = {
      categoryId: category.id,
      isPublished: true,
      publishedAt: {
        not: null,
        lte: new Date(),
      },
    } as const

    // Get articles, total count, and children in parallel
    const [articles, totalArticles, children, breadcrumbs] = await Promise.all([
      prisma.article.findMany({
        where: articleWhere,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where: articleWhere }),
      prisma.category.findMany({
        where: { parentId: category.id },
        orderBy: { name: 'asc' },
      }),
      buildCategoryBreadcrumbs(category.id),
    ])

    return {
      type: 'category' as const,
      data: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
      },
      children: children.map((child) => ({
        id: child.id,
        name: child.name,
        slug: child.slug,
      })),
      articles: articles.map((article) => ({
        id: article.id,
        keyword: article.keyword,
        slug: article.slug,
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt?.toISOString() || null,
      })),
      pagination: {
        page,
        totalPages: Math.ceil(totalArticles / limit),
        total: totalArticles,
      },
      breadcrumbs,
    }
  }

  // Nothing found
  return null
})
