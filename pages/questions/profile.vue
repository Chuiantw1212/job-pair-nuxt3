<template>
    <div class="profile container">
        <div class="profile__header">最後一個步驟，<br class="d-lg-none">就完成會員註冊囉！</div>
        <div class="profile__body">
            <LazyAtomInputSelect v-if="repoSelect.state.selectByQueryRes" name="選擇僱傭性質" v-model="modelValue.employmentType"
                :items="repoSelect.state.selectByQueryRes.employmentType" required class="mt-3">
            </LazyAtomInputSelect>
            <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="選擇職務類別" class="mt-4"
                :max="3" required>
                <template v-slot:header>
                    <LazyMoleculeProfileSelectLabels v-model="modelValue.occupationalCategory" placeholder="選擇職務類別"
                        :items="repoSelect.jobCategory">
                    </LazyMoleculeProfileSelectLabels>
                </template>
                <template v-slot:body>
                    <LazyMoleculeFilterCategory v-model="modelValue.occupationalCategory" :items="repoSelect.jobCategory"
                        :categoryMap="repoSelect.jobCategoryMap" :max="3" :isLarge="device.state.isLarge" required
                        name="選擇職務類別">
                    </LazyMoleculeFilterCategory>
                </template>
            </LazyMoleculeProfileSelectContainer>
            <LazyAtomInputCkeditor name="個人簡歷" v-model="modelValue.description" class="mt-3" :required="true" :toolbar="[]"
                placeholder="範例：我是 ### ，畢業於 ### ，有 # 年工作經驗。或是使用 簡歷產生器 快速生成，之後也可在個人檔案重新編輯唷！" ref="description">
                <LazyOrganismChatIntroModal :occupationalCategory="modelValue.occupationalCategory"
                    @update:modelValue="setDescription($event)">
                </LazyOrganismChatIntroModal>
            </LazyAtomInputCkeditor>
        </div>
        <LazyAtomBtnSimple class="profile__footer" @click="handleClickNext()">完成
        </LazyAtomBtnSimple>
    </div>
</template>
<script>
export default {
    name: 'questions-profile'
}
</script>
<script setup>
const { $sweet, $validate, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const repoEvent = useRepoEvent()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
const loginComposable = useLogin()
const repoJob = useRepoJob()
const device = useDevice()
const router = useRouter()
const state = reactive({
    filterOpen: {
        occupationalCategory: false
    }
})
// hooks
useHead({
    title: '個人資料 - 註冊流程'
})
onMounted(() => {
    scrollTo(0, 0)
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
// methods
const currentInstance = getCurrentInstance()
async function setDescription(data) {
    const descriptionRef = currentInstance.refs.description
    if (descriptionRef) {
        descriptionRef.setData(data)
    }
}
async function handleClickNext() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    // 註冊新用戶
    const submitted = await handleSubmit()
    if (!submitted) {
        return
    }
    // 爬出用戶並更新圖片
    // 註冊活動事件
    if (repoEvent.state.contributor && repoEvent.state.eventId) {
        await repoEvent.postEventRegistration({
            eventId: repoEvent.state.eventId,
            contributor: repoEvent.state.contributor
        })
    }
    router.push({
        name: 'questions-result'
    })
}
async function handleSubmit() {
    const user = Object.assign({}, repoAuth.state.user, props.modelValue)
    $sweet.loader(true)
    const postResponse = await repoUser.postUser(user)
    if (postResponse.status !== 200) {
        return
    }
    const userData = postResponse.data
    repoAuth.setUser(userData)
    await loginComposable.setIdToken()
    try {
        await repoJob.getJobRecommended()
    } catch (error) {
        console.log(error.message);
    }
    $sweet.loader(false)
    // 刪除暫存資料
    localStorage.removeItem("user")
    return userData
}
</script>
<style lang="scss" scoped>
.profile {
    margin: auto;
    max-width: 640px;
    padding: 0 20px;

    .profile__header {
        font-size: 28px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #333;
        margin-top: 20px;
    }

    .profile__footer {
        width: 100%;
        margin-top: 27px;
    }
}
</style>