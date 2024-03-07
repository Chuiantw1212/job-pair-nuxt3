export default defineSitemapEventHandler(async (e) => {
    const formatter = new Intl.DateTimeFormat('zh', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    const [jobIdsResponse, companyIdsResponse]: any[] = await Promise.all([
        $fetch('http://localhost:8080/job/sitemap'),
        $fetch('http://localhost:8080/company/sitemap'),
    ])
    const urls: { loc: string, lastMod: string, }[] = []
    jobIdsResponse.forEach((item: { identifier: string, datePosted: string }) => {
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
    companyIdsResponse.forEach((item: { identifier: string, updatedDate: string }) => {
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
    return urls
});
