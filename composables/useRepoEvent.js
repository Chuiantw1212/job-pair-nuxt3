import { defineStore } from 'pinia'
export default defineStore('event', () => {
    const jobPairApi = useJobPairApi()
    const state = reactive({
        eventId: null,
        contributor: null,
    })
    async function getEvent(data) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/event/${data.id}`,
        })
        return response
    }
    async function getEventRegistered(data) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/event/${data.eventId}/registration`,
        })
        return response
    }
    async function postEventRegistration(data) {
        try {
            const { eventId = '' } = data
            if (!eventId) {
                throw 'eventId未提供'
            }
            const response = await jobPairApi.request({
                method: 'post',
                url: `/event/${eventId}/registration`,
                data,
            })
            return response
        } catch (error) {
            console.dir(error)
        }
    }
    return {
        state,
        postEventRegistration,
        getEventRegistered,
        getEvent
    }
})