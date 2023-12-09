<template>
    <div class="home">
        <section class="home__section">
            <img class="home__banner" alt="banner" src="@/assets/index/image.png">
            <h1 class="home__title">
                設計你的理想工作
                <br>
                活出精彩人生
            </h1>
            <div class="home__desc">
                多元職涯時代，你擁有多種可能性，不論是正職、兼職或接案，這裡都能滿足所需。現在，只要三分鐘就能設計想要的工作，讓適合的邀約主動上門！
            </div>
            <button class="home__btn" @click="routeToQuestions()">開始配對</button>
        </section>
        <section class="home__section">
            <h2 class="home__groupTitle">
                怎麼讓符合需求的工作主動送上門？
            </h2>
            <div class="home__cardGroup">
                <div class="cardGroup__card cardGroup__card--yellow">
                    <img class="card__image" alt="img1" src="@/assets/index/icons-02.svg">
                    <div class="card__title">選擇工作需求</div>
                    <div class="card__desc">針對企業文化與工作環境，回覆你的需求</div>
                </div>
                <div class="cardGroup__card cardGroup__card--green">
                    <img class="card__image" alt="img2" src="@/assets/index/icons-05.svg">
                    <div class="card__title">選擇職務種類</div>
                    <div class="card__desc">不論是正職兼職或接案，都能在此進行媒合</div>
                </div>
                <div class="cardGroup__card cardGroup__card--blue">
                    <img class="card__image" alt="img3" src="@/assets/index/icons-04.svg">
                    <div class="card__title">快速介紹自己</div>
                    <div class="card__desc">寫下你的過往經驗，或用AI生成器為你撰寫</div>
                </div>
            </div>
        </section>
        <section class="home__section home__section--white">
            <h2 class="home__groupTitle">
                新時代的求職網
            </h2>
            <div class="home__textGroup">
                <div class="textGroup__card">
                    <img class="card__image" alt="img4" src="@/assets/index/Frame2500.png">
                    <div class="card__title">用自己的履歷</div>
                    <div class="card__desc">打造個人品牌<br>
                        無需在此曝露履歷，我們會為你配對職缺，有興趣再上傳履歷應徵；因為唯有精準應徵能事半功倍，你可以發揮創意打造個人品牌，讓履歷成為吸引機會的魅力資產。</div>
                </div>
                <div class="textGroup__card">
                    <img class="card__image" alt="img5" src="@/assets/index/Frame2501.png">
                    <div class="card__title">保護個資行動</div>
                    <div class="card__desc">隔絕個資濫用<br>
                        與其他人力銀行不同，我們確保你履歷中的個資在未主動應徵前絕對安全，無論是正職、兼職還是接案，只有主動投遞時，對方才能看見，給你最大的控制權保護個資。
                    </div>
                </div>
                <div class="textGroup__card">
                    <img class="card__image" alt="img6" src="@/assets/index/Frame2502.png">
                    <div class="card__title">沒有垃圾信件</div>
                    <div class="card__desc">零垃圾信件<br>
                        在這裡，你不會被淹沒在無關緊要的郵件中。我們不會向你派送不相關的工作機會或冗長的廣告信件。你將專注於精準的應徵，不再費神篩選出真正的機會。沒有垃圾信件，只有專屬於你的個人化職涯選擇。</div>
                </div>
                <div class="textGroup__card">
                    <img class="card__image" alt="img7" src="@/assets/index/Frame2503.png">
                    <div class="card__title">輕鬆應對求職</div>
                    <div class="card__desc">工作越換越好<br>
                        機會就像小偷，來的時候無聲無息，走的時候損失慘重！把握機會，不需時刻緊盯著它，只需專注當下的工作，當好機會上門時，再從容優雅的決定是否應徵。</div>
                </div>
            </div>
        </section>
        <!-- <div class="admin__bannerGroup">
            <img format="webp" class="admin__title" src="@/assets/index/title@3x.webp" preload loading="lazy" alt="title" />
            <img format="webp" class="admin__title admin__title--desktop" src="@/assets/index/title_desktop.webp" preload
                loading="lazy" alt="title" />
            <button class="admin__button" @click="routeToQuestions()">開始配對</button>
        </div>
        <div class="admin__cardGroup">
            <div class="cardGroup__header">Job Pair 與 一般求職平台比較</div>
            <img format="webp" v-if="device.state.isLarge" class="cardGroup__decoration cardGroup__decoration--1"
                src="@/assets/index/bg2.webp" alt="decoration" />
            <img format="webp" v-if="device.state.isLarge" class="cardGroup__decoration cardGroup__decoration--2"
                src="@/assets/index/bg3.webp" alt="decoration" />
            <div class="cardGroup__body">
                <div v-if="device.state.isLarge" class="body__title">
                    <div class="title__others">
                        一般求職平台
                    </div>
                    <div class="title__jobPair">
                        Job Pair
                    </div>
                </div>
            </div>
        </div>
        <div class="admin__definition">
            <img format="webp" v-if="device.state.isLarge" class="definition__round" src="@/assets/index/round.webp"
                alt="background" preload loading="lazy" />
            <div class="definition__textGroup">
                <div class="definition__title">
                    如何配對適合的工作？
                </div>
                <hr class="definition__hr">
                <div class="definition__desc">
                    勾選你想要的企業文化、工作環境、組織階段、管理模式、人際風格與工作模式，即刻配對同時訂閱專屬於你的職缺。
                </div>
            </div>
        </div>
        <div class="admin__partner">
            <template v-if="state.affiliate && state.affiliate.length !== 0">
                <h1 class="partner__header">與我們合作的夥伴</h1>
                <div class="partner__bodyGroup">
                    <a v-for="(item, index) in state.affiliate" class="partner__anchor" :key="index"
                        :href="item?.url?.default" target="_blank" aria-label="more about this company">
                        <img format="webp" class="anchor__image" alt="logo" :src="item.logo" />
                        <span class="anchor__name">{{ item.name }}</span>
                    </a>
                </div>
            </template>
            <h1 class="partner__header mt-5">與我們合作的企業</h1>
            <div class="partner__bodyGroup">
                <NuxtLink v-for="(item, index) in state.jobProvider" class="partner__anchor" :key="index"
                    :to="`/company/${item.organizationId}`" aria-label="more about this company">
                    <img format="webp" onerror="this.style.display='none'" class="anchor__image" alt="logo"
                        :src="item.image" />
                    <span class="anchor__name">{{ item.organizationName }}</span>
                </NuxtLink>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'home',
}
</script>
<script setup>
const { $emitter, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const repoJob = useRepoJob()
const device = useDevice()
const repoAuth = useRepoAuth()
const router = useRouter()
const state = reactive({
    jobList: [],
    affiliate: [],
    jobProvider: [],
    profile: null,
    linkToken: null,
})
const { data: companyList } = await useFetch(`${runTimeConfig.public.apiBase}/company/affiliate`, { initialCache: false })
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
.home {
    text-align: center;
    background-color: rgba(10, 179, 120, 0.10);
    padding-top: 20px;
    // padding: 40px 20px 0px 20px;

    .home__banner {
        // display: block;
        // margin
        // margin-top: 40px;
    }


    .home__title {
        color: #0AB378;
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: 64px;
        /* 160% */
        letter-spacing: 2px;
        margin-top: 25px;
    }

    .home__desc {
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        /* 166.667% */
        letter-spacing: 0.9px;
        margin-top: 25px;
        text-align: left;
    }

    .home__btn {
        border-radius: 40px;
        background: #0AB378;
        padding: 20px 30px;
        color: white;
        border: none;
        width: 188px;
        font-size: 18px;
        margin-top: 25px;
        margin-bottom: 40px;
    }

    .home__groupTitle {
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 44px;
        /* 122.222% */
        letter-spacing: 3.6px;
    }

    .home__cardGroup {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        gap: 25px;
        align-items: center;

        .cardGroup__card {
            width: 335px;
            height: 335px;
            border-radius: 50%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .card__image {}

            .card__title {
                font-size: 24px;
                font-style: normal;
                font-weight: 600;
                line-height: 110%;
                /* 26.4px */
                letter-spacing: 1.2px;
                margin-top: 15px;
            }

            .card__desc {
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: 30px;
                /* 166.667% */
                letter-spacing: 0.9px;
                width: 275px;
                margin-top: 15px;
            }
        }

        .cardGroup__card--yellow {
            background: #FFD600;
        }

        .cardGroup__card--green {
            color: white;
            background: #0AB378;
        }

        .cardGroup__card--blue {
            background: #32D7D1;
        }
    }

    .home__section {
        padding: 40px 20px;
    }

    .home__section--white {
        background-color: white;
    }

    .home__textGroup {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        gap: 25px;

        .textGroup__card {
            .card__title {
                color: #0AB378;
                font-size: 30px;
                font-style: normal;
                font-weight: 600;
                line-height: 30px;
                /* 100% */
                letter-spacing: 1.5px;
                margin-top: 25px;
            }

            .card__desc {
                text-align: left;
                margin-top: 25px;
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: 30px;
                /* 166.667% */
                letter-spacing: 0.9px;
            }
        }

    }
}
</style>