<template>
    <div class="jobView" :class="{ container: device.state.isLarge }">
        <LazyAtomTabs class="d-lg-none jobView__tabs" :items="state.tabItems"></LazyAtomTabs>
        <section id="jobView__basic" class="jobView__section mt-3">
            <div class="jobView__card jobView__basic">
                <div v-if="state.company?.logo" class="d-none d-lg-block basic__logo"
                    :style="{ backgroundImage: `url(${state.company?.logo})` }">
                </div>
                <div v-else class="d-none d-lg-block basic__logo" :style="{ backgroundImage: `url(${placeholderImage})` }">
                </div>
                <div class="basic__body">
                    <div class="basic__body__header">{{ state.job?.name }}</div>
                    <NuxtLink class="basic__body__subHeader" :to="`/company/${state.company?.id}`">
                        <div class="d-lg-none subHeader__logo" :style="{ backgroundImage: `url(${state.company?.logo})` }">
                        </div>
                        {{ state.job?.organizationName }}
                    </NuxtLink>
                    <div class="basic__body__badgeGroup">
                        <div v-for="(item, index) in state.company?.industry" :key="index" class="badgeGroup__badge">
                            {{ $filter.optionText(item, repoSelect.industryItems) }}
                        </div>
                    </div>
                </div>
                <LazyOrganismJobItemPanel v-model="state.job" class="basic__footer" :showShareButton="true"
                    :jobDetailsException="true">
                </LazyOrganismJobItemPanel>
            </div>
        </section>
        <div class="row jobView__body">
            <div class="mobileGrid__right" :class="{ 'col-4': device.state.isLarge }">
                <div class="jobView__card jobView__features mt-3">
                    <div class="features__item">
                        <span class="item__header">
                            工作性質
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
                            薪資
                        </span>
                        <span class="item__body">{{ $filter.salary(state.job) }}</span>
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
                    <div v-if="getJobAddress()" class="features__item">
                        <span class="item__header">
                            地址
                        </span>
                        <span class="item__body">
                            {{ getJobAddress() }}
                            <a class="item__body__map d-lg-none" :href="getEncodedMapLink()" target="_blank">
                                <img class="body__map__icon" src="~/assets/jobs/details/icon_Environment.svg" alt="map">
                            </a>
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
                    <div class="features__item">
                        <span class="item__header">
                            職務類型
                        </span>
                        <div class="item__body item__body--badgeGroup">
                            <span v-for="(category, index ) in state.job?.occupationalCategory" :key="index"
                                class="body__badge">{{ getCategoryText(category) }}</span>
                        </div>
                    </div>
                    <div class="features__item">
                        <span class="item__header">
                            更新日期
                        </span>
                        <span class="item__body">{{ $time(state.job?.datePosted) }}</span>
                    </div>
                    <div class="features__item">
                        <span class="item__header">
                            語言要求
                        </span>
                        <span class="item__body">{{ $optionText(state.job?.language,
                            repoSelect.state.selectByQueryRes?.language)
                        }} {{ $optionText(state.job?.proficiency,
    repoSelect.state.selectByQueryRes?.proficiency)
}}</span>
                    </div>
                    <div class="mt-3">
                        <LazyAtomBtnSimple v-if="checkInfoIncomplete()" @click="showIncompleteAlert()"
                            :disabled="repoAuth.state.user.type === 'admin'">立即應徵
                        </LazyAtomBtnSimple>
                        <LazyAtomBtnSimple v-else-if="checkJobCategory()" :disabled="true">職務類型不符</LazyAtomBtnSimple>
                        <LazyOrganismJobModal v-else-if="checkVisibility()" v-model="state.job"
                            @applied="state.applyFlow = $event">
                            立即應徵
                        </LazyOrganismJobModal>
                        <LazyAtomBtnSimple v-else :disabled="true">已應徵</LazyAtomBtnSimple>
                    </div>
                </div>
                <div v-if="getJobAddress()" class="d-none d-lg-block jobView__map mt-3" :ref="'map'">
                    <iframe title="google map" class="map__iframe" :style="{ 'height': state.mapHeight }" loading="lazy"
                        allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="getGoogleMapSrc(state.job)"
                        @load="setMapHeight()">
                    </iframe>
                </div>
            </div>
            <div class="mobileGrid__left" :class="{ 'col-8': device.state.isLarge }">
                <section id="jobView__description" class="jobView__section jobView__description mt-3">
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
                <section id="jobView__requirement" class="jobView__section jobView__requirement mt-3">
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
            </div>
        </div>
        <section v-if="getAdVisibility()" class="jobView__ad" :key="state.adRenderKey">
            <div class="ad__card">
                <NuxtLink class="ad__card__link" to="/user/consult/records">
                    <div class="card__header">職涯發展從認識自己開始！</div>
                    <div class="card__subheader">一對一求職諮詢</div>
                    <div class="card__body">
                        透過多次的輔導貫徹求職策略，達到最好的求職效率，迅速找到目標工作。<br>
                        毎一位生涯設計師，將為不同領域、不同生活背景的人們，提供合適的生涯引導與諮詢服務。<br>
                        讓我們幫您配對適合的生涯設計師，或是觀看生涯設計師，了解不同生涯設計師的資歷。
                    </div>
                </NuxtLink>
                <button class="btn-close card__cancel" @click="hideAd()" aria-label="close ads"></button>
                <img class="d-none d-lg-block ad__card__image" alt="promotion" src="~/assets/jobs/img_consult.png" />
            </div>
        </section>
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
const runTimeConfig = useRuntimeConfig()
const { $emitter, $sweet, $filter, } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const repoJob = useRepoJob()
const repoJobApplication = useRepoJobApplication()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const repoCompany = useRepoCompany()
const jobScroller = useJobScroller()
const device = useDevice()
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
const jobId = computed(() => {
    const id = route.params.id
    return id
})
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
const { data: job } = await useFetch(`${runTimeConfig.public.apiBase}/job/${jobId.value}`, { initialCache: false })
state.job = job
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
    title: () => `${state.job.name} - ${state.job.organizationName} - ${runTimeConfig.public.siteName}`,
    ogTitle: () => `${state.job.name} - ${state.job.organizationName} - ${runTimeConfig.public.siteName}`,
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
        return `${runTimeConfig.public.origin}/job/${state.job.identifier}`
    }
})
useJsonld(() => {
    const validThroughDate = new Date(job.value.datePosted)
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
        url: `${runTimeConfig.public.origin}/job/${job.value.identifier}`,
        image: job.value.image,
        identifier: job.value.identifier,
        applicantLocationRequirements: {
            "@type": "Country",
            "name": "Anywhere"
        },
        datePosted: job.value.datePosted,
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
const jobItems = ref([])
watch(() => jobScroller.state.jobList, (newValue = [], oldValue = []) => {
    if (newValue.length !== oldValue.length) {
        jobScroller.observeLastJob(jobItems)
    }
    const { user } = repoAuth.state
    if (user && user.id) {
        return
    }
    const showRegisterModal = jobScroller.state.count >= 5 && jobScroller.state.jobList.length > 5 && !jobScroller.state.isModalShown
    if (!user && showRegisterModal) {
        jobScroller.state.isModalShown = true
        $emitter.emit("showUserModal")
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
        const { innerHeight, pageYOffset } = window
        if (innerHeight + pageYOffset >= offsetHeight && !jobScroller.state.isModalShown) {
            jobScroller.state.isModalShown = true
            $emitter.emit("showUserModal")
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
    padding-top: calc(46px);

    .jobView__tabs {
        position: fixed;
        top: 61px;
        width: 100%;
        z-index: 1030;
    }

    .jobView__section {
        scroll-margin-top: calc(58px + 46px);
    }

    .jobView__card {
        padding: 20px;
        background-color: #fff;

        .card__header {
            font-size: 18px;
            font-weight: bold;
        }
    }

    .jobView__basic {
        .basic__body__header {
            font-size: 22px;
            font-weight: bold;
            line-height: 1.2;
            min-height: 28px;
        }

        .basic__body__subHeader {
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            display: flex;
            align-items: center;
            margin-top: 10px;
            text-decoration: none;
            color: #5ea88e;
            min-height: 40px;

            &:hover {
                text-decoration: underline;
            }

            .subHeader__logo {
                width: 40px;
                height: 40px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                margin-right: 8px;
                border-radius: 100px;
            }
        }

        .basic__body__badgeGroup {
            display: flex;
            gap: 18px;
            margin-top: 20px;
            flex-wrap: wrap;

            .badgeGroup__badge {
                padding: 8px;
                border-radius: 5px;
                border: solid 1px #d3d3d3;

            }
        }
    }

    .jobView__features {
        .features__item {
            display: flex;
            align-items: center;

            .item__header {
                font-size: 16px;
                font-weight: bold;
                min-width: 4em;
                display: inline-block;
            }

            .item__body {
                margin-left: 10px;
                font-size: 16px;
                line-height: 1;
                display: flex;
                align-items: center;

                .body__badge {
                    padding: 8px;
                    border-radius: 5px;
                    border: solid 1px #d3d3d3;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1;
                    letter-spacing: normal;
                    text-align: left;
                    color: #333;
                }

                .item__body__map {
                    cursor: pointer;
                    display: block;
                    margin-left: 8px;

                    .body__map__icon {
                        width: 26px;
                        height: 26px;
                    }
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
    }

    .jobView__ad {
        padding: 10px 15px;
        position: relative;

        .card__cancel {
            position: absolute;
            top: 15px;
            right: 15px;
        }

        .ad__card {
            padding: 20px;
            border-radius: 10px;
            background-color: #dde9f0;
            display: block;

            >* {
                text-decoration: none;
            }

            .card__header {
                font-size: 22px;
                font-weight: bold;
                line-height: 1.3;
                color: #3a6c8a;
            }

            .card__subheader {
                font-size: 16px;
                font-weight: bold;
                line-height: 1.3;
                color: #333;
                margin-top: 10px;
            }

            .card__body {
                font-size: 16px;
                font-weight: normal;
                line-height: 1.5;
                text-align: justify;
                color: #636363;
                margin-top: 10px;
            }
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
        }
    }
}

@media screen and (min-width: 992px) {
    .jobView {
        padding-top: 0px;
        padding-bottom: 20px;

        .jobView__card {
            border-radius: 10px;
            border: solid 1px #d3d3d3;
            background-color: #fff;
            padding: 20px;

            .card__header {
                font-size: 20px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #333;

            }

            .card__body {
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #333;
            }
        }

        .jobView__basic {
            position: relative;
            display: flex;
            gap: 30px;
            min-height: 217px;
            // justify-content: space-between;

            .basic__body__header {
                font-size: 28px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #5ea88e;
            }

            .basic__body__subHeader {
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #5ea88e;
            }

            .basic__body__badgeGroup {
                display: flex;
                gap: 10px;
                // margin-top: 20px;

                .badgeGroup__badge {
                    padding: 8px;
                    border-radius: 5px;
                    border: solid 1px #d3d3d3;
                    font-size: 14px;

                }
            }

            .basic__logo {
                width: 80px;
                height: 80px;
                color: #5ea88e;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }

            .basic__footer {
                margin-right: 120px;
                margin-left: auto;
            }
        }

        .jobView__map {
            .map__iframe {
                min-height: 360px;
                width: 100%;
                border-radius: 10px;
            }
        }

        .jobView__features {
            font-weight: normal;
            line-height: 0;
        }

        .jobView__ad {
            margin-top: 20px;
            padding: 0;

            .ad__card {
                padding: 20px;
                position: relative;

                .card__header {
                    font-size: 20px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.3;
                    letter-spacing: normal;
                    text-align: left;
                    color: #3a6c8a;
                }

                .card__subheader {
                    font-size: 20px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.3;
                    letter-spacing: normal;
                    text-align: left;
                    color: #333;
                }

                .card__body {
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: left;
                    color: #636363;
                    max-width: calc(100% - 222px);
                }

                .ad__card__image {
                    position: absolute;
                    right: 30px;
                    bottom: 0;
                    width: 160px;
                    height: 160px;
                }
            }
        }

        .jobView__body {
            flex-direction: row-reverse;
        }

        .jobView__similarJobs {
            padding: 0px;
            margin-top: 30px;
            background-color: inherit;

            .similarJobs__header {
                font-size: 33px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1;
                letter-spacing: normal;
                text-align: left;
                color: #333;
            }

            .similarJobs__list {
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 30px;
            }
        }

    }
}
</style>