<template>
    <div class="chatGptModal">
        <button class="chatGptModal__btn" @click="openModal()">
            <img src="./Frame.svg">
            AI 智能生成
        </button>
        <div class="modal fade" :id="`chatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-fullscreen-lg-down modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">AI 智能生成</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="handleClose()"></button>
                    </div>
                    <div class="modal-body" ref="modalBodyRef">
                        <ul class=body__list>
                            <template v-for="(item, chatItemIndex) in  state.chatItems">
                                <li v-if="chatItemIndex <= state.chatItemIndex" :key="chatItemIndex" class="list__item"
                                    :class="{ 'list__item--user': item.role === 'user' }">
                                    <div class="item__content">
                                        <div v-if="item.role === 'user'" v-html="state.userIdenticon"
                                            class="content__image">
                                        </div>
                                        <img v-else class="content__image" alt="monica" src="./monica.webp">
                                        <div class="content__textGroup">
                                            <div v-for="(message, messageItemIndex) in item.messages"
                                                :key="`${chatItemIndex}${messageItemIndex}`" class="textGroup__line">
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <div class="footer__content">
                            <button v-if="getMessageUI().isRequired" class="content__btn content__btn--disabled"
                                :disabled="true">略過此題</button>
                            <button v-else class="content__btn" @click="gotoNextItem('無')">略過此題</button>
                            <div v-if="getMessageUI().type === 'button'" class="content__btnGroup">
                                <LazyAtomBtnSimple v-for="(item, index) in getMessageUI().options"
                                    class="btnSimple--outline--success btnGroup__btn" @click="gotoNextItem(item)">
                                    <template v-if="device.state.isLarge">
                                        {{ item }}
                                    </template>
                                    <template v-else>
                                        {{ index + 1 }}.
                                    </template>
                                </LazyAtomBtnSimple>
                            </div>
                            <template v-else-if="getMessageUI().type === 'text'">
                                <LazyAtomInputText v-model="state.chatReply" class="content__input" placeholder="請輸入">
                                </LazyAtomInputText>
                                <button class="content__submit" @click="gotoNextItem()">
                                    <img src="./Send.webp">
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { nextTick } from 'vue'
const { $uuid4, $sweet, $requestSelector, } = useNuxtApp()
const repoChat = useRepoChat()
const repoAuth = useRepoAuth()
const emit = defineEmits(['applied', 'update:modelValue'])
const device = useDevice()
const state = reactive({
    id: null,
    chatModal: null,
    userIdenticon: '',
    chatReply: '',
    chatItemIndex: 0,
    chatItems: [
        {
            role: 'system',
            messages: ['您好！我是你的AI 小助理，我將根據您的輸入生成職責簡介。放心只有 6 題！', '此職務隸屬於任何部門嗎？若有請填寫部門名稱，如果涉及多部門請填寫所屬主要部門；若無請回覆「略過此題」。（1/6）'],
            responseUI: {
                type: 'text',
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['這份工作是否需要管理他人呢？有的話請告訴我會管理的「人數」，沒有的話請「略過此題」。(2/6)'],
            responseUI: {
                type: 'text',
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['接下來請仔細思考這份工作最主要的工作項目有哪些？(3/6)'],
            responseUI: {
                type: 'text',
                isRequired: true,
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['除了上述的內容，還有沒有其他次要工作，就是不常遇到但偶而還是需要，通常是支援性質的內容？(4/6)'],
            responseUI: {
                type: 'text',
                isRequired: true,
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['這份工作最主要或短期內要完成的目標是什麼？例如：三個月後專案能順利上線、每個月拜訪幾位客戶、與同事合作維持店舖營運、能獨立運作完成客戶要求...等？(5/6)'],
            responseUI: {
                type: 'text',
                isRequired: true,
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['這份工作的內涵價值較符合以下哪種人：1. 創造價值的人 2. 傳遞價值的人 3. 支持與維護價值的人 4. 制定與優化價值的人(6/6)'],
            responseUI: {
                type: 'button',
                options: ['創造價值的人', '傳遞價值的人', '支持與維護價值的人', '制定與優化價值的人'],
                isRequired: true,
            }
        },
        {
            role: 'user',
            messages: [''],
        },
    ],
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
const localValue = computed({
    get() {
        const value = props.modelValue ?? {}
        return value
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        $requestSelector(`#chatModal${state.id}`, (modelElement) => {
            state.chatModal = new window.bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
        const userIdentity = repoAuth.state?.user?.email || 'default'
        const svgString = window.jdenticon.toSvg(userIdentity, 50);
        state.userIdenticon = svgString
    }
})
// methods
function getMessageUI() {
    const relatedItem = state.chatItems[state.chatItemIndex]
    if (relatedItem) {
        return relatedItem.responseUI
    } else {
        return { type: '', options: [], }
    }
}
function gotoNextItem(selectedItem = '') {
    const messageUI = getMessageUI()
    const { isRequired, type = '' } = messageUI
    if (isRequired && type === 'text') {
        if (!String(state.chatReply)) {
            $sweet.alert('此題為必填')
            return
        }
    }
    // set reply
    const relatedItem = state.chatItems[state.chatItemIndex + 1]
    relatedItem.messages[0] = state.chatReply || selectedItem
    state.chatReply = ''
    // show reply
    state.chatItemIndex += 2
    if (state.chatItemIndex >= state.chatItems.length) {
        // submit items
        handleSubmit()
        return
    }
    nextTick(() => {
        const divEle = currentInstance.refs.modalBodyRef
        divEle.scrollTop = divEle.scrollHeight;
    })
}
async function openModal() {
    if (!props.modelValue?.name) {
        $sweet.alert('職缺名稱為使用AI生成的必要條件！')
        return
    }
    state.chatModal.show()
}
function handleClose() {
    state.chatReply = ''
    state.chatItemIndex = 0
    state.chatItems.forEach(item => {
        if (item.role === 'user') {
            item.messages = ['']
        }
    })
    state.chatModal.hide()
}
const modalBodyRef = ref(null)
async function handleSubmit() {
    state.chatModal.hide()
    $sweet.loader(true, {
        title: '現在為您生成職務說明書',
        html: '太棒了！泡杯咖啡再回來<br \>「如果還沒好，那就再來一杯」',
    })
    const minimizedData = state.chatItems.map(item => {
        return {
            role: item.role,
            messages: item.messages
        }
    })
    const res = await repoChat.postJobDescriptionGenerate({
        jobName: localValue.value.name,
        chatItems: minimizedData
    })
    if (res.status !== 200) {
        return
    }
    $sweet.loader(false)
    const { data } = res
    localValue.value.description = data
    emit('update:modelValue', localValue.value)
}
</script>
<style lang="scss" scoped>
@import '../generate.scss'
</style>