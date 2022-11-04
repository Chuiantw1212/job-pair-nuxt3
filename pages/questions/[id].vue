<template>
    <div class="questions">
        <div v-if="getPartOne()" class="questions__card">
            <div class="questions__description">
                此量表答案沒有對錯好壞。請依照就職中的一般狀況，點選與你心中就職情況最符合的選項
            </div>
            <AtomProgress class="questions__progress"></AtomProgress>
            <img class="questions__leftImage" src="~/assets/questions/left.png" />
            <img class="questions__rightImage" src="~/assets/questions/right.png" />
            <template v-for="(questionGroup, key) in state.questions" :key="key">
                <div v-if="questionId == key" class="questions__questionGroup">
                    <h2 class="questionGroup__header">{{ questionGroup.descUser }}</h2>
                    <div class="questionGroup__body">
                        <button class="body__button body__button--left" type="button" :disabled="questionId <= 1"
                            @click="handleClickLast()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <div class="body__inputOptions">
                            <template v-for="(item, index) in questionGroup.items" :key="index">
                                <template v-if="questionGroup.key !== 'culture'">
                                    <label class="inputOptions__singleSelect" :class="{
                                        'inputOptions__singleSelect--selected': checkSelected(item, questionGroup),
                                    }" :for="`inputOptions__singleSelect${item.value}`">
                                        <input v-show="false" v-model="state.tempUser.preference[questionGroup.key]"
                                            type="radio" :id="`inputOptions__singleSelect${item.value}`"
                                            :value="item.value" @click="setAnswers(item.value, questionGroup.key)" />
                                        <span class="label__description">{{ item.textUser }}</span>
                                    </label>
                                </template>
                                <template v-else>
                                    <div>
                                        <label class="inputOptions__multipleSelect">
                                            <input v-model="state.tempUser.preference[questionGroup.key]">
                                            <span class="multipleSelect__description">{{ item.textUser }}</span>
                                        </label>
                                    </div>
                                </template>
                            </template>
                        </div>
                        <button class="body__button body__button--right" type="button"
                            :disabled="checkQuestionAnswered()" @click="handleClickNext()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </template>
        </div>
        <div v-if="getPartTwo()" class="questions__result">
            <img class="result__leftImage" src="./assets/papers.png" />
            <img class="result__rightImage" src="./assets/guy.png" />
            <p class="result__header">Job Pair已依據您的求職偏好配對適合的職缺<br />立即查看潛在職缺有哪些吧！</p>
            <button type="button" class="result__button" @click="showUserModal()">看結果</button>
            <div class="result__tooltip" data-bs-toggle="tooltip" data-bs-placement="right"
                title="您剛剛選擇的內容為您的求職偏好，Job Pair將搭配企業端用人偏好的資訊，推薦您與您個人求職偏好相契合的公司與職缺。">
                甚麼是潛在適合職缺<i class="far fa-question-circle tooltip__icon"></i>
            </div>
            <div class="mt-3">
                <button type="button" class="btn btn-light" @click="routeToStart()">修改偏好答案</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $toggleLoader, $emitter } = useNuxtApp()
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
    const id = route.path.split('/').slice(-1)[0] - 1
    return Number(id) || 0
})
// hooks
onMounted(async () => {
    const response = await repoSelect.getQuestions()
    state.questions = response.data
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
        state.tempUser = user
    }
}
function showUserModal() {
    const { user } = repoAuth.state
    if (user && user.uid) {
        // 有uid代表已透過google註冊，跳過詢問註冊畫面
        router.push({
            name: "userRegister",
        })
        return
    } else {
        $emitter.emit("showUserModal")
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
function routeToStart() {
    router.push(`/questions/1`)
    nextTick(() => {
        getAnswers()
    })
}
function getPartOne() {
    if (!state.questions) {
        return false
    }
    const isPartOne = questionId.value < Object.values(state.questions).length
    return isPartOne
}
function getPartTwo() {
    if (!state.questions) {
        return false
    }
    const isPartTwo = questionId.value >= Object.values(state.questions).length
    return isPartTwo
}
function handleClickLast() {
    const id = Number(route.path.split('/').slice(-1)[0])
    router.push(`/questions/${id - 1}`)
}
function handleClickNext() {
    const id = Number(route.path.split('/').slice(-1)[0])
    router.push(`/questions/${id + 1}`)
}
</script>
<style lang="scss" scoped>
.questions {
    position: relative;

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

    .questions__card {
        background-color: white;
        min-height: calc(100vh - 88px);
        z-index: 10;
        position: relative;
        padding-bottom: 97px;

        .questions__questionGroup {
            width: 100%;

            .questionGroup__header {
                text-align: center;
                font-size: 28px;
                margin-bottom: 30px;
                font-weight: bold;
                color: #484848;
            }

            .questionGroup__body {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 248px;
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
                    width: 100%;
                    margin: auto;

                    .inputOptions__singleSelect {
                        width: 100%;
                        // height: 50px;
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

        .questions__card {
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
}
</style>