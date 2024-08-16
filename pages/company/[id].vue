<template>
    <div class="company" :class="{ container: device.state.isLarge }">
        <OrganismDesignBody v-if="state.companyInfo?.templates" v-model="state.companyInfo.templates" readonly>

        </OrganismDesignBody>
        <div v-else class="row">
            <div class="col-4 col-xl-3 d-none d-lg-block">
                <div class="company__card company__basic">
                    <div class="basic__basicGroup1">
                        <div v-if="state.companyInfo?.logo" class="basic__logo"
                            :style="{ 'background-image': `url(${state.companyInfo?.logo})` }">
                        </div>
                        <div v-else class="basic__logo" :style="{ 'background-image': `url(${defaultLogo})` }">
                        </div>
                    </div>
                    <div class="basic__header">{{ state.companyInfo?.name }}</div>
                    <ul class="basicGroup__list">
                        <li class="list__item">
                            <span class="list__header">
                                員工人數
                            </span>
                            {{ state.companyInfo?.numberOfEmployees }}
                        </li>
                        <li class="list__item">
                            <span class="list__header">
                                地點
                                <img class="item__icon" src="~/assets/company/icon_Environment.svg" alt="address" />
                            </span>
                            <span class="item__location">
                                {{ getLocationText() }}
                            </span>
                        </li>
                        <li class="list__item">
                            <span class="list__header">
                                資本額
                            </span>
                            {{ getCapical(state.companyInfo?.capital) }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-8 col-xl-9">
                <section id="company__info" class="company__section">
                    <div :key="state.renderKey" class="company__bannerGroup">
                        <img v-if="state.company?.banner" class="bannerGroup__banner" :src="getCompanyBanner()">
                        <img v-else class="bannerGroup__banner" src="~/assets/company/img_banner_default.webp">
                    </div>
                    <div class="company__card company__basic d-lg-none">
                        <div class="basic__basicGroup1">
                            <div v-if="state.companyInfo?.logo" class="basic__logo"
                                :style="{ 'background-image': `url(${state.companyInfo?.logo})` }">
                            </div>
                            <div v-else class="basic__logo" :style="{ 'background-image': `url(${defaultLogo})` }">
                            </div>
                        </div>
                        <div class="basic__header">{{ state.companyInfo?.name }}</div>
                        <ul class="basicGroup__list">
                            <li class="list__item">
                                <span class="list__header">
                                    員工人數
                                </span>
                                {{ state.companyInfo?.numberOfEmployees }}
                            </li>
                            <li class="list__item">
                                <span class="list__header">
                                    地點
                                    <img class="item__icon" src="~/assets/company/icon_Environment.svg" alt="address" />
                                </span>
                                {{ getLocationText() }}
                            </li>
                            <li class="list__item">
                                <span class="list__header">
                                    資本額
                                </span>
                                {{ getCapical(state.companyInfo?.capital) }}
                            </li>
                        </ul>
                    </div>
                </section>
                <div class="company__body">
                    <div class="company__card company__intro">
                        <div class="card__header">公司介紹</div>
                        <div class="card__body">
                            <div v-if="state.companyInfo" v-html="state.companyInfo?.description"></div>
                        </div>
                    </div>
                    <div class="company__card company__welfare">
                        <div class="card__header">公司福利</div>
                        <div class="card__body">
                            <div v-if="state.companyInfo" v-html="state.companyInfo?.jobBenefits"></div>
                        </div>
                    </div>
                    <div v-if="state.companyInfo?.images?.length" class="company__env" ref="imageRef">
                        <div class="env__photo" :style="{ backgroundImage: `url(${state.focusedImageSrc})` }"></div>
                        <div class="glide" :class="`glide${state.id}`">
                            <div class="glide__track" data-glide-el="track">
                                <ul class="glide__slides">
                                    <template v-for="(image, index) in state.companyInfo?.images" :key="index">
                                        <li class="glide__slide">
                                            <button class="env__glideButton" @click="state.focusedImageSrc = image.url"
                                                aria-label="換圖片">
                                                <img class="env__glideImage" :style="{
                                                    'background-image': `url(${image.url})`,
                                                }" />
                                            </button>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- {{ state.companyInfo?.images }} -->
                </div>
                <section id="company__jobs" class="company__section mt-3">
                    <div class="section__header">公司職缺</div>
                    <div class="jobs__searchWrapper">
                        <LazyAtomInputSearch2 v-model="jobScroller.state.searchLike" placeholder="搜尋公司或職缺"
                            @search="jobScroller.searchJobs()">
                        </LazyAtomInputSearch2>
                    </div>
                    <ul class="jobs__list">
                        <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobList"
                            v-model="jobScroller.state.jobList[index]" :key="index" ref="jobItems">
                        </LazyOrganismJobItem>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</template>
<script setup>
import defaultBanner from '~/assets/company/img_banner_default.webp'
import defaultLogo from '~/assets/company/company.webp'
const { $uuid4, $requestSelector, $optionText, $Glide, $emitter, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const device = useDevice()
const route = useRoute()
const repoCompany = useRepoCompany()
const repoSelect = useRepoSelect()
const jobScroller = useJobScroller()
const repoAuth = useRepoAuth()
const imageRef = ref(null)
const state = reactive({
    id: null,
    jsonld: null,
    companyInfo: null,
    tabItems: [
        {
            text: "公司介紹",
            value: "#company__info"
        },
        {
            text: "公司職缺",
            value: "#company__jobs"
        }
    ],
    glideInstance: null,
    glideMobileConfig: {
        perView: 2.5
    },
    glideDesktopConfig: {
        perView: 4
    },
    isLarge: false,
    focusedImageSrc: "",
    resizeTimer: null,
    renderKey: Math.random()
})
// hooks
const paramdId = computed(() => {
    return route.params.id
})
const { data: company = {} } = await useFetch(`${runTimeConfig.public.apiBase}/company/${paramdId.value}`, { initialCache: false })
state.companyInfo = company
useSeoMeta({
    title: () => `${state.companyInfo?.name}`,
    ogTitle: () => `${state.companyInfo?.name}`,
    description: () => {
        // 避免500錯誤影響SEO
        if (state.companyInfo?.description) {
            const regex = /(<([^>]+)>)/ig
            const descriptionContent = state.companyInfo.description.replace(regex, "")
            return descriptionContent
        }
    },
    ogDescription: () => {
        // 避免500錯誤影響SEO
        if (state.companyInfo?.description) {
            const regex = /(<([^>]+)>)/ig
            const descriptionContent = state.companyInfo.description.replace(regex, "")
            return descriptionContent
        }
    },
    ogImage: () => {
        const decodedBannerUri = decodeURIComponent(state.companyInfo?.banner)
        return state.companyInfo?.banner ? decodedBannerUri : `https://storage.googleapis.com/public.prd.job-pair.com/meta/companyBanner.png`
    },
    ogUrl: () => {
        return `${runTimeConfig.public.siteUrl}/company/${state.companyInfo?.id}`
    }
})
useJsonld(() => ({
    // https://schema.org/Organization
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    email: company.value?.email,
    logo: company.value?.logo,
    description: extractContent(company.value?.description),
    identifier: company.value?.id,
    url: `${runTimeConfig.public.siteUrl}/company/${company.value?.id}`,
    address: getLocationText(),
    location: getLocationText(),
    image: company.value?.banner,
}));
onMounted(async () => {
    state.id = $uuid4()
    await initializeCompany(paramdId.value)
    $emitter.on('scrollToJobs', scrollToJobs)
})
onBeforeUnmount(() => {
    if (state.glideInstance) {
        state.glideInstance.destroy()
    }
    $emitter.off('scrollToJobs', scrollToJobs)
})
watch(() => repoAuth.state.user, () => {
    const organizationId = company.value?.organizationId || company.value?.id
    if (organizationId) {
        jobScroller.state.filter.organizationId = organizationId
        jobScroller.searchJobs()
    }
}, { immediate: true })
watch(() => jobScroller.state.jobList, (newValue = [], oldValue = []) => {
    $emitter?.emit('setDesignBannerJobs', newValue.length)
    if (newValue.length !== oldValue.length) {
        jobScroller.observeLastJob()
    }
})
// methods
function scrollToJobs() {
    const element = document.getElementById('company__jobs')
    if (element) {
        element.scrollIntoView()
    }
}
function extractContent(content = '') {
    const target = content.replaceAll("<[^>]*>", "");
    return target
}
function getCompanyBanner() {
    if (state.companyInfo?.banner) {
        return state.companyInfo?.banner
    } else {
        return defaultBanner
    }
}
async function initializeCompany(id) {
    const res = await repoCompany.getCompanyById(id)
    const company = res.data
    const { designStatus = 'active' } = company
    state.companyInfo = company
    state.renderKey = Math.random()
    const { images = [], } = company
    if (images && images.length) {
        state.focusedImageSrc = images[0].url
        initialGlide()
    }
}
function getCapical(capital) {
    function isNumeric(value) {
        return /^-?\d+$/.test(value)
    }
    if (isNumeric(String(capital))) {
        return Number(capital).toLocaleString()
    } else {
        return capital
    }
}
function initialGlide() {
    $requestSelector(".glide", () => {
        const width = window.innerWidth
        let config = state.glideMobileConfig
        if (width >= 992) {
            config = state.glideDesktopConfig
        }
        const glideInstance = new $Glide.Default(`.glide`, config)
        glideInstance.mount({
            type: 'carousel',
        })
        state.glideInstance = glideInstance
    })
}
function getLocationText() {
    if (!state.companyInfo || !repoSelect.state.locationRes) {
        return
    }
    const { addressRegion, addressLocality, streetAddress } = state.companyInfo
    const text1 = $optionText(addressRegion, repoSelect.state.locationRes.taiwan)
    const items = repoSelect.state.locationRes[addressRegion]
    const text2 = $optionText(addressLocality, items)
    return `${text1}${text2}${streetAddress}`
}
</script>
<style lang="scss" scoped>
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
    padding: 0;
}

.company {
    padding: 20px;

    .company__section {
        scroll-margin-top: 58px;
    }

    .company__card {
        display: flex;
        padding: 30px;
        flex-direction: column;
        align-items: flex-start;
        gap: 30px;
        align-self: stretch;
        border-radius: 20px;
        background: var(--Grays-Quin, #FFF);
        transition: all 0.3s;

        .card__header {
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }

        .card__body {
            margin-top: 20px;
        }
    }

    .company__bannerGroup {
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 10px 10px 0px 0px;

        .bannerGroup__banner {
            width: 100%;
            max-width: 100%;
            display: block;
            border-radius: 10px;
            overflow: hidden;
        }
    }


    .company__basic {
        position: fixed;
        max-width: 300px;

        .basic__basicGroup1 {
            display: flex;
            align-items: center;
            width: 60px;
            height: 60px;
            padding: 7px;
            border-radius: 10px;
            border: 1px solid var(--Grays-Quat, #EDEAEA);

            .basic__logo {
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                display: block;
            }

        }

        .basic__header {
            color: var(--Grays-Prim, #222);

            /* H2-20-Medium */
            font-family: "PingFang TC";
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        .basicGroup__list {
            padding: 0px;
            margin: 0px;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .list__item {
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 10px;

                .list__header {
                    min-width: 4em;
                    display: inline-block;
                }

                .item__location {
                    white-space: pre-wrap;
                }
            }
        }
    }

    .company__features {
        margin-top: 10px;

        .features__item {
            .item__header {
                font-size: 16px;
                font-weight: bold;
                min-width: 4em;
                display: inline-block;
            }

            .item__body {
                margin-left: 10px;
                font-size: 16px;
            }

            &:not(:first-child) {
                margin-top: 15px;
            }
        }
    }

    .company__body {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
    }

    .section__header {
        color: var(--Grays-Prim, #222);

        /* H2-20-Medium */
        font-family: "PingFang TC";
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .company__env {
        .env__photo {
            width: 100%;
            display: block;
            height: 314px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
            background-color: white;
            border-radius: 10px;
            // border: solid 1px #d3d3d3;
        }

        .glide {
            margin-top: 20px;

            .slider__arrow--prev {
                left: 1.5rem;
            }

            .slider__arrow--next {
                right: 1.5rem;
            }

            .env__glideButton {
                width: 100%;
                background-color: inherit;
                border: none;
            }

            .env__glideImage {
                width: 100%;
                height: 115px;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
    }

    .jobs__searchWrapper {
        margin-top: 20px;
    }

    .jobs__list {
        margin-top: 20px;
        padding: 0px;
        margin: 0px;
        list-style: none;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}

@media screen and (min-width: 992px) {
    .company {
        .company__card {
            padding: 17px 15px 20px 20px;
            border-radius: 20px;
            background: var(--Grays-Quin, #FFF);
            height: fit-content;
            overflow: hidden;

            // position: fixed;

            .card__header {
                font-size: 20px;
                font-weight: bold;
                color: #333;
            }

            .card__body {
                font-weight: normal;
                font-weight: normal;
                line-height: 1.5;
                color: #333;
                max-height: 400px;
                overflow-y: auto;
                margin-top: 20px;
                width: 100%;
            }
        }

        .company__card--hide {
            opacity: 0;
        }

        .company__bannerGroup {
            border-bottom: unset;
        }

        .company__banner {
            max-height: 432px;
        }

        .company__basic {
            display: flex;
            padding: 40px 30px;

            .basic__header {
                color: var(--Grays-Prim, #222);

                /* H2-20-Medium */
                font-family: "PingFang TC";
                font-size: 24px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                margin-top: 30px;
            }

            .basicGroup__list {
                margin-top: 30px;
            }
        }

        .company__body {
            display: flex;
            gap: 20px;
            margin-top: 20px;

            .company__intro {
                width: 100%;
                color: var(--Grays-Prim, #222);

                /* P-16-Rugular */
                font-family: "PingFang TC";
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 26px;
                /* 162.5% */
            }

            .company__welfare {
                width: 100%;
                margin-top: 20px;
                color: var(--Grays-Prim, #222);

                /* P-16-Rugular */
                font-family: "PingFang TC";
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 26px;
                /* 162.5% */
            }

            .company__env {
                overflow: hidden;
                width: 100%;

                .env__largegePhoto {
                    background-position: center;
                    background-size: cover;
                    height: 466px;
                    margin-bottom: 20px;
                }
            }
        }

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