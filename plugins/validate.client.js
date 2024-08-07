import Swal from 'sweetalert2'
export default defineNuxtPlugin(nuxtApp => {
    const { $emitter } = nuxtApp
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
                // allRequiredInputs.forEach(input => {
                //     console.log(input.dataset.name,)
                //     // const inputId = input.dataset.id || input.id
                //     // if (inputId) {
                //     //     $emitter.emit(`validate-${inputId}`)
                //     // }
                // })
                const invalidFields = allRequiredInputs.filter((input) => {
                    // 從dataset來的資料會有false
                    const formValue = input.dataset.value || input.value
                    const isEmpty = ['null', null, 'undefined', undefined, 'false'].includes(formValue) || !String(formValue).trim()
                    const isInvalid = ['null', null, 'false', false].includes(input.dataset.valid)
                    return isEmpty || isInvalid
                })
                // 顯示彈跳視窗
                let alertResult = { value: 1 } // 永遠預設為通過
                if (invalidFields.length && config.icon) {
                    // For each invalid fields emit validation
                    const emptyFieldNames = invalidFields.map(item => {
                        return item.dataset.name
                    })
                    const fieldString = emptyFieldNames.join(', ')
                    const text = `"${fieldString}"有誤`
                    const swalConfig = Object.assign({
                        text,
                        confirmButtonText: '確認',
                        confirmButtonColor: '#5ea88e',
                    }, config)
                    alertResult = await Swal.fire(swalConfig)
                    setTimeout(() => {
                        invalidFields[0].scrollIntoView({ block: "center", });
                    }, 500)
                }
                // 回傳驗證結果
                const numer = allRequiredInputs.length - invalidFields.length
                const deno = allRequiredInputs.length
                const completeness = Math.floor(numer / deno * 100)
                const result = {
                    isValid: !invalidFields.length,
                    completeness,
                    value: alertResult.value
                }
                return result
            }
        }
    }
})
