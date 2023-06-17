<template>
    <NuxtPage></NuxtPage>
</template>
<script setup>
const { $emitter } = useNuxtApp()
const repoAuth = useRepoAuth()
const { $meta } = useNuxtApp()
useSeoMeta({
    title: () => `企業專區 - ${$meta.title}`,
})
</script>