<template>
    <div class="questions">
        <div class="questions__result">
            <img class="result__leftImage" src="~/assets/questions/papers.png" />
            <img class="result__rightImage" src="~/assets/questions/guy.png" />
            <!-- <p class="result__header">Job Pair已依據您的求職偏好配對適合的職缺<br />立即查看潛在職缺有哪些吧！</p> -->
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
                <button type="button" class="btn btn-light">修改偏好答案</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
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
</script>
<style lang="scss">
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
        z-index: 10;
    }

    .result__category {
        width: 100%;
        max-width: 1181px;
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