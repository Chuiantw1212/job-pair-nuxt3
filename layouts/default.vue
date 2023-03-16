<template>
    <div id="app" class="app w-100">
        <LazyOrganismHeader />
        <div class="main">
            <slot>
            </slot>
        </div>
        <LazyOrganismFooter />
    </div>
</template>
<script setup>
const descriptionContent = '在 Job Pair 不論求職找工作或徵才找人，是以企業文化、管理模式、人際風格等雙方的軟性需求進行演算，提供團隊適配度給雙方參考。跳脫僅能以地區、薪資、職務類別、產業等資訊評估職缺；或人選的性別、年齡、學歷等表象資訊，為雙方配對能合作的人才與工作。'
const repoSelect = useRepoSelect()
// hooks
useSeoMeta({
    charset: 'utf-8',
    description: descriptionContent,
    ogUrl: 'https://job-pair.com/',
    ogTitle: 'Job Pair',
    ogDescription: descriptionContent,
    ogType: 'website',
    ogLocale: 'zh_TW',
    ogImage: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImageJob.png',
    ogImageSecureUrl: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImageJob.png',
    fbAppId: '411339927562100',
    twitterCard: 'summary',
    twitterTitle: 'Job Pair',
    twitterDescription: descriptionContent,
    twitterImage: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImageJob.png',
    viewport: {
        width: 'device-width',
    }
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
    // https://web.dev/font-display/
    font-display: swap;
    font-family: 'Noto Sans TC', sans-serif, 'charter', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif';
    padding-top: 58px;
    background-color: #ecf3f6;
    overflow-x: hidden;
}

.main {
    min-height: calc(100vh - 243px);
}

body {
    // https://codepen.io/ckeditor/pen/VqXYQq
    /* We need to assaign this CSS Custom property to the body instead of :root, because of CSS Specificity and codepen stylesheet placement before loaded CKE5 content. */
    --ck-z-default: 100;
    --ck-z-modal: calc(var(--ck-z-default) + 999);
}

.container {
    min-height: 100vh;
}
</style>