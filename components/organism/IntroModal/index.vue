<template>
    <div class="chatGptModal">
        <button class="chatGptModal__btn" @click="openModal()">
            簡歷產生器
        </button>
        <div class="modal fade" :id="`chatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">簡歷產生器</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="handleClose()"></button>
                    </div>
                    <div class="modal-body">
                        <LazyAtomInputText name="期望的職位名稱" v-model="state.form.jobTitle" placeholder="例如：行銷專員" class="mt-3">
                        </LazyAtomInputText>
                        <LazyAtomInputTextarea name="我的優勢" v-model="state.form.strength"
                            placeholder="針對職缺條件撰寫自我推薦，提高履歷被點開的機率。" :rows="2" class="mt-3">
                        </LazyAtomInputTextarea>
                        <LazyAtomInputTextarea name="實際案例" v-model="state.form.records"
                            placeholder="範例：在 YouTube 網紅世代剛開始時，我就在目前的公司提議導入網紅行銷，成為業界中首先切入網紅行銷的產品，事後證實成效很好。因為我願意不斷探索新的方式，才可能促成業界首例"
                            class="mt-3" :rows="4">
                        </LazyAtomInputTextarea>
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <LazyAtomBtnSimple class="buttonGroup__btn" outline @click="handleClose()">取消
                            </LazyAtomBtnSimple>
                            <LazyAtomBtnSimple class="buttonGroup__btn" @click="handleConfirm()">開始生成
                            </LazyAtomBtnSimple>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $uuid4, $sweet, $requestSelector, $filter } = useNuxtApp()
const repoChat = useRepoChat()
const repoSelect = useRepoSelect()
const emit = defineEmits(['update:modelValue',])
const state = reactive({
    id: null,
    chatModal: null,
    form: {
        jobTitle: "",
        strength: "",
        records: "",
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
    },
    occupationalCategory: {
        type: Array,
        default: function () {
            return []
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
            state.chatModal = new window.bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
    }
})
// methods
async function handleConfirm() {
    const occupationalCategory = props.occupationalCategory.map(item => {
        return $filter.optionText(item, repoSelect.jobCategory)
    })
    const form = {
        ...state.form,
        occupationalCategory,
    }
    $sweet.loader(true, {
        title: '泡杯咖啡再回來',
        text: '「如果還沒好，那就再來一杯」',
    })
    const res = await repoChat.postChatIntro(form)
    if (res.status !== 200) {
        return
    }
    $sweet.loader(false)
    emit('update:modelValue', res.data)
    state.chatModal.hide()
}
async function openModal() {
    state.chatModal.show()
}
function handleClose() {
    state.chatModal.hide()
}
</script>
<style lang="scss" scoped>
.chatGptModal__btn {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #70a68f;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    margin-left: 16px;
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