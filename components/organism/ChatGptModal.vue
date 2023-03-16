<template>
    <div class="chatGptModal">
        <LazyAtomBtnSimple @click="openModal()">
            一鍵優化
        </LazyAtomBtnSimple>
        <div class="modal fade" :id="`beforeModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-fullscreen modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">一鍵優化</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">
                        <LazyAtomInputCkeditor v-model="state.beforeChatGpt" name="修改前" class="mt-3" :toolbar="[]"
                            ref="beforeChatGpt">
                        </LazyAtomInputCkeditor>
                        <LazyAtomInputCkeditor v-model="state.afterChatGpt" name="修改後" ref="afterChatGpt" class="mt-3">
                        </LazyAtomInputCkeditor>
                        <!-- </div> -->
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <LazyAtomBtnSimple class="footer__button" @click="handleOptimization()">優化</LazyAtomBtnSimple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="modal fade" :id="`afterModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">ChatGPT回應</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">

                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <LazyAtomBtnSimple class="footer__button" @click="handleConfirm()">確定</LazyAtomBtnSimple>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script setup>
/**
 * 
您好！我叫朱奕安，很高興有這個機會面試貴公司的業務職位。我二○一二年畢業於中興大學行銷系。台中人。
畢業之後，我就一直在普鴻公司從事業務工作。在將近四年的時間裡，我一步步走到了業務主管的職位。在這過程中，我開發了將近十個大客戶，年平均銷售額三百萬元，在公司排名第二。面試這個職位，我覺得我的優勢有以下三點：第一點，溝通能力強，能夠順利地和客戶打交道；第二點，抗壓能力強，能夠承受高業績帶來的壓力，並且調節好自己的情緒；第三點，有過成功的大客戶開發經驗，擅長專案管理。
我非常欣賞貴公司的企業文化，而且這個職位也是我非常喜歡的，希望能夠有機會進入公司，謝謝。
*/
const { $bootstrap, $uuid4, $sweet, $requestSelector, } = useNuxtApp()
const repoJobApplication = useRepoJobApplication()
const repoAuth = useRepoAuth()
const repoChat = useRepoChat()
const emit = defineEmits(['applied', 'update:modelValue'])
const router = useRouter()
const state = reactive({
    id: null,
    beforeModal: null,
    afterModal: null,
    glideInstance: null,
    glideIndex: 0,
    resume: null,
    duration: "",
    schedules: [],
    form: {
        subject: "",
        template: "",
    },
    beforeChatGpt: '',
    afterChatGpt: '',
})
const props = defineProps({
    modelValue: {
        type: String,
        default: function () {
            return ''
        }
    },
})
const currentInstance = getCurrentInstance()
// hooks
watch(() => props.modelValue, (newValue) => {
    state.afterChatGpt = ''
    state.beforeChatGpt = newValue
    const beforeChatGpt = currentInstance.refs.beforeChatGpt
    if (beforeChatGpt) {
        beforeChatGpt.setData(newValue)
    }
}, { immediate: true, deep: true })
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        state.beforeChatGpt = props.modelValue
        $requestSelector(`#beforeModal${state.id}`, (modelElement) => {
            state.beforeModal = new $bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
        // $requestSelector(`#afterModal${state.id}`, (modelElement) => {
        //     state.afterModal = new $bootstrap.Modal(modelElement, {
        //         keyboard: false,
        //         backdrop: "static",
        //     })
        // })
    }
})
// methods
async function sendOptimizeRequest() {
    $sweet.loader(true)
    const res = await repoChat.postChatEssay(state.beforeChatGpt)
    if (res.status !== 200) {
        return
    }
    $sweet.loader(false)
    state.afterChatGpt = res.data
    const ckEditor = currentInstance.refs.afterChatGpt
    if (ckEditor) {
        ckEditor.setData(res.data)
    } else {
        console.log('Error trying to setInvitationTemplate: ', ckEditor);
    }
}
function setInvitationTemplate() {
    // const { company } = repoAuth.state
    // if (!props.modelValue || !company) {
    //     return
    // }
    // const { similarity } = props.modelValue
    // const formatSimilarity = $rank(similarity)
    // const template =
    //     `${props.modelValue.name}您好：<br/>` +
    //     `我是${company.name}的招募人員，在Job Pair上看到您的個人簡介。<br/><br/>` +
    //     `透過適配度的演算，您與我們公司的職缺${props.job.name}適配度達${formatSimilarity}%，表示雙方在組織文化、風格與溝通模式有${formatSimilarity}%的契合度，因此主動寄送職缺資訊給您參考。<br/>` +
    //     `若您符合職缺所需的條件，也有進一步了解我們公司的興趣；歡迎回覆您的履歷，我們將會優先處理。<br/><br/>` +
    //     `招募人員${repoAuth.state.user.name}敬上`
    // // state.form.subject = `${company.name}${props.job.name}應徵邀約`
    // state.form.template = template
    // if (afterChatGpt.value) {
    //     afterChatGpt.value.setData(template)
    // } else {
    //     console.log('Error trying to setInvitationTemplate: ', afterChatGpt);
    // }
}
async function setBeforeEssay() {

}
async function handleConfirm() {
    state.beforeModal.hide()
}
async function openModal() {
    // state.afterChatGpt = props.modelValue
    state.beforeModal.show()

    // sendOptimizeRequest()
    // if (!props.modelValue || props.modelValue === '<p></p>') {
    //     return
    // }
    // const res = await repoChat.postChatEssay(props.modelValue)
    // if (res.status === 200) {
    // }
}
const modalBodyRef = ref(null)
async function handleOptimization() {
    await sendOptimizeRequest()
    // state.beforeModal.hide()
    // state.afterModal.show()
    // const form = modalBodyRef.value
    // const result = await $validate(form)
    // if (!result.isValid) {
    //     return
    // }
    // $sweet.loader(true)
    // const submitData = Object.assign({}, state.form, {
    //     jobId: props.job.identifier,
    //     prospectId: props.modelValue.id,
    // })
    // const invitationRes = await repoJobApplication.postJobProspectInvitation(submitData)
    // if (invitationRes.status !== 200) {
    //     return
    // }
    // const responseData = invitationRes.data
    // const updated = Object.assign({}, props.modelValue, {
    //     applyFlow: responseData.applyFlow,
    //     invitedTime: responseData.invitedTime,
    //     jobId: props.job.identifier,
    // })
    // emit('update:modelValue', updated)
    // const alertResult = await $sweet.succeed()
    // if (alertResult) {
    // }
    // state.beforeModal.hide()
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
        display: flex;
        flex-wrap: nowrap;

        .chatGptModal__before {
            border: 1px solid black;
            border-radius: 8px;
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