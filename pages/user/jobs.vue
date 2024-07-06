<template>
    <div v-if="repoSelect.state.selectByQueryRes" class="userStatus">
        <h1 class="userStatus__header">職缺比較</h1>
        <hr class="userStatus__hr">
        <div v-if="state.jobComparable.length" class="userStatus__card mt-3">
            <table class="table table-striped text-center card__table">
                <thead>
                    <tr>
                        <th v-if="device.state.isLarge" scope="col"></th>
                        <th scope="col" class="card__table__th">
                            <LazyAtomInputSelect v-model="state.jobCompareId1" :items="state.jobComparable"
                                itemText="name" itemValue="identifier" class="card__table__select"
                                @update:modelValue="setJobDetails($event, 'first')">
                            </LazyAtomInputSelect>
                        </th>
                        <th v-if="state.jobComparable.length >= 2" scope="col" class="card__table__th">
                            <LazyAtomInputSelect v-model="state.jobCompareId2" :items="state.jobComparable"
                                itemText="name" itemValue="identifier" class="card__table__select"
                                @update:modelValue="setJobDetails($event, 'second')">
                            </LazyAtomInputSelect>
                        </th>
                        <th v-if="device.state.isLarge && state.jobComparable.length >= 3" scope="col"
                            class="card__table__th">
                            <LazyAtomInputSelect v-model="state.jobCompareId3" :items="state.jobComparable"
                                itemText="name" itemValue="identifier" class="card__table__select"
                                @update:modelValue="setJobDetails($event, 'third')">
                            </LazyAtomInputSelect>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row" class="card__table__cell">適配度</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">適配度</div>
                            <div class="cell__body cell__body--bold mt-2 mt-lg-0">
                                {{ $rank(state.jobCompare.first.similarity) }}
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">適配度</div>
                            <div class="cell__body cell__body--bold mt-2 mt-lg-0">
                                {{ $rank(state.jobCompare.second.similarity) }}
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3" class="card__table__cell">
                            <div class="cell__body cell__body--bold">
                                {{ $rank(state.jobCompare.third.similarity) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row">職務類型</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">職務類型</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                <div v-for="(text, index) in getJobCategoryTexts(state.jobCompare.first.occupationalCategory)"
                                    :key="`first${index}`">
                                    {{ text }}
                                </div>
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">職務類型</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                <div v-for="(text, index) in getJobCategoryTexts(state.jobCompare.second.occupationalCategory)"
                                    :key="`second${index}`">
                                    {{ text }}
                                </div>
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3">
                            <div class="cell__body">
                                <div v-for="(text, index) in getJobCategoryTexts(state.jobCompare.third.occupationalCategory)"
                                    :key="`third${index}`">
                                    {{ text }}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row">工作待遇</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">工作待遇</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                <div>
                                    {{ getSalaryText(state.jobCompare.first) }}
                                </div>
                                <div v-if="state.jobCompare.first.salaryType === 'monthly'">
                                    {{ getIrregular(state.jobCompare.first) }}
                                </div>
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">工作待遇</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                <div>
                                    {{ getSalaryText(state.jobCompare.second) }}
                                </div>
                                <div v-if="state.jobCompare.second.salaryType === 'monthly'">
                                    {{ getIrregular(state.jobCompare.second) }}
                                </div>
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3" class="card__table__cell">
                            <div class="cell__body">
                                <div>
                                    {{ getSalaryText(state.jobCompare.third) }}
                                </div>
                                <div v-if="state.jobCompare.third.salaryType === 'monthly'">
                                    {{ getIrregular(state.jobCompare.third) }}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row">僱傭模式</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">僱傭模式</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                <div v-for="(item, index) in state.jobCompare.first.employmentType"
                                    :key="`firstEmploymentType${index}`">
                                    {{ $filter.optionText(item,
                                        repoSelect.state.selectByQueryRes.employmentType)
                                    }}
                                </div>
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">僱傭模式</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                <div v-for="(item, index) in state.jobCompare.second.employmentType"
                                    :key="`secondEmploymentType${index}`">
                                    {{ $filter.optionText(item,
                                        repoSelect.state.selectByQueryRes.employmentType)
                                    }}
                                </div>
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3">
                            <div class="cell__body">
                                <div v-for="(item, index) in state.jobCompare.third.employmentType"
                                    :key="`thirdEmploymentType${index}`">
                                    {{ $filter.optionText(item,
                                        repoSelect.state.selectByQueryRes.employmentType)
                                    }}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row">遠端型態</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">遠端型態</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                {{ $filter.optionText(state.jobCompare.first.jobLocationType,
                                    repoSelect.state.selectByQueryRes.jobLocationType)
                                }}
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">遠端型態</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                {{ $filter.optionText(state.jobCompare.second.jobLocationType,
                                    repoSelect.state.selectByQueryRes.jobLocationType)
                                }}
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3" class="card__table__cell">
                            <div class="cell__body">
                                {{ $filter.optionText(state.jobCompare.third.jobLocationType,
                                    repoSelect.state.selectByQueryRes.jobLocationType)
                                }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row">上班地點</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">上班地點</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                {{ getJobLocation(state.jobCompare.first) }}
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">上班地點</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                {{ getJobLocation(state.jobCompare.second) }}
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3" class="card__table__cell">
                            <div class="cell__body">
                                {{ getJobLocation(state.jobCompare.third) }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row">員工人數</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">員工人數</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                {{ state.jobCompare.first.numberOfEmployees }}
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">員工人數</div>
                            <div class="cell__body mt-2 mt-lg-0">
                                {{ state.jobCompare.second.numberOfEmployees }}
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3" class="card__table__cell">
                            <div class="cell__body">
                                {{ state.jobCompare.third.numberOfEmployees }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="device.state.isLarge" scope="row">公司福利</td>
                        <td class="card__table__cell">
                            <div class="cell__header d-lg-none">公司福利</div>
                            <div class="cell__body cell__body--center mt-2 mt-lg-0">
                                <template v-for="(value, key) in state.jobCompare.first.jobBenefitFlags" class="mt-1"
                                    :key="key">
                                    <div v-if="value">
                                        <img src="~/assets/user/job/icon_check_g.svg" />
                                        {{ $filter.optionText(key, repoSelect.state.selectByQueryRes.jobBenefits) }}
                                    </div>
                                </template>
                            </div>
                        </td>
                        <td v-if="state.jobComparable.length >= 2" class="card__table__cell">
                            <div class="cell__header d-lg-none">公司福利</div>
                            <div class="cell__body cell__body--center mt-2 mt-lg-0">
                                <template v-for="(value, key) in state.jobCompare.second.jobBenefitFlags" class="mt-1"
                                    :key="key">
                                    <div v-if="value">
                                        <img src="~/assets/user/job/icon_check_g.svg" />
                                        {{ $filter.optionText(key, repoSelect.state.selectByQueryRes.jobBenefits) }}
                                    </div>
                                </template>
                            </div>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3" class="card__table__cell">
                            <div class="cell__body mt-2 mt-lg-0">
                                <template v-for="(value, key) in state.jobCompare.third.jobBenefitFlags" class="mt-1"
                                    :key="key">
                                    <div v-if="value">
                                        <img src="~/assets/user/job/icon_check_g.svg" />
                                        {{ $filter.optionText(key, repoSelect.state.selectByQueryRes.jobBenefits) }}
                                    </div>
                                </template>
                            </div>
                        </td>
                    </tr>
                    <tr class="testRow">
                        <th v-if="device.state.isLarge"></th>
                        <td>
                            <NuxtLink v-if="state.jobCompare.first.identifier" class="table__btn"
                                :to="`/job/${state.jobCompare.first.identifier}`">
                                前往該職缺
                            </NuxtLink>
                        </td>
                        <td v-if="state.jobComparable.length >= 2">
                            <NuxtLink v-if="state.jobCompare.second.identifier" class="table__btn"
                                :to="`/job/${state.jobCompare.second.identifier}`">
                                前往該職缺
                            </NuxtLink>
                        </td>
                        <td v-if="device.state.isLarge && state.jobComparable.length >= 3">
                            <NuxtLink v-if="state.jobCompare.third.identifier" class="table__btn"
                                :to="`/job/${state.jobCompare.third.identifier}`">
                                前往該職缺
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="userStatus__empty">
            <div>
                -目前尚無資料-
            </div>
            <img class="empty__image" src="@/assets/user/img_empty.png">
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

    .userStatus__card {
        width: 100%;

        .card__header {
            font-size: 22px;
            font-weight: bold;

            .card__header__icon {
                width: 24px;
                height: 24px;
            }

            .card__header__desc {
                margin-left: 10px;
                font-size: 18px;
                white-space: nowrap;
            }
        }

        .card__list__item {
            &:not(:first-child) {
                margin-top: 10px;
            }
        }

        .card__table {
            margin-bottom: 0;
            vertical-align: middle;

            .card__table__th {
                max-width: 0;
            }

            .card__table__select {
                max-width: 100%;
            }

            .card__table__cell {
                line-height: 1.3;

                .cell__header {
                    font-size: 14px;
                    color: #484848;
                }

                .cell__body {
                    font-size: 18px;
                    font-weight: normal;
                    color: #333;
                }

                .cell__body--left {
                    text-align: left !important;
                }

                .cell__body--bold {
                    font-size: 28px;
                    font-weight: bold;
                    color: #4bc49a;
                }
            }
        }
    }

    .userStatus__kanban {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;

        .kanban__card__list {
            list-style: none;
            padding: 0;
            width: 100%;
        }
    }

    .table__btn {
        border-radius: 10px;
        border: solid 1px #5ea88e;
        color: #5ea88e;
        background-color: white;
        padding: 12px 32px;
        font-size: 18px;
        margin: 20px auto;
        transition: all 0.3s;
        text-decoration: none;
        display: block;
        max-width: 155px;
        white-space: nowrap;

        &:hover {
            background-color: #5ea88e;
            color: white;
        }
    }

    .testRow {
        --bs-table-accent-bg: none;
    }
}

@media screen and (min-width:992px) {
    .userStatus {
        .userStatus__card {
            width: 100%;

            .card__header {
                font-size: 22px;
                font-weight: bold;
                display: flex;
                align-items: center;

                .card__header__icon {
                    width: 32px;
                    height: 32px;
                }

                .card__header__desc {
                    margin-left: 10px;
                    white-space: nowrap;
                }
            }

            .card__list__item {
                &:not(:first-child) {
                    margin-top: 10px;
                }
            }

            .card__table {
                .card__table__cell {
                    padding: 29px 0;
                    min-width: 5em;
                }
            }
        }

        .userStatus__kanban {
            display: flex;
            flex-direction: row;
            gap: 20px;
            height: 788px;
            width: 100%;

            .userStatus__card {
                height: 100%;
                width: 33%;
            }
        }

        .table__btn {
            border-radius: 10px;
            border: solid 1px #5ea88e;
            color: #5ea88e;
            background-color: white;
            padding: 14px 50px;
            font-size: 22px;
            margin: 40px auto;
            transition: all 0.3s;
            text-decoration: none;
            display: block;
            max-width: 210px;
            white-space: nowrap;

            &:hover {
                background-color: #5ea88e;
                color: white;
            }
        }

        .testRow {
            --bs-table-accent-bg: none;
        }
    }
}
</style>