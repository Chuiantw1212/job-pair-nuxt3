<template>
    <div class="questions">
        <img class="questions__background1 d-none d-lg-block" src="~/assets/questions/Group29.svg" alt="background">
        <img class="questions__background2 d-none d-lg-block" src="~/assets/questions/Group30.svg" alt="background">
        <router-view v-model="state.tempUser" :questions="state.questions"></router-view>
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
    tempUser: {
        preference: {
            culture: []
        },
    },
    questions: [],
})
onMounted(async () => {
    const currentRouteName = route.name
    if (currentRouteName === 'questions') {
        router.replace({
            name: 'questions-id',
            params: {
                id: 1
            }
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
    min-height: 100%;
    min-height: calc(100vh - 60px - 126px);
    position: relative;

    .questions__background1 {
        position: absolute;
        top: 0;
        left: 0;
    }

    .questions__background2 {
        position: absolute;
        right: 0;
        bottom: 0;
    }
}

@media screen and (min-width: 992px) {
    .questions {
        min-height: calc(100vh - 60px - 96px);
    }
}
</style>