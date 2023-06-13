<template>
    <LazyOrganismCompanyProfile></LazyOrganismCompanyProfile>
</template>
<script setup>
const { $meta } = useNuxtApp()
useSeoMeta({
    title: `企業檔案 - 招募中心 - ${$meta.title}`
})
</script>