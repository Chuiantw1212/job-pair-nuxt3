<template>
    <div class="jobView" :class="{ container: device.state.isLarge }">
        <!-- <LazyAtomTabs class="d-lg-none jobView__tabs" :items="state.tabItems"></LazyAtomTabs> -->
        <!-- <div class="jobView__fixedPanel">

        </div> -->
        <section id="jobView__basic" class="jobView__section mt-3">
            <div class="jobView__card jobView__card--basic">
                <NuxtLink v-if="state.company?.seoName" class="basic__logoGroup" :to="`/company/${state.company?.seoName}`">
                    <div class="logoGroup__logo" :style="{ backgroundImage: `url(${state.company?.logo})` }">
                    </div>
                </NuxtLink>
                <NuxtLink v-else class="basic__logoGroup" :to="`/company/${state.company?.id}`">
                    <div class="logoGroup__logo" :style="{ backgroundImage: `url(${state.company?.logo})` }">
                    </div>
                </NuxtLink>
                <div class="basic__btnGroup">
                    <button class="btnGroup__btn">
                        <img src="@/assets/jobs/Collect.svg">
                    </button>
                    <button class="btnGroup__btn">
                        <img src="@/assets/jobs/Copy.svg">
                    </button>
                </div>
                <h1 class="basic__name">
                    {{ state.job?.name }}
                </h1>
                <div class="basic__organizationName">
                    {{ state.job?.organizationName }}
                </div>
                <div class="basic__badgeGroup">
                    <div v-for="(item, index) in state.company?.industry" :key="index" class="badgeGroup__badge">
                        {{ $filter.optionText(item, repoSelect.industryItems) }}
                    </div>
                </div>
                <div class="basic__numberGroup">
                    <div class="numberGroup__similarity">
                        適配度分數
                        <span class="similarity__number">95</span>
                    </div>
                    <div class="numberGroup__salary">
                        {{ $filter.salaryNumber(state.job)
                        }}
                        <span class="salaryGroup__salaryType">
                            / {{ $filter.optionText(state.job.salaryType, repoSelect.state.selectByQueryRes?.salaryType) }}
                        </span>
                    </div>
                </div>
                <!-- <div class="basic__body">
                    <div class="basic__body__header">{{ state.job?.name }}</div>
                </div> -->
                <!-- <LazyOrganismJobItemPanel v-model="state.job" class="basic__footer" :showShareButton="true"
                    :jobDetailsException="true">
                </LazyOrganismJobItemPanel> -->
            </div>
        </section>
        <div class="jobView__padding">
            <section class="jobView__card jobView__card--features mt-3">
                <div class="features__item">
                    <span class="item__header">
                        僱傭模式
                    </span>
                    <span class="item__body">
                        <template v-for="(item, index) in state.job?.employmentType">
                            {{
                                $filter.optionText(item,
                                    repoSelect.state.selectByQueryRes?.employmentType)
                            }} ·
                        </template>
                        {{
                            $filter.optionText(state.job?.responsibilities,
                                repoSelect.state.selectByQueryRes?.responsibilities)
                        }}</span>
                </div>
                <div class="features__item">
                    <span class="item__header">
                        遠端彈性
                    </span>
                    <span class="item__body">
                        {{
                            $filter.optionText(state.job?.jobLocationType,
                                repoSelect.state.selectByQueryRes?.jobLocationType)
                        }}
                    </span>
                </div>
                <div v-if="state.job?.remark" class="features__item">
                    <span class="item__header">
                        備註
                    </span>
                    <span class="item__body">
                        {{
                            state.job?.remark
                        }}
                    </span>
                </div>
                <div v-if="state.job?.language" class="features__item">
                    <span class="item__header">
                        語言要求
                    </span>
                    <span class="item__body">{{ $optionText(state.job?.language,
                        repoSelect.state.selectByQueryRes?.language)
                    }} {{ $optionText(state.job?.proficiency,
    repoSelect.state.selectByQueryRes?.proficiency)
}}</span>
                </div>
                <div class="features__item">
                    <span class="item__header">
                        更新日期
                    </span>
                    <span class="item__body">{{ $time(state.job?.datePosted) }}</span>
                </div>
                <div class="features__item">
                    <span class="item__header">
                        職務類型
                    </span>
                    <div class="item__body item__body--badgeGroup">
                        <span v-for="(category, index ) in state.job?.occupationalCategory" :key="index"
                            class="body__badge">{{
                                getCategoryText(category) }}</span>
                    </div>
                </div>
                <div v-if="getJobAddress()" class="features__item">
                    <span class="item__header">
                        地址 <img class="header__icon" src="~/assets/jobs/details/icon_Environment.svg" alt="map">
                    </span>
                    <span class="item__body">
                        <a class="item__body__map" :href="getEncodedMapLink()" target="_blank">
                            {{ getJobAddress() }}
                        </a>
                    </span>
                </div>
                <div class="features__panel">
                    <LazyAtomBtnSimple class="w-100" v-if="checkInfoIncomplete()" @click="showIncompleteAlert()"
                        :disabled="repoAuth.state.user.type === 'admin'">立即應徵
                    </LazyAtomBtnSimple>
                    <LazyAtomBtnSimple class="w-100" v-else-if="checkJobCategory()" :disabled="true">職務類型不符
                    </LazyAtomBtnSimple>
                    <LazyOrganismJobModal v-else-if="checkVisibility()" v-model="state.job"
                        @applied="state.applyFlow = $event">
                        立即應徵
                    </LazyOrganismJobModal>
                    <LazyAtomBtnSimple class="w-100" v-else :disabled="true">已應徵</LazyAtomBtnSimple>
                </div>
            </section>
            <section id="jobView__description" class="jobView__section mt-3">
                <div class="jobView__card">
                    <div class="card__header">職責介紹</div>
                    <div class="card__body">
                        <!-- 呈現影片不可拿掉 -->
                        <LazyAtomInputCkeditor v-if="state.job" v-model="state.job.description" :toolbar="[]" disabled
                            ref="descriptionRef">
                        </LazyAtomInputCkeditor>
                    </div>
                </div>
            </section>
            <section id="jobView__requirement" class="jobView__section mt-3">
                <div class="jobView__card">
                    <div class="card__header">條件要求</div>
                    <div class="card__body">
                        <!-- 呈現影片不可拿掉 -->
                        <LazyAtomInputCkeditor v-if="state.job" v-model="state.job.skills" :toolbar="[]" disabled
                            ref="skillsRef">
                        </LazyAtomInputCkeditor>
                    </div>
                </div>
            </section>
            <!-- <div v-if="getJobAddress()" class="d-none d-lg-block jobView__map mt-3" :ref="'map'">
                <iframe title="google map" class="map__iframe" :style="{ 'height': state.mapHeight }" loading="lazy"
                    allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="getGoogleMapSrc(state.job)"
                    @load="setMapHeight()">
                </iframe>
            </div> -->
        </div>

        <LazyOrganismAdConsult class="mt-3"></LazyOrganismAdConsult>
        <section v-if="jobScroller.state.jobList.length" class="jobView__similarJobs">
            <h2 class="similarJobs__header">類似職缺</h2>
            <ul class="similarJobs__list">
                <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobList" :key="index"
                    v-model="jobScroller.state.jobList[index]" class="basic__footer" :showShareButton="true" ref="jobItems">
                </LazyOrganismJobItem>
            </ul>
        </section>
    </div>
</template>
<script setup>
import placeholderImage from '~/assets/company/company.webp'
const route = useRoute()
const jobId = computed(() => {
    const id = route.params.id
    return id
})
const runTimeConfig = useRuntimeConfig()
const { data: job } = await useFetch(`${runTimeConfig.public.apiBase}/job/${jobId.value}`, { initialCache: false })
const state = reactive({
    job: null,
    company: null,
    applyFlow: null,
    tabItems: [
        {
            text: "職缺內容",
            value: "#jobView__basic",
        },
        {
            text: "職責介紹",
            value: "#jobView__description",
        },
        {
            text: "條件要求",
            value: "#jobView__requirement",
        },
        {
            text: "類似職缺",
            value: "#companyWelfare",
        },
    ],
    mapHeight: '',
    adRenderKey: Math.random(),
    // pagination
    pagination: {
        pageOrderBy: "datePosted",
        pageLimit: 5,
        pageOffset: 0,
    },
    jobList: [],
    observer: null,
    debounceTimer: null,
})
state.job = job
const jobScroller = useJobScroller({
    ignoreJobs: [job.value.identifier]
})
const { $emitter, $sweet, $filter, } = useNuxtApp()
const router = useRouter()
const repoJob = useRepoJob()
const repoJobApplication = useRepoJobApplication()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const repoCompany = useRepoCompany()
const device = useDevice()
const browserConfig = computed({
    get() {
        if (process.client) {
            const configString = localStorage.getItem('jobPair')
            const config = JSON.parse(configString) || { ads: {} }
            return config
        }
    },
    set(newValue) {
        if (process.client) {
            const configString = JSON.stringify(newValue)
            localStorage.setItem('jobPair', configString)
        }
    }
})
// hooks
const currentInstance = getCurrentInstance()
const { descriptionRef, skillsRef } = currentInstance.refs
if (descriptionRef) {
    descriptionRef.setData(job.description)
}
if (skillsRef) {
    skillsRef.setData(job.skills)
}
const { data: location } = await useFetch(`${runTimeConfig.public.apiBase}/select/location`, { initialCache: false })
useSeoMeta({
    title: () => `${state.job.name} - ${state.job.organizationName}`,
    ogTitle: () => `${state.job.name} - ${state.job.organizationName}`,
    description: () => {
        const regex = /(<([^>]+)>)/ig
        if (state.job.description) {
            const descriptionContent = state.job.description.replace(regex, "")
            return descriptionContent
        }
    },
    ogDescription: () => {
        const regex = /(<([^>]+)>)/ig
        if (state.job.description) {
            const descriptionContent = state.job.description.replace(regex, "")
            return descriptionContent
        }
    },
    ogUrl: () => {
        return `${runTimeConfig.public.siteUrl}/job/${state.job.identifier}`
    }
})
useJsonld(() => {
    const { datePosted = new Date().toISOString() } = job.value
    const validThroughDate = new Date(datePosted)
    validThroughDate.setDate(validThroughDate.getDate() + 7)
    const locationValue = location.value
    const addressRegionItems = locationValue[job.value.addressRegion]
    let targetRegion = {}
    if (addressRegionItems) {
        targetRegion = addressRegionItems.find(item => {
            return item.value === job.value.addressLocality
        })
    }
    const { text: addressLocality = null, postalCode = null } = targetRegion
    const jsonld = {
        // https://schema.org/JobPosting
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.value.name,
        description: job.value.description,
        url: `${runTimeConfig.public.siteUrl}/job/${job.value.identifier}`,
        image: job.value.image,
        identifier: job.value.identifier,
        applicantLocationRequirements: {
            "@type": "Country",
            "name": "Anywhere"
        },
        datePosted,
        validThrough: validThroughDate.toISOString(),
        employmentType: job.value.employmentType,
        hiringOrganization: {
            "@type": "Organization",
            name: job.value.organizationName,
        },
        jobLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                "streetAddress": job.value.streetAddress,
                "addressRegion": $filter.optionText(job.value.addressRegion, locationValue?.taiwan),
                "addressLocality": addressLocality,
                "postalCode": postalCode,
                "addressCountry": "台灣"
            }
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "TWD",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": job.value.salaryMin,
                "maxValue": job.value.salaryMax,
                "value": Math.floor((job.value.salaryMin + job.value.salaryMax) / 2),
                "unitText": job.value.salaryType
            }
        },
    }
    if (job.value.jobLocationType === 'fullyRemote') {
        jsonld.jobLocationType = "TELECOMMUTE"
    }
    return jsonld
})
onMounted(() => {
    if (process.client) {
        window.addEventListener("resize", setMapHeight)
        window.addEventListener('scroll', detectScroll)
    }
})
onBeforeUnmount(() => {
    if (process.client) {
        window.removeEventListener("resize", setMapHeight)
        window.removeEventListener('scroll', detectScroll)
    }
})
watch(() => repoAuth.state.user, () => {
    if (state.job && !state.job.similarity) {
        initialize()
    }
}, { immediate: true })
watch(() => repoJobApplication.state.userJobs, () => {
    setApplyFlow()
}, { immediate: true, deep: true, })
watch(() => state.job, (newValue) => {
    if (newValue) {
        jobScroller.state.filter.occupationalCategory = newValue.occupationalCategory // Will trigger job search
    }
},)
watch(() => jobScroller.state.filter, () => {
    jobScroller.searchJobs()
}, { deep: true }) // IMPORTANT: 不可immediate造成cache失效
watch(() => jobScroller.state.jobList, (newValue = [], oldValue = []) => {
    if (newValue.length !== oldValue.length) {
        jobScroller.observeLastJob()
    }
    const { user } = repoAuth.state
    if (user && user.id) {
        return
    }
    const showRegisterModal = jobScroller.state.count >= 5 && jobScroller.state.jobList.length > 5 && !jobScroller.state.isModalShown
    if (!user && showRegisterModal) {
        jobScroller.state.isModalShown = true
        $emitter?.emit("showUserModal")
    }
})
// methos
function getAdVisibility() {
    if (process.client) {
        return browserConfig.value?.ads?.jobDetails !== false && repoAuth.state.user
    }
}
function detectScroll() {
    const { user } = repoAuth.state
    if (user && user.id) {
        return
    }
    debounce(() => {
        const offsetHeight = document.body.offsetHeight
        const { innerHeight, scrollY } = window
        if (innerHeight + scrollY >= offsetHeight && !jobScroller.state.isModalShown) {
            jobScroller.state.isModalShown = true
            $emitter?.emit("showUserModal")
        }
    })()
}
function debounce(func, delay = 800) {
    return (...args) => {
        clearTimeout(state.debounceTimer)
        state.debounceTimer = setTimeout(() => {
            state.debounceTimer = undefined
            func.apply(this, args)
        }, delay)
    }
}
async function showIncompleteAlert() {
    const res = await $sweet.info('前往完成個人檔案', {
        title: '未上傳履歷',
    })
    if (res.value) {
        router.push({
            name: 'user-profile'
        })
    }
}
function getEncodedMapLink() {
    const baseUrl = "https://www.google.com/maps/dir/?api=1"
    const fullAddress = getJobAddress()
    const encoded = encodeURI(fullAddress)
    const query = `&destination=${encoded}`
    return `${baseUrl}${query}`
}
function checkInfoIncomplete() {
    const { user } = repoAuth.state
    if (user) {
        // 一般欄位
        const requiredFieds = ['name', 'email']
        const incompleteFields = requiredFieds.filter(field => {
            return !user[field] || !String(user[field]).trim()
        })
        const hasIncomplete = incompleteFields.length !== 0
        // 履歷欄位
        const { resumes = [] } = user
        const noResumes = resumes.length === 0
        return hasIncomplete || noResumes
    }
}
function checkJobCategory() {
    const { user } = repoAuth.state
    if (!user || !state.job || !user.occupationalCategory) {
        return
    }
    const { occupationalCategory = [] } = user
    const jobCategory = state.job.occupationalCategory
    const isMismatched = occupationalCategory.every(category => {
        return !jobCategory.includes(category)
    })
    return isMismatched
}
function setApplyFlow() {
    const jobKeys = Object.keys(repoJobApplication.state.userJobs)
    if (!jobKeys.length) {
        return
    }
    const matchedJob = repoJobApplication.state.userJobs[jobId.value]
    if (matchedJob) {
        state.applyFlow = matchedJob.applyFlow
    }
}
function hideAd() {
    if (!process.client) {
        return
    }
    if (browserConfig.value.ads) {
        browserConfig.value.ads.jobDetails = false
    } else {
        browserConfig.ads = {
            jobDetails: false
        }
    }
    browserConfig.value = Object.assign({}, browserConfig.value)
    state.adRenderKey = Math.random()
}
function getCategoryText(category = "") {
    if (!category || !repoSelect.state.selectByQueryRes) {
        return
    }
    const text = $filter.optionText(category, repoSelect.state.selectByQueryRes.jobCategory)
    return text
}
const map = ref(null)
function setMapHeight() {
    if (!map.value) {
        return
    }
    const DomRect = map.value.getBoundingClientRect()
    const { width = 0 } = DomRect
    state.mapHeight = `${width}px`
}
function getGoogleMapSrc() {
    if (!state.job || !state.company) {
        return
    }
    const streetAddress = state.job.streetAddress ?? state.company.streetAddress
    if (!streetAddress) {
        return
    }
    const baseUrl = "https://www.google.com/maps/embed/v1/place"
    const key = `?key=AIzaSyC8nz4h8U9CHPBCtmgZAzGRj3sFS_E8VOY`
    const addressMap = {
        ' Sec.': 'Section',
    }
    let correctedAddress = streetAddress
    for (let key in addressMap) {
        const corrected = addressMap[key]
        correctedAddress = correctedAddress.replaceAll(key, corrected)
    }
    const region = `&region=TW`
    const language = `&language=en`
    const query = `&q=${correctedAddress}`
    const srcString = `${baseUrl}${key}${region}${language}${query}`
    return srcString
}
function getJobAddress() {
    const { locationRes } = repoSelect.state
    if (!state.job || !state.company || !locationRes) {
        return false
    }
    const addressRegion = state.job.addressRegion ?? state.company.addressRegion
    const addressLocality = state.job.addressLocality ?? state.company.addressLocality
    const streetAddress = state.job.streetAddress ?? state.company.streetAddress
    if (!addressRegion || !addressLocality || !streetAddress) {
        return false
    }
    const text1 = $filter.optionText(addressRegion, repoSelect.state.locationRes.taiwan)
    const text2 = $filter.optionText(addressLocality, repoSelect.state.locationRes[addressRegion])
    const text3 = streetAddress
    return `${text1}${text2}${text3}`
}
function checkVisibility() {
    return [null, '', 'saved', 'invited'].includes(state.applyFlow)
}
async function initialize() {
    if (!jobId.value) {
        state.job = {}
        return
    }
    const config = {
        jobId: jobId.value,
    }
    const { user = { id: '', type: '' } } = repoAuth.state
    if (user && user.id && user.type === 'employee') {
        config.userId = user.id
    }
    const jobResponse = await repoJob.getJobById(config)
    if (!jobResponse.data) {
        router.replace({
            name: 'jobs'
        })
        return
    }
    const job = jobResponse.data
    // 再取得公司資料
    const companyResponse = await repoCompany.getCompanyById(job.organizationId)
    const company = companyResponse.data
    state.job = job
    state.company = company
}
</script>
<style lang="scss" scoped>
.jobView {
    padding: 0;
    // padding-top: calc(46px);

    .jobView__tabs {
        position: fixed;
        top: 61px;
        width: 100%;
        z-index: 1030;
    }

    .jobView__section {
        // scroll-margin-top = header height + ?
        scroll-margin-top: calc(75px);
    }

    .jobView__card {
        padding: 20px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 10px;

        .card__header {
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #484848;
        }


        :deep(.card__body) {
            margin-top: 30px;

            .ck-editor__editable_inline {
                padding: 0px !important;
            }
        }
    }

    .jobView__card--basic {
        border-radius: 0 0 20px 20px;
        position: relative;

        .basic__logoGroup {
            font-size: 16px;
            line-height: 1.5;
            align-items: center;
            margin-top: 10px;
            color: #5ea88e;
            min-height: 40px;
            display: block;
            margin: auto;
            width: 60px;
            height: 60px;
            padding: 7px;
            border-radius: 10px;
            border: solid 1px #edeaea;

            &:hover {
                text-decoration: underline;
            }

            .logoGroup__logo {
                width: 100%;
                height: 100%;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                border-radius: 100px;
            }
        }

        .basic__btnGroup {
            position: absolute;
            top: 20px;
            right: 20px;

            .btnGroup__btn {
                border: none;
                background-color: inherit;
            }
        }

        .basic__name {
            margin-top: 30px;
            font-size: 20px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: #222;
        }

        .basic__organizationName {
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: #222;
        }

        .basic__badgeGroup {
            display: flex;
            gap: 5px;
            justify-content: center;
            margin-top: 10px;

            .badgeGroup__badge {

                border-radius: 20px;
                background-color: #f9f9f9;
                padding: 5px 20px;
            }
        }

        .basic__numberGroup {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .numberGroup__similarity {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #484848;

                .similarity__number {
                    font-size: 36px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1;
                    letter-spacing: normal;
                    text-align: left;
                    color: #428f74;
                    transform: translateY(-2px);
                }
            }

            .numberGroup__salary {
                font-size: 20px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #222;

                .salaryGroup__salaryType {
                    font-size: 12px;
                    font-weight: normal;
                    color: #a6a6a6;
                }
            }
        }
    }



    .jobView__padding {
        padding: 0 20px;
    }

    .jobView__card--features {
        padding: 20px;

        .features__item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;

            .item__header {
                font-size: 16px;
                font-weight: bold;
                min-width: 4em;
                display: flex;
                align-items: center;
                gap: 5px;


                .header__icon {
                    width: 18px;
                    height: 18px;
                }
            }

            .item__body {
                font-size: 16px;
                line-height: 1;
                display: flex;
                align-items: center;
                gap: 10px;

                .body__badge {
                    padding: 5px 20px;
                    border-radius: 10px;
                    background-color: #edeaea;
                    font-size: 10px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    text-align: left;
                    color: #484848;
                }

                .item__body__map {
                    cursor: pointer;
                    display: block;
                    color: black;
                    text-decoration: underline;
                }
            }


            .item__body--badgeGroup {
                display: inline-flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            &:not(:first-child) {
                margin-top: 15px;
            }
        }

        .features__panel {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            padding: 20px;
            border: solid 1px #edeaea;
            background-color: #fff;
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #fff;
            z-index: 10;
        }
    }

    .jobView__similarJobs {
        margin-top: 10px;
        padding: 20px;
        background-color: white;

        .similarJobs__header {
            font-size: 18px;
            font-weight: bold;
            line-height: 1.5;
            text-align: left;
            color: #333;
        }

        .similarJobs__list {
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            list-style: none;
        }
    }
}

@media screen and (min-width: 992px) {
    .jobView {
        padding-top: 0px;
        padding-bottom: 20px;

        .jobView__card {
            justify-content: flex-start;

            .card__header {}
        }

        .jobView__card--basic {
            .basic__logoGroup {
                margin: unset;
            }

            .basic__name {
                text-align: left;
            }

            .basic__organizationName {
                text-align: left;
            }

            .basic__badgeGroup {
                justify-content: flex-start;
            }

            .basic__numberGroup {
                margin-top: 30px;
            }
        }

        .jobView__card--features {
            .features__panel {
                position: initial;
                border: 0px;
                width: unset;
                margin-top: 40px;
                padding: 0px;
            }
        }

        .jobView__padding {
            padding: 0px;
        }
    }
}
</style>