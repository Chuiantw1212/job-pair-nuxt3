<template>
    <li class="jobItem" :class="{ 'jobItem--recommended': recommend }">
        <div class="jobItem__header">
            <div v-if="modelValue.image" class="item__logo" :style="{ 'background-image': `url(${modelValue.image})` }">
            </div>
            <div v-else class="item__logo" :style="{ 'background-image': `url(${defaultLogo})` }">
            </div>
            <div class="header__btnGroup">
                <button class="btnGroup__btn">
                    <img src="./Collect.svg">
                </button>
                <button class="btnGroup__btn">
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
            <!-- <div class="body__main"> -->
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
                <!-- <div>
                    ·{{ $filter.salary(modelValue) }}
                </div> -->
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
            <!-- <div class="main__panel d-lg-none">
                <div class="panel__vl"></div>
                <LazyOrganismJobItemPanel v-model="localValue"></LazyOrganismJobItemPanel>
            </div> -->
            <!-- </div> -->
        </div>
        <div class="jobItem__footer">
            <div class="footer__similarityGroup">
                <span>適配度分數</span>
                <div class="similarityGroup__similarity">95</div>
            </div>
            <div class="footer__salaryGroup">
                <!-- ${{ modelValue.salaryMin }} -->
                {{ $filter.salaryNumber(modelValue)
                }}
                <span class="salaryGroup__salaryType">
                    / {{ $filter.optionText(modelValue.salaryType, repoSelect.state.selectByQueryRes.salaryType) }}
                </span>
            </div>
        </div>
        <!-- <LazyOrganismJobItemPanel v-model="localValue" class="d-none d-lg-block item__footer" :showShareButton="true">
        </LazyOrganismJobItemPanel> -->
    </li>
</template>
<script>
export default {
    name: 'jobItem',
}
</script>
<script setup>
import defaultLogo from './company.webp'
const emit = defineEmits(['update:modelValue'])
const { $filter, } = useNuxtApp()
console.log({
    $filter
});
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const state = reactive({
    applyFlow: null
})
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
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
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
// methods
function getCategoryTextGroup() {
    const { occupationalCategory = [] } = props.modelValue
    const texts = occupationalCategory.map(item => {
        return getCategoryText(item)
    })
    return texts.join("·")
}
function getCategoryText(category = "") {
    if (!category || !repoSelect.state.selectByQueryRes) {
        return
    }
    const text = $filter.optionText(category, repoSelect.state.selectByQueryRes.jobCategory)
    return text
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
            font-size: 16px;
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
            font-size: 14px;
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