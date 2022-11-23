<template>
    <div id="app" class="app w-100">
        <OrganismHeader />
        <slot></slot>
        <OrganismFooter />
    </div>
</template>
<script setup>
const descriptionContent = '在 Job Pair 不論求職找工作或徵才找人，是以企業文化、管理模式、人際風格等雙方的軟性需求進行演算，提供團隊適配度給雙方參考。跳脫僅能以地區、薪資、職務類別、產業等資訊評估職缺；或人選的性別、年齡、學歷等表象資訊，為雙方配對能合作的人才與工作。'
const repoSelect = useRepoSelect()
// hooks
useHead({
    htmlAttrs: {
        lang: 'zh-Hant'
    },
    meta: [
        { name: 'description', content: descriptionContent },
        { property: 'og:description', content: descriptionContent },
    ],
    // Favicon https://github.com/nuxt/framework/discussions/5204
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