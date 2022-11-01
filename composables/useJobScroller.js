
// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
export default function setup() {
    const repoAuth = useRepoAuth()
    const repoJob = useRepoJob()
    const route = useRoute()
    let organizationId = computed(() => {
        const id = route.path.split('/').slice(-1)[0]
        return id
    })
    const state = reactive({
        jobList: [],
        // pagination
        pagination: {
            pageOrderBy: "datePosted",
            pageLimit: 5,
            pageOffset: 0,
        },
        // filters
        filter: getDefaultFilter(),
        searchLike: "",
        observer: null,
        count: 0,
        isLoggedIn: false,
        debounceTimer: null
    })
    // hooks
    onMounted(() => {
        // 分享時搜尋職缺
        if (!state.isLoggedIn) {
            initializeSearch()
        }
    })
    watch(() => repoAuth.state.user, (newValue) => {
        // 使用者打開時，顯示有分數的畫面
        const noLocalJobs = !state.jobList.length
        if (noLocalJobs && newValue && newValue.id) {
            state.isLoggedIn = true
            initializeSearch()
        }
    }, { immediate: true })
    watch(() => state.filter, () => {
        debounce(() => {
            this.initializeSearch()
        })
    }, { deep: true })
    // methods
    function debounce(func, delay = 400) {
        return (...args) => {
            clearTimeout(this.debounceTimer)
            this.debounceTimer = setTimeout(() => {
                this.debounceTimer = undefined
                func.apply(this, args)
            }, delay)
        }
    }
    function getDefaultFilter() {
        return {
            // 篩選企業條件
            industry: null,
            jobBenefits: [],
            // 篩選職缺
            addressRegion: [],
            responsibilities: [],
            employmentType: [],
            jobLocationType: [],
            occupationalCategory: [],
            salaryMin: null,
            salaryMax: null,
            industry: [],
            organizationId: organizationId.value,
        }
    }
    async function initializeSearch(config = {}) {
        state.jobList = []
        state.pagination.pageOffset = 0
        await concatJobsFromServer(config)
    }
    async function concatJobsFromServer(config = {}) {
        const { user } = repoAuth.state
        const fianalConfig = Object.assign({}, state.pagination, state.filter, {
            searchLike: state.searchLike,
        }, config)
        // 是使用者時抓取相似度
        if (user && user.id && user.type !== 'admin') {
            fianalConfig.id = user.id
        }
        const response = await repoJob.getJobAll(fianalConfig)
        if (response.status !== 200) {
            return
        }
        const { count = 0, items = [] } = response.data
        state.count = count
        // 避免重複出現職缺
        state.jobList = [...state.jobList, ...items]
        if (state.pagination.pageOrderBy === "similarity") {
            return
        }
        nextTick(() => {
            observeLastJob(items)
        })
    }
    const jobItems = ref([])
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
        const lastItemIndex = state.jobList.length - 1
        console.log({
            jobItems
        })
        // const targetComponentWrapper = this.$refs[`jobItem${lastItemIndex}`]
        // if (!targetComponentWrapper) {
        //     return
        // }
        // const targetComponent = targetComponentWrapper[0]
        // if (targetComponent) {
        //     const target = targetComponent.$el
        //     this.observer.observe(target)
        // }
    }
    async function loadJobItemBatch(entries, observer) {
        const triggeredEntry = entries[0]
        if (triggeredEntry.isIntersecting) {
            observer.disconnect()
            state.pagination.pageOffset += state.pagination.pageLimit
            await concatJobsFromServer()
        }
    }
}