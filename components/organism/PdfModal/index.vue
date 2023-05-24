<template>
    <div class="chatGptModal">
        <LazyAtomBtnSimple class="chatGptModal__btn" @click="openModal()">
            <img class="me-1" src="./Frame.svg" alt="icon">
            預覽履歷
        </LazyAtomBtnSimple>
        <div class="modal fade" :id="`chatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <!-- <div class="modal-header">
                        <h4 class="modal-title">一鍵優化</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="handleClose()"></button>
                    </div> -->
                    <div class="modal-body" ref="modalBodyRef">
                        <iframe class="previewGroup__item__viewer" :src="state.resumeUrl"></iframe>
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
import { Buffer } from 'buffer/'
const { $bootstrap, $uuid4, $sweet, $requestSelector, } = useNuxtApp()
const repoJobApplication = useRepoJobApplication()
const repoAuth = useRepoAuth()
const emit = defineEmits(['applied', 'update:modelValue', 'request'])
const router = useRouter()
const repoJob = useRepoJob()
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
    resumeUrl: null,
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
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
async function getFileUrl(item = {}) {
    const { resume = {}, applicantId = '', jobId = '', } = item
    const { url = '' } = resume
    if (!url) {
        return
    }
    const fileName = url.split('/').slice(-1)[0]
    $sweet.loader(true)
    const res = await repoJob.getJobApplicantResume({
        jobId,
        applicantId,
        fileName,
    })
    $sweet.loader(false)
    if (res.status !== 200) {
        return
    }
    const buffer = res.data
    let formatBuffer = buffer
    if (!(buffer instanceof Uint8Array)) {
        formatBuffer = Buffer.from(buffer)
    }
    const typedArray = new Uint8Array(formatBuffer)
    const blob = new Blob([typedArray], { type: 'application/pdf' })
    const objectUrl = URL.createObjectURL(blob)
    return {
        objectUrl,
        fileName,
        buffer,
    }
}
async function downloadResume(item = {}) {
    const { objectUrl, fileName } = await getFileUrl(item)
    const anchorElement = document.createElement('a');
    anchorElement.href = objectUrl
    anchorElement.download = fileName
    anchorElement.style.visibility = 'hidden'
    anchorElement.click()
}
async function previewResume(item = {}) {
    const { objectUrl, buffer } = await getFileUrl(props.modelValue)
    // window.open(objectUrl, '_blank')
    const dataURI = "data:application/pdf;base64," + buffer;
    state.resumeUrl = objectUrl
    // window.open(dataURI, '_blank');
    // window.URL.revokeObjectURL(objectUrl);
}
function handleConfirm() {
    emit('update:modelValue', state.afterChatGpt)
    state.afterChatGpt = ''
    const ckEditor = currentInstance.refs.afterChatGpt
    if (ckEditor) {
        ckEditor.setData('')
    } else {
        console.log('Error trying to setInvitationTemplate: ', ckEditor);
    }
    state.chatModal.hide()
}
async function openModal() {
    state.chatModal.show()
    previewResume()
}
function handleClose() {
    // const ckEditor = currentInstance.refs.beforeChatGpt
    // ckEditor.setData(props.modelValue)
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