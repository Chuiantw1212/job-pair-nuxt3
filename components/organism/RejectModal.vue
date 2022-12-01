<template>
    <div>
        <LazyAtomBtnSimple class="modal__button" @click="handleReject()" :disabled="getBtnDisabled()">
            婉拒
        </LazyAtomBtnSimple>
        <div class="modal fade" :id="`reject${state.id}`" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">婉拒信件</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">
                        <LazyAtomInputText v-model="state.form.subject" name="信件主旨"
                            :placeholder="'例如：XX公司面試邀約__王大雄__資深前端工程師'" required>
                        </LazyAtomInputText>
                        <LazyAtomInputCkeditor v-model="state.form.template" name="信件內容" :toolbar="[]" :ref="'templateRef'"
                            class="mt-3" required>
                        </LazyAtomInputCkeditor>
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <LazyAtomBtnSimple class="footer__button" @click="sendRejectLetter()">送出</LazyAtomBtnSimple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $uuid4, $validate, $sweet } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoJob = useRepoJob()
const repoJobApplication = useRepoJobApplication()
const router = useRouter()
const emit = defineEmits(['update:modelValue'])
const currentInstance = getCurrentInstance()
const state = reactive({
    id: $uuid4(),
    job: null,
    editModal: null,
    form: {
        subject: '',
        template: '',
    },
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    }
})
onMounted(() => {
    if (process.client) {
        const editableElement = document.getElementById(`reject${state.id}`)
        if (!editableElement) {
            return
        }
        state.editModal = new $bootstrap.Modal(editableElement, {
            keyboard: false,
            backdrop: "static",
        })
    }
})
// methods
function getBtnDisabled() {
    const { user } = repoAuth.state
    return !user || !user.id
}
async function handleReject() {
    const { user, company } = repoAuth.state
    if (user && user.id) {
        // 先取得職缺相關資訊
        if (!state.job) {
            const jobResponse = await repoJob.getJobById({
                jobId: props.modelValue.jobId,
            })
            if (jobResponse.status !== 200) {
                return
            }
            state.job = jobResponse.data
        }
        // set data
        state.editModal.show()
        const companyName = company.name
        const jobName = state.job.name
        state.form.subject = `${companyName}${jobName}應徵回覆`
        // Header
        const applicantName = props.modelValue.name
        const defaultTemplate = `
                    ${applicantName} 您好<br>
                    我是${company.name}的招募窗口，收到您應徵「${props.modelValue.jobName}」一職。<br>
                    經過第一輪的評估，目前暫不考慮安排面試；未來若有其他合適職務，我們會再與您聯繫。<br>
                    <br>
                    感謝您的應徵！
                `
        state.form.template = defaultTemplate
        const templateEditor = currentInstance.refs.templateRef
        templateEditor.setData(state.form.template)
    } else {
        router.push('/')
    }
}
async function sendRejectLetter() {
    const form = currentInstance.refs.modalBodyRef
    const result = await $validate(form)
    if (!result.isValid) {
        return
    }
    // 更新申請文件
    const { user } = repoAuth.state
    const application = Object.assign({}, props.modelValue, state.form, {
        applicantId: props.modelValue.applicantId,
        jobId: props.modelValue.jobId,
        adminUid: user.uid,
        applyFlow: 'rejected',
    })
    // 送出申請
    const patchResult = await repoJobApplication.patchJobApplicant(application)
    if (patchResult.status === 200) {
        await $sweet.succeed()
        state.editModal.hide()
        const updatedResult = Object.assign({}, application, patchResult.data)
        emit('update:modelValue', updatedResult)
    }
}
</script>
<style lang="scss" scoped>
.modal__button {
    padding: 13px 16px;
    background-color: white;
    border: 1px solid #5ea88e;
    color: #5ea88e;

    &:hover {
        border: 1px solid #21cc90;
        color: #21cc90;
        background-color: white;
    }
}

.modal-content {
    border-radius: 4px;

    .modal-header {
        border: none;
        position: relative;
        text-align: center;

        .modal-title {
            width: 100%;
            font-weight: bold;
        }

        .btn-close {
            position: absolute;
            right: 24px;
            top: 24px;
        }
    }

    .modal-body {
        padding: 0 50px 30px 50px;

        .body__ckeditor {
            border-radius: 4px;
            overflow: hidden;
        }

        .body__fieldName {
            font-size: 16px;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.4;
            letter-spacing: normal;
            text-align: left;
            color: #1f1f1f;
            white-space: nowrap;
        }

        .body__hint {
            text-align: center;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.25;
            letter-spacing: 0.48px;
            text-align: center;
            color: #595959;
            width: 100%;
            margin-top: 17px;
        }

        .body__list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;

            .body__list__item {
                .body__list__item__content {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .content__header {
                        font-size: 16px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.4;
                        letter-spacing: normal;
                        text-align: left;
                        color: #1f1f1f;
                        white-space: nowrap;
                    }

                    .content__timePickerGroup {
                        display: flex;
                        flex-direction: column;
                        height: 54px;
                        margin-left: 32px;
                        width: 100%;

                        .timePickerGroup__timePicker {
                            padding: 16px 24px;
                            border: 1px solid #d9d9d9;
                            border-radius: 4px;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.25;
                            letter-spacing: 0.48px;
                            text-align: left;
                            color: #1f1f1f;

                            .picker__input {
                                border: none;

                                &:focus {
                                    outline: none;
                                }
                            }
                        }
                    }

                    .content__duration {
                        margin-left: 8px;
                    }
                }
            }
        }
    }

    .modal-footer {
        border: none;

        .footer__buttonGroup {
            display: flex;
            gap: 16px;

            .footer__button {
                width: 120px;
            }
        }
    }
}
</style>