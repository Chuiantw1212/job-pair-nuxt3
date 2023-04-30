<template>
    <div class="questions">
        <!-- <div class="questions__description">
            此量表答案沒有對錯好壞。請依照就職中的一般狀況，點選與你心中就職情況最符合的選項
        </div> -->
        <LazyAtomProgress class="questions__progress"></LazyAtomProgress>
        <img class="questions__leftImage" src="~/assets/questions/left.png" />
        <img class="questions__rightImage" src="~/assets/questions/right.png" />
        <div class="questions__body">
            <template v-for="(item, index) in state.questions">
                <AtomInputSelect v-if="index < 5" class="body__select" :name="`Q${index + 1}：${item.descUser}`"
                    :items="state.questions[index].items" required itemText="textUser"
                    @update:modelValue="setAnswers($event, item.key)">
                </AtomInputSelect>
                <div v-else class="body__multiselect">
                    <div>
                        <span class="text-danger">*</span>Q{{ index + 1 }}：{{ item.descUser }}(多選)
                    </div>
                    <div class="multiselect__list">
                        <input v-show="false" :value="checkSomeSelected()" :data-required="true" :data-name="item.descUser">
                        <label v-for="(subItem, index2) in  item.items" :key="`multiItem${index2}`"
                            class="inputOptions__multipleSelect">
                            <img v-show="checkOptionSelected(subItem)" src="~/assets/questions/checkboxSelected.svg">
                            <input v-show="!checkOptionSelected(subItem)" v-model="state.tempUser.preference['culture']"
                                :value="subItem.value" class="multiSelect__checkbox" type="checkbox"
                                :disabled="checkOptionDisabled(subItem)" @change="setCulture()">
                            <span class="multipleSelect__description">{{ subItem.textUser }}</span>
                        </label>
                    </div>
                </div>
            </template>
        </div>
        <div class="questions__footer">
            <LazyAtomBtnSimple @click="handleClickNext()">下一步
            </LazyAtomBtnSimple>
        </div>
    </div>
</template>
<script>
export default {
    name: 'QuestionForm'
}
</script>
<script setup>
const { $bootstrap, $sweet, $validate } = useNuxtApp()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const repoJob = useRepoJob()
const repoUser = useRepoUser()
const route = useRoute()
const router = useRouter()
const loginComposable = useLogin()
const state = reactive({
    // 注意資料結構共用
    currentIndex: 0,
    questions: [],
    tempUser: {
        preference: {
            culture: []
        },
    },
    singleSelects: ['']
})
const questionId = computed(() => {
    const id = Number(route.params.id) - 1
    return Number(id) || 0
})
// hooks
useSeoMeta({
    title: () => `求職偏好 - 註冊流程 - Job Pair`,
})
onMounted(async () => {
    let questions = []
    const { questionsRes = [] } = repoSelect.state
    if (questionsRes && questionsRes.length) {
        questions = repoSelect.state.questionsRes
    } else {
        $sweet.loader(true)
        const response = await repoSelect.getQuestions()
        $sweet.loader(false)
        questions = response.data
    }
    state.questions = questions
    getAnswers()
})
watch(() => repoAuth.state.user, () => {
    const { user } = repoAuth.state
    // 使用者已註冊
    if (user && user.id && user.type === 'employee' && process.client) {
        localStorage.removeItem("user")
    }
}, { immediate: true })
watch(() => questionId.value, () => {
    nextTick(() => {
        initTooltip()
    })
}, { immediate: true })
// methods
function checkOptionDisabled(item) {
    const isSelected = checkOptionSelected(item)
    return state.tempUser.preference['culture'].length >= 2 && !isSelected
}
function checkOptionSelected(item) {
    return state.tempUser.preference['culture'].includes(item.value)
}
function checkSomeSelected() {
    return state.tempUser.preference['culture'].length >= 1
}
function setCulture() {
    if (process.client) {
        localStorage.setItem("user", JSON.stringify(state.tempUser))
    }
}
function setAnswers(value, key) {
    console.log('setAnswers');
    state.tempUser.preference[key] = value
    localStorage.setItem("user", JSON.stringify(state.tempUser))
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
async function handleClickNext() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    router.push({
        name: 'questions-profile'
    })
    // const id = questionId.value + 1
    // if (id >= 6) {
    //     router.push(`/questions/result`)
    // } else {
    //     router.push(`/questions/${id + 1}`)
    // }
}
</script>
<style lang="scss" scoped>
.questions {
    position: relative;
    background-color: white;
    min-height: calc(100vh - 88px);
    z-index: 10;
    position: relative;
    padding-top: 20px;
    padding-bottom: 97px;
    min-height: 100vh;

    .questions__progress {
        margin: 0 auto;
        max-width: 120px;
    }

    .questions__body {
        margin-top: 20px;
        padding: 0 20px;

        .body__select {
            &:not(:first-child) {
                margin-top: 20px;
            }
        }

        .body__multiselect {
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #1f1f1f;
            margin-top: 20px;

            .multiselect__list {
                .inputOptions__multipleSelect {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.63;
                    letter-spacing: normal;
                    text-align: left;
                    color: #333;
                    display: flex;
                    margin-top: 8px;

                    &:not(:first-child) {
                        margin-top: 20px;
                    }

                    .multipleSelect__description {
                        margin-left: 10px;
                        text-align: left;
                    }

                    .multiSelect__checkbox {
                        min-width: 20px;
                        min-height: 20px;
                    }
                }
            }
        }

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