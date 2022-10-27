<template>
    <div>
        Job Pair
        {{ title }}
    </div>
</template>
<script setup lang="ts">
// definePageMeta({
//     title: 'Some Page'
// })
// let title = ref('My amazing site.')
const { data, pending, refresh } = await useAsyncData(async (ctx) => {
    const title = new Promise(resolve => {
        setTimeout(() => {
            resolve('測試職缺名稱 測試公司名稱')
        }, 500)
    })
    return title
})
const title: any = data.value

useHead({
    title: title,
    meta: [
        { property: 'og:title', content: title },
        { property: 'og:image', content: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImageJob.png' }
    ],
})
</script>