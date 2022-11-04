<template>
    <div class="questions">
        <div class="questions__result">
            <img class="questions__leftImage" src="~/assets/questions/left.png" />
            <img class="questions__rightImage" src="~/assets/questions/right.png" />
            <p class="result__header">最後一個步驟，就完成會員註冊囉！</p>
            <div class="result__category">
                <div class="category__header">
                    選擇職務類別
                </div>
                <MoleculeProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="欲申請職務類別"
                    class="category__select" :max="3" required>
                    <template v-slot:header>
                        <MoleculeProfileSelectLabels v-model="state.profile.occupationalCategory"
                            :jobCategoryMap="repoSelect.jobCategoryMap" :items="repoSelect.jobCategory">
                        </MoleculeProfileSelectLabels>
                    </template>
                    <template v-slot:body>
                        <MoleculeFilterCategory v-model="state.profile.occupationalCategory"
                            :items="repoSelect.jobCategory" :categoryMap="repoSelect.jobCategoryMap" :max="3"
                            :isDesktop="device.state.isDesktop" required name="欲申請職務類別">
                        </MoleculeFilterCategory>
                    </template>
                </MoleculeProfileSelectContainer>
            </div>
            <AtomBtnSimple class="result__submit mt-5">看結果</AtomBtnSimple>
            <!-- <button type="button" class="result__button"></button> -->
            <!-- <div class="result__tooltip" data-bs-toggle="tooltip" data-bs-placement="right"
                title="您剛剛選擇的內容為您的求職偏好，Job Pair將搭配企業端用人偏好的資訊，推薦您與您個人求職偏好相契合的公司與職缺。">
                甚麼是潛在適合職缺<i class="far fa-question-circle tooltip__icon"></i>
            </div> -->
            <div class="mt-3">
                <button type="button" class="btn btn-light" @click="routeToFisrt()">修改偏好答案</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
const router = useRouter()
const repoSelect = useRepoSelect()
const state = reactive({
    filterOpen: {
        occupationalCategory: false
    },
    profile: {}
})
onMounted(async () => {
    getAnswers()
})
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
        state.profile = user
    }
}
function routeToFisrt() {
    router.push('/questions/1')
}
</script>
<style lang="scss">
.questions__result {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 128px 5vw 200px 5vw;
    min-height: calc(100vh - 88px);

    .questions__leftImage {
        position: absolute;
        left: 0;
        width: 15vw;
        top: 0;
    }

    .questions__rightImage {
        position: absolute;
        right: 0;
        width: 15vw;
        bottom: 0;
    }

    .result__header {
        font-size: 28px;
        font-weight: bold;
        text-align: left;
        line-height: 45px;
        z-index: 10;
        width: 100%;
        max-width: 616px;
    }

    .result__category {
        background-color: white;
        width: 100%;
        max-width: 616px;
        z-index: 10;

        .category__header {
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #333;
        }

        .category__select {
            margin-top: 20px;
        }
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

    .result__submit {
        max-width: 256px;
    }

    .result__tooltip {
        .tooltip__icon {
            margin-left: 8px;
        }
    }
}

@media screen and (min-width: 991px) {}
</style>