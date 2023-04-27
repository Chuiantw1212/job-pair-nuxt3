import axios from 'axios'
import firebase from "firebase"
console.log({
    firebase
});

export default function () {
    const { $sweet, } = useNuxtApp()
    const config = useRuntimeConfig()
    const state = reactive({
        axiosInstance: axios.create({
            baseURL: config.public.apiBase,
        }),
        token: null
    })
    function setToken(token) {
        state.token = token
    }
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
        let auth = null
        if (process.client) {
            auth = await new Promise((resolve) => {
                const step = function () {
                    try {
                        let auth = getAuth()
                        resolve(auth)
                    } catch (error) {
                        window.requestAnimationFrame(step)
                    }
                }
                step()
            })
        }
        const { method, url, data, params = {}, headers, commit = false, timeout = config.axiosTimeout, } = options
        const baseHeaders = {
            'Content-Type': 'application/json',
        }
        if (auth && auth.currentUser) {
            state.token = await auth.currentUser.getIdToken()
        }
        if (state.token) {
            baseHeaders.Authorization = `Bearer ${state.token}`
        }
        const headersFinale = Object.assign(baseHeaders, headers)
        // Complete config
        const axiosConfig = {
            url,
            method,
            params,
            headers: headersFinale,
            timeout,
        }
        if (data) {
            const dataCopy = JSON.parse(JSON.stringify(data))
            axiosConfig.data = dataCopy
        }
        let axiosResponse = null
        try {
            // eslint-disable-next-line
            // console.time(`${url}請求`)
            axiosResponse = await state.axiosInstance(axiosConfig)
            // eslint-disable-next-line
            // console.timeEnd(`${url}請求`)
        } catch (error) {
            const { config = { data: {} }, request, response = {}, isAxiosError, toJSON, message = '' } = error
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
            } else {
                Object.assign(errorConfig, {
                    title: response.data.error,
                    text: response.data.message,
                })
            }
            const errorText = {
                "baseURL": config.baseURL,
                "url": config.url,
                "method": config.method,
                "params": config.params,
                "data": config.data,
            }
            await $sweet.alert(JSON.stringify(errorText), errorConfig)
        } finally {
            // /**
            //  * Commit response to store state at once
            //  * replacedType = SaveStockAlert
            //  * mutationName = setSaveStockAlert
            //  * @type {config, data, headers, request, status, statusText} axiosResponse
            //  * @type {AP, Data, IsSuccessful, Message, ResultCode, WarningMessage} sswResponse
            //  */
            // // eslint-disable-next-line
            // // console.time(`${url}轉譯`)
            // if (commit && axiosResponse && axiosResponse.data) {
            //     const deepCopy = JSON.parse(JSON.stringify(axiosResponse.data))
            //     const sswResponse = deepCopy
            //     const mutationName = `set${replacedType}Res`
            //     store.commit(mutationName, sswResponse)
            // }
            // // eslint-disable-next-line
            // // console.timeEnd(`${url}轉譯`)
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
        setToken,
        request
    }
}