<template>
    <div class="appliedList">
        <div class="appliedList__chart">
            <div class="chart__header">
                {{ state.chartName }} 招聘數據
            </div>
            <div class="chart__body">
                <div class="chart__body__card">
                    <span class="card__badge card__badge--red">本週</span>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedThisWeek.total }}</span>
                        封 / 履歷總數
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedThisWeek.notified }}</span>
                        場 / 安排面試
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedThisWeek.rejected }}</span>
                        場 / 婉拒
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedThisWeek.conversion }}</span> % / 轉化率
                    </div>
                </div>
                <div class="chart__body__card">
                    <span class="card__badge">上週</span>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastWeek.total }}</span>
                        封 / 履歷總數
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastWeek.notified }}</span>
                        場 / 安排面試
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastWeek.rejected }}</span>
                        場 / 婉拒
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastWeek.conversion }}</span> % / 轉化率
                    </div>
                </div>
                <div class="chart__body__card">
                    <span class="card__badge">上月</span>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastMonth.total }}</span>
                        封 / 履歷總數
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastMonth.notified }}</span>
                        場 / 安排面試
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastMonth.rejected }}</span>
                        場 / 婉拒
                    </div>
                    <div class="card__info">
                        <span class="card__kpi">{{ state.appliedLastMonth.conversion }}</span> % / 轉化率
                    </div>
                </div>
            </div>
        </div>
        <div class="appliedList__form">
            <div class="form__selectGroup">
                <AtomInputSelect v-model="state.searchForm.jobIdentifier" placeholder="職缺選擇"
                    :items="getCompanyJobItems()" @change="resetApplicantId()" :itemValue="'identifier'"
                    :itemText="'name'">
                </AtomInputSelect>
                <AtomInputSelect v-model="state.applicantId" placeholder="人選選擇" :items="getApplicantList()"
                    :itemText="'name'" :itemValue="'applicantId'" @change="replaceParamsId()">
                </AtomInputSelect>
                <AtomInputSelect v-model="state.applyFlow" placeholder="履歷狀態" :items="state.statusItems">
                </AtomInputSelect>
            </div>
        </div>
        <ul v-if="getFilteredItems().length" class="appliedList__list">
            <li v-for="(item, index) in  getFilteredItems()" :key="index">
                <div class="list__item__content">
                    <div class="content__header">
                        <div>
                            {{ item.jobName }}
                        </div>
                    </div>
                    <div class="item__content__body">
                        <div class="content__profile">
                            <div class="profile__header">
                                <img v-if="item.image" class="header__image" :src="item.image"
                                    onerror="this.style.display = 'none'">
                                <div class="header__info">
                                    <div class="header__info__item header__info__item--name">
                                        {{ item.name }}
                                    </div>
                                    <div class="header__info__itemGroups">
                                        <div class="header__info__item">
                                            <img class="info__item__icon" src="~/assets/admin/icon_email.svg">
                                            {{ item.email }}
                                        </div>
                                        <div class="header__info__item">
                                            <img class="info__item__icon" src="~/assets/admin/icon_phone.svg">
                                            {{ item.telephone }}
                                        </div>
                                        <div class="header__info__item">
                                            <img class="info__item__icon" src="~/assets/admin/icon_category.svg">
                                            <span v-for="(item, index) in item.occupationalCategory" :key="index"
                                                class="header__info__item__badge">
                                                {{ $optionText(item, repoSelect.jobCategory) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-none d-lg-block header__similarity">
                                    <div class="similarity__score">
                                        {{ $rank(item.similarity) }}
                                    </div>
                                    <div class="similarity__text">
                                        適配度
                                    </div>
                                </div>
                            </div>
                            <div class="profile__similarity d-lg-none">
                                <div class="similarity__text">
                                    適配度
                                </div>
                                <div class="similarity__score">
                                    {{ $rank(item.similarity) }}
                                </div>
                            </div>
                            <hr>
                            <div class="profile__body">
                                <AtomInputCkeditor v-model="item.coverLetter" :toolbar="[]" :disabled="true">
                                </AtomInputCkeditor>
                            </div>
                            <br>
                            <div class="profile__footer">
                                <div v-if="item.applyFlow === 'notified'" class="footer__date">
                                    邀約時間：{{ getUpdatedDate(item) }}
                                </div>
                                <a v-if="item.resume && item.resume.url" class="footer__preview" :href="item.resume.url"
                                    target="_blank">
                                    <img src="~/assets/admin/icon_link.svg">
                                    查看履歷
                                </a>
                            </div>
                        </div>
                        <hr>
                        <div class="content__panel">
                            <OrganismScheduleModal v-if="item.applyFlow === 'applied'"
                                v-model="state.applications[index]" @update:modelValue="updateChart()">
                            </OrganismScheduleModal>
                            <OrganismRejectModal v-if="item.applyFlow === 'applied'" v-model="state.applications[index]"
                                @update:modelValue="updateChart()">
                                婉拒
                            </OrganismRejectModal>
                            <AtomBtnSimple v-if="item.applyFlow === 'notified'" disabled>已通知面試
                            </AtomBtnSimple>
                            <AtomBtnSimple v-if="item.applyFlow === 'rejected'" disabled>已婉拒
                            </AtomBtnSimple>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="appliedList__notFound">
            <img src="~/assets/admin/img_empty.svg">
            <p class="notFound__desc">-目前尚無資料-</p>
        </div>
    </div>
</template>
<script setup>
const { $time, $optionText, $rank, $uuid4, $sweet } = useNuxtApp()
const repoCompany = useRepoCompany()
const repoAuth = useRepoAuth()
const repoJobApplication = useRepoJobApplication()
const repoSelect = useRepoSelect()
const router = useRouter()
const route = useRoute()
const state = reactive({
    searchLike: '',
    applyFlow: '',
    searchForm: {
        jobIdentifier: '',
        occupationalCategory: [],
    },
    applicantId: '',
    filterOpen: {
        occupationalCategory: false
    },
    statusItems: [
        {
            text: '全部',
            value: null
        },
        {
            text: '尚未回覆',
            value: 'applied'
        },
        {
            text: '已通知面試',
            value: 'notified'
        },
        {
            text: '已婉拒',
            value: 'rejected'
        }
    ],
    applications: [],
    isItemOpen: [],
    // 圖表名稱
    chartName: '',
    appliedThisWeek: {
        total: 0,
        notified: 0,
        rejected: 0,
        conversion: 0,
    },
    appliedLastWeek: {
        total: 0,
        notified: 0,
        rejected: 0,
        conversion: 0,
    },
    appliedLastMonth: {
        total: 0,
        notified: 0,
        rejected: 0,
        conversion: 0,
    }
})
const props = defineProps({
    modelValue: {
        type: Array,
        default: function () {
            return []
        }
    }
})
// hooks
useHead({
    title: `應徵管理 - 招募中心 - Job Pair`
})
onMounted(() => {
    const { id } = route.params
    if (id) {
        state.applicantId = id
    }
})
watch(() => props.modelValue, (newValue) => {
    // 這邊只應該執行一次
    newValue.sort((a, b) => {
        return b.similarity - a.similarity
    })
    state.applications = newValue
    updateChart()
    state.isItemOpen = newValue.map(() => false)
})
watch(() => state.searchForm, (newValue, oldValue) => {
    debounce(async () => {
        await initializeSearch()
        await updateChart()
    })()
}, { immediate: true, deep: true })
// methods
function resetApplicantId() {
    state.applicantId = ''
}
function getApplicantList() {
    const applicantMap = {}
    state.applications.forEach(application => {
        applicantMap[application.applicantId] = application
    })
    const applicants = Object.values(applicantMap)
    return [{ name: '所有應徵者', id: '' }, ...applicants]
}
function replaceParamsId() {
    const routerLocation = router.resolve({
        name: route.name,
        params: {
            id: state.applicantId
        }
    })
    history.replaceState({}, null, routerLocation.href)
}
function getUpdatedDate(item) {
    const { applyFlow } = item
    const applyFlowTime = item[`${applyFlow}Time`]
    return $time(applyFlowTime)
}
function getCompanyJobItems() {
    const { companyJobsRes } = repoCompany.state
    if (companyJobsRes) {
        return [{ identifier: null, name: '全部職缺' }, ...companyJobsRes]
    }
}
function getFilteredItems() {
    let items = state.applications
    if (state.applicantId) {
        items = items.filter(item => {
            return item.applicantId === state.applicantId
        })
    }
    if (state.applyFlow) {
        items = items.filter(item => {
            return item.applyFlow === state.applyFlow
        })
    }
    return items
}
function updateChart() {
    const { companyJobsRes } = repoCompany.state
    if (companyJobsRes) {
        const identifier = state.searchForm.jobIdentifier
        const selectedJob = companyJobsRes.find(item => {
            return item.identifier === identifier
        })
        if (selectedJob) {
            state.chartName = selectedJob.name
        } else {
            state.chartName = ''
        }
    }
    const applications = state.applications
    const currentDate = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const currentWeek = new Date()
    currentWeek.setDate(currentDate - 7)
    const currentWeekTime = currentWeek.getTime()
    const lastWeek = new Date()
    lastWeek.setDate(currentDate - 14)
    const lastWeekTime = lastWeek.getTime()
    const lastMonthStart = new Date()
    lastMonthStart.setMonth(currentMonth - 1,)
    lastMonthStart.setDate(1)
    lastMonthStart.setHours(0, 0, 0, 0)
    const lastMonthStartTime = lastMonthStart.getTime()
    const lastMonthEnd = new Date(lastMonthStart.getFullYear(), lastMonthStart.getMonth() + 1, 0)
    const lastMonthEndTime = lastMonthEnd.getTime() + 86400 * 1000
    // 本週
    const appliedThisWeek = applications.filter(item => {
        const appliedTime = new Date(item.appliedTime).getTime()
        return appliedTime >= currentWeekTime
    })
    state.appliedThisWeek.total = appliedThisWeek.length
    const notifiedThisWeek = appliedThisWeek.filter(item => {
        return item.applyFlow === 'notified'
    })
    state.appliedThisWeek.notified = notifiedThisWeek.length
    const rejectedThisWeek = appliedThisWeek.filter(item => {
        return item.applyFlow === 'rejected'
    })
    state.appliedThisWeek.rejected = rejectedThisWeek.length
    if (appliedThisWeek.length) {
        state.appliedThisWeek.conversion = Math.floor(notifiedThisWeek.length / appliedThisWeek.length * 100)
    } else {
        state.appliedThisWeek.conversion = 0
    }
    // 上週
    const appliedLastWeek = applications.filter(item => {
        const appliedTime = new Date(item.appliedTime).getTime()
        return currentWeekTime > appliedTime && appliedTime >= lastWeekTime
    })
    state.appliedLastWeek.total = appliedLastWeek.length
    const notifiedLastWeek = appliedLastWeek.filter(item => {
        return item.applyFlow === 'notified'
    })
    state.appliedLastWeek.notified = notifiedLastWeek.length
    const rejectedLastWeek = appliedLastWeek.filter(item => {
        return item.applyFlow === 'rejected'
    })
    state.appliedLastWeek.rejected = rejectedLastWeek.length
    if (appliedLastWeek.length) {
        state.appliedLastWeek.conversion = Math.floor(notifiedLastWeek.length / appliedLastWeek.length * 100)
    } else {
        state.appliedLastWeek.conversion = 0
    }
    // 上月
    const appliedLastMonth = applications.filter(item => {
        const appliedTime = new Date(item.appliedTime).getTime()
        return lastMonthEndTime > appliedTime && appliedTime >= lastMonthStartTime
    })
    state.appliedLastMonth.total = appliedLastMonth.length
    const notifiedLastMonth = appliedLastMonth.filter(item => {
        return item.applyFlow === 'notified'
    })
    state.appliedLastMonth.notified = notifiedLastMonth.length
    const rejectedLastMonth = appliedLastMonth.filter(item => {
        return item.applyFlow === 'rejected'
    })
    state.appliedLastMonth.rejected = rejectedLastMonth.length
    if (appliedLastMonth.length) {
        state.appliedLastMonth.conversion = Math.floor(notifiedLastWeek.length / appliedLastMonth.length * 100)
    } else {
        state.appliedLastMonth.conversion = 0
    }
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
async function initializeSearch() {
    const { company } = repoAuth.state
    if (!company) {
        return
    }
    const searchForm = Object.assign({}, state.searchForm, {
        organizationId: company.id,
    })
    if (!searchForm.applyFlow) {
        searchForm.applyFlow = ['applied', 'notified', 'rejected']
    }
    const results = await repoJobApplication.getApplicationByQuery(searchForm)
    state.applications = []
    let matchedResult = results.data
    // 前端搜索
    if (String(state.searchLike).trim()) {
        const searchFields = ['email', 'jobName', 'name', 'telephone']
        matchedResult = matchedResult.filter(application => {
            const hasKeyword = searchFields.some(key => {
                return application[key].includes(state.searchLike) || application.applicantId === state.searchLike
            })
            return hasKeyword
        })
    }
    /**
     * 前端排序
     * 1. 按適配度
     * 2. 未處裡在上，已處裡在下
     */
    matchedResult.sort((a, b) => {
        return b.similarity - a.similarity
    })
    const pendingApplications = matchedResult.filter(item => {
        return item.applyFlow === 'applied'
    })
    const handledApplications = matchedResult.filter(item => {
        return item.applyFlow !== 'applied'
    })
    state.applications = [...pendingApplications, ...handledApplications]
    state.isItemOpen = state.applications.map(() => false)
    // 查無該應徵紀錄
    const recordFound = state.applications.find(item => {
        return item.applicantId === state.applicantId
    })
    let alertResult = { value: 0 }
    if (state.applications.length && state.applicantId && !recordFound) {
        alertResult = await $sweet.alert('查無該求職者紀錄')
    }
    if (alertResult.value) {
        state.applicantId = ''
        replaceParamsId()
    }
}
function toggleProfileBody(index) {
    state.isItemOpen[index] = !state.isItemOpen[index]
}
</script>
<style lang="scss">
.appliedList {

    .appliedList__form {
        background-color: white;
        padding: 20px;
        margin-top: 20px;

        .form__selectGroup {
            display: flex;
            gap: 13px;

            >* {
                width: 50%;
            }
        }
    }

    .appliedList__chart {
        border-radius: 10px;
        background-color: #fff;
        margin-top: 20px;
        padding: 20px;

        .chart__header {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            text-align: center;
        }

        .chart__body {
            display: flex;
            gap: 20px;
            flex-direction: column;
            margin-top: 20px;

            .chart__body__card {
                border-radius: 10px;
                background-color: #d7dff0;
                padding: 20px;
                width: 100%;
                position: relative;

                .card__info {
                    font-size: 16px;
                    font-weight: normal;
                    color: #333;
                }

                .card__kpi {
                    font-size: 28px;
                    font-weight: bold;
                    color: #415583;
                }

                .card__badge {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    font-size: 14px;
                    color: #415583;
                    padding: 4px 8px;
                    border: solid 1px #415583;
                }

                .card__badge--red {
                    background-color: #dd5747;
                    border: solid 1px rgba(0, 0, 0, 0);
                    color: white;
                }
            }
        }
    }

    .appliedList__list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;

        .list__item__content {
            border-radius: 10px;
            background-color: #fff;
            padding: 20px;

            .item__content__body {
                // display: flex;
                // gap: 40px;
                margin-top: 20px;
            }

            .content__header {
                font-size: 16px;
                font-weight: bold;
                color: #333;
                display: flex;
                align-items: center;
                border: none;
                background-color: inherit;

                .header__span {
                    font-size: 16px;
                    font-weight: normal;
                    color: #a9a9a9;
                }

                .header__icon {
                    display: block;
                    margin-left: 8px;
                }
            }

            .content__profile {
                border-radius: 10px;
                width: 100%;


                .profile__header {
                    display: flex;
                    position: relative;

                    .header__image {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin-right: 20px;
                    }

                    .header__info {
                        font-size: 14px;

                        .header__info__itemGroups {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                        }

                        .header__info__item {
                            .info__item__icon {
                                margin-right: 5px;
                            }


                            .header__info__item__badge {
                                padding: 5px 12px;
                                border-radius: 10px;
                                border: solid 1px #d3d3d3;
                                font-size: 13px;
                                color: #333;

                                &:not(:first-child) {
                                    margin-left: 5px;
                                }
                            }
                        }

                        .header__info__item--name {
                            font-size: 20px;
                            font-weight: bold;
                            color: #333;
                            margin-bottom: 1rem;
                        }
                    }

                    .header__similarity {
                        position: absolute;
                        right: 0;
                        top: 0;
                        text-align: center;

                        .similarity__score {
                            font-size: 36px;
                            font-weight: bold;
                            color: #333;
                        }

                        .similarity__text {
                            font-size: 16px;
                            font-weight: normal;
                            color: #333;
                        }
                    }
                }

                .profile__similarity {
                    padding: 20px 0;
                    border-radius: 5px;
                    background-color: #eef6ed;
                    margin-top: 20px;
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    align-items: center;

                    .similarity__text {
                        font-size: 16px;
                        color: #333;
                    }

                    .similarity__score {
                        font-size: 30px;
                        font-weight: bold;
                        color: #333;
                    }
                }

                .profile__body {
                    margin-top: 20px;
                }

                .profile__toggle {
                    color: #5ea88e;
                    cursor: pointer;
                }

                .profile__footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .footer__date {
                        font-size: 16px;
                        font-weight: normal;
                        color: #a9a9a9;
                    }

                    .footer__preview {
                        font-size: 16px;
                        font-weight: normal;
                        border: none;
                        background-color: #5ea88e;
                        color: white;
                        border-radius: 5px;
                        background-color: #5ea88e;
                        padding: 8px 16px;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                }
            }

            .content__panel {
                display: flex;
                gap: 10px;
                font-size: 16px;

                .panel__btn {
                    padding: 8px 12px;
                    border-radius: 5px;
                    border: solid 1px #5ea88e;
                    background-color: inherit;
                    line-height: 1;
                    white-space: nowrap;
                    color: #5ea88e;
                    font-size: 16px;
                }
            }
        }
    }

    .appliedList__notFound {
        padding: 40px 0;
        border-radius: 10px;
        background-color: #fff;
        margin-top: 20px;
        text-align: center;

        .notFound__desc {
            white-space: nowrap;
            margin-top: 30px;
        }
    }
}

@media screen and (min-width:992px) {
    .appliedList {

        .appliedList__form {

            .form__selectGroup {

                >* {
                    min-width: 264px;
                }
            }
        }

        .appliedList__chart {

            .chart__body {
                flex-direction: row;
            }
        }

        .appliedList__list {
            .list__item__content {
                padding: 40px;

                .item__content__body {
                    display: flex;
                    gap: 40px;
                }

                .content__profile {
                    max-width: calc(100% - 145px);

                    .profile__header {
                        .header__image {
                            width: 80px;
                            height: 80px;
                        }

                        .header__info {
                            .header__info__itemGroups {
                                display: grid;
                                grid-template-columns: auto auto;
                            }
                        }
                    }
                }

                .content__panel {
                    flex-direction: column;
                    min-width: 7rem;
                }
            }
        }
    }
}
</style>