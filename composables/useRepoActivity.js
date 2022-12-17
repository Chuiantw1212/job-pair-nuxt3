import { defineStore } from 'pinia'
export default defineStore('activity', () => {
    const axios = useAxios()
    const state = reactive({

    })
    async function postSignUp(data) {
        const response = await axios.request({
            method: 'post',
            url: `/activity/signUp`,
            data,
        })
        return response
    }
    return {
        state,
        postSignUp,
    }
})