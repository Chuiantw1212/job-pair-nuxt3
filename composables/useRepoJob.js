// import firebase from "firebase/app"
import { defineStore } from 'pinia'
export default defineStore('job', () => {
    const axios = useAxios()
    const state = reactive({
        jobRecommendedRes: null,
    })
    async function getJobCrawlResult(params) {
        const response = await axios.request({
            method: 'get',
            url: `/job/crawler`,
            params
        })
        return response
    }
    async function getJobRecommended() {
        const response = await axios.request({
            method: 'get',
            url: `/job/recommended`,
        })
        state.jobRecommendedRes = response.data
        return response
    }
    async function getJobById(data) {
        let url = `/job/${data.jobId}`
        if (data.userId) {
            url += `/${data.userId}`
        }
        const response = await axios.request({
            method: 'get',
            url,
        })
        return response
    }
    async function getJobAll(params) {
        const response = await axios.request({
            method: 'get',
            url: `/job/all`,
            params,
        })
        return response
    }
    async function postJobItem(data) {
        const response = await axios.request({
            method: 'post',
            url: `/job`,
            data
        })
        return response
    }
    async function putJobItem(data) {
        const response = await axios.request({
            method: 'put',
            url: `/job`,
            data
        })
        return response
    }
    async function deleteJobItem(data) {
        const response = await axios.request({
            method: 'delete',
            url: `/job`,
            data,
        })
        return response
    }
    async function getJobApplicantByQuery(data) {
        const response = await axios.request({
            method: 'get',
            url: `/job/${data.jobId}/applicant/${data.prospectId}`,
        })
        return response
    }
    async function getJobProspect(data) {
        const response = await axios.request({
            method: 'get',
            url: `/job/${data.jobIdentifier}/prospect`,
            params: {
                similairy: data.similairy / 100,
                workLocation: data.workLocation
            }
        })
        return response
    }
    async function getJobProspectProfile(data) {
        const response = await axios.request({
            method: 'get',
            url: `/job/${data.jobId}/prospect/${data.prospectId}`,
        })
        return response
    }
    return {
        state,
        getJobCrawlResult,
        getJobRecommended,
        getJobById,
        getJobAll,
        postJobItem,
        putJobItem,
        deleteJobItem,
        getJobApplicantByQuery,
        getJobProspect,
        getJobProspectProfile
    }
})