export default defineEventHandler(async () => {
  const articles = await prisma.article.findMany({
    where: {
      isPublished: true,
      publishedAt: {
        not: null,
        lte: new Date(),
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  // Build full paths for each article
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

  return articlesWithPaths
})
