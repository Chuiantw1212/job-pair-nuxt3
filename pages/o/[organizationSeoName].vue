<template>
    <div class="company" :class="{ container: device.state.isLarge }">
        <OrganismDesignBody v-if="state.organization.templates" v-model="state.organization.templates" readonly>
        </OrganismDesignBody>
        <section id="company__jobs" class="company__section mt-3">
            <div class="company__jobs" :class="{ company__card: !device.state.isLarge }">
                <div class="card__header">公司職缺</div>
                <div class="jobs__searchWrapper mt-4">
                    <LazyAtomInputSearch v-model="jobScroller.state.searchLike" @search="jobScroller.initializeSearch()">
                    </LazyAtomInputSearch>
                </div>
                <ul class="jobs__list">
                    <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobList"
                        v-model="jobScroller.state.jobList[index]" :key="index" ref="jobItems"></LazyOrganismJobItem>
                </ul>
            </div>
        </section>
    </div>
</template>
<script setup>
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
    organization: {}
})
const organizationSeoName = computed(() => {
    return route.params.organizationSeoName
})
const { data: organization } = await useFetch(`${runTimeConfig.public.apiBase}/organization/${organizationSeoName.value}`, { initialCache: false })
watch(() => repoAuth.state.user, () => {
    jobScroller.initializeSearch()
}, { immediate: true })
watch(() => jobScroller.state.jobList, (newValue = [], oldValue = []) => {
    if (newValue.length !== oldValue.length) {
        jobScroller.observeLastJob()
    }
})
useSeoMeta({
    title: () => `${state.organization?.name}`,
    ogTitle: () => `${state.organization?.name}`,
    description: () => {
        // 避免500錯誤影響SEO
        if (state.organization?.description) {
            const regex = /(<([^>]+)>)/ig
            const descriptionContent = state.organization.description.replace(regex, "")
            return descriptionContent
        }
    },
    ogDescription: () => {
        // 避免500錯誤影響SEO
        if (state.organization?.description) {
            const regex = /(<([^>]+)>)/ig
            const descriptionContent = state.organization.description.replace(regex, "")
            return descriptionContent
        }
    },
    ogImage: () => {
        const decodedBannerUri = decodeURIComponent(state.organization.banner)
        return state.organization.banner ? decodedBannerUri : `https://storage.googleapis.com/public.prd.job-pair.com/meta/companyBanner.png`
    },
    ogUrl: () => {
        return `${runTimeConfig.public.siteUrl}/o/${state.organization.id}`
    }
})
useJsonld(() => ({
    // https://schema.org/Organization
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    email: organization.email,
    logo: organization.logo,
    description: extractContent(organization.description),
    identifier: organization.id,
    url: `${runTimeConfig.public.siteUrl}/o/${organization.id}`,
    address: getLocationText(),
    location: getLocationText(),
    image: organization.banner,
}))
state.organization = organization
// methods
function extractContent(content = '') {
    const target = content.replaceAll("<[^>]*>", "");
    return target
}
function getLocationText() {
    if (!state.organization || !repoSelect.state.locationRes) {
        return
    }
    const { addressRegion, addressLocality, streetAddress } = state.organization
    const text1 = $optionText(addressRegion, repoSelect.state.locationRes.taiwan)
    const items = repoSelect.state.locationRes[addressRegion]
    const text2 = $optionText(addressLocality, items)
    return `${text1}${text2}${streetAddress}`
}
</script>
<style lang="scss">
.company {
    .company__section {
        scroll-margin-top: 58px;
    }

    .company__jobs {
        .jobs__list {
            list-style: none;
            padding: 0;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }

}

@media screen and (min-width: 992px) {
    .company {
        .company__jobs {
            margin-top: 30px;
            background-color: unset;

            .card__header {
                font-size: 33px;
                font-weight: bold;
                color: #333;
            }

            .jobs__searchWrapper {
                padding: 30px;
                border-radius: 10px;
                border: solid 1px #d3d3d3;
                background-color: #fff;
            }
        }
    }

}
</style>