export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 12))
  const skip = (page - 1) * limit

  const where = {
    isPublished: true,
    publishedAt: {
      not: null,
      lte: new Date(),
    },
  } as const

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.article.count({ where }),
  ])

  const articlesWithPaths = await Promise.all(
    articles.map(async (article) => {
      const fullPath = await getArticleFullPath(article.slug, article.categoryId)
      return {
        id: article.id,
        keyword: article.keyword,
        slug: article.slug,
        title: article.title,
        description: article.description,
        categoryId: article.categoryId,
        category: article.category,
        isPublished: article.isPublished,
        publishedAt: article.publishedAt?.toISOString() || null,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
        path: fullPath,
      }
    })
  )

  return {
    articles: articlesWithPaths,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
})
