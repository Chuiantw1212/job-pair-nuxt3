<template>
    <div class="chatGptModal">
        <LazyAtomBtnSimple class="chatGptModal__btn" @click="openModal()">
            <img class="me-1" src="./Frame.svg" alt="icon">
            一鍵優化
        </LazyAtomBtnSimple>
        <div class="modal fade" :id="`chatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">一鍵優化</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="handleClose()"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">
                        <LazyAtomInputCkeditor v-model="state.beforeChatGpt" :name="`${name}修改前`" class="mt-3" :toolbar="[]"
                            ref="beforeChatGpt" :style="{ 'height': '324px' }">
                        </LazyAtomInputCkeditor>
                        <div class="text-center my-1">優美的文字值得等待，優化時間需幾分鐘</div>
                        <LazyAtomBtnSimple class="modal__btn" @click="handleOptimization()">開始優化</LazyAtomBtnSimple>
                        <LazyAtomInputCkeditor class="mt-3" v-model="state.afterChatGpt" :name="`${name}修改後`"
                            ref="afterChatGpt" :style="{ 'height': '324px' }">
                        </LazyAtomInputCkeditor>
                        <!-- </div> -->
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <LazyAtomBtnSimple class="buttonGroup__btn" outline @click="handleClose()">取消
                            </LazyAtomBtnSimple>
                            <LazyAtomBtnSimple class="buttonGroup__btn" @click="handleConfirm()">修改後套用內文
                            </LazyAtomBtnSimple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
const emit = defineEmits(['applied', 'update:modelValue', 'request'])
const router = useRouter()
const state = reactive({
    id: null,
    chatModal: null,
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
    name: {
        type: String,
        default: ''
    },
    chatRequest: {
        type: Function,
        default: function () {
            return false
        }
    }
})
const currentInstance = getCurrentInstance()
// hooks
watch(() => props.modelValue, (newValue) => {
    state.beforeChatGpt = newValue
    const beforeChatGpt = currentInstance.refs.beforeChatGpt
    if (beforeChatGpt) {
        beforeChatGpt.setData(newValue)
    }
    state.afterChatGpt = ''
}, { immediate: true, deep: true })
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        state.beforeChatGpt = props.modelValue
        $requestSelector(`#chatModal${state.id}`, (modelElement) => {
            state.chatModal = new $bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
    }
})
// methods
function handleConfirm() {
    emit('update:modelValue', state.afterChatGpt)
    state.afterChatGpt = ''
    state.chatModal.hide()
}
async function openModal() {
    state.chatModal.show()
}
function handleClose() {
    const ckEditor = currentInstance.refs.beforeChatGpt
    ckEditor.setData(props.modelValue)
    state.chatModal.hide()
}
const modalBodyRef = ref(null)
async function handleOptimization() {
    $sweet.loader(true, {
        title: '泡杯咖啡再回來',
        text: '「如果還沒好，那就再來一杯」',
    })
    const res = await props.chatRequest(state.beforeChatGpt)
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
</script>
<style lang="scss" scoped>
.chatGptModal__btn {
    width: 115px;
    height: 40px;
    margin-left: 8px;
}

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

        // display: flex;
        // flex-wrap: nowrap;
        .modal__btn {
            margin: auto auto auto auto;
            width: 226px;
        }

        .chatGptModal__before {
            border: 1px solid black;
            border-radius: 8px;
        }
    }

    .modal-footer {
        border: none;
        padding-bottom: 37px;

        .footer__buttonGroup {
            display: flex;
            gap: 16px;
            margin: auto;
            flex-direction: column-reverse;

            .footer__button {
                width: 120px;
            }

            .buttonGroup__btn {
                width: 226px;
            }
        }
    }
}

@media screen and (min-width:992px) {

    .modal-content {
        .modal-footer {


            .footer__buttonGroup {
                flex-direction: row;
            }
        }
    }
}
</style>