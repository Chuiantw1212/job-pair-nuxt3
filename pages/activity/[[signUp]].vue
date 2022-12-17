<template>
    <div>
        報名成功:{{ $filter.time(state.record?.signUpDate) }}
    </div>
</template>
<script setup>
const { $filter, $emitter } = useNuxtApp()
const repoActivity = useRepoActivity()
const repoAuth = useRepoAuth()
const route = useRoute()
const state = reactive({
    record: null
})
watch(() => repoAuth.state.user, async (newValue) => {
    if (process.client && !newValue) {
        $emitter.emit("showUserModal")
    }
    if (process.client && route.params.signUp === 'auto') {
        sessionStorage.setItem('autoSignUp', true)
    }
    if (process.client && newValue) {
        signUp()
    }
}, { immediate: true })
async function signUp() {
    const response = await repoActivity.postSignUp()
    state.record = response.data
    sessionStorage.removeItem('autoSignUp')
}
</script>