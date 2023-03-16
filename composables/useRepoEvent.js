import { defineStore } from 'pinia'
export default defineStore('event', () => {
    const jobPairApi = useJobPairApi()
    const state = reactive({

    })
    async function getEventSigned() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/event`,
        })
        return response
    }
    async function postSignUp(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/event/signUp`,
            data,
        })
        return response
    }
    return {
        state,
        postSignUp,
        getEventSigned
    }
})