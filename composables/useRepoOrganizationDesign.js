import { defineStore } from 'pinia'
export default defineStore('organizationDesign', () => {
    const jobPairApi = useJobPairApi()
    async function putAsset(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/organization/design/asset`,
            data
        })
        return response
    }
    async function postItem(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/organization/design`,
            data
        })
        return response
    }
    async function getDraft({ organizationId }) {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/organization/${organizationId}/design/draft`,
        })
        return response
    }
    async function putItem(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/organization/design`,
            data,
        })
        return response
    }
    return {
        // state,
        postItem,
        getDraft,
        putItem,
        putAsset,
    }
})