<template>
    <div class="jobView__body">
        <LazyAtomTabs class="d-lg-none body__tabs" :items="state.tabItems"></LazyAtomTabs>
        <section id="body__basic" class="body__section mt-3">
            <div class="body__card body__basic">
                <div v-if="state.company?.logo" class="d-none d-lg-block basic__logo"
                    :style="{ backgroundImage: `url(${state.company?.logo})` }">
                </div>
                <div v-else class="d-none d-lg-block basic__logo" :style="{ backgroundImage: `url(${placeholderImage})` }">
                </div>
                <div class="basic__body">
                    <div class="basic__body__header">{{ job.name }}</div>
                    <NuxtLink class="basic__body__subHeader" :to="`/company/${state.company?.id}`">
                        <div class="d-lg-none subHeader__logo" :style="{ backgroundImage: `url(${state.company?.logo})` }">
                        </div>
                        {{ job.organizationName }}
                    </NuxtLink>
                    <div class="basic__body__badgeGroup">
                        <div v-for="(item, index) in state.company?.industry" :key="index" class="badgeGroup__badge">
                            {{ $filter.optionText(item, repoSelect.industryItems) }}
                        </div>
                    </div>
                </div>
                <LazyOrganismJobItemPanel v-model="job" class="basic__footer" :showShareButton="true"
                    :jobDetailsException="true">
                </LazyOrganismJobItemPanel>
            </div>
        </section>
        <div class="row body__body">
            <div class="mobileGrid__right" :class="{ 'col-4': device.state.isLarge }">
                <div class="body__card body__features mt-3">
                    <div class="features__item">
                        <span class="item__header">
                            工作性質
                        </span>
                        <span class="item__body">
                            <template v-for="(item, index) in job.employmentType">
                                {{
                                    $filter.optionText(item,
                                        repoSelect.state.selectByQueryRes?.employmentType)
                                }} ·
                            </template>
                            {{
                                $filter.optionText(job.responsibilities,
                                    repoSelect.state.selectByQueryRes?.responsibilities)
                            }}</span>
                    </div>
                    <div class="features__item">
                        <span class="item__header">
                            薪資
                        </span>
                        <span class="item__body">{{ $filter.salary(job) }}</span>
                    </div>
                    <div class="features__item">
                        <span class="item__header">
                            遠端彈性
                        </span>
                        <span class="item__body">
                            {{
                                $filter.optionText(job.jobLocationType,
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
                    <div v-if="job.remark" class="features__item">
                        <span class="item__header">
                            備註
                        </span>
                        <span class="item__body">
                            {{
                                job.remark
                            }}
                        </span>
                    </div>
                    <div class="features__item">
                        <span class="item__header">
                            職務類型
                        </span>
                        <div class="item__body item__body--badgeGroup">
                            <span v-for="(category, index ) in job.occupationalCategory" :key="index" class="body__badge">{{
                                getCategoryText(category) }}</span>
                        </div>
                    </div>
                    <div class="features__item">
                        <span class="item__header">
                            更新日期
                        </span>
                        <span class="item__body">{{ $time(job.datePosted) }}</span>
                    </div>
                    <div class="features__item">
                        <span class="item__header">
                            語言要求
                        </span>
                        <span class="item__body">{{ $optionText(job.language,
                            repoSelect.state.selectByQueryRes?.language)
                        }} {{ $optionText(job.proficiency,
    repoSelect.state.selectByQueryRes?.proficiency)
}}</span>
                    </div>
                    <div class="mt-3">
                        <LazyAtomBtnSimple v-if="checkInfoIncomplete()" @click="showIncompleteAlert()"
                            :disabled="repoAuth.state.user.type === 'admin'">立即應徵
                        </LazyAtomBtnSimple>
                        <LazyAtomBtnSimple v-else-if="checkJobCategory()" :disabled="true">職務類型不符</LazyAtomBtnSimple>
                        <LazyOrganismJobModal v-else-if="checkVisibility()" v-model="job"
                            @applied="state.applyFlow = $event">
                            立即應徵
                        </LazyOrganismJobModal>
                        <LazyAtomBtnSimple v-else :disabled="true">已應徵</LazyAtomBtnSimple>
                    </div>
                </div>
                <div v-if="getJobAddress()" class="d-none d-lg-block body__map mt-3" :ref="'map'">
                    <iframe title="google map" class="map__iframe" :style="{ 'height': state.mapHeight }" loading="lazy"
                        allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="getGoogleMapSrc(job)"
                        @load="setMapHeight()">
                    </iframe>
                </div>
            </div>
            <div class="mobileGrid__left" :class="{ 'col-8': device.state.isLarge }">
                <section id="body__description" class="body__section body__description mt-3">
                    <div class="body__card">
                        <div class="card__header">職責介紹</div>
                        <div class="card__body">
                            <!-- 呈現影片不可拿掉 -->
                            <LazyAtomInputCkeditor v-if="job" v-model="job.description" :toolbar="[]" disabled
                                ref="descriptionRef">
                            </LazyAtomInputCkeditor>
                        </div>
                    </div>
                </section>
                <section id="body__requirement" class="body__section body__requirement mt-3">
                    <div class="body__card">
                        <div class="card__header">條件要求</div>
                        <div class="card__body">
                            <!-- 呈現影片不可拿掉 -->
                            <LazyAtomInputCkeditor v-if="job" v-model="job.skills" :toolbar="[]" disabled ref="skillsRef">
                            </LazyAtomInputCkeditor>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script setup>
import placeholderImage from '~/assets/company/company.webp'
const emit = defineEmits(['update:modelValue'])
const { $sweet, $filter, } = useNuxtApp()
const router = useRouter()
const repoJob = useRepoJob()
const repoJobApplication = useRepoJobApplication()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const repoCompany = useRepoCompany()
const device = useDevice()
const state = reactive({
    job: null,
    company: null,
    applyFlow: null,
    tabItems: [
        {
            text: "職缺內容",
            value: "#body__basic",
        },
        {
            text: "職責介紹",
            value: "#body__description",
        },
        {
            text: "條件要求",
            value: "#body__requirement",
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
    observer: null,
    debounceTimer: null,
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    }
})
const job = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
// methods
onMounted(() => {
    if (process.client) {
        window.addEventListener("resize", setMapHeight)
    }
})
onBeforeUnmount(() => {
    if (process.client) {
        window.removeEventListener("resize", setMapHeight)
    }
})
watch(() => repoAuth.state.user, () => {
    const job = props.modelValue
    if (job && !job.similarity) {
        initialize()
    }
}, { immediate: true })
watch(() => repoJobApplication.state.userJobs, () => {
    setApplyFlow()
}, { immediate: true, deep: true, })
// methos
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
    if (!user || !job || !user.occupationalCategory) {
        return
    }
    const { occupationalCategory = [] } = user
    const jobCategory = job.occupationalCategory
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

    const jobId = job.identifier
    const matchedJob = repoJobApplication.state.userJobs[jobId]
    if (matchedJob) {
        state.applyFlow = matchedJob.applyFlow
    }
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
    if (!job.value || !state.company) {
        return
    }
    const streetAddress = job.value.streetAddress ?? state.company.streetAddress
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
    if (!job.value || !state.company || !locationRes) {
        return false
    }
    const addressRegion = job.value.addressRegion ?? state.company.addressRegion
    const addressLocality = job.value.addressLocality ?? state.company.addressLocality
    const streetAddress = job.value.streetAddress ?? state.company.streetAddress
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
    const jobId = job.value.identifier
    const config = {
        jobId,
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
    const jobWithModel = jobResponse.data
    // 再取得公司資料
    const companyResponse = await repoCompany.getCompanyById(jobWithModel.organizationId)
    const company = companyResponse.data
    job.value = jobWithModel // IMPORTANT：Will Trigger Job List
    state.company = company
}
</script>
<style lang="scss" scoped>
.jobView__body {

    .body__tabs {
        position: fixed;
        top: 61px;
        width: 100%;
        z-index: 1030;
    }

    .body__section {
        scroll-margin-top: calc(58px + 46px);
    }

    .body__card {
        padding: 20px;
        background-color: #fff;

        .card__header {
            font-size: 18px;
            font-weight: bold;
        }
    }

    .body__basic {
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

    .body__features {
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


}

@media screen and (min-width: 992px) {
    .jobView__body {

        .body__card {
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

        .body__basic {
            position: relative;
            display: flex;
            gap: 30px;
            min-height: 217px;

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

        .body__map {
            .map__iframe {
                min-height: 360px;
                width: 100%;
                border-radius: 10px;
            }
        }

        .body__features {
            font-weight: normal;
            line-height: 0;
        }



        .body__body {
            flex-direction: row-reverse;
        }

    }
}
</style>