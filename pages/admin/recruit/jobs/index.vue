<template>
    <div class="container jobManagement">
        <!-- 職缺管理 -->
        <div class="jobManagement__addItem">
            <LazyAtomBtnSimple class="addItem__button" @click="addJobDraft()">新增職缺</LazyAtomBtnSimple>
            <label class="addItem__searchGroup">
                <i class="fas fa-search searchGroup__icon"></i>
                <input v-model="state.searchLike" class="searchGroup__input" placeholder="輸入職缺名稱" />
            </label>
            <LazyOrganismFilterModal v-model="state.filter" @reset="resetFilter()"></LazyOrganismFilterModal>
        </div>
        <div class="jobManagement__fields">
            <span>欄位顯示</span>
            <LazyAtomInputCheckMultiple v-model="state.jobFields" :items="state.fieldItems" :flexDirection="'row'"
                @update:modelValue="saveFieldsPreference()">
            </LazyAtomInputCheckMultiple>
        </div>
        <div class="fixTableHead">
            <table class="table jobManagement__table">
                <thead class="jobManagement__table__head">
                    <tr>
                        <th class="jobManagement__table__sticky">
                            職缺狀態
                        </th>
                        <th class="text-center">
                            <div>
                                職缺名稱
                            </div>
                            <div>
                                (點擊可編輯)
                            </div>
                        </th>
                        <th>複製</th>
                        <th>預覽</th>
                        <th v-if="state.jobFields.includes('occupationalCategory')">職務類型</th>
                        <th v-if="state.jobFields.includes('responsibilities')">資歷</th>
                        <th v-if="state.jobFields.includes('employmentType')">雇用性質</th>
                        <th v-if="state.jobFields.includes('salaryType')">薪資類型</th>
                        <th v-if="state.jobFields.includes('salaryMin')">經常性起薪</th>
                        <th v-if="state.jobFields.includes('jobLocationType')">遠端工作彈性</th>
                        <th v-if="state.jobFields.includes('addressRegion')">工作地點</th>
                    </tr>
                </thead>
                <tbody class="table__body" :key="state.renderKey">
                    <tr v-for="(job, index) in state.jobList" :key="index" class="table__row">
                        <td class="jobManagement__table__sticky">
                            <LazyAtomInputSwitch v-model="job.status"
                                @update:modelValue="checkJobStatus($event, job, index)">
                            </LazyAtomInputSwitch>
                        </td>
                        <td>
                            <NuxtLink class="table__jobName" :to="`jobs/${job.identifier}`">
                                {{ getJobName(job) }}
                            </NuxtLink>
                        </td>
                        <td>
                            <button class="table__btn" @click="copyJob(job)">
                                <img src="~/assets/admin/icon_copy.svg">
                            </button>
                        </td>
                        <td>
                            <a :href="getJobPreviewHref(job)" target="_blank">
                                <img src="~/assets/admin/icon_preview_g.svg">
                            </a>
                        </td>
                        <td v-if="state.jobFields.includes('occupationalCategory')">
                            <div v-for="(category, index) in job.occupationalCategory" :key="index"
                                class="table__row__lable">
                                {{ $optionText(category, repoSelect.state.selectByQueryRes?.jobCategory) }}
                            </div>
                        </td>
                        <td v-if="state.jobFields.includes('responsibilities')">
                            {{
                                $optionText(job.responsibilities,
                                    repoSelect.state.selectByQueryRes?.responsibilities)
                            }}
                        </td>
                        <td v-if="state.jobFields.includes('employmentType')">
                            <div v-for="(item, index) in job.employmentType" :key="`employmentType${index}`">
                                {{
                                    $optionText(item,
                                        repoSelect.state.selectByQueryRes?.employmentType)
                                }}
                            </div>
                        </td>
                        <td v-if="state.jobFields.includes('salaryType')">
                            {{
                                $optionText(job.salaryType,
                                    repoSelect.state.selectByQueryRes?.salaryType)
                            }}
                        </td>
                        <td v-if="state.jobFields.includes('salaryMin')">
                            <template v-if="job.salaryMin">
                                {{ Number(job.salaryMin).toLocaleString() }}
                            </template>
                        </td>
                        <td v-if="state.jobFields.includes('jobLocationType')">
                            {{
                                $optionText(job.jobLocationType,
                                    repoSelect.state.selectByQueryRes?.jobLocationType)
                            }}
                        </td>
                        <td v-if="state.jobFields.includes('addressRegion')">
                            <template v-if="job.jobLocationType === 'fullyRemote'">
                                完全遠端
                            </template>
                            <template v-else>
                                {{ $optionText(job.addressRegion, repoSelect.state.locationRes?.taiwan) }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
function getDefaultFilter() {
    const defualtFilter = {
        status: [],
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
    }
    return defualtFilter
}
const state = reactive({
    filter: getDefaultFilter(),
    jobList: [],
    searchLike: "",
    fieldItems: [
        {
            text: '職務類型',
            value: 'occupationalCategory'
        },
        {
            text: '資歷',
            value: 'responsibilities'
        },
        {
            text: '雇用性質',
            value: 'employmentType'
        },
        {
            text: '薪資類型',
            value: 'salaryType'
        },
        {
            text: '經常性起薪',
            value: 'salaryMin'
        },
        {
            text: '遠端工作彈性',
            value: 'jobLocationType'
        },
        {
            text: '工作地點',
            value: 'addressRegion'
        },
    ],
    jobFields: ['occupationalCategory', 'responsibilities', 'employmentType', 'salaryType', 'salaryMin', 'jobLocationType', 'addressRegion'],
    renderKey: Math.random(),
    debounceTimer: null,
    selectedJobs: [],
    batchOption: ''
})
const { $sweet, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const repoAuth = useRepoAuth()
const repoJob = useRepoJob()
const repoAdmin = useRepoAdmin()
const repoCompany = useRepoCompany()
const repoSelect = useRepoSelect()
const router = useRouter()
// hooks
useHead({
    title: '職缺管理 - 招募中心'
})
onMounted(() => {
    initialize()
})
watch(() => repoAuth.state.company, () => {
    initialize()
})
watch(() => state.searchLike, () => {
    debounce(() => {
        initialize({
            searchLike: state.searchLike
        })
    })
})
watch(() => state.filter, () => {
    debounce(() => {
        initialize({
            searchLike: state.searchLike
        })
    })
}, { deep: true })
// methods
function getJobName(job) {
    const { name = '' } = job
    if (name && String(name).trim()) {
        return name
    } else {
        return '職缺草稿'
    }
}
function getJobPreviewHref(job) {
    if (process.client) {
        const { origin } = window.location
        const url = `${origin}/job/${job.identifier}`
        return url
    }
}
async function checkJobStatus(newStatus, job, index) {
    if (newStatus === 'active') {
        if (job.completeness !== 100) {
            state.jobList[index].status = 'closed'
            state.renderKey = Math.random()
            await $sweet.info('職缺資料未完成，確認後繼續完成職缺')
            router.push(`jobs/${job.identifier}`)
            return
        }
    }
    const response = await repoJob.putJobItem(job)
    if (response.status !== 200) {
        return
    }
}
function resetFilter() {
    state.filter = getDefaultFilter()
}
async function copyJob(item) {
    const job = JSON.parse(JSON.stringify(item))
    job.status = "closed"
    delete job.identifier
    const res = await repoJob.postJobItem(job)
    if (res.status !== 200) {
        return
    }
    state.jobList.unshift(res.data)
    state.renderKey = Math.random()
}
async function saveFieldsPreference() {
    const admin = Object.assign({}, repoAuth.state.user, {
        jobFields: state.jobFields
    })
    await repoAdmin.patchAdmin(admin)
}
async function initialize(payload = {}) {
    const { searchLike = '', sort = true } = payload
    const { user, company } = repoAuth.state
    if (!company) {
        return
    }
    // 使用客製化欄位顯示
    if (user && user.jobFields) {
        state.jobFields = JSON.parse(JSON.stringify(user.jobFields))
    }
    // 初始化job
    const { id } = company
    const config = Object.assign({}, state.filter, {
        organizationId: id,
        orderBy: 'datePosted',
        searchLike
    })
    const jobsResponse = await repoCompany.getCompanyJobs(config)
    if (jobsResponse.status !== 200) {
        return
    }
    const allJobs = jobsResponse.data
    allJobs.forEach(item => {
        if (item.status !== 'active') {
            item.status = 'closed'
        }
    })
    allJobs.sort((a, b) => {
        return a.datePosted - b.datePosted
    })
    const closedJobs = allJobs.filter(item => item.status !== 'active')
    const activeJobs = allJobs.filter(item => item.status === 'active')
    state.jobList = [...closedJobs, ...activeJobs]
    state.renderKey = Math.random()
    scrollTo(0, 0)
}
function debounce(func, delay = 800) {
    clearTimeout(state.debounceTimer)
    state.debounceTimer = setTimeout(() => {
        state.debounceTimer = undefined
        func.apply(this)
    }, delay)
}
async function addJobDraft() {
    const { company } = repoAuth.state
    const { id, addressRegion, addressLocality, streetAddress, remark = '' } = company
    const job = {
        status: "closed",
        organizationId: id,
        // 預設為公司的上班地點
        addressRegion,
        addressLocality,
        streetAddress,
        remark,
    }
    state.searchLike = ""
    // 插入並打開第一個品項
    $sweet.loader(true)
    const res = await repoJob.postJobItem(job)
    const postedJob = res.data
    state.jobList.unshift(postedJob)
    const { identifier = '' } = postedJob
    router.push(`jobs/${identifier}`)
    $sweet.loader(false)
}
</script>
<style lang="scss" scoped>
.jobManagement {
    background: #fff;
    padding: 32px 32px;
    min-height: unset;
    border-radius: 10px;

    .jobManagement__addItem {
        display: flex;
        width: 100%;

        .addItem__button {
            width: 104px;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #fff;
            margin-right: 10px;
        }

        .addItem__searchGroup {
            border: 1px solid #d3d3d3;
            padding: 11px 20px;
            background-color: white;
            border-radius: 5px 0 0 5px;
            display: flex;
            align-items: center;
            width: 100%;

            .searchGroup__icon {
                margin-right: 8px;
            }

            .searchGroup__input {
                border: none;
                width: 100%;

                &:focus {
                    outline: none;
                }
            }
        }
    }

    .jobManagement__fields {
        display: flex;
        align-items: center;
        white-space: nowrap;
        gap: 15px;
        margin-top: 20px;
    }

    .fixTableHead {
        overflow-y: auto;
        overflow-x: auto;
        max-height: 640px;
        margin-top: 20px;
    }

    .jobManagement__table {

        th {
            white-space: nowrap;
            vertical-align: middle;
        }

        td {
            vertical-align: middle;
            white-space: nowrap;
        }

        .table__jobName {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.38;
            letter-spacing: normal;
            text-align: left;
            color: #5ea88e;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        .jobManagement__table__sticky {
            background-color: mintcream;
            left: 0;
            position: sticky;
            z-index: 100;
            // border-right: 1px solid #d3d3d3;
        }

        .jobManagement__table__sticky--second {
            left: 76px;
        }

        .table__btn {
            border: none;
            background-color: inherit;
        }

        .jobManagement__table__head {
            font-size: 15px;
            font-weight: normal;
            color: #999;
            position: sticky;
            top: 0;
            background-color: ivory;
            z-index: 110;
        }

        .table__row {
            height: 64px;
        }
    }
}
</style>