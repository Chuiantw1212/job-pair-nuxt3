<template>
    <div class="jobs" :class="{ container: device.state.isLarge }">
        <LazyAtomInputSearch2 v-model="jobScroller.state.searchLike" @search="handleSearch()" placeholder="搜尋">
        </LazyAtomInputSearch2>
        <div v-if="repoSelect.state.selectByQueryRes" class="filter__list d-lg-none">
            <LazyAtomBtnToggle v-model="filterOpen['occupationalCategory']"
                :count="jobScroller.state.filter.occupationalCategory.length">
                職務類型
            </LazyAtomBtnToggle>
            <LazyAtomBtnToggle v-model="filterOpen['addressRegion']" :count="jobScroller.state.filter.addressRegion.length">
                地點
            </LazyAtomBtnToggle>
            <LazyAtomBtnToggle v-model="filterOpen['jobLocationType']"
                :count="jobScroller.state.filter.jobLocationType.length">
                遠端彈性
            </LazyAtomBtnToggle>
            <LazyAtomBtnToggle v-model="filterOpen['employmentType']"
                :count="jobScroller.state.filter.employmentType.length">
                僱傭模式
            </LazyAtomBtnToggle>
            <LazyAtomBtnToggle v-model="filterOpen['responsibilities']"
                :count="jobScroller.state.filter.responsibilities.length">
                資歷
            </LazyAtomBtnToggle>
            <LazyAtomBtnToggle v-model="filterOpen['jobBenefits']" :count="jobScroller.state.filter.jobBenefits.length">
                福利制度
            </LazyAtomBtnToggle>
            <LazyAtomBtnToggle v-model="filterOpen['industry']" :count="jobScroller.state.filter.industry.length">
                產業
            </LazyAtomBtnToggle>
            <LazyAtomBtnToggle v-model="filterOpen['salary']">
                薪資範圍
            </LazyAtomBtnToggle>
        </div>
        <div v-if="repoSelect.state.selectByQueryRes && device.state.isLarge" class="filter__list d-none d-lg-grid">
            <LazyAtomInputSelectContainer v-model="filterOpen.occupationalCategory"
                :count="jobScroller.state.filter.occupationalCategory.length" :name="'職務類型'">
                <template v-slot:body>
                    <LazyAtomInputSearch2 v-model="searchKeyword.occupationalCategory" class="filterCategory__search"
                        :placeholder="'搜尋'">
                    </LazyAtomInputSearch2>
                    <LazyMoleculeFilterCategory2 v-if="filterOpen.occupationalCategory" class="mt-2"
                        v-model="jobScroller.state.filter.occupationalCategory" :items="repoSelect.jobCategory"
                        :categoryMap="repoSelect.jobCategoryMap" :isLarge="device.state.isLarge" :showSelectAll="true">
                    </LazyMoleculeFilterCategory2>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.occupationalCategory = []">清除條件
                    </AtomBtnSimpleV2>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.occupationalCategory = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
            <LazyAtomInputSelectContainer v-model="filterOpen.division" :name="'地點'"
                :count="jobScroller.state.filter.addressRegion.length">
                <template v-slot:body>
                    <LazyAtomInputCheckMultiple2 v-if="filterOpen.division" v-model="jobScroller.state.filter.addressRegion"
                        :items="repoSelect.state.locationRes.taiwan" :listStyle="state.listStyle">
                    </LazyAtomInputCheckMultiple2>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.addressRegion = []">清除條件
                    </AtomBtnSimpleV2>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.division = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
            <LazyAtomInputSelectContainer v-model="filterOpen.jobLocationType" :name="'遠端彈性'"
                :count="jobScroller.state.filter.jobLocationType.length">
                <template v-slot:body>
                    <LazyAtomInputCheckMultiple2 v-if="filterOpen.jobLocationType"
                        v-model="jobScroller.state.filter.jobLocationType"
                        :items="repoSelect.state.selectByQueryRes.jobLocationType" :listStyle="state.listStyle">
                    </LazyAtomInputCheckMultiple2>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.jobLocationType = []">清除條件
                    </AtomBtnSimpleV2>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.jobLocationType = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
            <LazyAtomInputSelectContainer v-model="filterOpen.employmentType" :name="'僱傭模式'"
                :count="jobScroller.state.filter.employmentType.length">
                <template v-slot:body>
                    <LazyAtomInputCheckMultiple2 v-if="filterOpen.employmentType"
                        v-model="jobScroller.state.filter.employmentType"
                        :items="repoSelect.state.selectByQueryRes.employmentType" :listStyle="state.listStyle">
                    </LazyAtomInputCheckMultiple2>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.employmentType = []">清除條件
                    </AtomBtnSimpleV2>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.employmentType = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
            <LazyAtomInputSelectContainer v-model="filterOpen.responsibilities" :name="'資歷'"
                :count="jobScroller.state.filter.responsibilities.length">
                <template v-slot:body>
                    <LazyAtomInputCheckMultiple2 v-if="filterOpen.responsibilities"
                        v-model="jobScroller.state.filter.responsibilities"
                        :items="repoSelect.state.selectByQueryRes.responsibilities" :listStyle="state.listStyle">
                    </LazyAtomInputCheckMultiple2>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.responsibilities = []">清除條件
                    </AtomBtnSimpleV2>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.responsibilities = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
            <LazyAtomInputSelectContainer v-model="filterOpen.jobBenefits" :name="'福利制度'"
                :count="jobScroller.state.filter.jobBenefits.length">
                <template v-slot:body>
                    <LazyAtomInputCheckMultiple2 v-if="filterOpen.jobBenefits"
                        v-model="jobScroller.state.filter.jobBenefits"
                        :items="repoSelect.state.selectByQueryRes.jobBenefits" :listStyle="state.listStyle">
                    </LazyAtomInputCheckMultiple2>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.jobBenefits = []">清除條件
                    </AtomBtnSimpleV2>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.jobBenefits = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
            <LazyAtomInputSelectContainer v-model="filterOpen.industry" :name="'產業'"
                :count="jobScroller.state.filter.industry.length">
                <template v-slot:body>
                    <LazyMoleculeFilterCategory2 v-if="filterOpen.industry" v-model="jobScroller.state.filter.industry"
                        :items="repoSelect.industryItems" :categoryMap="repoSelect.industryCategoryMap"
                        :isLarge="device.state.isLarge" :showSelectAll="true">
                    </LazyMoleculeFilterCategory2>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.industry = []">清除條件
                    </AtomBtnSimpleV2>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.industry = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
            <LazyAtomInputSelectContainer v-model="filterOpen.salary" :name="'薪資範圍'">
                <template v-slot:body>
                    <LazyAtomInputCheckMultiple2 v-model="jobScroller.state.filter.salaryType"
                        :items="repoSelect.state.selectByQueryRes?.salaryType" :listStyle="state.listStyle">
                    </LazyAtomInputCheckMultiple2>
                    <div class="container__salary">
                        <LazyAtomInputMoney v-model="jobScroller.state.filter.salaryMin" name="薪資下限" placeholder="請輸入">
                        </LazyAtomInputMoney>
                        <LazyAtomInputMoney v-model="jobScroller.state.filter.salaryMax" name="薪資上限" placeholder="請輸入">
                        </LazyAtomInputMoney>
                    </div>
                </template>
                <template v-slot:footer>
                    <AtomBtnSimpleV2 size="sm" @click="filterOpen.salary = false">關閉</AtomBtnSimpleV2>
                </template>
            </LazyAtomInputSelectContainer>
        </div>
        <!-- 手機版本懸浮視窗 -->
        <LazyMoleculeSlideContainer name="職務類型" v-model="filterOpen.occupationalCategory"
            class="jobs__containter d-lg-none">
            <template v-slot:header>
                <LazyAtomInputSearch2 v-model="searchKeyword.occupationalCategory" class="filterCategory__search"
                    :placeholder="'搜尋'">
                </LazyAtomInputSearch2>
            </template>
            <template v-slot:body>
                <LazyMoleculeFilterCategory2 v-model="jobScroller.state.filter.occupationalCategory"
                    :items="repoSelect.jobCategory" :categoryMap="repoSelect.jobCategoryMap" :isLarge="device.state.isLarge"
                    :showSelectAll="true">
                </LazyMoleculeFilterCategory2>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.occupationalCategory = []">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.occupationalCategory = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <LazyMoleculeSlideContainer name="地點" v-model="filterOpen.addressRegion" class="jobs__containter d-lg-none">
            <template v-slot:body>
                <LazyAtomInputCheckMultiple2 v-model="jobScroller.state.filter.addressRegion"
                    :items="repoSelect.state.locationRes?.taiwan" :listStyle="state.listStyle">
                </LazyAtomInputCheckMultiple2>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.addressRegion = []">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.addressRegion = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <LazyMoleculeSlideContainer name="遠端彈性" v-model="filterOpen.jobLocationType" class="jobs__containter d-lg-none">
            <template v-slot:body>
                <LazyAtomInputCheckMultiple2 v-model="jobScroller.state.filter.jobLocationType"
                    :items="repoSelect.state.selectByQueryRes?.jobLocationType" :listStyle="state.listStyle">
                </LazyAtomInputCheckMultiple2>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.jobLocationType = []">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.jobLocationType = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <LazyMoleculeSlideContainer name="僱傭模式" v-model="filterOpen.employmentType" class="jobs__containter d-lg-none">
            <template v-slot:body>
                <LazyAtomInputCheckMultiple2 v-model="jobScroller.state.filter.employmentType"
                    :items="repoSelect.state.selectByQueryRes?.employmentType" :listStyle="state.listStyle">
                </LazyAtomInputCheckMultiple2>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.employmentType = []">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.employmentType = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <LazyMoleculeSlideContainer name="資歷" v-model="filterOpen.responsibilities" class="jobs__containter d-lg-none">
            <template v-slot:body>
                <LazyAtomInputCheckMultiple2 v-model="jobScroller.state.filter.responsibilities"
                    :items="repoSelect.state.selectByQueryRes?.responsibilities" :listStyle="state.listStyle">
                </LazyAtomInputCheckMultiple2>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.responsibilities = []">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.responsibilities = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <LazyMoleculeSlideContainer name="福利制度" v-model="filterOpen.jobBenefits" class="jobs__containter d-lg-none">
            <template v-slot:body>
                <LazyAtomInputCheckMultiple2 v-model="jobScroller.state.filter.jobBenefits"
                    :items="repoSelect.state.selectByQueryRes?.jobBenefits" :listStyle="state.listStyle">
                </LazyAtomInputCheckMultiple2>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.jobBenefits = []">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.jobBenefits = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <LazyMoleculeSlideContainer name="產業" v-model="filterOpen.industry" class="jobs__containter d-lg-none">
            <template v-slot:header>
                <LazyAtomInputSearch2 v-model="searchKeyword.industry" class="filterCategory__search" :placeholder="'搜尋'">
                </LazyAtomInputSearch2>
            </template>
            <template v-slot:body>
                <LazyMoleculeFilterCategory2 v-model="jobScroller.state.filter.industry" :items="repoSelect.industryItems"
                    :categoryMap="repoSelect.industryCategoryMap" :isLarge="device.state.isLarge" :showSelectAll="true">
                </LazyMoleculeFilterCategory2>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="jobScroller.state.filter.industry = []">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.industry = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <LazyMoleculeSlideContainer name="薪資範圍" v-model="filterOpen.salary" class="jobs__containter d-lg-none">
            <template v-slot:body>
                <LazyAtomInputCheckMultiple2 v-model="jobScroller.state.filter.salaryType"
                    :items="repoSelect.state.selectByQueryRes?.salaryType" :listStyle="state.listStyle">
                </LazyAtomInputCheckMultiple2>
                <div class="container__salary">
                    <LazyAtomInputMoney v-model="jobScroller.state.filter.salaryMin" name="薪資下限" placeholder="請輸入">
                    </LazyAtomInputMoney>
                    <LazyAtomInputMoney v-model="jobScroller.state.filter.salaryMax" name="薪資上限" placeholder="請輸入">
                    </LazyAtomInputMoney>
                </div>
            </template>
            <template v-slot:footer>
                <AtomBtnSimpleV2 size="sm" outline @click="clearSalaryFilter()">清除條件
                </AtomBtnSimpleV2>
                <AtomBtnSimpleV2 size="sm" @click="filterOpen.salary = false">關閉</AtomBtnSimpleV2>
            </template>
        </LazyMoleculeSlideContainer>
        <div class="jobs__body" :class="{ 'col col-9': device.state.isLarge }">
            <!-- <div class="jobs__panel">
                <div class="panel__searchForm">
                    <LazyAtomInputSearch v-model="jobScroller.state.searchLike" @search="handleSearch()"
                        placeholder="搜尋技能、公司＆職缺">
                    </LazyAtomInputSearch>
                </div>
            </div> -->
            <div class="body__filter">
                <!-- <div class="body__filter__dropdown d-lg-none" @click="state.isFilterOpen = true">
                    <img alt="filter" src="~/assets/jobs/icon_Filter.svg" />
                    <span class="filter__desc">篩選
                        <template v-if="getFilterValues()">({{ getFilterValues() }})</template>
                    </span>
                </div> -->
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
                <div class="filter__total">
                    <template v-if="jobScroller.state.pagination.pageOrderBy === 'similarity'">符合您篩選條件的前{{
                        jobScroller.state.count
                    }}個職缺</template>
                    <template v-else>符合您篩選條件的共{{ jobScroller.state.count }}個職缺</template>
                </div>
            </div>
            <ul class="body__list">
                <template v-if="jobScroller.state.pagination.pageOrderBy !== 'salaryValue'">
                    <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobRecommendList"
                        v-model="jobScroller.state.jobRecommendList[index]" :key="`recommend${index}`"
                        class="body__list__item" :recommend="true">
                    </LazyOrganismJobItem>
                </template>
                <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobList"
                    v-model="jobScroller.state.jobList[index]" :key="`jobItem${index}`"
                    class="body__list__item jobListItem">
                </LazyOrganismJobItem>
                <li class="body__list__item">
                    <div class="item__notFound">
                        <div>
                            Oops！目前還沒有適合您的職缺<br>
                            放心，若有適合的機會我們將會主動聯繫您
                            <br>
                            <br>
                            另外還有一對一職涯諮詢的服務
                        </div>
                        <LazyAtomBtnSimple class="notFound__consult" outline @click="gotoConsultRecords()">去看看
                        </LazyAtomBtnSimple>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const repoJob = useRepoJob()
const router = useRouter()
const jobScroller = useJobScroller({
    isCache: true,
    isRecommend: true,
})
const filterOpen = reactive({
    occupationalCategory: false,
    addressRegion: false,
    responsibilities: false,
    jobLocationType: false,
    employmentType: false,
    industry: false,
    salary: false,
})

const searchKeyword = reactive({
    occupationalCategory: null,
    industry: null,
})
const state = reactive({
    isFilterOpen: false,
    searchLike: "",
    listStyle: {
        display: 'grid',
        "grid-template-columns": "1fr 1fr",
    },
})
// hooks
useSeoMeta({
    title: `用你的需求找工作，立即探索適合職缺`,
    ogTitle: `用你的需求找工作，立即探索適合職缺`,
    titleTemplate: '%siteName - %pageTitle',
    description: '求職找工作可以很簡單！Job Pair媒合型人力銀行，勾選你理想的企業文化、工作環境、組織階段、管理模式、人際風格和工作模式，即刻為你配對最合適的職缺，開啟專屬於你的職場旅程。',
    ogDescription: `求職找工作可以很簡單！Job Pair媒合型人力銀行，勾選你理想的企業文化、工作環境、組織階段、管理模式、人際風格和工作模式，即刻為你配對最合適的職缺，開啟專屬於你的職場旅程。`,
})
definePageMeta({
    keepalive: true
})
onMounted(() => {
    if (repoJob.state.cache.isDone) {
        // Do not mess with front end cache
        return
    }
    // 造成第一個query會打兩次
    jobScroller.searchJobs({ isCache: false })
})
watch(() => repoAuth.state.user, (user) => {
    if (!process.client) {
        return
    }
    if (repoJob.state.cache.isDone) {
        jobScroller.state.jobList = repoJob.state.cache.jobList
        jobScroller.state.jobRecommendList = repoJob.state.cache.jobRecommendList
        return
    }
    // 附加occupationalCateogry
    const defualtFilter = jobScroller.getDefaultFilter({ isCache: true })
    if (user && user.occupationalCategory) {
        defualtFilter.occupationalCategory = JSON.parse(JSON.stringify(user.occupationalCategory))
    }
    jobScroller.state.filter = defualtFilter
}, { immediate: true }) // IMPORTANT: 這個immediate必須要設定
watch(() => jobScroller.state.filter, (newValue) => {
    if (!process.client) {
        return
    }
    if (repoAuth.state.user?.id) {
        jobScroller.searchJobs()
    } else {
        jobScroller.searchJobs({ isCache: false })
    }
}, { deep: true }) // IMPORTANT: 不可immediate造成cache失效
watch(() => jobScroller.state.jobList, (newValue = [], oldValue = []) => {
    if (!process.client) {
        return
    }
    if (newValue.length !== oldValue.length) {
        if (newValue.length) {
            jobScroller.observeLastJob('.jobListItem')
        }
    }
}, { immediate: true })
// methods
function clearSalaryFilter() {
    jobScroller.state.filter.salaryType = []
    jobScroller.state.filter.salaryMin = ''
    jobScroller.state.filter.salaryMax = ''
}
function toggleFilter(key = '') {
    filterOpen[key] = !filterOpen[key]
}
function handleSearch() {
    jobScroller.searchJobs()
}
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
    const items = repoSelect.state.selectByQueryRes?.salaryType
    if (items) {
        return [
            {
                text: '不限',
                value: ''
            },
            ...items
        ]
    } else {
        return []
    }
}
async function setPageOrderBy(key) {
    jobScroller.state.pagination.pageOrderBy = key
    if (key === 'similarity') {
        jobScroller.state.pagination.pageLimit = 300
    } else {
        jobScroller.state.pagination.pageLimit = 5
    }
    await jobScroller.searchJobs({
        immediate: true,
        isLoading: true,
    })
}
function resetFilter() {
    jobScroller.resetJobState()
    window.scroll({
        top: 0,
        behavior: 'auto'
    })
}
</script>
<style lang="scss" scoped>
.jobs {

    padding: 20px;
    background-color: #f9f9f9;

    .filter__list {
        display: grid;
        grid-template-columns: auto auto;
        gap: 10px;
        margin-top: 20px;
    }

    .container__salary {
        display: flex;
        gap: 20px;
        margin-top: 10px;

        >* {
            width: 50%;
        }
    }

    .jobs__body {

        .body__filter {
            margin-top: 30px;

            .body__filter__sort {
                display: flex;
                gap: 10px;

                .sort__button {
                    background-color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    text-align: left;
                    color: #484848;
                    padding: 10px;
                }

                .sort__button--active {
                    color: #5ea88e;
                }
            }

            .filter__total {
                font-size: 10px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #484848;
                margin-top: 25px;
            }

        }

        .body__list {
            margin-top: 30px;
            list-style: none;
            padding: 0px;
            margin-top: 25px;

            .body__list__item {
                .item__notFound {
                    background-color: white;
                    padding: 80px 30px;
                    border-radius: 10px;
                    background-color: #fff;
                    margin-top: 20px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: center;
                    color: #484848;

                    .notFound__consult {
                        width: 100%;
                        margin-top: 30px;
                    }
                }
            }
        }
    }
}

@media screen and (min-width:992px) {
    .jobs {
        .filter__list {
            grid-template-columns: auto auto auto auto;
        }
    }
}
</style>