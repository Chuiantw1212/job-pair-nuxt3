import { defineStore } from 'pinia'
export default defineStore('event', () => {
    const axios = useAxios()
    const state = reactive({

    })
    async function getEventSigned() {
        const response = await axios.request({
            method: 'get',
            url: `/event/registration`,
        })
        return response
    }
    async function postSignUp(data) {
        const response = await axios.request({
            method: 'post',
            url: `/event/registration`,
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