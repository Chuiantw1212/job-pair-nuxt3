<template>
    <div class="chatGptModal">
        <LazyAtomBtnSimple class="chatGptModal__btn" @click="openModal()">
            <img class="me-2" src="./Frame.svg" alt="icon">
            AI 智能生成
        </LazyAtomBtnSimple>
        <div class="modal fade" :id="`chatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
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
                            <button class="content__btn" @click="gotoNextItem('無')">略過此題</button>
                            <div v-if="getMessageUI().type === 'button'" class="content__btnGroup">
                                <LazyAtomBtnSimple v-for="(item, index) in getMessageUI().options"
                                    class="btnSimple--outline--success btnGroup__btn" @click="gotoNextItem(item)">
                                    {{ item }}
                                </LazyAtomBtnSimple>
                            </div>
                            <template v-else-if="getMessageUI().type === 'text'">
                                <LazyAtomInputText v-model="state.chatReply" class="content__input" placeholder="請輸入"
                                    @keyup.enter="gotoNextItem()">
                                </LazyAtomInputText>
                                <button class="content__submit" @click="gotoNextItem()">送出</button>
                            </template>
                            <!-- <button @click="handleSubmit()">直接送出</button> -->
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
const emit = defineEmits(['applied', 'update:modelValue', 'request'])
const state = reactive({
    id: null,
    chatModal: null,
    userIdenticon: '',
    chatReply: '',
    chatItemIndex: 0,
    chatItems: [
        {
            role: 'system',
            messages: ['您好！我是你的AI 小助理，我將根據您的輸入生成條件要求。放心只有 7 題！', '要勝任這份工作，有學歷上的要求嗎？有的話請回覆，沒有的話請回覆「無」。（背景題1/3）'],
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
            messages: ['要勝任這份工作，有哪些必備技能嗎？有的話請回覆，沒有的話請回覆「無」。（背景題2/3）'],
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
            messages: ['要勝任這份工作，有其他必需條件嗎？有的話請回覆，沒有的話請回覆「無」。（背景題3/3）'],
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
            }
        },
        {
            role: 'user',
            messages: [''],
        },
        {
            role: 'system',
            messages: ['太棒了！現在為您生成職務說明書'],
            responseUI: {
                type: 'text',
            }
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
    return relatedItem.responseUI
}
function gotoNextItem(selectedItem = '') {
    // set reply
    const relatedItem = state.chatItems[state.chatItemIndex - 1]
    relatedItem.messages[0] = state.chatReply || selectedItem
    state.chatReply = ''
    // show reply
    state.chatItemIndex += 2
    if (state.chatItemIndex >= state.chatItems.length + 1) {
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
        title: '泡杯咖啡再回來',
        text: '「如果還沒好，那就再來一杯」',
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
.chatGptModal__btn {
    // width: 115px;
    height: 40px;
    margin-left: 8px;
}

.modal-content {
    border-radius: 10px;

    .modal-header {
        position: relative;
        padding-left: 40px;

        .modal-title {
            width: 100%;
            font-weight: bold;
            font-size: 22px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.3;
            letter-spacing: normal;
            text-align: left;
            color: #000;
        }

        .btn-close {
            position: absolute;
            right: 24px;
            top: 24px;
        }
    }

    .modal-body {
        padding: 40px 40px;

        .modal__btn {
            margin: auto auto auto auto;
            width: 226px;
        }

        .chatGptModal__before {
            border: 1px solid black;
            border-radius: 8px;
        }

        .body__list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin: 0;
            padding: 0;

            .list__item {
                max-width: calc(100% - 70px);

                .item__content {
                    display: flex;
                    gap: 20px;
                    // align-items: center;

                    .content__image {
                        width: 50px;
                        height: 50px;

                    }

                    .content__textGroup {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;

                        .textGroup__line {
                            padding: 12px 40px;
                            background-color: #f5f5f5;
                            border-radius: 10px 10px 10px 0px;
                            overflow: hidden;
                            width: fit-content;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: normal;
                            letter-spacing: normal;
                            text-align: left;
                            color: #333;
                        }
                    }
                }
            }

            .list__item--user {
                align-self: flex-end;

                .item__content {
                    flex-direction: row-reverse;

                    .content__textGroup {
                        .textGroup__line {
                            border-radius: 10px 10px 0px 10px;
                            color: #fff;
                            background-color: #5ea88e;
                        }

                    }
                }
            }
        }
    }

    .modal-footer {

        .footer__content {
            display: flex;
            gap: 16px;
            margin: auto;
            flex-direction: column-reverse;
            width: 100%;

            .content__btn {
                background-color: inherit;
                border: 0px;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #5ea88e;
                white-space: nowrap;
            }

            .content__input {
                width: 100%;
            }

            .content__submit {
                white-space: nowrap;
            }

            .content__btnGroup {
                width: 100%;
                display: flex;
                gap: 20px;
                justify-content: center;

                .btnGroup__btn {
                    width: fit-content;
                }
            }
        }
    }
}

@media screen and (min-width:992px) {

    .modal-content {
        .modal-footer {


            .footer__content {
                flex-direction: row;
            }
        }
    }
}
</style>