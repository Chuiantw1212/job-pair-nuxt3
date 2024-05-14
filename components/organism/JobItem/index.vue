<template>
    <li class="jobItem" :class="{ 'jobItem--recommended': recommend }">
        <div class="jobItem__header">
            <NuxtLink v-if="modelValue.image" class="item__logo" :to="`/job/${modelValue.identifier}`"
                :style="{ 'background-image': `url(${modelValue.image})` }">
            </NuxtLink>
            <NuxtLink v-else class="item__logo" :style="{ 'background-image': `url(${defaultLogo})` }">
            </NuxtLink>
            <div class="header__btnGroup">
                <button v-if="!state.application.applyFlow" class="btnGroup__btn" @click.stop="handleSaveJob()">
                    <img src="./Collect.svg">
                </button>
                <button v-if="state.application.applyFlow === 'saved'" class="btnGroup__btn"
                    @click.stop="handleUnsavedJob()">
                    <img src="./Saved.svg">
                </button>
                <button v-if="state.application.applyFlow === 'invited' && state.application.visibility !== 'visible'"
                    class="btnGroup__btn" @click.stop="handleSaveJob()">
                    <img src="./Collect.svg">
                </button>
                <button v-if="state.application.applyFlow === 'invited' && state.application.visibility === 'visible'"
                    class="btnGroup__btn" @click.stop="handleUnsavedJob()">
                    <img src="./Saved.svg">
                </button>
                <button class="btnGroup__btn" v-if="state.navigator?.share" @click="shareLinkNative()">
                    <img src="./Copy.svg">
                </button>
                <button class="btnGroup__btn" v-else :id="`tooltip-${state.id}`" data-bs-toggle="tooltip" title="點擊複製連結"
                    @click="shareLinkBootstrap()">
                    <img src="./Copy.svg">
                </button>
            </div>
        </div>
        <div class="jobItem__body">
            <NuxtLink class="body__jobName" :to="`/job/${modelValue.identifier}`">
                {{ modelValue.name }}
            </NuxtLink>
            <NuxtLink v-if="modelValue.organizationSeoName" class="body__company"
                :to="`/company/${modelValue.organizationSeoName}`">
                <span class="company__name">{{ modelValue.organizationName }}</span>
            </NuxtLink>
            <NuxtLink v-else class="body__company" :to="`/company/${modelValue.organizationId}`">
                <span class="company__name">{{ modelValue.organizationName }}</span>
            </NuxtLink>
            <NuxtLink class="body__labelGroup" :to="`/job/${modelValue.identifier}`">
                <span v-for="(item, index) in modelValue.employmentType">
                    {{ $filter.optionText(item,
        repoSelect.state.selectByQueryRes?.employmentType)
                    }}
                </span>
                <span v-if="modelValue.responsibilities">
                    ·{{ $filter.optionText(modelValue.responsibilities,
        repoSelect.state.selectByQueryRes?.responsibilities)
                    }}
                </span>
                <div v-if="getLocationText()">
                    ·{{
        getLocationText()
    }}
                </div>
                <div v-if="modelValue.jobLocationType !== 'onSite'">
                    ·<span>{{ $filter.optionText(modelValue.jobLocationType,
                        repoSelect.state.selectByQueryRes?.jobLocationType)
                        }}</span>
                </div>

            </NuxtLink>
            <NuxtLink class="body__badgeGroup" :to="`/job/${modelValue.identifier}`">
                <span v-for="(item, index) in modelValue.occupationalCategory" class="badgeGroup__item">
                    {{ $filter.optionText(item, repoSelect.state.selectByQueryRes.jobCategory) }}
                </span>
            </NuxtLink>
        </div>
        <div class="jobItem__footer">
            <div class="footer__similarityGroup">
                <span>適配度分數</span>
                <div class="similarityGroup__similarity">{{ $filter.rank(modelValue?.similarity) }}</div>
            </div>
            <div class="footer__salaryGroup">
                {{ $filter.salaryNumber(modelValue)
                }}
                <span class="salaryGroup__salaryType">
                    / {{ $filter.optionText(modelValue.salaryType, repoSelect.state.selectByQueryRes.salaryType) }}
                </span>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    name: 'jobItem',
}
</script>
<script setup>
import defaultLogo from './company.webp'
const repoJobApplication = useRepoJobApplication()
const emit = defineEmits(['update:modelValue'])
const { $filter, $uuid4, $emitter } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const state = reactive({
    applyFlow: null,
    application: {},
    // share btn
    navigator: null,
    shareButtonToolTip: null,
    id: null,
})
if (process.client) {
    state.navigator = window.navigator
}
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    },
    recommend: {
        type: Boolean,
        default: false
    }
})
// hooks
watch(() => repoJobApplication.state.userJobs, (userJobs) => {
    const jobKeys = Object.keys(userJobs)
    if (!jobKeys.length) {
        return
    }
    const jobId = props.modelValue.identifier
    const matchedJob = userJobs[jobId]
    if (matchedJob) {
        state.application = matchedJob
    }
}, { immediate: true, deep: true })
watchEffect(() => {
    const { user } = repoAuth.state
    if (!user) {
        return
    }
    const jobId = props.modelValue.identifier
    const { jobs = [] } = user
    const matchedJob = jobs[jobId]
    if (matchedJob) {
        state.applyFlow = matchedJob.applyFlow
    }
})
watch(() => props.modelValue, () => {
    if (process.client && props.modelValue) {
        const { origin } = window.location
        const url = `${origin}/job/${props.modelValue.identifier}`
        state.copiedTitle = `已複製: ${url}`
        initialilzeTooltip()
    }
}, { immediate: true })
// methods
function initialilzeTooltip() {
    if (!state.navigator.share) {
        state.id = $uuid4()
        nextTick(() => {
            const element = document.querySelector(`#tooltip-${state.id}`)
            if (element) {
                state.shareButtonToolTip = new window.bootstrap.Tooltip(element)
            }
        })
    }
}
async function shareLinkNative() {
    const { origin } = window.location
    const url = `${origin}/job/${props.modelValue.identifier}?openExternalBrowser=1`
    await navigator.share({
        title: `在Job Pair上應徵${props.modelValue.name}`,
        text: `在Job Pair上應徵${props.modelValue.name}`,
        url,
    })
}
async function shareLinkBootstrap() {
    // 不支援貼到記憶體裡面
    const { origin } = window.location
    const url = `${origin}/job/${props.modelValue.identifier}?openExternalBrowser=1`
    await navigator.clipboard.writeText(url)
    state.shareButtonToolTip.hide()
}
async function handleSaveJob() {
    const { user } = repoAuth.state
    if (!user || !user.id) {
        $emitter?.emit("showUserModal")
        return
    }
    const response = await repoJobApplication.postJobSaved({
        userId: user.id,
        jobId: props.modelValue.identifier,
    })
    if (response.status === 200) {
        const application = response.data
        state.application = application
    }
}
async function handleUnsavedJob() {
    const { user } = repoAuth.state
    const response = await repoJobApplication.deleteJobSaved({
        userId: user.id,
        jobId: props.modelValue.identifier,
    })
    if (response.status === 200) {
        state.application = {}
    }
}
function getLocationText() {
    const { addressRegion = "", addressLocality, jobLocationType = '' } = props.modelValue
    if (jobLocationType === 'fullyRemote') {
        return false
    }
    let locationText = ""
    const { locationRes } = repoSelect.state
    if (!locationRes) {
        return
    }
    if (addressRegion) {
        const level1Item = locationRes.taiwan.find(item => {
            return item.value === addressRegion
        })
        if (level1Item) {
            locationText += level1Item.text
        }
    }
    if (addressLocality) {
        const level2Item = locationRes[addressRegion].find(item => {
            return item.value === addressLocality
        })
        if (level2Item) {
            locationText += level2Item.text
        }
    }
    return locationText
}
</script>
<style lang="scss" scoped>
.jobItem {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;

    .jobItem__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header__btnGroup {
            .btnGroup__btn {
                border: none;
                background-color: inherit;
            }
        }
    }

    .jobItem__body {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        .body__jobName {
            font-size: 24px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #222;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        .body__company {
            font-size: 12px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #222;
            margin-top: 10px;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }

            .company__name {}
        }

        .body__labelGroup {
            margin-top: 10px;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #484848;
            display: flex;
            flex-wrap: wrap;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        .body__badgeGroup {
            margin-top: 10px;
            display: flex;
            gap: 5px;
            font-size: 10px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #484848;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }

            .badgeGroup__item {
                padding: 5px 20px;
                border-radius: 10px;
                background-color: #edeaea;
            }
        }
    }

    .jobItem__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-align: left;
        color: #484848;
        padding-top: 30px;

        .footer__similarityGroup {
            display: flex;
            align-items: center;
            gap: 10px;
            // margin-top: 30px;

            .similarityGroup__similarity {
                font-size: 36px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: 1;
                height: 36px;
                letter-spacing: normal;
                text-align: left;
                // color: #428f74;
                transform: translateY(-2px);
            }
        }

        .footer__similarity {}

        .footer__salaryGroup {
            font-size: 24px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.57;
            letter-spacing: normal;
            text-align: left;
            color: #222;
            // display: flex;
            // align-items: center;

            .salaryGroup__salaryType {
                font-size: 12px;
                font-weight: normal;
                line-height: normal;
                color: #a6a6a6;
            }
        }
    }

    .item__logo {
        width: 40px;
        height: 40px;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        border: solid 1px #edeaea;
    }
}


@media screen and (min-width: 992px) {}
</style>