import axios from 'axios'
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default function () {
    const { $sweet, $firebaseApp } = useNuxtApp()
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
    async function request(options) {
        let auth = null
        if (process.client) {
            auth = await new Promise((resolve) => {
                const step = function () {
                    try {
                        const auth = getAuth($firebaseApp)
                        resolve(auth)
                    } catch (error) {
                        window.requestAnimationFrame(step)
                    }
                }
                step()
            })
        }
        const { method, url, data, params = {}, headers, commit = false, timeout = config.public.axiosTimeout, responseType = 'json' } = options
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
            responseType,
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
        }
        const { status = '', statusText = '' } = axiosResponse
        // 不可多用JSON.parse(JSON.stringify())，造成blob解析異常
        return {
            data: axiosResponse.data,
            status,
            statusText
        }
    }
    return {
        state,
        setToken,
        request
    }
}