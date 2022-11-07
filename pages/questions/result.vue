<template>
    <div class="questions">
        <div class="questions__result">
            <img class="questions__leftImage" src="~/assets/questions/left.png" />
            <img class="questions__rightImage" src="~/assets/questions/right.png" />
            <p class="result__header"></p>
            <div class="result__final">
                <div class="final__header">求職偏好已完成！</div>
                <div class="final__sub">接下來開始編輯個人檔案吧！</div>
                <div class="final__text">完成個人檔案將大幅提升被企業看到的機會唷</div>
            </div>
            <!-- <div class="result__category">
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
            </div> -->
            <AtomBtnSimple class="result__submit mt-4" @click="routeToProfile()">編輯個人檔案</AtomBtnSimple>
            <div class="result__footer">
                <button type="button" class="btn btn-light" @click="routeToJobs()">查看職缺</button>
                <!-- <button type="button" class="btn btn-light" @click="routeToFisrt()">直接看職缺</button> -->
            </div>
        </div>
    </div>
</template>
<script setup>
const { $toggleLoader, $validate } = useNuxtApp()
const device = useDevice()
const router = useRouter()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
const repoSelect = useRepoSelect()
const repoJob = useRepoJob()
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
    const userString = localStorage.getItem("user")
    if (!userString || userString === "false") {
        return
    }
    const user = JSON.parse(userString)
    state.profile = user
}
function routeToFisrt() {
    router.push('/questions/1')
}
function routeToProfile() {
    handleSubmit()
    router.push({
        name: 'user-profile'
    })
}
function routeToJobs() {
    handleSubmit()
    router.push({
        name: 'jobs'
    })
}
async function handleSubmit() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    const user = Object.assign({}, repoAuth.state.user, state.profile,)
    $toggleLoader(true)
    const postResponse = await repoUser.postUser(user)
    if (postResponse.status !== 200) {
        return
    }
    repoAuth.setUser(postResponse.data)
    await repoJob.getJobRecommended()
    $toggleLoader(false)
    // 刪除暫存資料
    localStorage.removeItem("user")
    window.scrollTo(0, 0)
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

    .result__final {
        text-align: center;

        .final__header {
            font-size: 28px;
            font-weight: bold;
        }

        .final__sub {
            font-size: 24px;
            font-weight: bold;
            margin-top: 8px;
        }

        .final__text {
            margin-top: 4px;
        }
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

    .result__footer {
        margin-top: 16px;
        display: flex;
        gap: 16px;
    }

    .result__submit {
        max-width: 310px;
    }

    .result__tooltip {
        .tooltip__icon {
            margin-left: 8px;
        }
    }
}

@media screen and (min-width: 991px) {}
</style>