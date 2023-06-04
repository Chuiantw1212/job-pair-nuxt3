import { defineStore } from 'pinia'
export default defineStore('chat', () => {
    const { $sweet, } = useNuxtApp()
    const jobPairApi = useJobPairApi()
    async function postChatProfile(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/profile`,
            data,
            timeout: 180000,
        })
        return response
    }
    async function postChatIntro(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/intro`,
            data,
            timeout: 180000,
        })
        return response
    }
    async function postChatJdGenerate(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/jobDescription/generate`,
            data,
            timeout: 180000,
        })
        return response
    }
    async function postChatJobDescription(data) {
        const { content = '' } = data
        const dataBlob = new Blob([content])
        if (dataBlob.size >= 2000) {
            await $sweet.alert('內容限制約700字元。')
            return
        }
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/jobDescription`,
            data,
            timeout: 180000,
            maxBodyLength: 2,
        })
        return response
    }
    return {
        postChatProfile,
        postChatJobDescription,
        postChatIntro,
        postChatJdGenerate,
    }
})