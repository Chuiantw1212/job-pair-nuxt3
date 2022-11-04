<template>
    <div>
        <AtomBtnSimple @click="openModal()">
            應徵邀約
        </AtomBtnSimple>
        <div class="modal fade" :id="`invitation${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">應徵邀約</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">
                        <p class="text-center">若您點選「應徵邀約」，Job Pair 將會寄送職缺資訊給對方，邀請人選應徵。</p>
                        <AtomInputText v-model="state.form.subject" name="信件主旨"
                            :placeholder="'例如：XX公司面試邀約__王大雄__資深前端工程師'" required>
                        </AtomInputText>
                        <AtomInputCkeditor v-model="state.form.template" name="信件內容" :ref="'editorRef'" class="mt-3"
                            required>
                        </AtomInputCkeditor>
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <AtomBtnSimple class="footer__button" @click="handleSubmit()">確定</AtomBtnSimple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $uuid4, $rank, $validate, $toggleLoader, $succeed } = useNuxtApp()
const repoJobApplication = useRepoJobApplication()
const repoAuth = useRepoAuth()
const emit = defineEmits(['applied', 'update:modelValue'])
const router = useRouter()
const state = reactive({
    id: $uuid4(),
    bsModal: null,
    glideInstance: null,
    glideIndex: 0,
    resume: null,
    duration: "",
    schedules: [],
    form: {
        subject: "",
        template: "",
    }
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    },
    job: {
        type: Object,
        default: function () {
            return {}
        }
    }
})
// hooks
onMounted(() => {
    if (process.client) {
        const modelElement = document.getElementById(`invitation${state.id}`)
        if (!modelElement) {
            return
        }
        state.bsModal = new $bootstrap.Modal(modelElement, {
            keyboard: false,
            backdrop: "static",
        })
    }
})
// methods
const editorRef = ref(null)
function setInvitationTemplate() {
    const { company } = repoAuth.state
    if (!props.modelValue || !company) {
        return
    }
    const { similarity } = props.modelValue
    const formatSimilarity = $rank(similarity)
    const template =
        `${props.modelValue.name}您好：<br/>` +
        `我是${company.name}的招募人員，在Job Pair上看到您的個人簡介。<br/><br/>` +
        `透過適配度的演算，您與我們公司的職缺${props.job.name}適配度達${formatSimilarity}%，表示雙方在組織文化、風格與溝通模式有${formatSimilarity}%的契合度，因此主動寄送職缺資訊給您參考。<br/>` +
        `若您符合職缺所需的條件，也有進一步了解我們公司的興趣；歡迎回覆您的履歷，我們將會優先處理。<br/><br/>` +
        `招募人員${props.modelValue.name}敬上`
    state.form.subject = `${company.name}${props.job.name}應徵邀約`
    state.form.template = template
    editorRef.value.setData(template)
}
function openModal() {
    const { user } = repoAuth.state
    if (user && user.id) {
        setInvitationTemplate()
        state.bsModal.show()
    } else {
        router.push('index')
    }
}
const modalBodyRef = ref(null)
async function handleSubmit() {
    const form = modalBodyRef.value
    const result = await $validate(form)
    if (!result.isValid) {
        return
    }
    $toggleLoader(true)
    const submitData = Object.assign({}, state.form, {
        jobId: props.job.identifier,
        prospectId: props.modelValue.id,
    })
    const invitationRes = await repoJobApplication.postJobProspectInvitation(submitData)
    if (invitationRes.status !== 200) {
        return
    }
    const responseData = invitationRes.data
    const updated = Object.assign({}, props.modelValue, {
        applyFlow: responseData.applyFlow,
        invitedTime: responseData.invitedTime,
        jobId: props.job.identifier,
    })
    emit('update:modelValue', updated)
    const alertResult = await $succeed()
    if (alertResult) {
        state.bsModal.hide()
    }
}
</script>
<style lang="scss" scoped>
.modal-content {
    border-radius: 10px;

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
            border-radius: 10px;
            border: solid 1px #d9d9d9;
            overflow: hidden;
        }

        .body__fieldName {
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
                            border-radius: 10px;
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