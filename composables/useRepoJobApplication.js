import { defineStore } from 'pinia'
export default defineStore('user', () => {
    const axios = useAxios()
    const state = reactive({
        userJobs: {},
    })
    async function getApplicationByQuery(params) {
        const response = await axios.request({
            method: 'get',
            url: `/jobApplication`,
            params,
        })
        return response
    }
    async function patchJobApplicant(data) {
        const response = await axios.request({
            method: 'patch',
            url: `/jobApplication/${data.jobId}/${data.applicantId}`,
            data,
        })
        return response
    }
    async function patchJobVisibility(data) {
        const response = await axios.request({
            method: 'patch',
            url: `/jobApplication`,
            data
        })
        if (response.status === 200) {
            const targetJob = state.userJobs[data.jobId]
            const jobCopy = JSON.parse(JSON.stringify(targetJob))
            jobCopy.visibility = 'hidden'
            const { jobId, } = jobCopy
            state.userJobs[jobId] = job
        }
        return response
    }
    async function getUserJobs(payload) {
        const { userId } = payload
        const response = await axios.request({
            method: 'get',
            url: `/jobApplication/${userId}/jobs`,
        })
        if (response.status === 200) {
            const jobs = response.data
            jobs.forEach(item => {
                const { jobId, } = item
                state.userJobs[jobId] = job
            })
        }
        return response
    }
    async function postJobSaved(payload) {
        const { userId, jobId } = payload
        const response = await axios.request({
            method: 'post',
            url: `/jobApplication/${userId}/jobSaved/${jobId}`,
        })
        if (response.status === 200) {
            const job = response.data
            const { jobId, } = job
            state.userJobs[jobId] = job
        }
        return response
    }
    async function deleteJobSaved(data) {
        const { userId, jobId } = data
        const response = await axios.request({
            method: 'delete',
            url: `/jobApplication/${userId}/jobSaved/${jobId}`,
        })
        if (response.status === 200) {
            delete state.userJobs[jobId]
        }
        return response
    }
    async function postJobApplication(data) {
        const response = await axios.request({
            method: 'post',
            url: `/jobApplication/${data.jobId}/application`,
            data,
        })
        if (response.status === 200) {
            const job = response.data
            const { jobId, } = job
            state.userJobs[jobId] = job
        }
        return response
    }
    async function postJobProspectInvitation(data) {
        const response = await axios.request({
            method: 'post',
            url: `/jobApplication/${data.jobId}/prospect/${data.prospectId}/invitation`,
            data,
        })
        return response
    }
    return {
        state,
        getApplicationByQuery,
        patchJobApplicant,
        patchJobVisibility,
        getUserJobs,
        postJobSaved,
        deleteJobSaved,
        postJobApplication,
        postJobProspectInvitation,
    }
})