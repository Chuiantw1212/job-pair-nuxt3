import { defineStore } from 'pinia'
export default defineStore('chat', () => {
    const jobPairApi = useJobPairApi()
    async function postChatProfile(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/profile`,
            data,
        })
        return response
    }
    async function postChatJobDescription(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/jobDescription`,
            data,
        })
        return response
    }
    return {
        postChatProfile,
        postChatJobDescription,
    }
})