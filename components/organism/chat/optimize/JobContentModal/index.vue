<template>
    <div class="chatGptModal">
        <button class="chatGptModal__btn" @click="openBeforeModal({ isReset: true })">
            AI內容優化
        </button>
        <div class="modal fade" :id="`beforeChatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">AI內容優化</h4>
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
            <div class="modal-dialog modal-xl modal-dialog-centered">
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
    field: {
        type: String,
        default: '',
    }
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
    const updatedJob = Object.assign({}, props.modelValue)
    updatedJob[props.field] = state.afterChatGpt
    emit('update:modelValue', updatedJob)
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
    if (!props.modelValue?.name) {
        $sweet.alert('職缺名稱為使用AI生成的必要條件！')
        return
    }
    const { isReset = false } = config
    if (isReset) {
        const beforeValue = props.modelValue[props.field]
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
    const res = await repoChat.postChatJobContent(props.field, {
        content: props.modelValue[props.field],
        jobName: props.modelValue.name
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