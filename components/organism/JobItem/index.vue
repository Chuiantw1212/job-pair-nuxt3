<template>
    <li class="jobItem" :class="{ 'jobItem--recommended': recommend }">
        <div>
            <div v-if="modelValue.image" class="item__logo" :style="{ 'background-image': `url(${modelValue.image})` }">
            </div>
            <div v-else class="item__logo" :style="{ 'background-image': `url(${defaultLogo})` }">

            </div>
        </div>
        <div class="item__body">
            <NuxtLink class="body__jobName" :to="`/job/${modelValue.identifier}`">
                {{ modelValue.name }}
            </NuxtLink>
            <NuxtLink class="body__company" :to="`/company/${modelValue.organizationId}`">
                <img class="company__logo d-lg-none" :src="modelValue.image" onerror="this.style.display = 'none'"
                    alt="logo" />
                <span class="company__name">{{ modelValue.organizationName }}</span>
            </NuxtLink>
            <div class="body__main">
                <NuxtLink class="main__labelGroup" :to="`/job/${modelValue.identifier}`">
                    <div class="main__labelGroup__label">
                        <img class="label__icon" src="~/assets/jobs/details/icon_Aim.svg" alt="employmentType" />
                        <span>
                            <template v-for="(item, index) in modelValue.employmentType">
                                {{ $optionText(item,
                                        repoSelect.state.selectByQueryRes?.employmentType)
                                }}·
                            </template>
                            {{ $optionText(modelValue.responsibilities,
                                    repoSelect.state.selectByQueryRes?.responsibilities)
                            }}
                        </span>
                    </div>
                    <div v-if="getLocationText()" class="main__labelGroup__label">
                        <img class="label__icon" src="~/assets/jobs/details/icon_Environment.svg" alt="location" />
                        {{
                                getLocationText()
                        }}
                    </div>
                    <div class="main__labelGroup__label">
                        <img class="label__icon" src="~/assets/jobs/details/icon_Dollar.svg" alt="salary" />
                        {{ $salary(modelValue) }}
                    </div>
                    <div class="d-none d-lg-flex main__labelGroup__label">
                        <img class="label__icon" src="~/assets/jobs/details/icon_Laptop.svg" alt="remote" />
                        <span>{{ $optionText(modelValue.jobLocationType,
                                repoSelect.state.selectByQueryRes?.jobLocationType)
                        }}</span>
                    </div>
                    <div class="d-none d-lg-flex main__labelGroup__label main__labelGroup__label--wrap">
                        <img class="label__icon" src="~/assets/jobs/details/icon_Tag.svg" alt="category" />
                        <span class>{{ getCategoryTextGroup() }}</span>
                    </div>

                </NuxtLink>
                <div class="main__panel d-lg-none">
                    <div class="panel__vl"></div>
                    <LazyOrganismJobItemPanel v-model="localValue"></LazyOrganismJobItemPanel>
                </div>
            </div>
        </div>
        <LazyOrganismJobItemPanel v-model="localValue" class="d-none d-lg-block item__footer" :showShareButton="true">
        </LazyOrganismJobItemPanel>
    </li>
</template>
<script setup>
import defaultLogo from './company.webp'
const emit = defineEmits(['update:modelValue'])
const { $optionText, $salary } = useNuxtApp()
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
    return texts.join("、")
}
function getCategoryText(category = "") {
    if (!category) {
        return
    }
    const text = $optionText(category, repoSelect.state.selectByQueryRes.jobCategory)
    return text
}
function getLocationText() {
    let locationText = ""
    const { addressRegion = "", addressLocality } = props.modelValue
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
    display: flex;
    border-radius: 4px;
    border: solid 1px #d3d3d3;
    background-color: #fff;
    padding: 14px 20px;

    .item__logo {
        display: none;
    }

    .item__logoSlot {
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
    }

    .item__body {
        width: 100%;

        .body__jobName {
            font-size: 20px;
            font-weight: bold;
            line-height: 1;
            color: #5ea88e;
            cursor: pointer;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        .body__company {
            font-size: 15px;
            font-weight: normal;
            line-height: 1;
            color: #333;
            margin-top: 12px;
            display: flex;
            align-items: center;
            text-decoration: none;
            cursor: pointer;

            .company__logo {
                width: 27px;
                height: fit-content;
                display: block;
                margin-right: 4px;
            }

            .company__name {
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .body__main {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;

            .main__panel {
                width: 100%;
                max-width: 140px;
                display: flex;

                .panel__vl {
                    border-right: 1px solid #d3d3d3;
                    height: 154px;
                    margin: 0 auto;
                    // margin-right: 24px;
                }
            }

            .main__labelGroup {
                display: flex;
                flex-direction: column;
                gap: 16px;
                text-decoration: none;
                color: black;

                .main__labelGroup__label {
                    display: flex;
                    align-items: center;
                    white-space: nowrap;

                    .label__icon {
                        display: block;
                        margin-right: 8px;
                        height: 18px;
                        width: 18px;
                    }
                }

                .main__labelGroup__label--wrap {
                    white-space: pre-wrap;
                }

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .item__footer {
        align-self: center;
    }
}

.jobItem--recommended {
    background-color: #eef6ed;
}

@media screen and (min-width: 992px) {
    .jobItem {
        padding: 30px;
        position: relative;
        gap: 30px;

        .item__logo {
            display: block;
            width: 60px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            height: 60px;
        }

        .item__body {
            .body__jobName {
                font-size: 32px;
                font-weight: bold;
            }

            .body__company {
                font-size: 23px;
                font-weight: normal;

                .company__name {
                    margin: 0;
                }
            }

            .body__main {
                .main__labelGroup {
                    border-right: none;
                    font-size: 20px;
                    font-weight: normal;
                    flex-direction: row;
                    flex-wrap: wrap;

                    .main__labelGroup__label {

                        .label__icon {
                            height: 20px;
                            width: 20px;
                        }
                    }
                }
            }
        }

        .item__footer {
            min-width: 196px;
        }
    }
}
</style>