// import firebase from "firebase/app"
import { defineStore } from 'pinia'
// import { getAuth, } from "firebase/auth"
export default defineStore('auth', () => {
    const axios = useAxios()
    const state = reactive({
        isLogginIn: false
    })
    async function postSignin(data) {
        if (state.isLogginIn) {
            return
        }
        const response = await axios.request({
            method: 'post',
            url: `/auth/signIn`,
            data,
        })
        return response
    }
    async function postVerificationEmail(data) {
        const response = await axios.request({
            method: 'post',
            url: `/auth/verificationEmail`,
            data
        })
        return response
    }
    async function getReauthResult(data) {
        const response = await axios.request({
            method: 'get',
            url: `/auth/password`,
            data
        })
        return response
    }
    return {
        state,
        postSignin,
        postVerificationEmail,
        getReauthResult
    }
})