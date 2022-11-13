import { defineStore } from 'pinia'
import { getAuth, } from "firebase/auth"
export default defineStore('auth', () => {
    const axios = useAxios()
    const state = reactive({
        user: null,
        company: null,
        isLogginIn: false
    })
    async function postSignin(data) {
        if (state.isLogginIn) {
            return
        }
        state.isLogginIn = true
        const response = await axios.request({
            method: 'post',
            url: `/auth/signIn`,
            data,
        })
        state.isLogginIn = false
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
    function setCompany(company) {
        state.company = company
    }
    return {
        state,
        postSignin,
        postVerificationEmail,
        getReauthResult,
        setUser,
        userSignout,
        setCompany,
    }
})