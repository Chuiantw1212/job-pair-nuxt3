<template>
    <li class="jobItem" :class="{ 'jobItem--recommended': recommend }">
        <img v-if="modelValue.image" class="item__logo" :src="modelValue.image" onerror="this.style.display = 'none'" />
        <div class="item__body">
            <NuxtLink class="body__jobName" :to="`/job/${modelValue.identifier}`"></NuxtLink>
            <NuxtLink class="body__company" :to="`/company/${modelValue.organizationId}`">
                <img class="company__logo d-lg-none" :src="modelValue.image" onerror="this.style.display = 'none'" />
                <span class="company__name">{{ modelValue.organizationName }}</span>
            </NuxtLink>
            <div class="body__main">
                <NuxtLink v-if="repoSelect.state.selectByQueryRes" class="main__labelGroup"
                    :to="`/job/${modelValue.identifier}`">
                    <div class="main__labelGroup__label">
                        <img class="label__icon" src="./icon_Aim.svg" />
                        <span>
                            {{ $filter.optionText(modelValue.employmentType, selectByQueryRes.employmentType) }} ·
                            {{ $filter.optionText(modelValue.responsibilities, selectByQueryRes.responsibilities) }}
                        </span>
                    </div>
                    <div v-if="getLocationText()" class="main__labelGroup__label">
                        <img class="label__icon" src="./icon_Environment.svg" />
                        {{
                                getLocationText()
                        }}
                    </div>
                    <div class="main__labelGroup__label">
                        <img class="label__icon" src="./icon_Dollar.svg" />
                        {{ $filter.salary(modelValue) }}
                    </div>
                    <div class="d-none d-lg-flex main__labelGroup__label">
                        <img class="label__icon" src="./icon_Laptop.svg" />
                        <span>{{ $filter.optionText(modelValue.jobLocationType, selectByQueryRes.jobLocationType)
                        }}</span>
                    </div>
                    <div class="d-none d-lg-flex main__labelGroup__label main__labelGroup__label--wrap">
                        <img class="label__icon" src="./icon_Tag.svg" />
                        <span class>{{ getCategoryTextGroup() }}</span>
                    </div>

                </NuxtLink>
                <div class="main__panel d-lg-none">
                    <div class="panel__vl"></div>
                    <JobItemPanel v-model="modelValue"></JobItemPanel>
                </div>
            </div>
        </div>
        <JobItemPanel v-model="modelValue" class="d-none d-lg-block item__footer" :showShareButton="true">
        </JobItemPanel>
    </li>
</template>
<script setup>
const { $optionText, $emitter } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoJob = useRepoJob()
const router = useRouter()
const route = useRoute()
const state = reactive({
    backgroundImage,
    applyFlow: null
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    },
    filter: {
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
watchEffect(() => {
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
    const text = $optionText(category, repoAuth.state.selectByQueryRes.jobCategory)
    return text
}
function getLocationText() {
    let locationText = ""
    const { addressRegion = "", addressLocality } = props.modelValue
    const { locationRes } = repoAuth.state
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
    gap: 30px;
    border-radius: 10px;
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
                    margin-right: 24px;
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
        // flex-direction: column;
        padding: 30px;
        position: relative;

        .item__logo {
            display: block;
            width: 60px;
            height: fit-content;
            max-height: 60px;
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
                }
            }
        }

        .item__footer {
            min-width: 196px;
        }
    }
}
</style>