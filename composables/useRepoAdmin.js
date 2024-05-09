import { defineStore } from 'pinia'
export default defineStore('admin', () => {
    const jobPairApi = useJobPairApi()
    async function getAdminCompany() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/admin/company`,
        })
        return response
    }
    async function getJobById(data) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/admin/job/${data.jobId}`,
        })
        return response
    }
    async function patchAdmin(data) {
        const response = await jobPairApi.request({
            method: 'patch',
            url: `/admin`,
            data
        })
        return response
    }
    async function postAdmin(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/admin`,
            data
        })
        return response
    }
    async function postAdminInvitation(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/admin/invitation`,
            data
        })
        return response
    }
    async function deleteAdmin(data) {
        const response = await jobPairApi.request({
            method: 'delete',
            url: `/admin`,
            data
        })
        return response.data
    }
    async function postAdminNewCompany(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/admin/company`,
            data
        })
        return response
    }
    async function deleteAdminCompany() {
        const response = await jobPairApi.request({
            method: 'delete',
            url: `/admin/company`,
        })
        return response
    }
    return {
        getAdminCompany,
        patchAdmin,
        postAdmin,
        postAdminNewCompany,
        deleteAdminCompany,
        getJobById,
        postAdminInvitation,
        deleteAdmin,
    }
})