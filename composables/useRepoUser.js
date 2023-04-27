import { defineStore } from 'pinia'
import firebase from "firebase"
export default defineStore('user', () => {
    const jobPairApi = useJobPairApi()
    async function deleteUser() {
        const auth = firebase.auth()
        if (!auth.currentUser) {
            return
        }
        const response = await jobPairApi.request({
            method: 'delete',
            url: `/user`,
        })
        return response
    }
    async function postUser(data) {
        const response = await jobPairApi.request({
            method: 'post',
            url: `/user`,
            data,
            commit: true,
        })
        return response
    }
    async function patchUserProfile(data) {
        const response = await jobPairApi.request({
            method: 'patch',
            url: `/user`,
            data
        })
        return response
    }
    async function putUserResume(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/user/${data.uid}/resume`,
            data: data.file,
            commit: true,
        })
        return response
    }
    async function putUserResumes(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/user/resumes`,
            data,
            commit: true,
        })
        return response
    }
    async function putUserCertificates(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/user/certificates`,
            data,
            commit: true,
        })
        return response
    }
    async function putUserPhoto(data) {
        const response = await jobPairApi.request({
            method: 'put',
            url: `/user/photo`,
            data,
        })
        return response
    }
    async function patchUserPreference(data) {
        const response = await jobPairApi.request({
            method: 'patch',
            url: `/user/preference`,
            data
        })
        return response
    }
    return {
        deleteUser,
        postUser,
        patchUserProfile,
        putUserResume,
        putUserResumes,
        putUserCertificates,
        putUserPhoto,
        patchUserPreference,
    }
})