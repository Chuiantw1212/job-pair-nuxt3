<template>
    <NuxtPage></NuxtPage>
</template>
<script setup>
const runTimeConfig = useRuntimeConfig()
useSeoMeta({
    title: () => `企業專區 - ${runTimeConfig.public.siteName}`,
})
</script>