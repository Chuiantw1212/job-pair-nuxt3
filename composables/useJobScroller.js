
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
        count: 0,
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
        const jobList = [...state.jobList, ...items]
        state.jobList = jobList
        state.count = count
        // 避免重複出現職缺
        if (cache) {
            repoJob.state.cache.jobList = jobList
            repoJob.state.cache.count = count
            repoJob.state.cache.filter = state.filter
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
    return {
        state,
        observeLastJob,
        initializeSearch,
        getDefaultFilter
    }
}