<template>
    <div class="chatGptModal">
        <LazyAtomBtnSimple class="chatGptModal__btn" @click="openBeforeModal({ isReset: true })">
            <img class="me-1" src="./Frame.svg" alt="icon">
            一鍵優化
        </LazyAtomBtnSimple>
        <div class="modal fade" :id="`beforeChatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">一鍵優化</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="hideBeforeModal()"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">
                        <LazyAtomInputCkeditor v-model="state.beforeChatGpt" class="mt-3" :toolbar="[]" ref="beforeChatGpt"
                            :style="{ 'height': '324px' }">
                        </LazyAtomInputCkeditor>
                        <div class="text-center my-1">優美的文字值得等待，優化時間需幾分鐘</div>
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <LazyAtomBtnSimple class="modal__btn" @click="handleOptimization()">開始優化</LazyAtomBtnSimple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" :id="`afterChatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">一鍵優化</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="hideAfterModal()"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">
                        <LazyAtomInputCkeditor class="mt-3" v-model="state.afterChatGpt" ref="afterChatGpt"
                            :style="{ 'height': '324px' }">
                        </LazyAtomInputCkeditor>
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <LazyAtomBtnSimple class="buttonGroup__btn" outline @click="handleLastStep()">上一步
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
const { $uuid4, $sweet, $requestSelector, } = useNuxtApp()
const emit = defineEmits(['applied', 'update:modelValue', 'request',])
const repoChat = useRepoChat()
const state = reactive({
    id: null,
    beforeChatModal: null,
    afterChatModal: null,
    beforeChatGpt: '',
    afterChatGpt: '',
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
})
const currentInstance = getCurrentInstance()
// hooks
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        $requestSelector(`#beforeChatModal${state.id}`, (modelElement) => {
            state.beforeChatModal = new window.bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
        $requestSelector(`#afterChatModal${state.id}`, (modelElement) => {
            state.afterChatModal = new window.bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
    }
})
// methods
function handleConfirm() {
    const updateValue = Object.assign({}, props.modelValue)
    emit('update:modelValue', updateValue)
    state.afterChatGpt = ''
    const ckEditor = currentInstance.refs.afterChatGpt
    if (ckEditor) {
        ckEditor.setData('')
    } else {
        console.log('Error trying to setInvitationTemplate: ', ckEditor);
    }
    hideBeforeModal()
    hideAfterModal()
}
function handleLastStep() {
    openBeforeModal()
    hideAfterModal()
}
async function openBeforeModal(config = {}) {
    const { isReset = false } = config
    if (isReset) {
        const beforeValue = props.modelValue
        state.beforeChatGpt = beforeValue
        const beforeChatGpt = currentInstance.refs.beforeChatGpt
        if (beforeChatGpt) {
            beforeChatGpt.setData(beforeValue)
        }
    }
    state.beforeChatModal.show()
    state.afterChatGpt = ''
}
async function openAfterModal() {
    state.afterChatModal.show()
}
function hideBeforeModal() {
    state.beforeChatModal.hide()
}
function hideAfterModal() {
    state.afterChatModal.hide()
}
const modalBodyRef = ref(null)
async function handleOptimization() {
    hideBeforeModal()
    $sweet.loader(true, {
        title: '泡杯咖啡再回來',
        text: '「如果還沒好，那就再來一杯」',
    })
    const res = await repoChat.postChatIntroOptimize({
        content: state.beforeChatGpt,
    })
    if (res.status !== 200) {
        return
    }
    $sweet.loader(false)
    openAfterModal()
    // Set after data
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
@import '../optimize.scss'
</style>