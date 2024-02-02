import { defineStore } from 'pinia'
export default defineStore('article', () => {
    const jobPairApi = useJobPairApi()
    async function getAllArticles() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/article/all`,
        })
        return response
    }
    return {
        getAllArticles
    }
})