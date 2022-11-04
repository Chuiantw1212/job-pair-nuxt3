import { defineStore } from 'pinia'
import { getAuth, } from "firebase/auth"
export default defineStore('user', () => {
    const axios = useAxios()
    async function deleteUser() {
        const auth = getAuth()
        if (!auth.currentUser) {
            return
        }
        const response = await axios.request({
            method: 'delete',
            url: `/user`,
        })
        return response
    }
    async function postUser(data) {
        const response = await axios.request({
            method: 'post',
            url: `/user`,
            data,
            commit: true,
        })
        return response
    }
    async function patchUserProfile(data) {
        const response = await axios.request({
            method: 'patch',
            url: `/user`,
            data
        })
        return response
    }
    async function putUserResume(data) {
        const response = await axios.request({
            method: 'put',
            url: `/user/${data.uid}/resume`,
            data: data.file,
            commit: true,
        })
        return response
    }
    async function putUserResumes(data) {
        const response = await axios.request({
            method: 'put',
            url: `/user/resumes`,
            data,
            commit: true,
        })
        return response
    }
    async function putUserPhoto(data) {
        const response = await axios.request({
            method: 'put',
            url: `/user/photo`,
            data,
        })
        return response
    }
    async function patchUserPreference(data) {
        const response = await axios.request({
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
        putUserPhoto,
        patchUserPreference,
    }
})