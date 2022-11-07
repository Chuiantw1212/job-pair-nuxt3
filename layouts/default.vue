<template>
    <div id="app" class="app w-100">
        <OrganismHeader />
        <slot></slot>
        <OrganismFooter />
    </div>
</template>
<script setup>
const repoSelect = useRepoSelect()
// hooks
useHead({
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
})
onMounted(async () => {
    await Promise.all([
        repoSelect.getSelectByQuery(),
        repoSelect.getLocation(),
        repoSelect.getIndustryCategory(),
        repoSelect.getQuestions()
    ])
})
</script>
<style lang="scss">
.app {
    font-family: 'Noto Sans TC', sans-serif, 'charter', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif';
    padding-top: 58px;
    background-color: #ecf3f6;
    overflow-x: hidden;
}

.container {
    min-height: 100vh;
}
</style>