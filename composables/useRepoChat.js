import { defineStore } from 'pinia'
export default defineStore('chat', () => {
    const axios = useAxios()
    async function postChatEssay(data) {
        const response = await axios.request({
            method: 'post',
            url: `/chat/essay`,
            data,
        })
        return response
    }
    return {
        postChatEssay,
    }
})