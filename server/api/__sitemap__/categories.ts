import { defineSitemapEventHandler } from '#imports'
import { getQuery } from 'h3'
import { getCategorySitemapEntries } from '../../utils/sitemap'

export default defineSitemapEventHandler(async (event) => {
  const query = getQuery(event)
  const chunk = Number(query.chunk ?? 0)

  return getCategorySitemapEntries(chunk)
})
