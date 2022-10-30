import Swal from 'sweetalert2'
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            validate: async (element, config = { title: '錯誤', icon: 'error' }) => {
                if (!process.client) {
                    return
                }
                if (!element) {
                    element = document
                }
                const selects = element.getElementsByTagName("select")
                const inputs = element.getElementsByTagName("input")
                const textareas = element.getElementsByTagName('textarea')
                const allFormInputs = [...inputs, ...selects, ...textareas]
                const allRequiredInputs = allFormInputs.filter(item => {
                    return item.dataset.required == 'true'
                })
                const nullable = ['null', null, 'undefined', undefined, '', false, 'false']
                const emptyFields = allRequiredInputs.filter((input, index) => {
                    const formValue = input.dataset.value || input.value
                    return nullable.includes(formValue) || !String(formValue).trim()
                })
                const emptyFieldNames = emptyFields.map(item => {
                    return item.dataset.name
                })
                // 顯示彈跳視窗
                let alertResult = { value: 1 } // 永遠預設為通過
                if (emptyFieldNames.length && config.icon) {
                    const fieldString = emptyFieldNames.join(', ')
                    const text = `${fieldString}未填寫`
                    const swalConfig = Object.assign({
                        text,
                        confirmButtonText: '確認',
                        confirmButtonColor: '#5ea88e',
                    }, config)
                    alertResult = await Swal.fire(swalConfig)
                }
                // 回傳驗證結果
                const numer = allRequiredInputs.length - emptyFields.length
                const deno = allRequiredInputs.length
                const completeness = Math.floor(numer / deno * 100)
                const result = {
                    isValid: !emptyFieldNames.length,
                    completeness,
                    value: alertResult.value
                }
                return result
            }
        }
    }
})
