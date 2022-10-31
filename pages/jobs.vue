<template>
    <div class="jobs" :class="{ container: device.state.isDesktop }">
        <Filter v-model="state.isFilterOpen" @update:modelValue="state.isFilterOpen = $event" class="jobs__filter"
            :class="{ 'col col-3': device.state.isDesktop }">
            <div v-if="selectByQueryRes" class="filter__list">
                <InputSelectContainer v-model="state.filterOpen.occupationalCategory" :placeholder="'職務類型'"
                    class="mb-2">
                    <FilterCategory v-model="state.filter.occupationalCategory" :items="repoSelect.jobCategory"
                        :categoryMap="repoSelect.jobCategoryMap" :isDesktop="device.state.isDesktop"
                        :showSelectAll="true">
                    </FilterCategory>
                </InputSelectContainer>
                <div>
                    <template v-for="(items, categoryKey) in repoSelect.jobCategoryMap" :key="categoryKey">
                        <InputSelectLabel v-model="state.filter.occupationalCategory" :items="items">
                        </InputSelectLabel>
                    </template>
                </div>
                <template v-if="locationRes">
                    <InputSelectContainer v-model="state.filterOpen.division" :placeholder="'地點'">
                        <InputCheckMultiple v-model="state.filter.addressRegion"
                            :items="repoSelect.state.locationRes.taiwan" class="m-3" :flexDirection="'row'">
                        </InputCheckMultiple>
                    </InputSelectContainer>
                    <InputSelectLabel v-model="state.filter.addressRegion" :items="repoSelect.state.locationRes.taiwan"
                        class="mt-2">
                    </InputSelectLabel>
                </template>
                <InputSelectContainer v-model="state.filterOpen.jobLocationType" :placeholder="'遠端彈性'">
                    <InputCheckMultiple v-model="state.filter.jobLocationType"
                        :items="repoSelect.state.selectByQueryRes.jobLocationType" class="m-3">
                    </InputCheckMultiple>
                </InputSelectContainer>
                <InputSelectLabel v-model="state.filter.jobLocationType"
                    :items="repoSelect.state.selectByQueryRes.jobLocationType" class="mt-2">
                </InputSelectLabel>
                <InputSelectContainer v-model="state.filterOpen.employmentType" :placeholder="'雇用性質'">
                    <InputCheckMultiple v-model="state.filter.employmentType"
                        :items="repoSelect.state.selectByQueryRes.employmentType" class="m-3">
                    </InputCheckMultiple>
                </InputSelectContainer>
                <InputSelectLabel v-model="state.filter.employmentType"
                    :items="repoSelect.state.selectByQueryRes.employmentType" class="mt-2">
                </InputSelectLabel>
                <InputSelectContainer v-model="state.filterOpen.responsibilities" :placeholder="'資歷'">
                    <InputCheckMultiple v-model="state.filter.responsibilities"
                        :items="repoSelect.state.selectByQueryRes.responsibilities" class="m-3">
                    </InputCheckMultiple>
                </InputSelectContainer>
                <InputSelectLabel v-model="state.filter.responsibilities"
                    :items="repoSelect.state.selectByQueryRes.responsibilities" class="mt-2">
                </InputSelectLabel>
                <InputSelectContainer v-model="state.filterOpen.jobBenefits" :placeholder="'福利制度'">
                    <InputCheckMultiple v-model="state.filter.jobBenefits"
                        :items="repoSelect.state.selectByQueryRes.jobBenefits" class="m-3">
                    </InputCheckMultiple>
                </InputSelectContainer>
                <InputSelectLabel v-model="state.filter.jobBenefits"
                    :items="repoSelect.state.selectByQueryRes.jobBenefits" class="mt-2">
                </InputSelectLabel>
                <InputSelectContainer v-model="state.filterOpen.industry" :placeholder="'產業'" class="mb-2">
                    <FilterCategory v-model="state.filter.industry" :items="repoSelect.industryItems"
                        :categoryMap="repoSelect.industryCategoryMap" :isDesktop="device.state.isDesktop"
                        :showSelectAll="true">
                    </FilterCategory>
                </InputSelectContainer>
                <div>
                    <template v-for="(items, categoryKey) in repoSelect.industryCategoryMap" :key="categoryKey">
                        <InputSelectLabel v-model="state.filter.industry" :items="items"> </InputSelectLabel>
                    </template>
                </div>
                <div class="section__header">薪資類型</div>
                <ul class="section__salaryType">
                    <li v-for="(item, index) in getSalaryTypeItems()" :key="index" class="filterSalary__item">
                        <label class="item__inputGroup">
                            <input type="radio" v-model="state.filter.salaryType" :value="item.value" />
                            <span class="item__text">{{ item.text }}</span>
                        </label>
                    </li>
                </ul>
                <div class="section__salaryRange">
                    <InputMoney v-model="state.filter.salaryMin" name="薪資下限" placeholder="請輸入"></InputMoney>
                    <InputMoney v-model="state.filter.salaryMax" name="薪資上限" placeholder="請輸入"></InputMoney>
                </div>
                <BtnSimple class="last__reset mt-3" @click="resetFilter()">重置所有搜尋條件</BtnSimple>
            </div>
        </Filter>
        <div class="jobs__body" :class="{ 'col col-9': device.state.isDesktop }">
            <div class="jobs__panel">
                <div class="panel__searchForm">
                    <InputSearch v-model="state.searchLike" @search="initializeSearch()" placeholder="搜尋技能、公司＆職缺">
                    </InputSearch>
                </div>
            </div>
            <div class="body__filter">
                <div class="d-none d-lg-block filter__total">
                    <template v-if="state.pagination.pageOrderBy === 'similarity'">符合您篩選條件的前{{ state.count
                    }}個職缺</template>
                    <template v-else>符合您篩選條件的共{{ state.count }}個職缺</template>
                </div>
                <div class="body__filter__dropdown d-lg-none" @click="state.isFilterOpen = true">
                    <img src="./icon/icon_Filter.svg" />
                    <span class="filter__desc">篩選
                        <template v-if="getFilterValues()">({{ getFilterValues() }})</template>
                    </span>
                </div>
                <div class="body__filter__sort">
                    <button class="sort__button sort__button--date"
                        :class="{ 'sort__button--active': state.pagination.pageOrderBy === 'datePosted' }"
                        @click="setPageOrderBy('datePosted')">
                        最新
                    </button>
                    <button class="sort__button sort__button--salary"
                        :class="{ 'sort__button--active': state.pagination.pageOrderBy === 'salaryValue' }"
                        @click="setPageOrderBy('salaryValue')">
                        薪資排序
                    </button>
                    <button class="sort__button sort__button--similarity"
                        :class="{ 'sort__button--active': state.pagination.pageOrderBy === 'similarity' }"
                        @click="setPageOrderBy('similarity')">
                        適配度排序
                    </button>
                </div>
            </div>
            <div class="jobs__main">
                <ul class="main__list">
                    <JobItem v-for="(job, index) in state.jobRecommendList" v-model="state.jobRecommendList[index]"
                        :key="index" class="main__list__item" :recommend="true"></JobItem>
                    <JobItem v-for="(job, index) in state.jobList" v-model="state.jobList[index]" :key="index"
                        :ref="`jobItem`" class="main__list__item jobItem"></JobItem>
                    <li class="main__list__item">
                        <div class="item__last">
                            <div>
                                Oops！目前還沒有適合您的職缺<br>
                                放心，若有適合的機會我們將會主動聯繫您
                                <br>
                                <br>
                                另外還有一對一職涯諮詢的服務
                            </div>
                            <BtnSimple class="last__reset" @click="gotoConsultRecords()">去看看</BtnSimple>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Bubble></Bubble>
    </div>
</template>
<script setup>
import { nextTick, ref } from 'vue'
const { $toggleLoader, $requestSelector, $alert } = useNuxtApp()
const deive = useDevice()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const repoJob = useRepoJob()
const route = useRoute()
const state = reactive({
    jobList: [],
    jobRecommendList: [],
    total: 0,
    isFilterOpen: false,
    debounceTimer: null,
    // pagination
    pagination: {
        pageOrderBy: "datePosted",
        pageLimit: 5,
        pageOffset: 0,
    },
    count: 0,
    // filters
    filter: getDefaultFilter(),
    searchLike: "",
    filterOpen: {
        division: false,
        occupationalCategory: false,
        responsibilities: false,
        jobLocationType: false,
        employmentType: false,
        industry: false,
    },
    observer: null,
    salaryTypeText: {
        yearly: "年薪",
        monthly: "月薪",
        daily: "日薪",
        hourly: "時薪",
    },
})
const jobItem = ref(null)
const jobId = computed(() => {
    const jobId = route.path.split('/').slice(-1)[0]
    return jobId
})
// hooks
watchEffect(() => {
    const noLocalJobs = !state.jobList.length
    const { user } = repoAuth.state
    if (noLocalJobs && user && user.id) {
        resetFilter()
    }
})
watch(state.filter, () => {
    initializeSearch()
})
// methods
function getFilterValues() {
    const values = Object.values(state.filter)
    const validValues = values.filter(value => {
        if (Array.isArray(value)) {
            return value.length !== 0
        } else {
            return !!value
        }
    })
    return validValues.length
}
function gotoConsultRecords() {
    router.push('/user/consult/records')
}
function getSalaryTypeItems() {
    const items = repoSelect.state.selectByQueryRes.salaryType
    return [
        {
            text: '不限',
            value: ''
        },
        ...items
    ]
}
function filterRecommendedJobs() {
    if (!repoJob.state.jobRecommendedRes) {
        return []
    }
    const recommendJobs = repoJob.state.jobRecommendedRes
    const { addressRegion = [], occupationalCategory = [], jobLocationType = [],
        responsibilities = [], employmentType = [], jobBenefits = [],
        industry = [], salaryMin = 0, salaryMax = 0, salaryType = '' } = state.filter
    let filteredResult = recommendJobs
    if (addressRegion.length) {
        filteredResult = filteredResult.filter(item => {
            return addressRegion.includes(item.addressRegion)
        })
    }
    if (occupationalCategory.length) {
        filteredResult = filteredResult.filter(item => {
            return item.occupationalCategory.some(category2Item => {
                return occupationalCategory.includes(category2Item)
            })
        })
    }
    if (jobLocationType.length) {
        filteredResult = filteredResult.filter(item => {
            return jobLocationType.includes(item.onSite)
        })
    }
    if (responsibilities.length) {
        filteredResult = filteredResult.filter(item => {
            return responsibilities.includes(item.manager)
        })
    }
    if (employmentType.length) {
        filteredResult = filteredResult.filter(item => {
            return employmentType.includes(item.employmentType)
        })
    }
    if (responsibilities.length) {
        filteredResult = filteredResult.filter(item => {
            return responsibilities.includes(item.responsibilities)
        })
    }
    if (jobBenefits.length) {
        filteredResult = filteredResult.filter(item => {
            return jobBenefits.some(benefitFlag => {
                return item.welfareFlags[benefitFlag]
            })
        })
    }
    if (industry.length) {
        filteredResult = filteredResult.filter(item => {
            return industry.includes(item.industry)
        })
    }
    if (salaryType) {
        filteredResult = filteredResult.filter(item => {
            return item.salaryType === salaryType
        })
    }
    if (salaryMax) {
        filteredResult = filteredResult.filter(item => {
            return Number(item.salaryMax) > Number(salaryMax)
        })
    }
    if (salaryMin) {
        filteredResult = filteredResult.filter(item => {
            return Number(item.salaryMin) > Number(salaryMin)
        })
    }
    const topTwo = filteredResult.slice(0, 2)
    return topTwo
}
function getDefaultFilter() {
    const defualtFilter = {
        // 篩選企業條件
        industry: null,
        jobBenefits: [],
        // 篩選職缺
        addressRegion: [],
        responsibilities: [],
        employmentType: [],
        jobLocationType: [],
        occupationalCategory: [],
        salaryType: "",
        salaryMin: null,
        salaryMax: null,
        industry: [],
    }
    // console.log({
    //     repoAuth
    // })
    // if (repoAuth && repoAuth.state.user) {
    //     defualtFilter.occupationalCategory = JSON.parse(JSON.stringify(user.occupationalCategory))
    // }
    return defualtFilter
}
async function loadJobItemBatch(entries, observer) {
    const triggeredEntry = entries[0]
    if (triggeredEntry.isIntersecting) {
        observer.disconnect()
        state.pagination.pageOffset += state.pagination.pageLimit
        await concatJobsFromServer()
    }
}
async function setPageOrderBy(key) {
    state.pagination.pageOrderBy = key
    if (key === 'similarity') {
        state.pagination.pageLimit = 300
    } else {
        state.pagination.pageLimit = 5
    }
    $toggleLoader(true)
    await initializeSearch()
    $toggleLoader(false)
}
function resetFilter() {
    state.jobList = []
    state.pagination = {
        pageOrderBy: "datePosted",
        pageLimit: 5,
        pageOffset: 0,
    }
    state.searchLike = ""
    window.scroll({
        top: 0,
        behavior: 'auto'
    })
    nextTick(() => {
        state.filter = getDefaultFilter()
    })
}
function observeLastJob(newJobs = []) {
    if (!newJobs.length) {
        return
    }
    if (!state.observer) {
        state.observer = new IntersectionObserver(loadJobItemBatch, {
            rootMargin: "0px",
            threshold: 0,
        })
    }
    $requestSelector('.jobItem', () => {
        const wrappers = jobItem
        console.log({
            jobItem
        })
        const targetComponent = wrappers[wrappers.length - 1]
        const target = targetComponent.$el
        state.observer.observe(target)
    })
}
function debounce(func, delay = 250) {
    return (...args) => {
        clearTimeout(state.debounceTimer)
        state.debounceTimer = setTimeout(() => {
            state.debounceTimer = undefined
            func.apply(this, args)
        }, delay)
    }
}
async function initializeSearch() {
    debounce(async () => {
        state.jobList = []
        state.pagination.pageOffset = 0
        await concatJobsFromServer()
    }, 400)()
}
async function concatJobsFromServer() {
    const { user } = repoAuth
    if (!user || !user.id) {
        return
    }
    const config = Object.assign({}, state.pagination, state.filter, {
        searchLike: this.searchLike,
        id: user.id
    })
    const response = await repoJob.getJobAll(config)
    if (response.status !== 200) {
        $alert('伺服器塞車了')
        return
    }
    const { count = 0, items = [] } = response.data
    state.count = count
    // 避免重複出現職缺
    const recommendJobs = filterRecommendedJobs()
    repoJob.jobRecommendList = recommendJobs
    const recommendJobKeys = recommendJobs.map(item => item.identifier)
    const notDuplicatedJobs = items.filter(item => {
        return !recommendJobKeys.includes(item.identifier)
    })
    state.jobList = [...state.jobList, ...notDuplicatedJobs]
    if (state.pagination.pageOrderBy === "similarity") {
        $toggleLoader(false)
        return
    }
    observeLastJob(notDuplicatedJobs)
}
</script>
<style lang="scss" scoped>
.jobs {
    .jobs__filter {


        .filter__list {
            padding: 15px;

            .section__salaryType {
                list-style: none;
                padding: 0;
                display: flex;
                flex-wrap: wrap;
                gap: 0 16px;

                .filterSalary__item {
                    .item__inputGroup {
                        display: flex;
                        align-items: center;
                        flex-wrap: nowrap;
                    }

                    .item__text {
                        margin-left: 10px;
                        white-space: nowrap;
                    }
                }
            }

            .section__salaryRange {
                display: flex;
                align-items: center;
                gap: 8px;
            }
        }
    }

    .jobs__panel {
        position: fixed;
        top: 58px;
        left: 0;
        background-color: #fff;
        width: 100%;
        padding: 16px;
    }

    .jobs__body {
        .body__filter {
            width: 100%;
            position: fixed;
            top: 140px;
            left: 0px;
            padding: 0 15px 15px 15px;
            display: flex;
            justify-content: space-between;
            background-color: white;
            border-bottom: 1px solid #d3d3d3;

            .filter__total {
                font-size: 20px;
                font-weight: normal;
                color: #999;
            }

            .body__filter__dropdown {
                display: flex;
                align-items: center;
                font-weight: bold;
                line-height: 1;
                text-align: left;
                color: #999;
                line-height: 1;
                cursor: pointer;

                .filter__desc {
                    margin-left: 8px;
                    white-space: nowrap;
                }
            }

            .body__filter__sort {
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;
                margin-left: 8px;

                .sort__button {
                    border: none;
                    background-color: unset;
                    color: #999;
                    font-weight: bold;
                    white-space: nowrap;

                    &:hover {
                        color: #5ea88e;
                    }
                }

                .sort__button--active {
                    color: #5ea88e;
                }
            }
        }
    }

    .jobs__main {
        padding-right: var(--bs-gutter-x, 0.75rem);
        padding-left: var(--bs-gutter-x, 0.75rem);

        .main__list {
            list-style: none;
            padding: 0;
            margin-top: 138px;
            height: calc(100vh - 246px);
            overflow-y: auto;

            .main__list__item {
                &:not(:first-child) {
                    margin-top: 8px;
                }

                .item__last {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    border-radius: 10px;
                    border: solid 1px #d3d3d3;
                    background-color: #fff;
                    padding: 30px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: normal;

                    .last__reset {
                        width: 196px;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .jobs {
        display: flex;
        flex-direction: row;
        margin-top: 42px;
        margin-bottom: 50px;
        gap: 16px;

        .jobs__filter {
            .filter__list {
                gap: 8px;
            }
        }

        .jobs__body {
            display: flex;
            flex-direction: column;

            .body__filter {
                position: unset;
                margin-top: 16px;
                display: flex;
                justify-content: space-between;
                font-size: 20px;
                font-weight: bold;
                border-bottom: none;
                background-color: inherit;

                .filter__desc {
                    color: #999;
                }
            }
        }

        .jobs__panel {
            position: inherit;
            border-radius: 10px;
            border: solid 1px #d3d3d3;
            padding: 30px 25px;
        }

        .jobs__main {
            padding: 0;

            .main__list {
                list-style: none;
                padding: 0;
                margin-top: 0px;
                height: unset;
                overflow-y: auto;

                .main__list__item {
                    &:not(:first-child) {
                        margin-top: 8px;
                    }
                }
            }
        }
    }
}
</style>