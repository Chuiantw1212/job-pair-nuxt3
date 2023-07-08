<template>
    <div class="chatGptModal">
        <LazyAtomBtnSimple class="chatGptModal__btn" @click="openModal()">
            <img class="me-1" src="./Frame.svg" alt="icon">
            JD生成
        </LazyAtomBtnSimple>
        <div class="modal fade" :id="`chatModal${state.id}`" tabindex="-1" a aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">JD生成</h4>
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
                        <div class="footer__buttonGroup">
                            <button class="buttonGroup__btn">略過此題</button>
                            <LazyAtomInputText class="buttonGroup__input" placeholder="請輸入">

                            </LazyAtomInputText>
                            <button class="buttonGroup__submit" @click="gotoNextItem()">送出</button>
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
const emit = defineEmits(['applied', 'update:modelValue', 'request'])
const state = reactive({
    id: null,
    chatModal: null,
    form: {
        jobName: '行銷企劃專員',
    },
    userIdenticon: '',
    chatItemIndex: 0,
    chatItems: [
        {
            role: 'system',
            messages: ['您好！我是你的AI 小助理，我將根據您的輸入生成職責簡介。放心只有 6 題！', '此職務隸屬於特定部門嗎？若有請填寫部門名稱，如果涉及多部門請填寫所屬主要部門；若無請回覆「無」。（1/6）'],
            responseUI: {
                type: 'text',
            }
        },
        {
            role: 'user',
            messages: ['無'],
        },
        {
            role: 'system',
            messages: ['這份工作是否需要管理他人呢？有的話請告訴我會管理的「人數」，沒有的話請回覆「無」。(2/6)'],
            responseUI: {
                type: 'text',
            }
        },
        {
            role: 'user',
            messages: ['無'],
        },
        {
            role: 'system',
            messages: ['接下來請仔細思考這份工作最主要的工作項目有哪些？(3/6)'],
            responseUI: {
                type: 'text',
            }
        },
        {
            role: 'user',
            messages: ['設計畫面、與RD部門溝通'],
        },
        {
            role: 'system',
            messages: ['除了上述的內容，還有沒有其他次要工作，就是不常遇到但偶而還是需要，通常是支援性質的內容？(4/6)'],
            responseUI: {
                type: 'text',
            }
        },
        {
            role: 'user',
            messages: ['做UX用戶研究'],
        },
        {
            role: 'system',
            messages: ['這份工作最主要或短期內要完成的目標是什麼？例如：三個月後專案能順利上線、每個月拜訪幾位客戶、與同事合作維持店舖營運、能獨立運作完成客戶要求...等？(5/6)'],
            responseUI: {
                type: 'text',
            }
        },
        {
            role: 'user',
            messages: ['三個月後專案能順利上線'],
        },
        {
            role: 'system',
            messages: ['這份工作的內涵價值較符合以下哪種人：1. 創造價值的人 2. 傳遞價值的人 3. 支持與維護價值的人 4. 制定與優化價值的人(6/6)'],
            responseUI: {
                type: 'button',
                options: [
                    {
                        text: '1. 創造價值的人',
                        value: '創造價值的人'
                    },
                    {
                        text: '2. 傳遞價值的人',
                        value: '傳遞價值的人'
                    },
                    {
                        text: '3. 支持與維護價值的人',
                        value: '支持與維護價值的人'
                    },
                    {
                        text: '4. 制定與優化價值的人',
                        value: '制定與優化價值的人',
                    }
                ],
            }
        },
        {
            role: 'user',
            messages: ['創造價值的人'],
        },
        {
            role: 'system',
            messages: ['太棒了！現在為您生成職務說明書'],
            responseUI: {
                type: 'text',
            }
        },
    ],
    newJob: {
        description: '',
        skills: '',
    }
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
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        $requestSelector(`#chatModal${state.id}`, (modelElement) => {
            state.chatModal = new window.bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
        const svgString = window.jdenticon.toSvg("value", 50);
        state.userIdenticon = svgString
    }
})
// methods
function gotoNextItem() {
    state.chatItemIndex += 2
    if (state.chatItemIndex >= chatItems.length + 1) {
        // submit items
        handleSubmit()
        return
    }
    nextTick(() => {
        const divEle = currentInstance.refs.modalBodyRef
        divEle.scrollTop = divEle.scrollHeight;
    })
}
function handleConfirm() {
    const updatedJob = Object.assign({}, props.job, {
        name: state.form.jobName,
        ...state.newJob
    })
    console.log({
        updatedJob
    });
    emit('update:modelValue', updatedJob)
    const descEditor = currentInstance.refs.description
    if (descEditor) {
        descEditor.setData('')
    } else {
        console.log('Error trying to setInvitationTemplate: ', descEditor);
    }
    const skillsEditor = currentInstance.refs.skills
    if (skillsEditor) {
        skillsEditor.setData('')
    } else {
        console.log('Error trying to setInvitationTemplate: ', skillsEditor);
    }
    state.chatModal.hide()
}
async function openModal() {
    state.form.jobName = props.job?.name
    state.chatModal.show()
}
function handleClose() {
    state.chatModal.hide()
}
const modalBodyRef = ref(null)
async function handleSubmit() {
    // $sweet.loader(true, {
    //     title: '泡杯咖啡再回來',
    //     text: '「如果還沒好，那就再來一杯」',
    // })
    // const res = await repoChat.postChatJdGenerate(state.form)
    // if (res.status !== 200) {
    //     return
    // }
    // $sweet.loader(false)
    // const { data } = res
    // const { description = '', skills = '' } = data
    // state.newJob.description = description
    // const descriptionEditor = currentInstance.refs.description
    // if (descriptionEditor) {
    //     descriptionEditor.setData(description)
    // } else {
    //     console.log('Error trying to setInvitationTemplate: ', descriptionEditor);
    // }
    // state.newJob.skills = skills
    // const listEditor = currentInstance.refs.skills
    // if (listEditor) {
    //     listEditor.setData(skills)
    // } else {
    //     console.log('Error trying to setInvitationTemplate: ', listEditor);
    // }
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

        .footer__buttonGroup {
            display: flex;
            gap: 16px;
            margin: auto;
            flex-direction: column-reverse;
            width: 100%;

            .buttonGroup__btn {
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

            .buttonGroup__input {
                width: 100%;
            }

            .buttonGroup__submit {
                white-space: nowrap;
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