<template>
    <div class="questions">
        <div class="questions__description">
            此量表答案沒有對錯好壞。請依照就職中的一般狀況，點選與你心中就職情況最符合的選項
        </div>
        <LazyAtomProgress class="questions__progress"></LazyAtomProgress>
        <img class="questions__leftImage" src="~/assets/questions/left.png" />
        <img class="questions__rightImage" src="~/assets/questions/right.png" />
        <template v-for="(questionGroup, key) in state.questions" :key="key">
            <div v-if="questionId == key" class="questions__questionGroup">
                <h2 class="questionGroup__header">{{ questionGroup.descUser }}
                    <div v-if="questionGroup.key === 'culture'" class="header__subheader">至少一項、至多兩項</div>
                </h2>
                <div class="questionGroup__body">
                    <button v-if="questionId > 0" class="body__button body__button--left" type="button"
                        :disabled="questionId <= 0" @click="handleClickLast()">
                        <img src="~/assets/questions/btn_arrow.svg">
                    </button>
                    <div class="body__inputOptions">
                        <template v-for="(item, index) in questionGroup.items" :key="index">
                            <template v-if="questionGroup.key !== 'culture'">
                                <label class="inputOptions__singleSelect" :class="{
                                    'inputOptions__singleSelect--selected': checkSelected(item, questionGroup),
                                }" :for="`inputOptions__singleSelect${item.value}`">
                                    <input v-show="false" v-model="state.tempUser.preference[questionGroup.key]"
                                        type="radio" :id="`inputOptions__singleSelect${item.value}`" :value="item.value"
                                        @click="setAnswers(item.value, questionGroup.key)" />
                                    <span class="label__description">{{ item.textUser }}</span>
                                </label>
                            </template>
                            <template v-else>
                                <label class="inputOptions__multipleSelect">
                                    <img v-show="checkOptionSelected(item)" src="~/assets/index/checkboxSelected.svg">
                                    <input v-show="!checkOptionSelected(item)"
                                        v-model="state.tempUser.preference['culture']" :value="item.value"
                                        class="multiSelect__checkbox" type="checkbox"
                                        :disabled="checkOptionDisabled(item)" @change="setCulture()">
                                    <span class="multipleSelect__description">{{ item.textUser }}</span>
                                </label>
                            </template>
                        </template>
                    </div>
                    <button v-if="questionId < 5" class="body__button body__button--right" type="button"
                        :disabled="checkQuestionAnswered()" @click="handleClickNext()">
                        <img :style="{ transform: 'scaleX(-1)' }" src="~/assets/questions/btn_arrow.svg">
                    </button>
                </div>
            </div>
        </template>
        <div v-if="questionId == 5" class="questions__footer">
            <LazyAtomBtnSimple @click="routeToCategory()">下一步
            </LazyAtomBtnSimple>
            <button type="button" class="btn btn-light mt-2" @click="routeToFisrt()">修改偏好答案</button>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $sweet } = useNuxtApp()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const route = useRoute()
const router = useRouter()
const state = reactive({
    // 注意資料結構共用
    currentIndex: 0,
    questions: [],
    tempUser: {
        preference: {},
    },
    singleSelects: ['']
})
const questionId = computed(() => {
    const id = Number(route.params.id) - 1
    return Number(id) || 0
})
// hooks
useHead({
    title: `偏好量表 ${questionId.value + 1} - Job Pair`,
})
onMounted(async () => {
    let questions = []
    const {questionsRes=[]} = repoSelect.state
    if (questionsRes&&questionsRes.length){
        questions = repoSelect.state.questionsRes
    } else {
        $sweet.loader(true)
        const response = await repoSelect.getQuestions()
        $sweet.loader(false)
        questions =  response.data
    }
    state.questions = questions
    getAnswers()
})
watch(() => repoAuth.state.user, () => {
    const { user } = repoAuth.state
    // 使用者已註冊
    if (user && user.id && user.type === 'employee') {
        router.replace({
            name: 'jobs'
        })
        if (process.client) {
            localStorage.removeItem("user")
        }
    }
}, { immediate: true })
watch(() => questionId.value, () => {
    nextTick(() => {
        initTooltip()
    })
}, { immediate: true })
// methods
function routeToFisrt() {
    router.push('/questions/1')
}
function routeToCategory() {
    router.push({
        name: 'questions-result'
    })
}
function checkSelected(item, questionGroup) {
    const questionKey = questionGroup.key
    const modelValue = state.tempUser.preference[questionKey]
    if (modelValue === "" && item.value === "") {
        const userString = localStorage.getItem("user")
        if (userString && userString !== "false") {
            const user = JSON.parse(userString)
            if (user.preference) {
                const answer = user.preference[questionKey]
                if (![null, undefined].includes(answer)) {
                    return true
                }
            }
        }
    } else {
        if (modelValue === item.value) {
            return true
        }
    }
    return false
}
function checkQuestionAnswered() {
    const index = questionId.value
    const currentQuestion = state.questions[index]
    const { key } = currentQuestion
    const answer = state.tempUser.preference[key]
    if (answer || answer === "") {
        return false
    } else {
        return true
    }
}
function checkOptionDisabled(item) {
    const isSelected = checkOptionSelected(item)
    return state.tempUser.preference['culture'].length >= 2 && !isSelected
}
function checkOptionSelected(item) {
    return state.tempUser.preference['culture'].includes(item.value)
}
function setCulture() {
    if (process.client) {
        localStorage.setItem("user", JSON.stringify(state.tempUser))
    }
}
function setAnswers(value, key) {
    state.tempUser.preference[key] = value
    if (process.client) {
        localStorage.setItem("user", JSON.stringify(state.tempUser))
    }
    handleClickNext()
}
function getAnswers() {
    if (process.client) {
        const userString = localStorage.getItem("user")
        if (!userString || userString === "false") {
            return
        }
        const user = JSON.parse(userString)
        if (!user.preference) {
            user.preference = {}
        }
        if (!user.preference.culture) {
            user.preference.culture = []
        }
        state.tempUser = user
    }
}
function initTooltip() {
    if (process.client) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new $bootstrap.Tooltip(tooltipTriggerEl, {
                placement: "right",
            })
        })
    }
}
function handleClickLast() {
    const id = questionId.value + 1
    router.push(`/questions/${id - 1}`)
}
function handleClickNext() {
    const id = questionId.value + 1
    if (id >= 6) {
        router.push(`/questions/result`)
    } else {
        router.push(`/questions/${id + 1}`)
    }
}
</script>
<style lang="scss" scoped>
.questions {
    position: relative;
    background-color: white;
    min-height: calc(100vh - 88px);
    z-index: 10;
    position: relative;
    padding-bottom: 97px;
    min-height: 100vh;

    .questions__description {
        padding: 12px 36px;
        background-color: rgba(255, 243, 205, 0.6);
        color: #856404;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
    }

    .questions__progress {
        margin: 30px auto 50px auto;
    }

    .questions__leftImage {
        position: absolute;
        left: 0;
        width: 15vw;
        top: 0;
        z-index: -1;
    }

    .questions__rightImage {
        position: absolute;
        right: 0;
        width: 15vw;
        bottom: 0;
    }

    .questions__questionGroup {
        width: 100%;

        .questionGroup__header {
            text-align: center;
            font-size: 28px;
            margin-bottom: 30px;
            font-weight: bold;
            color: #484848;

            .header__subheader {
                font-size: 17px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 0.82;
                letter-spacing: normal;
                text-align: center;
                color: #484848;
                margin-top: 8px;
            }
        }

        .questionGroup__body {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: calc(100% - 3rem);
            margin: auto;

            .body__options {
                z-index: 10;
            }

            .body__button {
                background-color: unset;
                border: none;
                font-size: 21px;
                z-index: 10;
                position: absolute;
                padding: 10px;
            }

            .body__button--left {
                left: 0;
            }

            .body__button--right {
                right: 0;
            }

            .body__inputOptions {
                margin: auto;
                text-align: center;

                .inputOptions__singleSelect {
                    width: 100%;
                    border-radius: 100px;
                    border: 1px solid #317292;
                    background-color: #fdfdfd;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                    color: #317292;
                    padding: 8px 30px;

                    &:not(:first-child) {
                        margin-top: 20px;
                    }

                    &:hover {
                        color: #80a7c2;
                        border: solid 1px #80a7c2;
                    }

                    .label__description {
                        align-self: center;
                    }
                }

                .inputOptions__singleSelect--selected {
                    background-color: #317292;
                    color: white !important;
                }

                .inputOptions__multipleSelect {
                    width: 100%;
                    font-size: 17px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: 0.51px;
                    color: #42708f;
                    display: flex;
                    align-items: center;

                    &:not(:first-child) {
                        margin-top: 20px;
                    }

                    .multipleSelect__description {
                        margin-left: 10px;
                    }

                    .multiSelect__checkbox {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }

    .questions__result {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 128px 5vw 200px 5vw;
        min-height: calc(100vh - 88px);

        .result__leftImage {
            position: absolute;
            left: 0;
            width: 30vw;
            top: 0;
        }

        .result__rightImage {
            position: absolute;
            right: 0;
            width: 30vw;
            bottom: 64px;
        }

        .result__header {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            line-height: 45px;
            margin-bottom: 64px;
            z-index: 10;
        }

        .result__button {
            background-color: #2ec5bf;
            color: white;
            font-size: 20px;
            height: 50px;
            border-radius: 100px;
            width: 234px;
            border: none;
            margin-bottom: 8px;
        }

        .result__tooltip {
            .tooltip__icon {
                margin-left: 8px;
            }
        }
    }

    .questions__footer {
        width: 256px;
        // display: flex;
        margin: 50px auto auto auto;
        // gap: 16px;
        // flex-direction: column;
        // justify-content: center;
        text-align: center;
    }
}

.result__tooltip {
    width: fit-content;
    block-size: fit-content;
}

@media screen and (min-width: 991px) {
    .questions {
        .questions__description {
            padding: 22px auto;
            font-size: 16px;
        }


        .questions__questionGroup {
            .questionGroup__body {
                max-width: 616px;
                position: relative;

                .body__button {
                    font-size: 21px;
                }

                .body__button--left {
                    left: 0;
                    transform: translateX(calc(-100% - 50px));
                }

                .body__button--right {
                    right: 0;
                    transform: translateX(calc(100% + 50px));
                }

                .body__inputOptions {
                    .inputOptions__singleSelect {
                        font-size: 17px;
                        height: 50px;
                    }
                }
            }
        }
    }
}
</style>