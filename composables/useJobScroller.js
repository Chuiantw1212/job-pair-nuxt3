
// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { reactive, watch, nextTick, } from 'vue'
export default function setup(setUpConfig) {
    const { cache = false } = setUpConfig
    const { $requestSelectorAll, $sweet } = useNuxtApp()
    const route = useRoute()
    const repoAuth = useRepoAuth()
    const repoJob = useRepoJob()
    const state = reactive({
        jobList: [],
        jobRecommendList: [],
        // pagination
        pagination: {
            pageOrderBy: "datePosted",
            pageLimit: 5,
            pageOffset: 0,
        },
        // filters
        filter: getDefaultFilter({ cache }),
        searchLike: "",
        observer: null,
        count: getCachedCount({ cache }),
        debounceTimer: null,
    })
    // hooks
    watch(() => state.filter, (newValue) => {
        initializeSearch()
    }, { deep: true })
    watch(() => route.name, () => {
        state.observer.disconnect()
    })
    // methods
    function getCachedCount(payload = {}) {
        const { cache = false } = payload
        if (cache) {
            return repoJob.state.cache.count
        } else {
            return 0
        }
    }
    function getDefaultFilter(payload = {}) {
        const { cache = false } = payload
        if (cache && repoJob.state.cache.jobList.length) {
            return repoJob.state.cache.filter
        }
        const defualtFilter = {
            // 篩選企業條件
            industry: [],
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
            organizationId: null,
        }
        const { user } = repoAuth.state
        if (user && user.occupationalCategory) {
            defualtFilter.occupationalCategory = JSON.parse(JSON.stringify(user.occupationalCategory))
        }
        return defualtFilter
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
    async function initializeSearch(config = {}) {
        debounce(async () => {
            state.jobList = []
            state.pagination.pageOffset = 0
            await concatJobsFromServer(config)
        })()
    }
    async function concatJobsFromServer(config = {}) {
        const { isLoading = false, } = config
        const { user } = repoAuth.state
        // console.log(fianalConfig);
        const fianalConfig = Object.assign({}, state.pagination, state.filter, {
            searchLike: state.searchLike,
        }, config)
        // 是使用者時抓取相似度
        if (user && user.id && user.type !== 'admin') {
            fianalConfig.userId = user.id
        }
        const response = await repoJob.getJobByQuery(fianalConfig)
        if (response.status !== 200) {
            $sweet.alert('伺服器塞車了')
            return
        }
        const { count = 0, items = [] } = response.data
        // Filter recommended jobs
        const recommendJobs = filterRecommendedJobs()
        state.jobRecommendList = recommendJobs
        // 一般排序與適配讀排序時避免重複出現職缺
        const recommendJobIds = recommendJobs.map(item => item.identifier)
        let notDuplicatedJobs = []
        if (state.pagination.pageOrderBy !== 'salaryValue') {
            notDuplicatedJobs = items.filter(item => {
                return !recommendJobIds.includes(item.identifier)
            })
        }
        // set jobList
        const newJobList = [...state.jobList, ...notDuplicatedJobs]
        state.jobList = newJobList
        state.count = count
        // 避免重複出現職缺
        if (cache) {
            repoJob.state.cache.jobList = newJobList
            repoJob.state.cache.count = count
            repoJob.state.cache.filter = state.filter
            repoJob.state.cache.jobRecommendList = recommendJobs
        }
    }
    function observeLastJob(selectorString = '.jobItem') {
        if (!process.client) {
            return
        }
        if (!state.observer) {
            state.observer = new IntersectionObserver(loadJobItemBatch, {
                rootMargin: "0px",
                threshold: 0,
            })
        }
        $requestSelectorAll(selectorString, (elements) => {
            const target = elements[elements.length - 1]
            if (target) {
                state.observer.observe(target)
            }
        })
    }
    async function loadJobItemBatch(entries, observer) {
        const triggeredEntry = entries[0]
        if (triggeredEntry.isIntersecting) {
            observer.disconnect()
            state.pagination.pageOffset += state.pagination.pageLimit
            await concatJobsFromServer()
        }
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
    return {
        state,
        observeLastJob,
        initializeSearch,
        getDefaultFilter
    }
}