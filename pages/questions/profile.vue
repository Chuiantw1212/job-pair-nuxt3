<template>
    <div>
        <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="欲申請職務類別" class="mt-4"
            :max="3" required>
            <template v-slot:header>
                <LazyMoleculeProfileSelectLabels v-model="state.profile.occupationalCategory" placeholder="欲申請職務類別"
                    :items="repoSelect.jobCategory">
                </LazyMoleculeProfileSelectLabels>
            </template>
            <template v-slot:body>
                <LazyMoleculeFilterCategory v-model="state.profile.occupationalCategory" :items="repoSelect.jobCategory"
                    :categoryMap="repoSelect.jobCategoryMap" :max="3" :isLarge="device.state.isLarge" required
                    name="欲申請職務類別">
                </LazyMoleculeFilterCategory>
            </template>
        </LazyMoleculeProfileSelectContainer>
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
const state = reactive({
    // 注意資料結構共用
    currentIndex: 0,
    questions: [],
    tempUser: {
        preference: {
            culture: []
        },
    },
    singleSelects: ['']
})
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