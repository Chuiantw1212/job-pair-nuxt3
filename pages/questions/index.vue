<template>
    <div>
        測試
        <LazyAtomProgress class="questions__progress"></LazyAtomProgress>
        <router-view></router-view>
    </div>
</template>
<script setup>
const route = useRoute()
const router = useRouter()
onMounted(() => {
    const currentRouteName = route.name
    if (currentRouteName === 'questions') {
        router.replace({
            name: 'questions-form'
        })
    }
    console.log({
        currentRouteName
    });
    // if(){

    // }
})
</script>