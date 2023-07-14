import { defineStore } from 'pinia'
export default defineStore('chat', () => {
    const { $sweet, } = useNuxtApp()
    const jobPairApi = useJobPairApi()
    async function postChatIntroOptimize(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/intro/optimize`,
            data,
            timeout: 180000,
        })
        return response
    }
    async function postChatIntroGenerate(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/chat/intro/generate`,
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
    async function postChatJobContent(type, data) {
        switch (type) {
            case 'description': {
                const response = await jobPairApi.request({
                    method: 'post',
                    url: `/chat/job/description/optimize`,
                    data,
                    timeout: 180000,
                })
                return response
            }
            case 'skills': {
                const response = await jobPairApi.request({
                    method: 'post',
                    url: `/chat/job/skill/optimize`,
                    data,
                    timeout: 180000,
                })
                return response
            }
            default: {
                if (process.client) {
                    alert('postChatJobContent type exception')
                    return
                }
            }
        }
    }
    return {
        postChatIntroOptimize,
        postChatIntroGenerate,
        postChatJdGenerate,
        postChatJobSkillGenerate,
        postChatJobContent,
    }
})