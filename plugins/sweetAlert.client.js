import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            sweet: {
                fire: async function (swalConfig) {
                    return Swal.fire(swalConfig)
                },
                alert: async function (text = '', config) {
                    const swalConfig = Object.assign({
                        title: '錯誤',
                        text,
                        icon: 'error',
                        confirmButtonText: '確認',
                        confirmButtonColor: '#5ea88e',
                        didOpen: () => {
                            Swal.hideLoading()
                        }
                    }, config)
                    return Swal.fire(swalConfig)
                },
                info: async (text, config) => {
                    const swalConfig = Object.assign({
                        title: '系統提示',
                        text,
                        icon: 'info',
                        confirmButtonText: '確認',
                        confirmButtonColor: '#5ea88e',
                        didOpen: () => {
                            Swal.hideLoading()
                        }
                    }, config)
                    return Swal.fire(swalConfig)
                },
                succeed: async function (config) {
                    const mergedConfig = Object.assign({
                        title: "完成",
                        icon: "success",
                        confirmButtonText: '確認',
                        confirmButtonColor: '#5ea88e',
                        timer: 2000,
                        didOpen: () => {
                            Swal.hideLoading()
                        }
                    }, config)
                    const alertResult = await Swal.fire(mergedConfig)
                    return alertResult
                },
                warning: async (text, config) => {
                    const swalConfig = Object.assign({
                        title: '警告',
                        text,
                        icon: 'warning',
                        confirmButtonText: '確認',
                        confirmButtonColor: '#5ea88e',
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        didOpen: () => {
                            Swal.hideLoading()
                        }
                    }, config)
                    return Swal.fire(swalConfig)
                },
                loader: async function (isOn, config = {}) {
                    if (isOn) {
                        const { title = '載入中', text = '', html} = config
                        Swal.fire({
                            title,
                            text,
                            html,
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            showConfirmButton: false,
                            didOpen: () => {
                                Swal.showLoading()
                            }
                        })
                    } else {
                        Swal.close()
                    }
                },
            },
        }
    }
})
