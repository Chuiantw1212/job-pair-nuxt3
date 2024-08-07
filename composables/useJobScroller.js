
// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { reactive, } from 'vue'
export default function setup(setUpConfig = {}) {
    /**
     * ignoreJobs避免職缺自己底下出現跟自己相同的推薦職缺
     */
    const { isCache = false, isRecommend = false, ignoreJobs = [] } = setUpConfig
    const { $sweet, $requestSelectorAll } = useNuxtApp()
    const route = useRoute()
    const repoAuth = useRepoAuth()
    const repoJob = useRepoJob()
    const repoJobApplication = useRepoJobApplication()
    const state = reactive({
        routeName: route.name,
        jobList: [],
        jobRecommendList: [],
        // pagination
        pagination: getPagination(),
        // filters
        filter: getDefaultFilter(),
        searchLike: "",
        observer: null,
        count: getCachedCount(),
        debounceTimer: null,
    })
    // methods
    function disconnectObserver() {
        if (state.observe) {
            state.observer.disconnect()
        }
    }
    function resetJobState() {
        state.jobList = []
        state.jobRecommendList = []
        state.pagination = getPagination({
            isReset: true
        })
        state.filter = getDefaultFilter({
            isReset: true
        })
        state.searchLike = ""
        state.count = 0
        if (state.observer) {
            state.observer.disconnect()
        }
        repoJob.resetCache()
    }
    function getPagination(config = {}) {
        const { isCache = setUpConfig.isCache, isReset = false } = config
        if (isCache) {
            return repoJob.state.cache.pagination
        } else {
            return {
                pageOrderBy: "datePosted",
                pageLimit: 5,
                pageOffset: 0,
            }
        }
    }
    function getCachedCount() {
        if (isCache) {
            return repoJob.state.cache.count
        } else {
            return 0
        }
    }
    function getDefaultFilter(config = {}) {
        const { isCache = setUpConfig.isCache, isReset = false } = config
        if (isCache && repoJob.state.cache.jobList.length && !isReset) {
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
            salaryType: [],
            salaryMin: null,
            salaryMax: null,
            organizationId: null,
        }
        return defualtFilter
    }
    function searchJobs(config = {}) {
        state.jobList = []
        state.pagination.pageOffset = 0
        concatJobsFromServer(config)
    }
    async function concatJobsFromServer(config = {}) {
        const { isLoading = false, isCache = setUpConfig.isCache } = config
        const { user } = repoAuth.state
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
        // set jobList
        let notDuplicatedJobs = items
        if (ignoreJobs.length) {
            notDuplicatedJobs = notDuplicatedJobs.filter(item => {
                return !ignoreJobs.includes(item.identifier)
            })
        }
        const appliedJobIds = Object.values(repoJobApplication.state.userJobs).filter(item => {
            return ['applied', 'notified', 'rejected'].includes(item.status)
        }).map(item => item.identifier)
        // Hide applied or rejected jobs
        if (appliedJobIds?.length) {
            notDuplicatedJobs = notDuplicatedJobs.filter(item => {
                return !appliedJobIds.includes(item.identifier)
            })
        }
        // Set recommended jobs
        if (isRecommend) {
            const recommendJobs = filterRecommendedJobs()
            state.jobRecommendList = recommendJobs
        }
        const newJobList = [...state.jobList, ...notDuplicatedJobs]
        state.jobList = newJobList
        // calculate count
        let visibleCount = count - appliedJobIds.length
        visibleCount = Math.max(visibleCount, newJobList.length)
        state.count = visibleCount
        // Cache mechanism
        if (isCache) {
            repoJob.state.cache.userId = user?.id
            repoJob.state.cache.isDone = isCache
            repoJob.state.cache.jobList = newJobList
            repoJob.state.cache.jobRecommendList = state.jobRecommendList || []
            repoJob.state.cache.count = count
            repoJob.state.cache.filter = state.filter
            repoJob.state.cache.pagination = state.pagination
        }
    }
    function observeLastJob(selectorString = '.jobItem') {
        if (!process.client) {
            return
        }
        $requestSelectorAll(selectorString, (elements) => {
            if (!state.observer) {
                state.observer = new IntersectionObserver(loadNextFrameJobs)
            }
            const target = elements[elements.length - 1]
            if (target) {
                state.observer.disconnect()
                state.observer.observe(target)
            }
        })
    }
    async function loadNextFrameJobs(entries, observer) {
        const triggeredEntry = entries[0]
        if (triggeredEntry.isIntersecting) {
            observer.disconnect()
            state.pagination.pageOffset += state.pagination.pageLimit
            await concatJobsFromServer({
                isCache: setUpConfig.isCache
            })
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
                return salaryType.includes(item.salaryType)
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
        searchJobs,
        getDefaultFilter,
        resetJobState,
        disconnectObserver
    }
}