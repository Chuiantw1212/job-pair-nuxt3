<template>
    <div class="company" :class="{ container: device.state.isDesktop }">
        <AtomTabs class="d-lg-none" :items="state.tabItems"></AtomTabs>
        <section v-if="state.companyInfo" id="company__info" class="company__section mt-4">
            <div class="company__bannerGroup">
                <img v-if="state.companyInfo.banner" class="company__banner company__banner--fit-content"
                    :src="state.companyInfo.banner" />
                <img v-else class="company__banner" src="~/assets/company/img_banner_default.png" />
            </div>
            <div class="company__card company__basic">
                <div class="basic__basicGroup1">
                    <div v-if="state.companyInfo.logo" class="basic__logo"
                        :style="{ 'background-image': `url(${state.companyInfo.logo})` }">
                    </div>
                    <div class="basic__header">{{ state.companyInfo.name }}</div>
                </div>
                <div class="d-none d-lg-flex basic__basicGroup2">
                    <div v-if="state.companyInfo.numberOfEmployees" class="basicGroup__item">
                        <img src="~/assets/company/icon_User.svg" />
                        {{ state.companyInfo.numberOfEmployees }}
                    </div>
                    <div class="basicGroup__item">
                        <img src="~/assets/company/icon_Environment.svg" />
                        {{ getLocationText() }}
                    </div>
                    <div v-if="state.companyInfo.capital" class="basicGroup__item">
                        <img src="~/assets/company/icon_Wallet.svg" />
                        資本額 {{ getCapical(state.companyInfo.capital) }}
                    </div>
                </div>
            </div>
            <div v-if="state.companyInfo" class="d-lg-none company__card company__features">
                <div class="features__item">
                    <span class="item__header">地點</span>
                    <span class="item__body">{{ getLocationText() }}</span>
                </div>
                <div v-if="state.companyInfo" class="features__item">
                    <span class="item__header">產業類別</span>
                    <span v-for="(value, index) in state.companyInfo.industry" :key="index" class="item__body">{{
                            $optionText(value, repoSelect.industryItems)
                    }}</span>
                </div>
            </div>
        </section>
        <div class="company__body">
            <div class="body__textGroup">
                <div v-if="state.companyInfo" class="company__card company__intro">
                    <div class="card__header">公司介紹</div>
                    <AtomInputCKEditor v-model="state.companyInfo.description" :toolbar="[]" disabled
                        class="card__body">
                    </AtomInputCKEditor>
                </div>
                <div v-if="state.companyInfo" class="company__card company__welfare">
                    <div class="card__header">公司福利</div>
                    <AtomInputCKEditor v-model="state.companyInfo.jobBenefits" :toolbar="[]" disabled
                        class="card__body">
                    </AtomInputCKEditor>
                </div>
            </div>
            <div v-if="state.companyInfo && state.companyInfo.images && state.companyInfo.images.length"
                v-show="state.companyInfo.images" class="company__env">
                <div class="env__photo" :style="{ backgroundImage: `url(${state.focusedImageSrc})` }"></div>
                <div class="glide" :class="`glide${id}`">
                    <div class="glide__track" data-glide-el="track">
                        <ul class="glide__slides">
                            <template v-for="(image, index) in state.companyInfo.images" :key="index">
                                <li class="glide__slide">
                                    <button class="env__glideButton" @click="state.focusedImageSrc = image.url">
                                        <img class="env__glideImage" :style="{
                                            'background-image': `url(${image.url})`,
                                        }" />
                                    </button>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div data-glide-el="controls">
                        <button class="slider__arrow slider__arrow--prev glide__arrow glide__arrow--prev"
                            data-glide-dir="<">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <path
                                    d="M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z" />
                            </svg>
                        </button>

                        <button class="slider__arrow slider__arrow--next glide__arrow glide__arrow--next"
                            data-glide-dir=">">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <path
                                    d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <section id="company__jobs" class="company__section mt-3">
            <div class="company__jobs" :class="{ company__card: !device.state.isDesktop }">
                <div class="card__header">公司職缺</div>
                <div class="jobs__searchWrapper mt-4">
                    <AtomInputSearch v-model="state.searchLike" @search="initializeSearch()"></AtomInputSearch>
                </div>
                <ul class="jobs__list">
                    <OrganismJobItem v-for="(job, index) in jobScroller.state.jobList"
                        v-model="jobScroller.state.jobList[index]" :key="index" ref="jobItems"></OrganismJobItem>
                </ul>
            </div>
        </section>
    </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
const { $uuid4, $requestSelector, $optionText } = useNuxtApp()
const device = useDevice()
const route = useRoute()
const repoCompany = useRepoCompany()
const repoSelect = useRepoSelect()
const jobScroller = useJobScroller()
const state = reactive({
    id: $uuid4(),
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
    isDesktop: false,
    focusedImageSrc: "",
    resizeTimer: null
})
let organizationId = computed(() => {
    const id = route.path.split('/').slice(-1)[0]
    return id
})
const jobItems = ref([])
// hooks
onMounted(async () => {
    await initializeCompany()
    window.addEventListener("resize", setTimeForGlide)
})
onBeforeUnmount(() => {
    if (state.glideInstance) {
        state.glideInstance.destroy()
    }
    window.removeEventListener("resize", setTimeForGlide)
})
watch(() => jobScroller.state.jobList, () => {
    jobScroller.observeLastJob(jobItems)
})
// methods
async function initializeCompany() {
    const res = await repoCompany.getCompanyById(organizationId.value)
    const company = res.data
    state.companyInfo = company
    const { images = [], name = "", } = company
    // Content
    document.title = `${name} - Job Pair`
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
function setTimeForGlide() {
    clearTimeout(state.resizeTimer)
    state.resizeTimer = setTimeout(initialGlide, 200)
}
function initialGlide() {
    $requestSelector(".glide", () => {
        const width = window.innerWidth
        let config = state.glideMobileConfig
        if (width >= 992) {
            config = state.glideDesktopConfig
        }
        const glideInstance = new Glide(`.glide`, config)
        glideInstance.mount()
        state.glideInstance = glideInstance
    })
}
function getLocationText() {
    if (!state.companyInfo) {
        return
    }
    const { addressRegion, addressLocality, streetAddress } = state.companyInfo
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

    .company__card {
        padding: 17px 15px 20px 20px;
        background-color: #fff;

        .card__header {
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }

        .card__body {
            font-size: 16px;
            font-weight: normal;
            line-height: 1.5;
            color: #333;
        }
    }

    .company__bannerGroup {
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 10px 10px 0px 0px;
    }

    .company__banner {
        width: 100%;
        display: block;
    }

    .company__basic {
        .basic__basicGroup1 {
            display: flex;
            align-items: center;

            .basic__logo {
                width: 40px;
                height: 40px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                display: block;
            }

            .basic__header {
                font-size: 19px;
                font-weight: bold;
                line-height: 1.3;
                color: #5ea88e;
                margin-left: 8px;
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
    }

    .company__env {
        .env__photo {
            width: 100%;
            display: block;
            min-height: 466px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
            background-color: white;
            border-radius: 10px;
            border: solid 1px #d3d3d3;
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
        .company__card {
            padding: 17px 15px 20px 20px;
            background-color: #fff;
            border-radius: 10px;
            border: solid 1px #d3d3d3;

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
            }
        }

        .company__bannerGroup {
            border: solid 1px #d3d3d3;
            border-bottom: unset;
        }

        .company__banner {
            max-height: 432px;
        }

        .company__banner--fit-content {
            width: fit-content;
        }

        .company__basic {
            display: flex;
            padding: 40px 30px;
            border-radius: 0px 0px 10px 10px;

            .basic__basicGroup1 {
                border-right: 1px solid #d3d3d3;
                width: 50%;

                .basic__logo {
                    width: 128px;
                    height: 128px;
                }

                .basic__header {
                    font-size: 33px;
                    font-weight: bold;
                    color: #333;
                    margin-left: 30px;
                }
            }

            .basic__basicGroup2 {
                padding: 0 30px;
                flex-direction: column;
                gap: 8px;
                font-size: 22px;
                font-weight: normal;
                width: 50%;

                .basicGroup__item {
                    display: flex;
                    justify-items: center;
                    gap: 8px;

                    &:not(:first-child) {
                        margin-top: 8px;
                    }
                }
            }
        }

        .company__body {
            display: flex;
            gap: 20px;
            margin-top: 20px;

            .body__textGroup {
                width: 100%;
            }

            .company__intro {
                width: 100%;
            }

            .company__welfare {
                width: 100%;
                margin-top: 20px;
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