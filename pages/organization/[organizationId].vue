<script setup>

// const client = useSupabaseClient()
// const subdomain = useSubdomain()
// const profile = useSubdomainProfile()

// // this should fetch user's profiles and settings (if any)
// useAsyncData("profile", async () => {
//     const { data, error } = await client
//         .from("profiles")
//         .select("*")
//         .or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`)
//         .maybeSingle()

//     profile.value = data
//     return data
// })
</script>

<template>
    <div>
        12456789
        <NuxtPage></NuxtPage>
    </div>
</template>

<!-- <template>
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
</script> -->