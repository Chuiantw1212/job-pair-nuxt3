import { defineStore } from 'pinia'
export default defineStore('company', () => {
    const jobPairApi = useJobPairApi()
    // const state = reactive({
    //     companyJobsRes: null,
    // })
    async function postOrganizationDesign(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/organization/design`,
            data
        })
        return response
    }
    return {
        // state,
        postOrganizationDesign,
    }
})