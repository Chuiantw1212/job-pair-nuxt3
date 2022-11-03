<template>
    <div class="questions">
        <div v-if="getPartOne()" class="questions__card">
            <div class="questions__description">
                此量表答案沒有對錯好壞。請依照就職中的一般狀況，點選與你心中就職情況最符合的選項
            </div>
            <Progress class="questions__progress"></Progress>
            <img class="questions__leftImage" src="~/assets/questions/left.png" />
            <img class="questions__rightImage" src="~/assets/questions/right.png" />
            <template v-for="(questionGroup, key) in state.questions" :key="key">
                <div v-if="questionId == key" class="questions__questionGroup">
                    <h2 class="questionGroup__header">{{ questionGroup.descUser }}...</h2>
                    <div class="questionGroup__body">
                        <button class="body__button body__button--left" type="button" :disabled="questionId == 0"
                            @click="handleClickLast()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <SelectOptions v-model="tempUser.preference[questionGroup.key]" class="body__options"
                            :config="questionGroup" @update="setAnswers($event, questionGroup.key)"></SelectOptions>
                        <button class="body__button body__button--right" type="button"
                            :disabled="checkQuestionAnswered()" @click="handleClickNext()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </template>
        </div>
        <div v-else class="questions__result">
            <img class="result__leftImage" src="~/assets/questions/papers.png" />
            <img class="result__rightImage" src="~/assets/questions/guy.png" />
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
})
const questionId = computed(() => {
    const id = route.path.split('/').slice(-1)[0]
    return Number(id) || 0
})
// hooks
onMounted(async () => {
    $toggleLoader(true)
    const response = await repoSelect.getQuestions()
    $toggleLoader(false)
    state.questions = response.data
    getAnswers()
})
// methods
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
    // document.title = `${value + 1} - 偏好量表 - Job Pair`
}, { immediate: true })
// methods
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
function setAnswers(event, key) {
    state.tempUser.preference[key] = event
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
    router.push({
        name: "questions",
        params: {
            id: 0,
        },
    })
    nextTick(() => {
        getAnswers()
    })
}
function getPartOne() {
    if (!state.questions) {
        return true
    }
    const isPartOne = questionId.value < Object.values(state.questions).length - 1
    return isPartOne
}
function handleClickLast() {
    router.push(`/question/${questionId.value - 1}`)
}
function handleClickNext() {
    router.push(`/question/${questionId.value + 1}`)
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
                }
            }
        }
    }
}
</style>