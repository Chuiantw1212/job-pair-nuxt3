import { defineStore } from 'pinia'
export default defineStore('line', () => {
    const lineApi = useLineApi()
    async function issueLinkToken(data) {
        const response = await lineApi.request({
            method: 'post',
            url: `/user/${data.userId}/linkToken`,
        })
        return response
    }
    return {
        issueLinkToken,
    }
})