<template>
    <div v-if="state.isVisible" class="bubble">
        <img class="bubble__monica" src="./img_bubble_girl.svg">
        <button class="bubble__cancel" @click="state.isVisible = false">
            <img src="./Icon.svg">
        </button>
        <img src="./Group.svg">
        <div class="bubble__text">
            繼續完成個人檔案<br>
            來獲得適合您的職缺！
        </div>
        <AtomBtnSimple class="bubble__button" @click="routeToProfile()">馬上填寫</AtomBtnSimple>
    </div>
</template>
<script setup>
const repoAuth = useRepoAuth()
const router = useRouter()
const state = reactive({
    isSet: false,
    isVisible: false
})
watchEffect(() => {
    const { user } = repoAuth.state
    if (user && !state.isSet) {
        const requiredFields = ['telephone', 'birthDate', 'occupationalCategory', 'description', 'resumes']
        const isInComplete = requiredFields.some(key => {
            const value = user[key]
            const case1 = Array.isArray(value) && value.length === 0
            const case2 = !value
            return case1 || case2
        })
        state.isSet = true
        state.isVisible = isInComplete
    }
})
function routeToProfile() {
    router.push(`/user/profile`)
}
</script>
<style lang="scss">
.bubble {
    position: fixed;
    bottom: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    z-index: 1030;

    .bubble__monica {
        position: absolute;
        top: -24px;
        right: 48px;
    }

    .bubble__cancel {
        position: absolute;
        top: 59px;
        right: 18px;
        background-color: inherit;
        border: none;
    }

    .bubble__text {
        position: absolute;
        top: 66px;
        left: 24px;
        font-size: 20px;
        font-weight: bold;
        line-height: 1.5;
    }

    .bubble__button {
        position: absolute;
        left: 24px;
        bottom: 24px;
        width: 220px !important;
    }
}
</style>