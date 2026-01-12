import { defineSitemapEventHandler } from '#imports'
import { getArticleSitemapEntries, getCategorySitemapEntries } from '../../utils/sitemap'

export default defineSitemapEventHandler(async () => {
  const [articles, categories] = await Promise.all([
    getArticleSitemapEntries(),
    getCategorySitemapEntries(),
  ])

  return [
    // Homepage
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
    },
    // All categories
    ...categories,
    // All articles
    ...articles,
  ]
})
