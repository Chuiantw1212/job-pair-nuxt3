<template>
    <div class="form">
        <div class="form__hint">
            此量表答案沒有對錯好壞。請依照就職中的一般狀況，點選與你心中就職情況最符合的選項
        </div>
        <LazyAtomProgress :modelValue="questionIndex" :items="state.breadcrumbs" class="form__progress">
        </LazyAtomProgress>
        <template v-if="state.questions.length" class="form__body">
            <h1 class="body__header">{{ state.questions[questionIndex].descUser }}</h1>
            <div v-if="questionIndex === 5" class=" body__sub">多選題(最多兩項)</div>
            <div class="body__cardGroups">
                <label v-for="( item, index ) in  state.questions[questionIndex].items " class="cardGroups__card"
                    :class="{ 'cardGroups__card--active': checkCardStatus(item) === 'active', 'cardGroups__card--disabled': checkCardStatus(item) === 'disabled' }"
                    :key="index">
                    <div class="card__image">
                        <img v-if="questionIndex === 0 && index === 0" src="@/assets/questions/工作環境1.png">
                        <img v-if="questionIndex === 0 && index === 1" src="@/assets/questions/工作環境2.png">
                        <img v-if="questionIndex === 0 && index === 2" src="@/assets/questions/工作環境3.png">
                        <img v-if="questionIndex === 1 && index === 0" src="@/assets/questions/工作模式1.png">
                        <img v-if="questionIndex === 1 && index === 1" src="@/assets/questions/工作模式2.png">
                        <img v-if="questionIndex === 1 && index === 2" src="@/assets/questions/工作環境3.png">
                        <img v-if="questionIndex === 2 && index === 0" src="@/assets/questions/人際風格1.png">
                        <img v-if="questionIndex === 2 && index === 1" src="@/assets/questions/人際風格2.png">
                        <img v-if="questionIndex === 2 && index === 2" src="@/assets/questions/工作環境3.png">
                        <img v-if="questionIndex === 3 && index === 0" src="@/assets/questions/組織階段1.png">
                        <img v-if="questionIndex === 3 && index === 1" src="@/assets/questions/組織階段2.png">
                        <img v-if="questionIndex === 3 && index === 2" src="@/assets/questions/組織階段3.png">
                        <img v-if="questionIndex === 3 && index === 3" src="@/assets/questions/工作環境3.png">
                        <img v-if="questionIndex === 4 && index === 0" src="@/assets/questions/管理模式1.png">
                        <img v-if="questionIndex === 4 && index === 1" src="@/assets/questions/管理模式2.png">
                        <img v-if="questionIndex === 4 && index === 2" src="@/assets/questions/管理模式3.png">
                        <img v-if="questionIndex === 4 && index === 3" src="@/assets/questions/工作環境3.png">
                        <img v-if="questionIndex === 5 && index === 0" src="@/assets/questions/企業文化.png">
                        <img v-if="questionIndex === 5 && index === 1" src="@/assets/questions/企業文化2.png">
                        <img v-if="questionIndex === 5 && index === 2" src="@/assets/questions/企業文化3.png">
                        <img v-if="questionIndex === 5 && index === 3" src="@/assets/questions/企業文化4.png">
                        <img v-if="questionIndex === 5 && index === 4" src="@/assets/questions/企業文化5.png">
                        <img v-if="questionIndex === 5 && index === 5" src="@/assets/questions/工作環境3.png">
                    </div>
                    <template v-if="questionIndex === 5">
                        <input v-show="false" v-model="state.culture" :value="item.value"
                            :disabled="checkCardStatus(item) === 'disabled'" type="checkbox">
                    </template>
                    <template v-else>
                        <input v-show="false" v-model="localValue.preference[state.questions[questionIndex].key]"
                            :value="item.value" type="radio" @click="gotoNextQuestion($event)">
                    </template>
                    <span class="card__text">{{ item.textUser }}</span>
                </label>
            </div>
        </template>
        <div v-if="questionIndex === 5" class="form__footer">
            <LazyAtomBtnSimple class="footer__btn" :disabled="checkBtnDisabled()" @click="gotoProfile()">完成
            </LazyAtomBtnSimple>
        </div>
    </div>
</template>
<script setup>
const { $sweet, } = useNuxtApp()
const repoSelect = useRepoSelect()
const route = useRoute()
const router = useRouter()
const state = reactive({
    questions: [],
    activeIndex: 0,
    breadcrumbs: [
        {
            name: 'questions-id-1',
        },
        {
            name: 'questions-id-2'
        },
        {
            name: 'questions-id-3'
        },
        {
            name: 'questions-id-4'
        },
        {
            name: 'questions-id-5'
        },
        {
            name: 'questions-id-6'
        },
    ],
    culture: [],
})
// hooks
const props = defineProps({
    modelValue: { // user
        type: Object,
        default: function () {
            return {
                preference: {
                    culture: []
                },
            }
        }
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
watch(() => state.culture, (value = []) => {
    localValue.value.preference.culture = value
}, { deep: true })
const questionIndex = computed(() => {
    return route.params.id - 1
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
})
// methods
function checkBtnDisabled() {
    const selectedAnswer = localValue.value.preference[state.questions[questionIndex.value]?.key]
    const isMultiSelect = Array.isArray(selectedAnswer)
    if (isMultiSelect) {
        return !selectedAnswer.length
    }
}
function checkCardStatus(item) {
    const { value } = item
    const questionKey = state.questions[questionIndex.value]?.key
    const selectedAnswer = localValue.value.preference[questionKey]
    const isMultiSelect = Array.isArray(selectedAnswer)
    if (isMultiSelect) {
        if (selectedAnswer.includes(value)) {
            return 'active'
        }
        if (selectedAnswer.length >= 2) {
            return 'disabled'
        }
    } else {
        // is single select 
        if (selectedAnswer === value) {
            return 'active'
        }
    }
}
function gotoProfile() {
    router.push({
        name: 'questions-profile',
    })
}
function gotoNextQuestion() {
    setTimeout(() => {
        const currentId = Number(route.params.id)
        if (currentId >= 6) {
            return
        } else {
            router.push({
                name: 'questions-id',
                params: {
                    id: currentId + 1
                }
            })
        }
    })
}
</script>
<style lang="scss" scoped>
.form {
    text-align: center;
    padding-top: 95px;
    padding-bottom: 50px;

    .form__hint {
        background: rgba(255, 243, 205, 0.60);
        padding: 12px 36px;
        color: #856404;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18.2px;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
    }

    .form__progress {
        margin: 0 auto;
        max-width: 244px;
    }

    .body__header {
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        text-align: center;
    }

    .body__sub {
        text-align: left;
        max-width: 320px;
        margin: auto;
        margin-top: 27px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        /* 128.571% */
    }

    .body__cardGroups {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 27px;
        align-items: center;

        .cardGroups__card {
            border-radius: 10px;
            border: 1px solid #42708F;
            background: white;
            width: 320px;
            padding: 20px;
            display: flex;
            align-items: center;
            text-align: left;
            gap: 10px;
            color: #42708F;
            cursor: pointer;
            height: 116px;

            &:hover {
                background: #42708F;
                color: white;
            }

            .card__image {
                min-width: 76px;
            }

            .card__text {
                font-family: Roboto;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                line-height: 26px;
            }
        }

        .cardGroups__card--active {
            background: #42708F;
            color: white;
        }

        .cardGroups__card--disabled {
            opacity: 0.7;

            &:hover {
                background: unset;
                color: #42708F;
                cursor: unset;
            }
        }
    }





    .form__footer {
        display: flex;
        justify-content: center;
        margin-top: 27px;

        .footer__btn {
            width: 320px;
        }
    }
}

@media screen and (min-width: 992px) {
    .form {
        position: relative;
    }
}
</style>