import { defineStore } from 'pinia'
export default defineStore('company', () => {
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
    async function getItem() {
        const response = await jobPairApi.request({
            method: 'get',
            url: `/organization/design`,
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
        getItem,
        putItem,
        putAsset,
    }
})