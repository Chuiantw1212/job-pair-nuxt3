import { defineStore } from 'pinia'
export default defineStore('event', () => {
    const axios = useAxios()
    const state = reactive({

    })
    async function getEventSigned() {
        const response = await axios.request({
            method: 'get',
            url: `/event`,
        })
        return response
    }
    async function postSignUp(data) {
        const response = await axios.request({
            method: 'post',
            url: `/event/signUp`,
            data,
        })
        return response
    }
    return {
        state,
        postSignUp,
        getEventSigned
    }
})