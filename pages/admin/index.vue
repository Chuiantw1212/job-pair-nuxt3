<template>
    <div class="admin">
        <div class="admin__bannerGroup">
            <img class="admin__banner" src="@/assets/admin/index/banner.png" alt="banner">
            <img class="admin__title" src="@/assets/admin/index/title.png">
            <button class="admin__button">開始配對</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'admin',
}
</script>
<script setup>
const { $Glide, $emitter, $requestSelector } = useNuxtApp()
const runTime = useRuntimeConfig()
const repoJob = useRepoJob()
const device = useDevice()
const router = useRouter()
const repoAuth = useRepoAuth()
const state = reactive({
    jobList: [],
    affiliate: [],
    jobProvider: [],
})
const { data: companyList } = await useFetch(`${runTime.apiBase}/company/affiliate`, { initialCache: false })
state.affiliate = companyList.value
onMounted(async () => {
    if (process.client) {
        initialGlide()
        const response = await repoJob.getJobByQuery({
            pageOrderBy: "datePosted",
            pageLimit: 15,
            pageOffset: 0,
        })
        // 合作對象
        const jobList = response.data.items
        const logoMap = {}
        jobList.forEach(item => {
            if (item.organizationName !== '工作配股份有限公司' && item.image) {
                logoMap[item.organizationId] = item
            }
        })
        const jobProvider = Object.values(logoMap)
        jobProvider.sort(() => .5 - Math.random());
        state.jobProvider = jobProvider
    }
})
function initialGlide() {
    $requestSelector(`.glide`, (element) => {
        const instance = new $Glide.Default(element, {
            autoplay: 2000,
        })
        instance.mount({
            Controls: $Glide.Controls,
            Autoplay: $Glide.Autoplay,
        })
    })
}
function openAdminModal() {
    const { user } = repoAuth.state
    if (user && user.type === 'admin') {
        router.push('/admin/recruit/jobs')
    } else {
        $emitter.emit("showCompanyModal")
    }
}
</script>
<style lang="scss" scoped>
.admin {
    .admin__bannerGroup {
        position: relative;
        min-height: 100vw;
    }

    .admin__banner {
        position: absolute;
        display: block;
        width: 100%;
        top: 0;
        left: 0;
    }

    .admin__title {
        width: 280px;
        position: absolute;
        top: calc(50% - 16px);
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
    }

    .admin__button {
        position: absolute;
        top: calc(50% + 72px);
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #FFFFFF;
        border-radius: 50px;
        background-color: rgba(0, 0, 0, 0);
        color: white;
        padding: 10px 33px;
    }
}
</style>