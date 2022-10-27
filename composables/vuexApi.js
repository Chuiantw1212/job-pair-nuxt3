import axios from 'axios'
import store from '@/store/index.js'
import Swal from 'sweetalert2'
export default class VuexApi {
    constructor(config,) {
        const { baseURL = '' } = config
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 20 * 60 * 1000,
        })
    }
    downloadErrorJSON(errorJSON, fileName) {
        /**
         * 用Blob創造與下載文件
         * https://codertw.com/ios/19926/
         */
        if (process.client) {
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
    }
    async request(type, options) {
        /**
         * 正式取得API
         * Extract Type
         * before replace: type == 'post'SaveStockAlert
         * after replace: type == ''SaveStockAlert
         * httpMethod == post
         */
        let method = 'post'
        let replacedType = ''
        try {
            replacedType = type.replace(/get|post|put|delete|patch/, (httpMethod) => {
                method = httpMethod
                return ""
            })
        } catch (error) {
            // eslint-disable-next-line
            alert('錯誤的type嗎?', type)
        }
        /**
         * Build up axios config
         * replacedType == SaveStockAlert
         */
        const { url, data, params = {}, headers, commit = false } = options
        const baseHeaders = {
            'Content-Type': 'application/json',
        }
        const headersFinale = Object.assign(baseHeaders, headers)
        // Complete config
        const axiosConfig = {
            url,
            method,
            params,
            headers: headersFinale
        }
        if (data) {
            const dataCopy = JSON.parse(JSON.stringify(data))
            axiosConfig.data = dataCopy
        }
        let axiosResponse = null
        try {
            // eslint-disable-next-line
            // console.time(`${url}請求`)
            axiosResponse = await this.axiosInstance(axiosConfig)
            // eslint-disable-next-line
            // console.timeEnd(`${url}請求`)
        } catch (error) {
            const { config, request, response, isAxiosError, toJSON, message = '' } = error
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
                this.downloadErrorJSON(config, statusText)
                Object.assign(errorConfig, {
                    title: response.statusText,
                    text: response.data.details,
                })
            }
            await Swal.fire(errorConfig)
        } finally {
            /**
             * Commit response to store state at once
             * replacedType = SaveStockAlert
             * mutationName = setSaveStockAlert
             * @type {config, data, headers, request, status, statusText} axiosResponse
             * @type {AP, Data, IsSuccessful, Message, ResultCode, WarningMessage} sswResponse
             */
            // eslint-disable-next-line
            // console.time(`${url}轉譯`)
            if (commit && axiosResponse && axiosResponse.data) {
                const deepCopy = JSON.parse(JSON.stringify(axiosResponse.data))
                const sswResponse = deepCopy
                const mutationName = `set${replacedType}Res`
                store.commit(mutationName, sswResponse)
            }
            // eslint-disable-next-line
            // console.timeEnd(`${url}轉譯`)
        }
        const { status = '', statusText = '' } = axiosResponse
        return JSON.parse(JSON.stringify({
            data: axiosResponse.data,
            status,
            statusText
        }))
    }
}