<template>
    <LazyOrganismCompanyProfile></LazyOrganismCompanyProfile>
</template>
<script setup>
const runTimeConfig = useRuntimeConfig()
useSeoMeta({
    title: () => `企業檔案 - 招募中心 - ${runTimeConfig.public.title}`,
    ogTitle: () => `企業檔案 - 招募中心 - ${runTimeConfig.public.title}`
})
</script>