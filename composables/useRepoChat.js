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
    async function postChatJobSkillGenerate(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/jobSkills/generate`,
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
    }
})