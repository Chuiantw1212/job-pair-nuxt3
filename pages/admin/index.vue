<template>
    <div class="admin">
        <div class="admin__bannerGroup">
            <img class="admin__title" src="@/assets/admin/index/title.png">
            <button class="admin__button">開始配對</button>
        </div>
        <div>
            <div>Job Pair 與 一般求職平台比較</div>
        </div>
        <div class="admin__definition">
            <div class="definition__title">
                什麼是適配度？
            </div>
            <hr class="definition__hr">
            <div class="definition__desc">
                求職偏好歸納了求職者在判斷一份工作是否適合自己的關鍵因素，搭配企業端用人偏好的資訊，能夠協助您精準配對適合的公司與職缺。
            </div>
        </div>
        <div class="admin__partner">
            <h1 class="partner__header">與我們合作的夥伴</h1>
            <div class="partner__bodyGroup">
                <a v-for="(item, index) in state.affiliate" class="partner__anchor" :key="index"
                    :href="item?.url?.default" target="_blank" aria-label="more about this company">
                    <img class="anchor__image" alt="logo" :src="item.logo" />
                    <span class="anchor__name">{{ item.name }}</span>
                </a>
            </div>
            <h1 class="partner__header mt-5">與我們合作的企業</h1>
            <div class="partner__bodyGroup">
                <NuxtLink v-for="(item, index) in state.jobProvider" class="partner__anchor" :key="index"
                    :to="`/company/${item.id}`" aria-label="more about this company">
                    <img onerror="this.style.display='none'" class="anchor__image" alt="logo" :src="item.image" />
                    <span class="anchor__name">{{ item.organizationName }}</span>
                </NuxtLink>
            </div>
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
        // initialGlide()
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
        background-image: url('@/assets/admin/index/banner.png');
        background-size: cover;
        background-position: center;
        position: relative;
        min-height: 100vw;

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

    .admin__definition {
        background-image: url('@/assets/admin/index/bg_home.png');
        padding: 80px 30px;

        .definition__title {
            color: #EEB540;
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 158%;
        }

        .definition__hr {
            border: 1px solid #FFFFFF;
            opacity: 1;
        }

        .definition__desc {
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;
            color: #FFFFFF;
        }
    }

    .admin__partner {
        padding: 40px 52px;
        background-color: white;

        .partner__header {
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 130%;
            color: #EEB540;
            text-align: center;
            margin-bottom: 27px;
        }

        .partner__bodyGroup {
            display: flex;
            flex-direction: column;
            gap: 34px;
        }

        .partner__anchor {
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 42px;
            justify-content: center;

            .anchor__image {
                width: 34px;
                height: 34px;
            }

            .anchor__name {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 130%;
                color: #707070;
                max-width: 170px;
                white-space: pre-wrap;
            }
        }
    }
}
</style>