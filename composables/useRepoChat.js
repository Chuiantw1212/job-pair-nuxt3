import { defineStore } from 'pinia'
export default defineStore('chat', () => {
    const jobPairApi = useJobPairApi()
    async function postChatEssay(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/essay`,
            data,
        })
        return response
    }
    return {
        postChatEssay,
    }
})