import { defineStore } from 'pinia'
import { getAuth, } from "firebase/auth"
export default defineStore('user', () => {
    const state = reactive({
        user: null,
    })
    async function deleteUser() {
        const auth = getAuth()
        if (!auth.currentUser) {
            return
        }
        const response = await apiDefault.request({
            method: 'delete',
            url: `/user`,
        })
        return response
    }
    async function postUser(data) {
        const response = await apiDefault.request({
            method: 'post',
            url: `/user`,
            data,
            commit: true,
        })
        return response
    }
    async function patchUserProfile(data) {
        const response = await apiDefault.request({
            method: 'patch',
            url: `/user`,
            data
        })
        return response
    }
    async function putUserResume(data) {
        const response = await apiDefault.request({
            method: 'put',
            url: `/user/${data.uid}/resume`,
            data: data.file,
            commit: true,
        })
        return response
    }
    async function putUserResumes(data) {
        const response = await apiDefault.request({
            method: 'put',
            url: `/user/resumes`,
            data,
            commit: true,
        })
        return response
    }
    async function putUserPhoto(data) {
        const response = await apiDefault.request({
            method: 'put',
            url: `/user/photo`,
            data,
        })
        return response
    }
    async function patchUserPreference(data) {
        const response = await apiDefault.request({
            method: 'patch',
            url: `/user/preference`,
            data
        })
        return response
    }
    async function userSignout() {
        try {
            localStorage.removeItem("user")
            const auth = getAuth()
            if (auth) {
                await auth.signOut()
            }
            setUser(null)
            return true
        } catch (error) {
            alert(error.message || error)
        }
    }
    function setUser(user) {
        state.user = user
    }
    return {
        state,
        userSignout,
        deleteUser,
        postUser,
        patchUserProfile,
        putUserResume,
        putUserResumes,
        putUserPhoto,
        patchUserPreference,
        userSignout,
        setUser
    }
})