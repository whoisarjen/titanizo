export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required',
    })
  }

  const article = await prisma.article.findFirst({
    where: {
      slug,
      isPublished: true,
      publishedAt: {
        not: null,
        lte: new Date(),
      },
    },
    include: {
      category: true,
    },
  })

  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article not found',
    })
  }

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
  }
})
