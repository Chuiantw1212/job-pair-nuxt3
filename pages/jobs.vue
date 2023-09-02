<template>
    <div class="jobs" :class="{ container: device.state.isLarge }">
        <LazyMoleculeFilter v-model="state.isFilterOpen" @update:modelValue="state.isFilterOpen = $event"
            class="jobs__filter" :class="{ 'col col-3': device.state.isLarge }">
            <div v-if="repoSelect.state.selectByQueryRes" class="filter__list">
                <LazyAtomInputSelectContainer v-model="state.filterOpen.occupationalCategory" :placeholder="'職務類型'"
                    class="mb-2">
                    <LazyMoleculeFilterCategory v-model="jobScroller.state.filter.occupationalCategory"
                        :items="repoSelect.jobCategory" :categoryMap="repoSelect.jobCategoryMap"
                        :isLarge="device.state.isLarge" :showSelectAll="true">
                    </LazyMoleculeFilterCategory>
                </LazyAtomInputSelectContainer>
                <div>
                    <template v-for="(items, categoryKey) in repoSelect.jobCategoryMap" :key="categoryKey">
                        <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.occupationalCategory" :items="items">
                        </LazyAtomInputSelectLabel>
                    </template>
                </div>
                <template v-if="repoSelect.state.locationRes">
                    <LazyAtomInputSelectContainer v-model="state.filterOpen.division" :placeholder="'地點'">
                        <LazyAtomInputCheckMultiple v-model="jobScroller.state.filter.addressRegion"
                            :items="repoSelect.state.locationRes.taiwan" class="m-3" :flexDirection="'row'">
                        </LazyAtomInputCheckMultiple>
                    </LazyAtomInputSelectContainer>
                    <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.addressRegion"
                        :items="repoSelect.state.locationRes.taiwan" class="mt-2">
                    </LazyAtomInputSelectLabel>
                </template>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.jobLocationType" :placeholder="'遠端彈性'">
                    <LazyAtomInputCheckMultiple v-model="jobScroller.state.filter.jobLocationType"
                        :items="repoSelect.state.selectByQueryRes.jobLocationType" class="m-3">
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.jobLocationType"
                    :items="repoSelect.state.selectByQueryRes.jobLocationType" class="mt-2">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.employmentType" :placeholder="'雇用性質'">
                    <LazyAtomInputCheckMultiple v-model="jobScroller.state.filter.employmentType"
                        :items="repoSelect.state.selectByQueryRes.employmentType" class="m-3">
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.employmentType"
                    :items="repoSelect.state.selectByQueryRes.employmentType" class="mt-2">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.responsibilities" :placeholder="'資歷'">
                    <LazyAtomInputCheckMultiple v-model="jobScroller.state.filter.responsibilities"
                        :items="repoSelect.state.selectByQueryRes.responsibilities" class="m-3">
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.responsibilities"
                    :items="repoSelect.state.selectByQueryRes.responsibilities" class="mt-2">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.jobBenefits" :placeholder="'福利制度'">
                    <LazyAtomInputCheckMultiple v-model="jobScroller.state.filter.jobBenefits"
                        :items="repoSelect.state.selectByQueryRes.jobBenefits" class="m-3">
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.jobBenefits"
                    :items="repoSelect.state.selectByQueryRes.jobBenefits" class="mt-2">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.industry" :placeholder="'產業'" class="mb-2">
                    <LazyMoleculeFilterCategory v-model="jobScroller.state.filter.industry"
                        :items="repoSelect.industryItems" :categoryMap="repoSelect.industryCategoryMap"
                        :isLarge="device.state.isLarge" :showSelectAll="true">
                    </LazyMoleculeFilterCategory>
                </LazyAtomInputSelectContainer>
                <div>
                    <template v-for="(items, categoryKey) in repoSelect.industryCategoryMap" :key="categoryKey">
                        <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.industry" :items="items">
                        </LazyAtomInputSelectLabel>
                    </template>
                </div>
                <div class="section__header">薪資類型</div>
                <ul class="section__salaryType">
                    <li v-for="(item, index) in getSalaryTypeItems()" :key="index" class="filterSalary__item">
                        <label class="item__inputGroup">
                            <input type="radio" v-model="jobScroller.state.filter.salaryType" :value="item.value" />
                            <span class="item__text">{{ item.text }}</span>
                        </label>
                    </li>
                </ul>
                <div class="section__salaryRange">
                    <LazyAtomInputMoney v-model="jobScroller.state.filter.salaryMin" name="薪資下限" placeholder="請輸入">
                    </LazyAtomInputMoney>
                    <LazyAtomInputMoney v-model="jobScroller.state.filter.salaryMax" name="薪資上限" placeholder="請輸入">
                    </LazyAtomInputMoney>
                </div>
                <LazyAtomBtnSimple class="last__reset mt-3" @click="resetFilter()">重置所有搜尋條件</LazyAtomBtnSimple>
            </div>
        </LazyMoleculeFilter>
        <div class="jobs__body" :class="{ 'col col-9': device.state.isLarge }">
            <div class="jobs__panel">
                <div class="panel__searchForm">
                    <LazyAtomInputSearch v-model="state.searchLike" @search="jobScroller.initializeSearch()"
                        placeholder="搜尋技能、公司＆職缺">
                    </LazyAtomInputSearch>
                </div>
            </div>
            <div class="body__filter">
                <div class="d-none d-lg-block filter__total">
                    <template v-if="jobScroller.state.pagination.pageOrderBy === 'similarity'">符合您篩選條件的前{{
                        jobScroller.state.count
                    }}個職缺</template>
                    <template v-else>符合您篩選條件的共{{ jobScroller.state.count }}個職缺</template>
                </div>
                <div class="body__filter__dropdown d-lg-none" @click="state.isFilterOpen = true">
                    <img alt="filter" src="~/assets/jobs/icon_Filter.svg" />
                    <span class="filter__desc">篩選
                        <template v-if="getFilterValues()">({{ getFilterValues() }})</template>
                    </span>
                </div>
                <div class="body__filter__sort">
                    <button class="sort__button sort__button--date"
                        :class="{ 'sort__button--active': jobScroller.state.pagination.pageOrderBy === 'datePosted' }"
                        @click="setPageOrderBy('datePosted')">
                        最新
                    </button>
                    <button class="sort__button sort__button--salary"
                        :class="{ 'sort__button--active': jobScroller.state.pagination.pageOrderBy === 'salaryValue' }"
                        @click="setPageOrderBy('salaryValue')">
                        薪資排序
                    </button>
                    <button class="sort__button sort__button--similarity"
                        :class="{ 'sort__button--active': jobScroller.state.pagination.pageOrderBy === 'similarity' }"
                        @click="setPageOrderBy('similarity')">
                        適配度排序
                    </button>
                </div>
            </div>
            <div class="jobs__main">
                <ul class="main__list">
                    <template v-if="jobScroller.state.pagination.pageOrderBy !== 'salaryValue'">
                        <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobRecommendList"
                            v-model="jobScroller.state.jobRecommendList[index]" :key="index" class="main__list__item"
                            :recommend="true">
                        </LazyOrganismJobItem>
                    </template>
                    <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobList"
                        v-model="jobScroller.state.jobList[index]" :key="index" :ref="`jobItems`"
                        class="main__list__item jobItem">
                    </LazyOrganismJobItem>
                    <li class="main__list__item">
                        <div class="item__last">
                            <div>
                                Oops！目前還沒有適合您的職缺<br>
                                放心，若有適合的機會我們將會主動聯繫您
                                <br>
                                <br>
                                另外還有一對一職涯諮詢的服務
                            </div>
                            <LazyAtomBtnSimple class="last__reset" @click="gotoConsultRecords()">去看看</LazyAtomBtnSimple>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <LazyOrganismMonica></LazyOrganismMonica>
    </div>
</template>
<script setup>
const device = useDevice()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const repoJob = useRepoJob()
const router = useRouter()
const jobScroller = useJobScroller({
    cache: true,
    recommend: true,
})
const state = reactive({
    total: 0,
    isFilterOpen: false,
    searchLike: "",
    filterOpen: {
        division: false,
        occupationalCategory: false,
        responsibilities: false,
        jobLocationType: false,
        employmentType: false,
        industry: false,
    },
})
// hooks
definePageMeta({
    keepalive: true
})
useHead({
    title: '職缺探索'
})
watch(() => repoAuth.state.user, (user) => {
    if (!process.client) {
        return
    }
    if (repoJob.state.cache.jobList.length) {
        jobScroller.state.jobList = repoJob.state.cache.jobList
        jobScroller.state.jobRecommendList = repoJob.state.cache.jobRecommendList
        return
    }
    // set filter
    if (user?.id) {
        jobScroller.state.filter = jobScroller.getDefaultFilter()
    }
    // get jobs
    const firstJob = jobScroller.state.jobList[0]
    if (!firstJob?.similarity) {
        jobScroller.initializeSearch()
    }
}, { immediate: true })
watch(() => jobScroller.state.jobList, (newValue = [], oldValue = []) => {
    if (newValue.length !== oldValue.length) {
        jobScroller.observeLastJob()
    }
})
// methods
function getFilterValues() {
    const values = Object.values(jobScroller.state.filter)
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
    if (state.searchLike) {
        filteredResult = filteredResult.filter(item => {
            const searchableFields = ['description', 'skills', 'name', 'organizationName']
            return searchableFields.some(field => {
                return String(item[field]).includes(state.searchLike)
            })
        })
    }
    const topTwo = filteredResult.slice(0, 2)
    return topTwo
}
async function setPageOrderBy(key) {
    jobScroller.state.pagination.pageOrderBy = key
    if (key === 'similarity') {
        jobScroller.state.pagination.pageLimit = 300
    } else {
        jobScroller.state.pagination.pageLimit = 5
    }
    await jobScroller.initializeSearch({
        immediate: true,
        isLoading: true,
    })
}
function resetFilter() {
    jobScroller.state.jobList = []
    jobScroller.state.pagination = {
        pageOrderBy: "datePosted",
        pageLimit: 5,
        pageOffset: 0,
    }
    state.searchLike = ""
    window.scroll({
        top: 0,
        behavior: 'auto'
    })
    jobScroller.state.filter = jobScroller.getDefaultFilter()
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
            height: calc(100vh - 200px);
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
        gap: 16px;
        padding-top: 20px;

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