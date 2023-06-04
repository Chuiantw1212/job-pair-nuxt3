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
                        <!--  -->
                        <LazyAtomInputText v-model="state.form.jobName" name="職務名稱" required></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.department" name="所屬部門"></LazyAtomInputText>
                        <!--  -->
                        <AtomInputSelect v-model="state.form.manager" name="管理責任"></AtomInputSelect>
                        <LazyAtomInputText v-model="state.form.primary[0]" name="主要工作"></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.primary[1]" name="主要工作"></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.secondary[0]" name="次要工作"></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.secondary[1]" name="次要工作"></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.goal" name="具體目標"></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.value" name="價值體現"></LazyAtomInputText>
                        <AtomInputSelect v-model="state.form.personality[0]" itemValue="text" :items="state.question1"
                            name="特質期望">
                        </AtomInputSelect>
                        <AtomInputSelect v-model="state.form.personality[1]" itemValue="text" :items="state.question2"
                            name="特質期望">
                        </AtomInputSelect>
                        <AtomInputSelect v-model="state.form.personality[2]" itemValue="text" :items="state.question3"
                            name="特質期望">
                        </AtomInputSelect>
                        <AtomInputSelect v-model="state.form.personality[3]" itemValue="text" :items="state.question4"
                            name="特質期望">
                        </AtomInputSelect>
                        <LazyAtomInputText v-model="state.form.educationLevel" name="學歷要求"></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.experienceLevel" name="資歷要求"></LazyAtomInputText>
                        <LazyAtomInputText v-model="state.form.skillLevel" name="技能要求"></LazyAtomInputText>
                        <LazyAtomBtnSimple class="modal__btn" @click="handleSubmit()">開始生成</LazyAtomBtnSimple>
                        <LazyAtomInputCkeditor class="mt-3" v-model="state.description" ref="description" name="職責簡介"
                            :style="{ 'height': '324px' }">
                        </LazyAtomInputCkeditor>
                        <LazyAtomInputCkeditor class="mt-3" v-model="state.list" ref="list" name="職務說明第三段"
                            :style="{ 'height': '324px' }">
                        </LazyAtomInputCkeditor>
                    </div>
                    <div class="modal-footer">
                        <div class="footer__buttonGroup">
                            <!-- <LazyAtomBtnSimple class="buttonGroup__btn" outline @click="handleClose()">取消
                            </LazyAtomBtnSimple>
                            <LazyAtomBtnSimple class="buttonGroup__btn" @click="handleConfirm()">修改後套用內文
                            </LazyAtomBtnSimple> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $uuid4, $sweet, $requestSelector, } = useNuxtApp()
const repoChat = useRepoChat()
const emit = defineEmits(['applied', 'update:modelValue', 'request'])
const state = reactive({
    id: null,
    chatModal: null,
    glideInstance: null,
    glideIndex: 0,
    resume: null,
    duration: "",
    schedules: [],
    form: {
        jobName: '行銷企劃專員',
        department: '行銷推廣部',
        goal: '建立和推廣品牌形象，增加目標市場對品牌的認識和關注',
        value: '需要有豐富的創意和創新思維，能夠提供新穎且有吸引力的行銷方案和活動，以吸引目標客戶的關注並脫穎而出',
        educationLevel: '大學',
        experienceLevel: '兩年以上',
        skillLevel: '懂Youtube以及抖音的行銷後台',
        manager: true,
        primary: [
            '經營公司、現有品牌、產品整體形象，並負責相關行銷企劃案',
            '規劃與執行公司對內、外的行銷活動（如：展覽、促銷活動）',
            '熟悉社群媒體經營，撰寫文案、各媒體及新聞稿等相關事務',
            '行銷製作物規劃與執行、品牌行銷管理（如：產品型錄、簡介、贈品等銷售工具）'
        ],
        secondary: ['跨部門溝通協調、創意發想', '其他主管交辦事項'],
        personality: ['堅定，目標導向', '冒險，自我挑戰', '追求成就', '企圖心高'],
    },
    question1: [
        {
            text: '堅定，目標導向',
        },
        {
            text: '說服，擅長表達',
        },
        {
            text: '和善，合作導向',
        },
        {
            text: '仔細，善於思考',
        }
    ],
    question2: [
        {
            text: '冒險，自我挑戰',
        },
        {
            text: '開朗，與人交流',
        },
        {
            text: '穩健，支持他人',
        },
        {
            text: '嚴謹，自我要求',
        }
    ],
    question3: [
        {
            text: '追求成就',
        },
        {
            text: '追求舞台',
        },
        {
            text: '追求穩定',
        },
        {
            text: '追求正確',
        }
    ],
    question4: [
        {
            text: '企圖心高',
        },
        {
            text: '創造力強',
        },
        {
            text: '配合度高',
        },
        {
            text: '準確性高',
        }
    ],
    beforeChatGpt: '',
    description: '',
    list: '',
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
            state.chatModal = new $bootstrap.Modal(modelElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
    }
})
// methods
function handleConfirm() {
    emit('update:modelValue', state.description)
    state.description = ''
    const ckEditor = currentInstance.refs.description
    if (ckEditor) {
        ckEditor.setData('')
    } else {
        console.log('Error trying to setInvitationTemplate: ', ckEditor);
    }
    state.chatModal.hide()
}
async function openModal() {
    state.chatModal.show()
}
function handleClose() {
    state.chatModal.hide()
}
const modalBodyRef = ref(null)
async function handleSubmit() {
    $sweet.loader(true, {
        title: '泡杯咖啡再回來',
        text: '「如果還沒好，那就再來一杯」',
    })
    const res = await repoChat.postChatJdGenerate(state.form)
    if (res.status !== 200) {
        return
    }
    $sweet.loader(false)
    const { data } = res
    console.log(data);
    const { description = '', list = '' } = data
    state.description = description
    const descriptionEditor = currentInstance.refs.description
    if (descriptionEditor) {
        descriptionEditor.setData(description)
    } else {
        console.log('Error trying to setInvitationTemplate: ', descriptionEditor);
    }
    state.list = list
    const listEditor = currentInstance.refs.list
    if (listEditor) {
        listEditor.setData(list)
    } else {
        console.log('Error trying to setInvitationTemplate: ', listEditor);
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