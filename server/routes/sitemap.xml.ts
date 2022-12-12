import { SitemapStream, streamToPromise } from 'sitemap'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import axios from 'axios'
const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const sitemap = new SitemapStream({ hostname: config.public.origin })
  // works on nuxt build
  const staticEndpoints = getStaticEndpoints()
  const disabledRoutes = ['admin/', '[', ']', 'questions/', 'user']
  for (const staticEndpoint of staticEndpoints) {
    const isPublicRoute = disabledRoutes.every(keyword => {
      return !staticEndpoint.includes(keyword)
    })
    if (isPublicRoute) {
      sitemap.write({ url: staticEndpoint, changefreq: 'monthly' })
    }
  }
  // add dynamic routing
  const axiosInstance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 20 * 60 * 1000,
  })
  const [jobIdsResponse, companyIdsResponse] = await Promise.all([
    axiosInstance({
      method: 'get',
      url: '/job/ids',
    }),
    axiosInstance({
      method: 'get',
      url: '/company/ids',
    }),
  ])
  jobIdsResponse.data.forEach((id: String) => {
    sitemap.write({
      url: `/job/${id}`,
      changefreq: 'monthly'
    })
  })
  companyIdsResponse.data.forEach((id: String) => {
    sitemap.write({
      url: `/company/${id}`,
      changefreq: 'monthly'
    })
  })
  sitemap.end()
  return streamToPromise(sitemap)
})

function getStaticEndpoints(): string[] {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const files = getFiles(`${__dirname}/../../pages`)
  return files
    .filter((file) => !file.includes('slug')) // exclude dynamic content
    .map((file) => file.split('pages')[1])
    .map((file) => {
      return file.endsWith('index.vue') ? file.split('/index.vue')[0] : file.split('.vue')[0]
    })
}

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