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
            url: `/chat/job/description/generate`,
            data,
            timeout: 180000,
        })
        return response
    }
    async function postChatJobSkillGenerate(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/job/skill/generate`,
            data,
            timeout: 180000,
        })
        return response
    } 
    async function postChatJdOptimize(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/job/description/optimize`,
            data,
            timeout: 180000,
        })
        return response
    }
    return {
        postChatProfile,
        postChatIntro,
        postChatJdGenerate,
        postChatJobSkillGenerate,
        postChatJdOptimize,
    }
})