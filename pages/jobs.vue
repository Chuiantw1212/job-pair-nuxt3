<template>
    <div class="jobs" :class="{ container: device.state.isLarge }">
        <LazyAtomInputSearch2 v-model="jobScroller.state.searchLike" @search="handleSearch()" placeholder="搜尋技能、公司＆職缺">
        </LazyAtomInputSearch2>
        <div v-if="repoSelect.state.selectByQueryRes" class="filter__list">
            <div>
                職務類型
            </div>
            <div v-if="repoSelect.state.locationRes">
                地點
            </div>
            <div>
                遠端彈性
            </div>
            <div>
                僱傭模式
            </div>
            <div>
                資歷
            </div>
            <div>
                福利制度
            </div>
            <div>
                產業
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
            <LazyAtomBtnSimple class="last__reset mt-3 w-100" @click="resetFilter()">重置所有搜尋條件</LazyAtomBtnSimple>
        </div>
        <!-- <LazyMoleculeFilter v-model="state.isFilterOpen" @update:modelValue="state.isFilterOpen = $event"
            class="jobs__filter" :class="{ 'col col-3': device.state.isLarge }">
            <div v-if="repoSelect.state.selectByQueryRes" class="filter__list">
                <LazyAtomInputSelectContainer v-model="state.filterOpen.occupationalCategory" :placeholder="'職務類型'"
                    >
                    <LazyMoleculeFilterCategory v-if="state.filterOpen.occupationalCategory"
                        v-model="jobScroller.state.filter.occupationalCategory" :items="repoSelect.jobCategory"
                        :categoryMap="repoSelect.jobCategoryMap" :isLarge="device.state.isLarge" :showSelectAll="true">
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
                        <LazyAtomInputCheckMultiple v-if="state.filterOpen.division"
                            v-model="jobScroller.state.filter.addressRegion" :items="repoSelect.state.locationRes.taiwan"
                             :flexDirection="'row'">
                        </LazyAtomInputCheckMultiple>
                    </LazyAtomInputSelectContainer>
                    <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.addressRegion"
                        :items="repoSelect.state.locationRes.taiwan">
                    </LazyAtomInputSelectLabel>
                </template>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.jobLocationType" :placeholder="'遠端彈性'">
                    <LazyAtomInputCheckMultiple v-if="state.filterOpen.jobLocationType"
                        v-model="jobScroller.state.filter.jobLocationType"
                        :items="repoSelect.state.selectByQueryRes.jobLocationType" >
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.jobLocationType"
                    :items="repoSelect.state.selectByQueryRes.jobLocationType">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.employmentType" :placeholder="'僱傭模式'">
                    <LazyAtomInputCheckMultiple v-if="state.filterOpen.employmentType"
                        v-model="jobScroller.state.filter.employmentType"
                        :items="repoSelect.state.selectByQueryRes.employmentType" >
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.employmentType"
                    :items="repoSelect.state.selectByQueryRes.employmentType">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.responsibilities" :placeholder="'資歷'">
                    <LazyAtomInputCheckMultiple v-if="state.filterOpen.responsibilities"
                        v-model="jobScroller.state.filter.responsibilities"
                        :items="repoSelect.state.selectByQueryRes.responsibilities" >
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.responsibilities"
                    :items="repoSelect.state.selectByQueryRes.responsibilities">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.jobBenefits" :placeholder="'福利制度'">
                    <LazyAtomInputCheckMultiple v-if="state.filterOpen.jobBenefits"
                        v-model="jobScroller.state.filter.jobBenefits"
                        :items="repoSelect.state.selectByQueryRes.jobBenefits" >
                    </LazyAtomInputCheckMultiple>
                </LazyAtomInputSelectContainer>
                <LazyAtomInputSelectLabel v-model="jobScroller.state.filter.jobBenefits"
                    :items="repoSelect.state.selectByQueryRes.jobBenefits">
                </LazyAtomInputSelectLabel>
                <LazyAtomInputSelectContainer v-model="state.filterOpen.industry" :placeholder="'產業'" >
                    <LazyMoleculeFilterCategory v-if="state.filterOpen.industry" v-model="jobScroller.state.filter.industry"
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
                <LazyAtomBtnSimple class="last__reset mt-3 w-100" @click="resetFilter()">重置所有搜尋條件</LazyAtomBtnSimple>
            </div>
        </LazyMoleculeFilter>
        <div class="jobs__body" :class="{ 'col col-9': device.state.isLarge }">
            <div class="jobs__panel">
                <div class="panel__searchForm">
                    <LazyAtomInputSearch v-model="jobScroller.state.searchLike" @search="handleSearch()"
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
                            v-model="jobScroller.state.jobRecommendList[index]" :key="`recommend${index}`"
                            class="main__list__item" :recommend="true">
                        </LazyOrganismJobItem>
                    </template>
                    <LazyOrganismJobItem v-for="(job, index) in jobScroller.state.jobList"
                        v-model="jobScroller.state.jobList[index]" :key="`jobItem${index}`"
                        class="main__list__item jobListItem">
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
        </div> -->
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
const state = reactive({
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
    const items = repoSelect.state.selectByQueryRes.salaryType
    return [
        {
            text: '不限',
            value: ''
        },
        ...items
    ]
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
    background: #F9F9F9;

    .filter__list {
        display: grid;
        grid-template-columns: auto auto;
        gap: 10px;
        margin-top: 20px;
        // display: flex;
        // flex-wrap: wrap;

        // >* {
        //     width: 49%;
        // }
    }
}
</style>