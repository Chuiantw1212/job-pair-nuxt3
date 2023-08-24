
// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { reactive, watch, nextTick, } from 'vue'
export default function setup() {
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
        filter: {
            // 篩選企業條件
            industry: [],
            jobBenefits: [],
            // 篩選職缺
            addressRegion: [],
            responsibilities: [],
            employmentType: [],
            jobLocationType: [],
            occupationalCategory: [],
            salaryMin: null,
            salaryMax: null,
            organizationId: null,
        },
        searchLike: "",
        observer: null,
        count: 0,
        debounceTimer: null,
        isModalShown: false
    })
    // hooks
    watch(() => state.filter, () => {
        initializeSearch()
    }, { deep: true })
    watch(() => route.name, () => {
        state.observer.disconnect()
    })
    // methods
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
            return
        }
        const { count = 0, items = [] } = response.data
        state.count = count
        // 避免重複出現職缺
        state.jobList = [...state.jobList, ...items]
    }
    function observeLastJob(jobItemRefs) {
        if (!process.client) {
            return
        }
        if (!state.observer && process.client) {
            state.observer = new IntersectionObserver(loadJobItemBatch, {
                rootMargin: "0px",
                threshold: 0,
            })
        }
        nextTick(() => {
            const wrappers = jobItemRefs.value
            const targetComponent = wrappers[wrappers.length - 1]
            if (targetComponent) {
                const target = targetComponent.$el
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
        initializeSearch
    }
}