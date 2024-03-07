import axios from 'axios'
export default defineSitemapEventHandler(async (e) => {
    const config = useRuntimeConfig()
    const formatter = new Intl.DateTimeFormat('zh', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
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
    const urls: { loc: string, lastMod: string, }[] = []
    if (jobIdsResponse?.data?.length) {
        jobIdsResponse.data.forEach((item: { identifier: string, datePosted: string }) => {
            const urlItem: any = {
                loc: `/job/${item.identifier}`,
                lastmod: "",
            }
            const { datePosted = '' } = item
            if (datePosted) {
                const dateInstance = new Date(datePosted)
                urlItem.lastmod = formatter.format(dateInstance)
            }
            urls.push(urlItem)
        })
    }
    if (companyIdsResponse?.data?.length) {
        companyIdsResponse.data.forEach((item: { identifier: string, updatedDate: string }) => {
            const urlItem: any = {
                loc: `/job/${item.identifier}`,
                lastmod: "",
            }
            const { updatedDate = '' } = item
            if (updatedDate) {
                const dateInstance = new Date(updatedDate)
                urlItem.lastmod = formatter.format(dateInstance)
            }
            urls.push(urlItem)
        })
    }
    return urls
});
