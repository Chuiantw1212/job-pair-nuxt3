import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'
const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find()
  const sitemap = new SitemapStream({
    hostname: config.public.origin
  })
  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: 'monthly'
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})