import { defineStore } from 'pinia'
export default defineStore('admin', () => {
    const axios = useAxios()
    async function getAdminCompany() {
        const response = await axios.request({
            method: 'get',
            url: `/admin/company`,
        })
        return response
    }
    async function patchAdmin(data) {
        const response = await axios.request({
            method: 'patch',
            url: `/admin`,
            data
        })
        return response
    }
    async function postAdmin(data) {
        const response = await axios.request({
            method: 'post',
            url: `/admin`,
            data
        })
        return response
    }
    async function postAdminNewCompany(data) {
        const response = await axios.request({
            method: 'post',
            url: `/admin/company`,
            data
        })
        return response
    }
    return {
        getAdminCompany,
        patchAdmin,
        postAdmin,
        postAdminNewCompany
    }
})