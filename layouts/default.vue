<template>
    <div id="app" class="app w-100">
        <!-- <OgImageScreenshot /> -->
        <!-- <OgImageStatic /> -->
        <LazyOrganismHeader />
        <div class="main">
            <slot>
            </slot>
        </div>
        <LazyOrganismFooter />
        <!-- 如果條件渲染有異步渲染問題 -->
        <OrganismUserModal></OrganismUserModal>
        <OrganismCompanyModal></OrganismCompanyModal>
    </div>
</template>
<script setup>
// const { $liff, } = useNuxtApp()
const repoSelect = useRepoSelect()
const runTimeConfig = useRuntimeConfig()
onMounted(async () => {
    if (process.client) {
        await Promise.all([
            repoSelect.getSelectByQuery(),
            repoSelect.getLocation(),
            repoSelect.getIndustryCategory(),
            repoSelect.getQuestions(),
        ])
    }
})
useSchemaOrg([
    defineOrganization({
        name: 'Job Pair',
        logo: 'https://storage.googleapis.com/public.prd.job-pair.com/meta/logo.png',
        sameAs: [
            'https://www.facebook.com/jobpairtw/'
        ]
    }),
])
</script>
<style lang="scss" scoped>
.app {
    font-display: swap;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, 'Noto Sans TC', sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    background-color: #f9f9f9;
    overflow-x: hidden;
}

.main {
    min-height: calc(100vh - 60px - 126px);
}

body {
    // https://codepen.io/ckeditor/pen/VqXYQq
    /* We need to assaign this CSS Custom property to the body instead of :root, because of CSS Specificity and codepen stylesheet placement before loaded CKE5 content. */
    --ck-z-default: 100;
    --ck-z-modal: calc(var(--ck-z-default) + 900);
}

// https://ckeditor.com/docs/ckeditor5/latest/support/licensing/managing-ckeditor-logo.html
.ck.ck-balloon-panel.ck-powered-by-balloon {
    --ck-powered-by-border-color: #d3d3d3;
}

@media screen and (min-width: 992px) {
    .main {
        min-height: calc(100vh - 60px - 96px);
    }
}
</style>