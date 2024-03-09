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
const emit = defineEmits(['applied', 'update:modelValue',])
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
            messages: ['您好！我是你的AI 小助理，我將根據您的輸入生成條件要求。放心只有 7 題！', '要勝任這份工作，有學歷上的要求嗎？有的話請回覆，沒有的話請「略過此題」。（背景題1/3）'],
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
            messages: ['要勝任這份工作，有哪些必備技能嗎？有的話請回覆，沒有的話請「略過此題」。（背景題2/3）'],
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
            messages: ['要勝任這份工作，有其他必需條件嗎？有的話請回覆，沒有的話請「略過此題」。（背景題3/3）'],
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
            messages: ['這份工作更適合哪種特質的人？(單選)(個人特質1/4)'],
            responseUI: {
                type: 'button',
                options: ['堅定，目標導向', '說服，擅長表達', '和善，合作導向', '仔細，善於思考'],
                isRequired: true,
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['這份工作更適合哪種特質的人？(單選)(個人特質2/4)'],
            responseUI: {
                type: 'button',
                options: ['冒險，自我挑戰', '開朗，與人交流', '穩健，支持他人', '嚴謹，自我要求'],
                isRequired: true,
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['這份工作更適合哪種特質的人？(單選)(個人特質3/4)'],
            responseUI: {
                type: 'button',
                options: ['追求成就', '追求舞台', '追求穩定', '追求正確'],
                isRequired: true,
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['這份工作更適合哪種特質的人？(單選)(個人特質4/4)'],
            responseUI: {
                type: 'button',
                options: ['企圖心高', '創造力強', '配合度高', '準確性高'],
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
    job: {
        type: Object,
        default: function () {
            return {}
        }
    }
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
    state.chatModal.hide()
}
const modalBodyRef = ref(null)
async function handleSubmit() {
    state.chatModal.hide()
    $sweet.loader(true, {
        title: '現在為您生成條件要求',
        html: '太棒了！泡杯咖啡再回來<br \>「如果還沒好，那就再來一杯」',
    })
    const minimizedData = state.chatItems.map(item => {
        return {
            role: item.role,
            messages: item.messages
        }
    })
    const res = await repoChat.postChatJobSkillGenerate({
        jobName: localValue.value.name,
        chatItems: minimizedData
    })
    if (res.status !== 200) {
        return
    }
    $sweet.loader(false)
    const { data } = res
    localValue.value.skills = data
    emit('update:modelValue', localValue.value)
}
</script>
<style lang="scss" scoped>
@import '../generate.scss'
</style>