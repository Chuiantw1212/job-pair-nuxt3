<template>
    <div class="form">
        <div class="form__body">
            <template v-for="(item, index) in state.questions">
                <AtomInputSelect v-if="index < 5" v-model="modelValue.preference[item.key]" class="body__select"
                    :name="`Q${index + 1}：${item.descUser}`" :items="state.questions[index].items" required
                    itemText="textUser">
                </AtomInputSelect>
                <div v-else class="body__multiselect">
                    <div>
                        <span class="text-danger">*</span>Q{{ index + 1 }}：{{ item.descUser }}(多選)
                    </div>
                    <div class="multiselect__list">
                        <label v-for="(subItem, index2) in  item.items" :key="`multiItem${index2}`"
                            class="inputOptions__multipleSelect">
                            <img v-show="checkOptionSelected(subItem)" src="~/assets/questions/checkboxSelected.svg">
                            <input v-show="!checkOptionSelected(subItem)" v-model="modelValue.preference['culture']"
                                :value="subItem.value" class="multiSelect__checkbox" type="checkbox"
                                :disabled="checkOptionDisabled(subItem)">
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
const { $sweet, $validate, $meta } = useNuxtApp()
const repoSelect = useRepoSelect()
const router = useRouter()
const state = reactive({
    questions: [],
})
const props = defineProps({
    modelValue: {
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
// hooks
useSeoMeta({
    title: () => `求職偏好 - 註冊流程 - ${$meta.title}`,
    ogTitle: () => `求職偏好 - 註冊流程 - ${$meta.title}`
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
function checkOptionDisabled(item) {
    const isSelected = checkOptionSelected(item)
    return props.modelValue.preference['culture'].length >= 2 && !isSelected
}
function checkOptionSelected(item) {
    return props.modelValue.preference['culture'].includes(item.value)
}
function checkSomeSelected() {
    return props.modelValue.preference['culture'].length >= 1
}
async function handleClickNext() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    router.push({
        name: 'questions-profile'
    })
}
</script>
<style lang="scss" scoped>
.form {

    .form__body {
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
    .form {
        padding-top: 40px;

        .form__body {
            max-width: 640px;
            margin: auto;
        }
    }
}
</style>