<template>
    <div>
        {{ state.companyInfo }}
    </div>
</template>
<script setup>
import defaultBanner from '~/assets/company/img_banner_default.webp'
import defaultLogo from '~/assets/company/company.webp'
const { $uuid4, $requestSelector, $optionText, $Glide, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const device = useDevice()
const route = useRoute()
const repoCompany = useRepoCompany()
const repoSelect = useRepoSelect()
const jobScroller = useJobScroller()
const repoAuth = useRepoAuth()
const imageRef = ref(null)
const state = reactive({
    companyInfo: {}
})
const organizationId = computed(() => {
    return route.params.organizationId
})
const { data: company } = await useFetch(`${runTimeConfig.public.apiBase}/company/${organizationId.value}`, { initialCache: false })
state.companyInfo = company
</script>