<template>
    <div class="admin">
        <div class="admin__bannerGroup">
            <img class="admin__title" src="@/assets/index/title.png">
            <img class="admin__title admin__title--desktop" src="@/assets/index/title_desktop.svg">
            <button class="admin__button" @click="routeToQuestions()">開始配對</button>
        </div>
        <div class="admin__cardGroup">
            <div class="cardGroup__header">Job Pair 與 一般求職平台比較</div>
            <img v-if="device.state.isDesktop" class="cardGroup__decoration cardGroup__decoration--1"
                src="@/assets/admin/index/bg2.svg">
            <img v-if="device.state.isDesktop" class="cardGroup__decoration cardGroup__decoration--2"
                src="@/assets/admin/index/bg3.svg">
            <div class="cardGroup__body">
                <div v-if="device.state.isDesktop" class="body__title">
                    <div class="title__others">
                        一般求職平台
                    </div>
                    <div class="title__jobPair">
                        Job Pair
                    </div>
                </div>
                <MoleculeHomeCard title="保護您的聯絡方式、年齡、婚姻狀態等個資"></MoleculeHomeCard>
                <MoleculeHomeCard title="提供團隊適配度分數"></MoleculeHomeCard>
                <MoleculeHomeCard title="需重新建立履歷檔案" jobPairDesc="不需要" othersDesc="需要"></MoleculeHomeCard>
                <MoleculeHomeCard title="同時比較多個職缺的職務類型、薪資、福利"></MoleculeHomeCard>
                <MoleculeHomeCard title="精準評估公司文化與主管風格，降低入職後落差感" jobPairDesc="無" othersDesc="有">
                </MoleculeHomeCard>
            </div>
        </div>
        <div class="admin__definition">
            <img v-if="device.state.isDesktop" class="definition__round" src="@/assets/index/round.png">
            <div class="definition__textGroup">
                <div class="definition__title">
                    什麼是適配度？
                </div>
                <hr class="definition__hr">
                <div class="definition__desc">
                    求職偏好歸納了求職者在判斷一份工作是否適合自己的關鍵因素，搭配企業端用人偏好的資訊，能夠協助您精準配對適合的公司與職缺。
                </div>
            </div>
        </div>
        <div class="admin__partner">
            <template v-if="state.affiliate.length !== 0">
                <h1 class="partner__header">與我們合作的夥伴</h1>
                <div class="partner__bodyGroup">
                    <a v-for="(item, index) in state.affiliate" class="partner__anchor" :key="index"
                        :href="item?.url?.default" target="_blank" aria-label="more about this company">
                        <img class="anchor__image" alt="logo" :src="item.logo" />
                        <span class="anchor__name">{{ item.name }}</span>
                    </a>
                </div>
            </template>
            <h1 class="partner__header mt-5">與我們合作的企業</h1>
            <div class="partner__bodyGroup">
                <NuxtLink v-for="(item, index) in state.jobProvider" class="partner__anchor" :key="index"
                    :to="`/company/${item.organizationId}`" aria-label="more about this company">
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
const { $Glide, $emitter, $requestSelector, $liff } = useNuxtApp()
const runTime = useRuntimeConfig()
const repoJob = useRepoJob()
const device = useDevice()
const repoAuth = useRepoAuth()
const router = useRouter()
const state = reactive({
    jobList: [],
    affiliate: [],
    jobProvider: [],
    profile: null,
})
const { data: companyList } = await useFetch(`${runTime.apiBase}/company/affiliate`, { initialCache: false })
state.affiliate = companyList.value
useHead({
    title: `Job Pair`,
    meta: [
        { name: 'image', property: 'og:image', content: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImageJob.png' }
    ],

})
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
        // Fetch user profile
        // $liff.getProfile().then((profile) => {
        //     state.profile = profile
        // })
    }
})
// methods
function routeToQuestions() {
    const { user } = repoAuth.state
    if (user && user.type === 'employee') {
        router.push({
            name: 'jobs'
        })
    } else {
        let localCount = 0
        function step() {
            if (localCount >= 100) {
                console.error(`Cannot find element ${selectorString}`)
                return
            }
            const hasEvent = $emitter.all.has('showUserModal')
            if (hasEvent) {
                $emitter.emit("showUserModal")
            } else {
                localCount++
                window.requestAnimationFrame(step)
            }
        }
        step()
    }
}
</script>
<style lang="scss" scoped>
.admin {
    .admin__bannerGroup {
        background-image: url('@/assets/index/banner.png');
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

        .admin__title--desktop {
            display: none;
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

    .admin__cardGroup {
        padding: 40px 0;
        background-color: white;

        .cardGroup__header {
            text-align: center;
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 130%;
            color: #EEB540;
        }

        .cardGroup__body {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;
            position: inherit;
            align-items: center;
        }
    }

    .admin__definition {
        background-image: url('@/assets/index/bg_home.png');
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
            justify-content: space-between;
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

@media screen and (min-width:992px) {
    .admin {

        .admin__bannerGroup {
            background-image: url('@/assets/index/img1.png');
            background-size: contain;
            min-height: 50vw;

            .admin__title {
                display: none;
            }

            .admin__title--desktop {
                display: block;
                transform: unset;
                top: 16vw;
                left: 12vw;
                width: 44vw;
            }

            .admin__button {
                position: absolute;
                top: 29vw;
                left: 12vw;
                transform: unset;
                border: 1px solid #FFFFFF;
                border-radius: 50px;
                background-color: rgba(0, 0, 0, 0);
                color: white;
                padding: 10px 33px;
                width: 224px;
                height: 70px;
                font-weight: 900;
                font-size: 30px;
                line-height: 130%;
            }
        }

        .admin__cardGroup {
            position: relative;
            padding: 92px 0px;
            margin: auto;

            .cardGroup__decoration {
                position: absolute;
            }

            .cardGroup__decoration--1 {
                top: 321px;
                left: 0;
            }

            .cardGroup__decoration--2 {
                bottom: 100px;
                right: 0;
            }

            .cardGroup__header {
                font-size: 50px;
                font-weight: 900;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: center;
                color: #eeb540;
            }

            .cardGroup__body {
                margin: auto;
                margin-top: 70px;
                width: 868px;

                .body__title {
                    display: flex;
                    gap: 501px;

                    .title__others {
                        font-size: 28px;
                        font-weight: 900;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: normal;
                        text-align: left;
                        color: #317292;
                    }

                    .title__jobPair {
                        font-size: 28px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: normal;
                        text-align: left;
                        color: #317292;
                    }
                }
            }
        }

        .admin__definition {
            background-image: url('@/assets/index/img2.png');
            height: 634px;
            position: relative;
            background-size: cover;
            background-position: center;

            .definition__round {
                position: absolute;
                top: 0;
                right: 10vw;
            }

            .definition__textGroup {
                position: absolute;
                top: 154px;
                right: calc(10vw + 81px);
                width: 565px;

                .definition__title {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 36px;
                    line-height: 158%;
                }

                .definition__desc {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 30px;
                    line-height: 200%;
                    color: #FFFFFF;
                }
            }

        }

        .admin__partner {
            padding: 60px 307px;
            background-color: white;

            .partner__header {
                font-style: normal;
                font-weight: 700;
                font-size: 50px;
                line-height: 158%;
                color: #EEB540;
            }

            .partner__bodyGroup {
                display: flex;
                flex-direction: row;
                gap: 60px;
                flex-wrap: wrap;
                max-width: 1304px;
                margin: auto;
            }

            .partner__anchor {
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 42px;
                justify-content: center;

                .anchor__image {
                    width: 54px;
                    height: 54px;
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
}
</style>