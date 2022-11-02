import { defineStore } from 'pinia'
export default defineStore('company', () => {
    const axios = useAxios()
    const state = {
        companyJobsRes: null,
    }
    async function patchCompany(data) {
        const response = await axios.request({
            method: 'patch',
            url: `/company`,
            data
        })
        return response
    }
    async function getCompanyById(id) {
        const response = await axios.request({
            method: 'get',
            url: `/company/${id}`,
            commit: true,
        })
        return response
    }
    async function getCompanyByCrawler(data) {
        const response = await axios.request({
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
        const response = await axios.request({
            method: 'get',
            url: `/company/jobs`,
            params,
        })
        state.companyJobsRes = response.data
        return response
    }
    async function putCompanyPhotos(data) {
        const response = await axios.request({
            method: 'put',
            url: `/company/photos`,
            data
        })
        return response
    }
    async function getCompanyNews(params) {
        const response = await axios.request({
            method: 'get',
            url: `/company/${params.id}/news`,
            params,
        })
        return response
    }
    async function putCompanyLogoBlob(data) {
        const response = await axios.request({
            method: 'put',
            url: `/company/logo`,
            data
        })
        return response
    }
    async function putCompanyBannerBlob(data) {
        const response = await axios.request({
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
        getCompanyByCrawler,
        getCompanyJobs,
        putCompanyPhotos,
        getCompanyNews,
        putCompanyLogoBlob,
        putCompanyBannerBlob,
    }
})