import { defineStore } from 'pinia'
export default defineStore('company', () => {
    const state = reactive({
        company: null,
    })
    async function patchCompany(data) {
        const response = await apiDefault.request({
            method: 'patch',
            url: `/company`,
            data
        })
        return response
    }
    async function getCompanyById(id) {
        const response = await apiDefault.request({
            method: 'get',
            url: `/company/${id}`,
            commit: true,
        })
        return response
    }
    async function getCompanyByCrawler(data) {
        const response = await apiDefault.request({
            method: 'get',
            url: `/company/crawler`,
            params: {
                url: data.url
            },
            commit: true,
        })
        return response
    }
    async function getCompanyJobs(params) {
        const response = await apiDefault.request({
            method: 'get',
            url: `/company/jobs`,
            params,
            commit: true,
        })
        return response
    }
    async function putCompanyPhotos(data) {
        const response = await apiDefault.request({
            method: 'put',
            url: `/company/photos`,
            data
        })
        return response
    }
    async function getCompanyNews(params) {
        const response = await apiDefault.request({
            method: 'get',
            url: `/company/${params.id}/news`,
            params,
        })
        return response
    }
    async function putCompanyLogoBlob(data) {
        const response = await apiDefault.request({
            method: 'put',
            url: `/company/logo`,
            data
        })
        return response
    }
    async function putCompanyBannerBlob(data) {
        const response = await apiDefault.request({
            method: 'put',
            url: `/company/banner`,
            data
        })
        return response
    }
    function setCompany(company) {
        state.company = company
    }
    return {
        state,
        patchCompany,
        getCompanyById,
        getCompanyByCrawler,
        getCompanyJobs,
        putCompanyPhotos,
        getCompanyNews,
        putCompanyLogoBlob,
        putCompanyBannerBlob,
        setCompany,
    }
})