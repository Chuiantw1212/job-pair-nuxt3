import { defineStore } from 'pinia'
export default defineStore('consult', () => {
    const axios = useAxios()
    async function getConsultants() {
        const response = await axios.request({
            method: 'get',
            url: `/consult/consultant`,
        })
        return response
    }
    async function getConsultantById(id) {
        const response = await axios.request({
            method: 'get',
            url: `/consult/consultant/${id}`,
        })
        return response
    }
    async function postConsultAppointment(data) {
        const response = await axios.request({
            method: 'post',
            url: `/consult/appointment`,
            data
        })
        return response
    }
    async function getConsultRecords(params) {
        const response = await axios.request({
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
        getConsultRecords
    }
})