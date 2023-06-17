<template>
    <LazyOrganismCompanyProfile></LazyOrganismCompanyProfile>
</template>
<script setup>
const runTimeConfig = useRuntimeConfig()
useSeoMeta({
    title: () => `企業檔案 - 管理中心 - ${runTimeConfig.public.siteName}`,
    ogTitle: () => `企業檔案 - 管理中心 - ${runTimeConfig.public.siteName}`
})
</script>