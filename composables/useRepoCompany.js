import { defineStore } from 'pinia'
export default defineStore('company', () => {
    const jobPairApi = useJobPairApi()
    const state = reactive({
        companyJobsRes: null,
    })
    async function getCompanyWalletBalance() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/company/wallet/balance`,
        })
        return response
    }
    async function patchCompany(data) {
        const response = await jobPairApi.request({
            method: 'patch',
            url: `/company`,
            data
        })
        return response
    }
    async function getCompanyByTaxId(id) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/company/tax/${id}`,
        })
        return response
    }
    async function getCompanyAdmins() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/company/admins`,
        })
        return response.data
    }
    async function getCompanyById(id) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/company/${id}`,
        })
        return response
    }
    async function getCompanyByCrawler(data) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/company/crawler`,
            params: {
                url: data.url
            },
        })
        return response
    }
    async function getCompanyJobs(params) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/company/jobs`,
            params,
        })
        state.companyJobsRes = response.data
        return response
    }
    async function putCompanyPhotos(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/company/photos`,
            data
        })
        return response
    }
    async function getCompanyNews(params) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/company/${params.id}/news`,
            params,
        })
        return response
    }
    async function putCompanyLogoBlob(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/company/logo`,
            data
        })
        return response
    }
    async function putCompanyBannerBlob(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/company/banner`,
            data
        })
        return response
    }
    return {
        state,
        patchCompany,
        getCompanyById,
        getCompanyByTaxId,
        getCompanyByCrawler,
        getCompanyJobs,
        putCompanyPhotos,
        getCompanyNews,
        putCompanyLogoBlob,
        putCompanyBannerBlob,
        getCompanyWalletBalance,
        getCompanyAdmins
    }
})