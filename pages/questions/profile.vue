<template>
    <div>
        個人資料
    </div>
</template>
<script>
export default {
    name: 'questions-profile'
}
</script>
<script setup>
const { $validate } = useNuxtApp()
const repoEvent = useRepoEvent()
// hooks
useSeoMeta({
    title: () => `個人資料 - 註冊流程 - Job Pair`,
})
onMounted(() => {

})
// methods
async function routeToCategory() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    const submitted = await handleSubmit()
    if (!submitted) {
        return
    }
    if (repoEvent.state.contributor) {
        await repoEvent.postEventRegistration({
            eventId: repoEvent.state.eventId,
            contributor: repoEvent.state.contributor
        })
    }
    router.push({
        name: 'questions-result'
    })
}
</script>