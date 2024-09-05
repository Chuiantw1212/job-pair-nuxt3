import { defineStore } from 'pinia'
export default defineStore('organizationSubscription', () => {
    const jobPairApi = useJobPairApi()
    async function postSubscription(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/organization/subscription`,
            data
        })
        return response
    }
    return {
        postSubscription,
    }
})