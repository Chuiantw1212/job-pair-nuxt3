import axios from 'axios'
import Swal from 'sweetalert2'

export default function () {
    const config = useRuntimeConfig()
    const state = reactive({
        axiosInstance: axios.create({
            baseURL: 'https://api.line.me/v2/bot',
        }),
        token: null
    })
    function downloadErrorJSON(errorJSON, fileName) {
        /**
        * 用Blob創造與下載文件
        * https://codertw.com/ios/19926/
        */
        const blob = new Blob([JSON.stringify(errorJSON)], {
            type: "application/json"
        })
        const objectURL = window.URL.createObjectURL(blob)
        // Do things
        const link = document.createElement('a')
        link.href = objectURL
        link.download = `${fileName}.json`
        link.click()
        // Clear memory
        window.URL.revokeObjectURL(objectURL)
    }
    async function request(options) {
        const { method, url, data, params = {}, headers, } = options
        // Complete config
        const axiosConfig = {
            url,
            method,
            params,
            headers
        }
        if (data) {
            const dataCopy = JSON.parse(JSON.stringify(data))
            axiosConfig.data = dataCopy
        }
        let axiosResponse = null
        try {
            axiosResponse = await state.axiosInstance(axiosConfig)
        } catch (error) {
            const { config, response, } = error
            axiosResponse = response
            // 顯示錯誤訊息與下載錯誤檔案
            const errorConfig = {
                title: error.message,
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: true
            }
            if (response.status === 500) {
                Object.assign(errorConfig, {
                    text: response.data,
                })
            } else if (error.message !== 'Network Error') {
                const { statusText } = response
                downloadErrorJSON(config, statusText)
                Object.assign(errorConfig, {
                    title: response.statusText,
                    text: response.data.details,
                })
            }
            await Swal.fire(errorConfig)
        }
        const { status = '', statusText = '' } = axiosResponse
        return JSON.parse(JSON.stringify({
            data: axiosResponse.data,
            status,
            statusText
        }))
    }
    return {
        state,
        request
    }
}