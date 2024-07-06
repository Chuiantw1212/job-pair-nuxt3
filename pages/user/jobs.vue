<template>
    <div v-if="repoSelect.state.selectByQueryRes" class="userStatus">
        <h1 class="userStatus__header">職缺比較</h1>
        <hr class="userStatus__hr">
        <div v-if="state.jobComparable.length">
            <div class="userStatus__selectGroup">
                <LazyAtomInputSelect class="selectGroup__select" v-model="state.jobCompareId1"
                    :items="state.jobComparable" itemText="name" itemValue="identifier"
                    @update:modelValue="setJobDetails($event, 'first')">
                </LazyAtomInputSelect>
                <LazyAtomInputSelect v-if="state.jobComparable.length >= 2" class="selectGroup__select"
                    v-model="state.jobCompareId2" :items="state.jobComparable" itemText="name" itemValue="identifier"
                    @update:modelValue="setJobDetails($event, 'second')">
                </LazyAtomInputSelect>
                <LazyAtomInputSelect v-if="device.state.isLarge && state.jobComparable.length >= 3"
                    class="selectGroup__select" v-model="state.jobCompareId3" :items="state.jobComparable"
                    itemText="name" itemValue="identifier" @update:modelValue="setJobDetails($event, 'third')">
                </LazyAtomInputSelect>
            </div>
            <div class="userStatus__card">
                <ul class="card__list">
                    <li class="card__item">
                        <h2 class="card__header">適配度</h2>
                        <hr class="card__hr">
                        <div class="card__value card__value--bold"> {{ $rank(state.jobCompare.first.similarity) }}</div>
                    </li>
                    <li class="card__item">
                        <div>職務類型</div>
                        <hr class="card__hr">
                        <div class="card__value">
                            <div v-for="(text, index) in getJobCategoryTexts(state.jobCompare.first.occupationalCategory)"
                                :key="`first${index}`">
                                {{ text }}
                            </div>
                        </div>
                    </li>
                    <li class="card__item">
                        <div class="card__header">工作待遇</div>
                        <hr class="card__hr">
                        <div class="card__value">
                            <div>
                                {{ getSalaryText(state.jobCompare.first) }}
                            </div>
                            <div v-if="state.jobCompare.first.salaryType === 'monthly'">
                                {{ getIrregular(state.jobCompare.first) }}
                            </div>
                        </div>
                    </li>
                    <li class="card__item">
                        <div class="card__header">雇傭模式</div>
                        <hr class="card__hr">
                        <div class="card__value">
                            <div v-for="(item, index) in state.jobCompare.first.employmentType"
                                :key="`firstEmploymentType${index}`">
                                {{ $filter.optionText(item,
                                    repoSelect.state.selectByQueryRes.employmentType)
                                }}
                            </div>
                        </div>
                    </li>
                    <li class="card__item">
                        <div class="card__header">遠端型態</div>
                        <hr class="card__hr">
                        <div class="card__value">
                            {{ $filter.optionText(state.jobCompare.first.jobLocationType,
                                repoSelect.state.selectByQueryRes.jobLocationType)
                            }}
                        </div>
                    </li>
                    <li class="card__item">
                        <div class="card__header">上班地點</div>
                        <hr class="card__hr">
                        <div class="card__value">
                            {{ getJobLocation(state.jobCompare.first) }}
                        </div>
                    </li>
                    <li class="card__item">
                        <div class="card__header">員工人數</div>
                        <hr class="card__hr">
                        <div class="card__value">{{ state.jobCompare.first.numberOfEmployees }}</div>
                    </li>
                    <li class="card__item">
                        <div class="card__header">公司福利</div>
                        <hr class="card__hr">
                        <div class="card__value">
                            <template v-for="(value, key) in state.jobCompare.first.jobBenefitFlags" class="mt-1"
                                :key="key">
                                <div v-if="value">
                                    <!-- <img src="~/assets/user/job/icon_check_g.svg" /> -->
                                    {{ $filter.optionText(key, repoSelect.state.selectByQueryRes.jobBenefits) }}
                                </div>
                            </template>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="userStatus__empty">
            <div>
                <div>
                    -目前尚無資料-
                </div>
                <img class="empty__image" src="@/assets/user/img_empty.png">
            </div>
        </div>
    </div>
</template>
<script setup>
const { $filter, $rank, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const repoAuth = useRepoAuth()
const repoJobApplication = useRepoJobApplication()
const repoSelect = useRepoSelect()
const device = useDevice()
const state = reactive({
    jobSaved: [],
    jobApplied: [],
    jobNotified: [],
    jobComparable: [],
    jobCompareId1: null,
    jobCompareId2: null,
    jobCompareId3: null,
    jobCompare: {
        first: {},
        second: {},
        third: {},
    },
})
// hooks
useHead({
    title: '求職狀態 - 會員中心'
})
onMounted(() => {
    initialize()
})
watch(() => repoAuth.state.user, () => {
    initialize()
})
//methds
function getSalaryText(item) {
    const { salaryMin = 0, salaryType = "", salaryMax = 0 } = item
    const type = $filter.optionText(salaryType, repoSelect.state.selectByQueryRes.salaryType)
    const lowString = Number(salaryMin).toLocaleString()
    let salaryText = `${type}${lowString}`
    if (salaryMax) {
        const highString = Number(salaryMax).toLocaleString()
        salaryText += `~${highString}`
    }
    return salaryText
}
function getIrregular(item) {
    const { incentiveCompensation = 0 } = item
    if (incentiveCompensation) {
        const text = Number(incentiveCompensation).toLocaleString()
        return `非經常性薪資${text}`
    }
}
function getJobCategoryTexts(category = []) {
    const categoryDesc = []
    category.forEach((item) => {
        const targetSubItem = repoSelect.state.selectByQueryRes.jobCategory.find((subItem) => {
            return subItem.value === item
        })
        if (targetSubItem) {
            categoryDesc.push(targetSubItem.text)
        }
    })
    return categoryDesc
}
function getJobLocation(job) {
    const { addressRegion = "", addressLocality = "", jobLocationType = '' } = job
    if (jobLocationType === 'fullyRemote') {
        return '完全遠端'
    }
    if (!addressRegion) {
        return
    }
    let location = ""
    const targetLv1 = repoSelect.state.locationRes.taiwan.find((item) => {
        return item.value === addressRegion
    })
    if (targetLv1) {
        location += targetLv1.text
    }
    const targetLv2 = repoSelect.state.locationRes[addressRegion].find((item) => {
        return item.value === addressLocality
    })
    if (targetLv2) {
        location += targetLv2.text
    }
    return location
}
function setJobDetails(jobId, key) {
    if (!jobId) {
        state.jobCompare[key] = {}
        return
    }
    const job = state.jobComparable.find((job) => {
        return job.identifier === jobId
    })
    state.jobCompare[key] = job
}
async function initialize() {
    const { user } = repoAuth.state
    if (!user || !user.id) {
        return
    }
    const response = await repoJobApplication.getUserJobs({
        userId: user.id,
    })
    const jobs = response.data
    jobs.sort((a, b) => {
        return String(b.applyFlowTime).localeCompare(String(a.applyFlowTime))
    })
    state.jobSaved = jobs.filter((job) => ["saved", "invited"].includes(job.applyFlow) && job.savedTime)
    state.jobApplied = jobs.filter((job) => ["applied", "rejected"].includes(job.applyFlow))
    state.jobNotified = jobs.filter((job) => job.applyFlow === "notified")
    setJobComparable()
}
function setJobComparable() {
    state.jobComparable = [...state.jobSaved, ...state.jobApplied, ...state.jobNotified,]
    // 設定三個預設比較
    const firstSavedJob = state.jobComparable[0]
    if (firstSavedJob) {
        state.jobCompareId1 = firstSavedJob.identifier
        state.jobCompare.first = firstSavedJob
    }
    const secondSavedJob = state.jobComparable[1]
    if (secondSavedJob) {
        state.jobCompareId2 = secondSavedJob.identifier
        state.jobCompare.second = secondSavedJob
    }
    const thirdSavedJob = state.jobComparable[2]
    if (thirdSavedJob) {
        state.jobCompareId3 = thirdSavedJob.identifier
        state.jobCompare.third = thirdSavedJob
    }
}
</script>
<style lang="scss" scoped>
.userStatus {
    padding: 20px;

    .userStatus__header {
        color: var(--Grays-Prim, #222);

        /* Title/H1-36-Semibold */
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
        /* 100% */
    }

    .userStatus__hr {
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        margin: 30px 0px;
    }

    .userStatus__empty {
        color: #333;
        font-family: "PingFang TC";
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        text-align: center;

        /* 27px */
        .empty__image {
            margin: auto;
            display: block;
            margin-top: 30px;
        }
    }

    .userStatus__selectGroup {
        display: flex;
        // gap: 10px;
        max-width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;

        .selectGroup__select {
            width: calc(33% - 5px);
            // flex-basis: 0.3;
            // flex-grow: 0.3;
            // width: 33%;
            // display: block;
        }
    }

    .userStatus__card {
        border-radius: 10px;
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        background: var(--Grays-Quin, #FFF);
        margin-top: 30px;
        padding: 20px;

        .card__header {
            color: var(--Grays-Prim, #222);

            /* H4-16-Medium */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }

        .card__hr {
            margin: 10px 0px;
            // border-top: 0px;
            border-bottom: 1px solid var(--Grays-Quat, #EDEAEA);
        }

        .card__value {
            color: var(--Grays-Prim, #222);

            /* H4-16-Regular */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            /* 150% */
        }

        .card__value--bold {
            color: var(--Grays-Prim, #222);

            /* H1-36-Semibold */
            font-family: "PingFang TC";
            font-size: 36px;
            font-style: normal;
            font-weight: 600;
            line-height: 36px;
            /* 100% */
        }

        .card__list {
            list-style: none;
            margin: 0px;
            padding: 0px;
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
    }
}
</style>