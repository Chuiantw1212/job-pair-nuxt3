import { SitemapStream, streamToPromise } from 'sitemap'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import axios from 'axios'
interface jobSitemapItem {
  identifier: string;
  datePosted: string;
}
interface companySitemapItem {
  id: string;
  updatedDate: string;
}
const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const sitemap = new SitemapStream({ hostname: config.public.origin })
  sitemap.write({ url: config.public.origin, changefreq: 'monthly' })
  sitemap.write({ url: `${config.public.origin}/admin`, changefreq: 'monthly' })
  sitemap.write({ url: `${config.public.origin}/about`, changefreq: 'monthly' })
  // add dynamic routing
  const axiosInstance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 20 * 60 * 1000,
  })
  const [jobIdsResponse, companyIdsResponse] = await Promise.all([
    axiosInstance({
      method: 'get',
      url: '/job/sitemap',
    }),
    axiosInstance({
      method: 'get',
      url: '/company/sitemap',
    }),
  ])
  jobIdsResponse.data.forEach((item: jobSitemapItem) => {
    sitemap.write({
      url: `/job/${item.identifier}`,
      lastmod: item.datePosted,
    })
  })
  companyIdsResponse.data.forEach((item: companySitemapItem) => {
    sitemap.write({
      url: `/company/${item.id}`,
      lastmod: item.updatedDate,
    })
  })
  sitemap.end()
  return streamToPromise(sitemap)
})

/**
 * recursively get all files from /pages folder
 */
function getFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  })
  return files.flat()
}