<template>
    <div v-if="repoSelect.state.selectByQueryRes" class="userStatus">
        <h1 class="userStatus__header">職缺比較</h1>
        <hr class="userStatus__hr">
        <div v-if="state.jobComparable.length">
            <div class="userStatus__selectGroup">
                <LazyAtomInputSelect v-model="state.jobCompareId1" class="selectGroup__select"
                    :style="{ 'width': getWidth() }" :items="state.jobComparable" itemText="name" itemValue="identifier"
                    @update:modelValue="setJobDetails($event, 'first')">
                </LazyAtomInputSelect>
                <LazyAtomInputSelect v-if="state.jobComparable.length >= 2" v-model="state.jobCompareId2"
                    class="selectGroup__select" :style="{ 'width': getWidth() }" :items="state.jobComparable"
                    itemText="name" itemValue="identifier" @update:modelValue="setJobDetails($event, 'second')">
                </LazyAtomInputSelect>
                <LazyAtomInputSelect v-if="device.state.isLarge && state.jobComparable.length >= 3"
                    v-model="state.jobCompareId3" class="selectGroup__select" :style="{ 'width': getWidth() }"
                    :items="state.jobComparable" itemText="name" itemValue="identifier"
                    @update:modelValue="setJobDetails($event, 'third')">
                </LazyAtomInputSelect>
            </div>
            <div class="userStatus__card">
                <template v-for="(job, key) in state.jobCompare" :key="key">
                    <ul v-if="key !== 'third' || device.state.isLarge" class="card__list">
                        <li class="card__item">
                            <h2 class="card__header">適配度</h2>
                            <hr class="card__hr">
                            <div class="card__value card__value--bold"> {{ $rank(job.similarity) }}</div>
                        </li>
                        <li class="card__item">
                            <div>職務類型</div>
                            <hr class="card__hr">
                            <div class="card__value">
                                <div v-for="(text, index) in getJobCategoryTexts(job.occupationalCategory)"
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
                                    {{ getSalaryText(job) }}
                                </div>
                                <div v-if="job.salaryType === 'monthly'">
                                    {{ getIrregular(job) }}
                                </div>
                            </div>
                        </li>
                        <li class="card__item">
                            <div class="card__header">雇傭模式</div>
                            <hr class="card__hr">
                            <div class="card__value">
                                <div v-for="(item, index) in job.employmentType" :key="`firstEmploymentType${index}`">
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
                                {{ $filter.optionText(job.jobLocationType,
                                    repoSelect.state.selectByQueryRes.jobLocationType)
                                }}
                            </div>
                        </li>
                        <li class="card__item">
                            <div class="card__header">上班地點</div>
                            <hr class="card__hr">
                            <div class="card__value">
                                {{ getJobLocation(job) }}
                            </div>
                        </li>
                        <li class="card__item">
                            <div class="card__header">員工人數</div>
                            <hr class="card__hr">
                            <div class="card__value">{{ job.numberOfEmployees }}</div>
                        </li>
                        <li class="card__item">
                            <div class="card__header">公司福利</div>
                            <hr class="card__hr">
                            <div class="card__value">
                                <template v-for="(value, key) in job.jobBenefitFlags" class="mt-1" :key="key">
                                    <div v-if="value">
                                        {{ $filter.optionText(key, repoSelect.state.selectByQueryRes.jobBenefits) }}
                                    </div>
                                </template>
                            </div>
                        </li>
                        <li>
                            <a class="card__link" :href="`/job/${job.identifier}`" target="_blank">前往該職缺</a>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
        <div v-else class="userStatus__empty">
            <div>
                <div>
                    -目前尚無資料-
                </div>
                <img class="empty__image" src="~/assets/user/img_empty.png">
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
function getWidth() {
    const keys = Object.keys(state.jobCompare)
    let deno = 2
    if (device.state.isLarge) {
        deno = 3
    }
    const count = Math.min(keys.length, deno)
    const width = 100 / count
    return `${width}%`
}
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
    state.jobCompare = {}
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
        border-top: 0px;
        opacity: 1;
        border-bottom: 1px solid var(--Grays-Quat, #EDEAEA);
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
        gap: 5px;
        max-width: 100%;
    }

    .userStatus__card {
        border-radius: 10px;
        // border: 1px solid var(--Grays-Quat, #EDEAEA);
        background: var(--Grays-Quin, #FFF);
        margin-top: 30px;
        padding: 20px;
        display: flex;
        gap: 10px;

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
            border-top: 0px;
            border-bottom: 1px solid #e4e4e4;
            opacity: 1;
            margin: 10px 0px;
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
            width: 100%;

            .card__item {
                min-height: 5rem;
            }
        }

        .card__link {
            display: flex;
            height: 42px;
            padding: 10px 30px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex: 1 0 0;
            border-radius: 10px;
            border: 1px solid var(--JP-Prim, #5EA88E);
            padding: 10px auto;
            width: 100%;
            color: var(--JP-Prim, #5EA88E);
            text-decoration: none;

            &:hover {
                background-color: #5EA88E;
                color: white;
            }
        }
    }
}

@media screen and (min-width:996px) {
    .userStatus {
        padding: 0px;
        padding-left: 30px;
        padding-bottom: 70px;
    }
}
</style>