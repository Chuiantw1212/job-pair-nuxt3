import { defineStore } from 'pinia'
export default defineStore('consult', () => {
    const jobPairApi = useJobPairApi()
    async function getConsultants() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/consult/consultant`,
        })
        return response
    }
    async function getConsultantById(id) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/consult/consultant/${id}`,
        })
        return response
    }
    async function patchUnpaidRecord(id) {
        const response = await jobPairApi.request({
            method: 'patch',
            url: `/consult/records/${id}`,
        })
        return response.data
    }
    async function postConsultAppointment(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/consult/appointment`,
            data
        })
        return response
    }
    async function getConsultRecords(params) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/consult/records`,
            params,
        })
        return response
    }
    return {
        getConsultants,
        getConsultantById,
        postConsultAppointment,
        getConsultRecords,
        patchUnpaidRecord,
    }
})