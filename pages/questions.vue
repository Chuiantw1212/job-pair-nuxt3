<template>
    <div class="questions">
        <img class="questions__leftImage" src="~/assets/questions/left.png" />
        <img class="questions__rightImage" src="~/assets/questions/right.png" />
        <LazyAtomProgress :items="state.breadcrumbs" class="questions__progress">
        </LazyAtomProgress>
        <router-view v-model="state" :questions="state.questions"></router-view>
    </div>
</template>
<script>
export default {
    name: 'QuestionIndex'
}
</script>
<script setup>
const route = useRoute()
const router = useRouter()
const repoAuth = useRepoAuth()
const state = reactive({
    currentIndex: 0,
    tempUser: {
        preference: {
            culture: []
        },
    },
    breadcrumbs: [
        {
            text: '求職偏好',
            name: 'questions-preference'
        },
        {
            text: '個人資料',
            name: 'questions-profile'
        },
        {
            text: '註冊結果',
            name: 'questions-result'
        }
    ],
    questions: [],
})
onMounted(async () => {
    const currentRouteName = route.name
    if (currentRouteName === 'questions') {
        router.replace({
            name: 'questions-preference'
        })
    }
    if (process.client) {
        getAnswers()
    }
})
watch(() => repoAuth.state.user, () => {
    const { user } = repoAuth.state
    // 使用者已註冊
    if (user && user.id && user.type === 'employee' && process.client) {
        localStorage.removeItem("user")
    }
}, { immediate: true })
watch(() => state.tempUser, () => {
    localStorage.setItem("user", JSON.stringify(state.tempUser))
}, { deep: true })
// methods
function getAnswers() {
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
</script>
<style lang="scss" scoped>
.questions {
    position: relative;
    background-color: white;
    min-height: calc(100vh - 88px);
    position: relative;
    padding-top: 20px;
    padding-bottom: 50px;
    min-height: 100vh;

    .questions__progress {
        margin: 0 auto;
        max-width: 240px;
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
        z-index: -1;
    }
}
</style>