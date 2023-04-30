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
                <AtomInputSelect v-if="index < 5" v-model="state.tempUser.preference[item.key]" class="body__select"
                    :name="`Q${index + 1}：${item.descUser}`" :items="state.questions[index].items" required
                    itemText="textUser" @update:modelValue="setAnswers($event, item.key)">
                </AtomInputSelect>
                <div v-else class="body__multiselect">
                    <div>
                        <span class="text-danger">*</span>Q{{ index + 1 }}：{{ item.descUser }}(多選)
                    </div>
                    <div class="multiselect__list">
                        <label v-for="(subItem, index2) in  item.items" :key="`multiItem${index2}`"
                            class="inputOptions__multipleSelect">
                            <img v-show="checkOptionSelected(subItem)" src="~/assets/questions/checkboxSelected.svg">
                            <input v-show="!checkOptionSelected(subItem)" v-model="state.tempUser.preference['culture']"
                                :value="subItem.value" class="multiSelect__checkbox" type="checkbox"
                                :disabled="checkOptionDisabled(subItem)" @change="setCulture()">
                            <span class="multipleSelect__description">{{ subItem.textUser }}</span>
                        </label>
                        <input v-show="false" :value="checkSomeSelected()" :data-required="true" :data-name="item.descUser">
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
// methods
// async function validate(element, config = { title: '錯誤', icon: 'error' }) {
//     if (!process.client) {
//         return
//     }
//     if (!element) {
//         element = document
//     }
//     const selects = element.getElementsByTagName("select")
//     const inputs = element.getElementsByTagName("input")
//     const textareas = element.getElementsByTagName('textarea')
//     const allFormInputs = [...inputs, ...selects, ...textareas]
//     const allRequiredInputs = allFormInputs.filter(item => {
//         return item.dataset.required == 'true'
//     })
//     const nullable = ['null', null, 'undefined', undefined, false, 'false']
//     const emptyFields = allRequiredInputs.filter((input, index) => {
//         const formValue = input.dataset.value || input.value
//         return nullable.includes(formValue)
//     })
//     // 顯示彈跳視窗
//     let alertResult = { value: 1 } // 永遠預設為通過
//     if (emptyFields.length && config.icon) {
//         const emptyFieldNames = emptyFields.map(item => {
//             return item.dataset.name
//         })
//         const fieldString = emptyFieldNames.join(', ')
//         const text = `${fieldString}未填寫`
//         const swalConfig = Object.assign({
//             text,
//             confirmButtonText: '確認',
//             confirmButtonColor: '#5ea88e',
//         }, config)
//         alertResult = await $sweet.fire(swalConfig)
//         setTimeout(() => {
//             emptyFields[0].scrollIntoView({ block: "center", });
//         }, 500)
//     }
//     // 回傳驗證結果
//     const numer = allRequiredInputs.length - emptyFields.length
//     const deno = allRequiredInputs.length
//     const completeness = Math.floor(numer / deno * 100)
//     const result = {
//         isValid: !emptyFields.length,
//         completeness,
//         value: alertResult.value
//     }
//     return result
// }
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
async function handleClickNext() {
    const result = await validate()
    if (!result.isValid) {
        return
    }
    router.push({
        name: 'questions-profile'
    })
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
    padding-bottom: 50px;
    min-height: 100vh;

    .questions__progress {
        margin: 0 auto;
        max-width: 240px;
    }

    .questions__body {
        margin-top: 20px;
        padding: 0 20px;

        .body__select {
            &:not(:first-child) {
                margin-top: 12px;
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
            margin-top: 12px;

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
                        margin-top: 12px;
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

    .questions__footer {
        width: 256px;
        margin: 50px auto auto auto;
        text-align: center;
    }
}

.result__tooltip {
    width: fit-content;
    block-size: fit-content;
}

@media screen and (min-width: 991px) {
    .questions {
        padding-top: 40px;

        .questions__body {
            max-width: 640px;
            margin: auto;
        }
    }
}
</style>