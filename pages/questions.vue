<template>
    <div class="questions">
        <img class="questions__leftImage" src="~/assets/questions/left.png" />
        <img class="questions__rightImage" src="~/assets/questions/right.png" />
        <LazyAtomProgress class="questions__progress"></LazyAtomProgress>
        <router-view v-model="state.tempUser"></router-view>
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
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const state = reactive({
    tempUser: {
        preference: {
            culture: []
        },
    }
})
onMounted(async () => {
    const currentRouteName = route.name
    if (currentRouteName === 'questions') {
        router.replace({
            name: 'questions-form'
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
    console.log('setAnswers');
    localStorage.setItem("user", JSON.stringify(state.tempUser))
}, { deep: true })
// methods
function setSessionUser() {
    console.log('setAnswers');
    // state.tempUser.preference[key] = value
    localStorage.setItem("user", JSON.stringify(state.tempUser))
}
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
        user.preference.culture = ['A']
    }
    state.tempUser = user
}
</script>
<style scoped lang="scss">
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
}
</style>