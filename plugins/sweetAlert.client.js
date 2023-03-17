import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            sweet: {
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
                succeed: async function (text, config) {
                    const alertResult = await Swal.fire({
                        title: "完成",
                        text,
                        icon: "success",
                        confirmButtonText: '確認',
                        confirmButtonColor: '#5ea88e',
                        didOpen: () => {
                            Swal.hideLoading()
                        }
                    })
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
                loader: async function (isOn) {
                    if (isOn) {
                        Swal.fire({
                            title: '載入中',
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
