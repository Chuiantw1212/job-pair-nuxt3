<template>
    <div class="container">
        <LazyOrganismCompanyProfile></LazyOrganismCompanyProfile>
    </div>
</template>
<script setup>
const { $validate, $sweet, } = useNuxtApp()
const router = useRouter()
const repoAuth = useRepoAuth()
const repoAdmin = useRepoAdmin()
watch(() => repoAuth.state.user, async (newValue) => {
    if (!newValue) {
        return
    }
    // 這個畫面要判斷是否是已經註冊的admin
    const isRegistered = newValue && newValue.id
    if (!isRegistered) {
        const postRes = await repoAdmin.postAdmin(newValue)
        if (postRes.data.id) {
            const addedUser = postRes.data
            addedUser.type = 'admin'
            repoAuth.setUser(addedUser)
        }
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.container {
    padding: 56px 0;

    .container__header {
        font-weight: bold;
        font-size: 28px;
        margin-bottom: 32px;
    }
}
</style>