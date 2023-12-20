<template>
    <div class="form">
        <template v-if="state.questions.length" class="form__body">
            <h1 class="body__header">{{ state.questions[questionIndex].descUser }}...</h1>
            <div class="body__cardGroups">
                <button v-for="(item, index) in state.questions[questionIndex].items" class="cardGroups__card" :key="index"
                    @click="gotoNextQuestion()">
                    <div class="card__image">
                        <img v-if="questionIndex === 0 && index === 0" src="@/assets/questions/工作環境1.png">
                        <img v-if="questionIndex === 0 && index === 1" src="@/assets/questions/工作環境2.png">
                        <img v-if="questionIndex === 0 && index === 2" src="@/assets/questions/工作環境3.png">
                    </div>
                    <span class="card__text">{{ item.textUser }}</span>
                </button>
            </div>
        </template>
        <!-- <div class="questions__footer">
            <LazyAtomBtnSimple @click="handleClickNext()">下一步
            </LazyAtomBtnSimple>
        </div> -->
    </div>
</template>
<script setup>
const { $sweet, $validate, } = useNuxtApp()
const repoSelect = useRepoSelect()
const route = useRoute()
const state = reactive({
    questions: [],
})
// hooks
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
function gotoNextQuestion() {
    
}
</script>
<style lang="scss" scoped>
.form {
    text-align: center;

    .body__header {
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: 29px;
        /* 111.538% */
        text-align: center;
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
                /* 162.5% */
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
    }
}
</style>