<template>
    <div class="jobView" :class="{ container: device.state.isLarge }">
        <LazyOrganismJobViewBody v-model="state.job"></LazyOrganismJobViewBody>
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
const runTimeConfig = useRuntimeConfig()
const { $emitter, $sweet, $filter, } = useNuxtApp()
const route = useRoute()
const repoAuth = useRepoAuth()
const jobScroller = useJobScroller()
const device = useDevice()
const state = reactive({
    job: null,
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
// hooks
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
        window.addEventListener('scroll', detectScroll)
    }
})
onBeforeUnmount(() => {
    if (process.client) {
        window.removeEventListener('scroll', detectScroll)
    }
})
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
}, { immediate: true })
watch(() => state.job, (newValue) => {
    if (newValue) {
        jobScroller.state.filter.occupationalCategory = newValue.occupationalCategory // Will trigger job search
    }
})
// methods
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
function getAdVisibility() {
    if (process.client) {
        return browserConfig.value?.ads?.jobDetails !== false && repoAuth.state.user
    }
}
</script>
<style lang="scss" scoped>
.jobView {
    padding-top: calc(46px);

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