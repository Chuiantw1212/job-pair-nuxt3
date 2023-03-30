import { defineStore } from 'pinia'
export default defineStore('event', () => {
    const jobPairApi = useJobPairApi()
    const state = reactive({

    })
    async function getEvent(data) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/event/${data.id}`,
        })
        return response
    }
    async function getEventRegistered() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/event/registration`,
        })
        return response
    }
    async function postEventRegistration(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/event/registration/${data.eventId}`,
            data,
        })
        return response
    }
    return {
        state,
        postEventRegistration,
        getEventRegistered,
        getEvent
    }
})