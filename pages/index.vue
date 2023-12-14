<template>
    <div class="home">
        <section class="home__section home__section--landing">
            <img class="landing__banner" alt="banner" src="@/assets/index/KV1.png">
            <div class="landing__textGroup">
                <h1 class="textGroup__title">
                    設計你的理想工作
                    <br>
                    活出精彩人生
                </h1>
                <div class="textGroup__desc">
                    多元職涯時代，你擁有多種可能性，不論是正職、兼職或接案，這裡都能滿足所需。
                    <br>
                    <br>
                    現在，只要三分鐘就能設計適合自己的工作，讓工作主動上門！
                </div>
                <button class="textGroup__btn" @click="routeToQuestions()">立即開始</button>
            </div>
        </section>
        <section class="home__section home__section--manual">
            <h2 class="manual__title">
                怎麼讓符合需求的工作主動送上門？
            </h2>
            <div class="manual__cardGroup">
                <div class="cardGroup__card cardGroup__card--yellow">
                    <img class="card__image" alt="img1" src="@/assets/index/icons-02.svg">
                    <h3 class="card__title">選擇工作需求</h3>
                    <div class="card__desc">針對企業文化與工作環境，回覆你的需求</div>
                </div>
                <div class="cardGroup__card cardGroup__card--green">
                    <img class="card__image" alt="img2" src="@/assets/index/icons-05.svg">
                    <h3 class="card__title">選擇職務種類</h3>
                    <div class="card__desc">不論是正職兼職或接案，都能在此進行媒合</div>
                </div>
                <div class="cardGroup__card cardGroup__card--blue">
                    <img class="card__image" alt="img3" src="@/assets/index/icons-04.svg">
                    <h3 class="card__title">快速介紹自己</h3>
                    <div class="card__desc">寫下你的過往經驗，或用AI生成器為你撰寫</div>
                </div>
            </div>
        </section>
        <section class="home__section home__section--new">
            <h2 class="new__title">
                新時代的求職網
            </h2>
            <div class="new__textGroup">
                <div class="textGroup__card">
                    <img class="card__image" alt="img4" src="@/assets/index/Frame2500.png">
                    <div class="card__group">
                        <h3 class="card__title">用自己的履歷</h3>
                        <div class="card__desc">打造個人品牌<br>
                            無需在此曝露履歷，我們會為你配對職缺，有興趣再上傳履歷應徵；因為唯有精準應徵能事半功倍，你可以發揮創意打造個人品牌，讓履歷成為吸引機會的魅力資產。</div>
                    </div>
                </div>
                <div class="textGroup__card textGroup__card--reverse">
                    <img class="card__image" alt="img5" src="@/assets/index/Frame2501.png">
                    <div class="card__group">
                        <h3 class="card__title">保護個資行動</h3>
                        <div class="card__desc">隔絕個資濫用<br>
                            與其他人力銀行不同，我們確保你履歷中的個資在未主動應徵前絕對安全，無論是正職、兼職還是接案，只有主動投遞時，對方才能看見，給你最大的控制權保護個資。
                        </div>
                    </div>
                </div>
                <div class="textGroup__card">
                    <img class="card__image" alt="img6" src="@/assets/index/Frame2502.png">
                    <div class="card__group">
                        <h3 class="card__title">沒有垃圾信件</h3>
                        <div class="card__desc">減少廣告騷擾<br>
                            我們不會發送無用的廣告信，讓你遠離職缺廣告的騷擾。配對職缺除了要符合需求，還要讓對你真正有興趣的廠商發送邀請，讓你專注收取對職涯有益的機會邀請。
                        </div>
                    </div>
                </div>
                <div class="textGroup__card textGroup__card--reverse">
                    <img class="card__image" alt="img7" src="@/assets/index/Frame2503.png">
                    <div class="card__group">
                        <h3 class="card__title">輕鬆應對求職</h3>
                        <div class="card__desc">工作越換越好<br>
                            機會就像小偷，來的時候無聲無息，走的時候損失慘重！把握機會，不需時刻緊盯著它，只需專注當下的工作，當好機會上門時，再從容優雅的決定是否應徵。</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="home__section home__section--jp">
            <img class="jp_heart" alt="heart" src="@/assets/index/Vector.svg">
            <img class="jp_logo" alt="logo" src="@/assets/index/jp.svg">
            <h2 class="jp__title">Job Pair 團隊理念</h2>
            <div class="jp__desc">
                我們的願景是創造一個人人都能在適合的環境中發揮所長的職場。在這個充滿資訊噪音的時代，我們相信，除了眾所矚目的熱門職業，還有更多適合個人特質和價值觀的選擇。
                <br>
                <br>
                我們的使命是讓你的職涯充滿無限可能！現在就用三分鐘勾選你理想的企業文化、工作環境、組織階段、管理模式、人際風格和工作模式，即刻為你配對最合適的職缺，開啟專屬於你的職場旅程。
            </div>
            <div class="jp__cardGroups">
                <div class="cardGroups__card">
                    <div class="card__desc"> “ 謝謝 Job Pair 幫我找到很讚的工作！ ”</div>
                    <div class="card__bottom">
                        <div class="bottom__name">EN</div>
                        <div class="bottom__title">JS全端工程師</div>
                    </div>
                </div>
                <div class="cardGroups__card">
                    <div class="card__desc">“ 現在的工作氛圍、主管帶人的風格都是我很喜歡的，而且在 Job Pair 找工作時就能相互配對，覺得讚讚 ”</div>
                    <div class="card__bottom">
                        <div class="bottom__name">Sandy</div>
                        <div class="bottom__title">HR人力資源主管</div>
                    </div>
                </div>
                <div class="cardGroups__card">
                    <div class="card__desc"> “ 可以直接上傳自己的履歷，不用重新再建一次履歷，找工作已經心累了，能直接上傳真的是阿咪陀佛 ”</div>
                    <div class="card__bottom">
                        <div class="bottom__name">Penny</div>
                        <div class="bottom__title">UIUX Designer</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="home__section home__section--partner">

            <div v-if="state.affiliate.length" class="partner__part">
                <h2 class="partner__title">合作伙伴</h2>
                <div class="partner__bodyGroup">
                    <!-- <a class="bodyGroup__anchor">
                        <img class="anchor__image" alt="img7" src="@/assets/index/Frame2503.png">
                    </a>
                    <a class="bodyGroup__anchor">
                        <img class="anchor__image" alt="img7" src="@/assets/index/Frame2503.png">
                    </a>
                    <a class="bodyGroup__anchor">
                        <img class="anchor__image" alt="img7" src="@/assets/index/Frame2503.png">
                    </a> -->
                    <a v-for="(item, index) in state.affiliate" class="bodyGroup__anchor" :key="index"
                        :href="item?.url?.default" target="_blank" aria-label="more about this company">
                        <img format="webp" class="anchor__image" alt="logo" :src="item.logo" />
                    </a>
                </div>
            </div>
            <!-- </template> -->
            <div v-if="state.affiliate.length" class="partner__part partner__part--mt">
                <h2 class="partner__title partner__title--mt">合作企業</h2>
                <div class="partner__bodyGroup">
                    <!-- <a class="bodyGroup__anchor">
                        <img class="anchor__image" alt="img7" src="@/assets/index/Frame2503.png">
                    </a>
                    <a class="bodyGroup__anchor">
                        <img class="anchor__image" alt="img7" src="@/assets/index/Frame2503.png">
                    </a>
                    <a class="bodyGroup__anchor">
                        <img class="anchor__image" alt="img7" src="@/assets/index/Frame2503.png">
                    </a> -->
                    <NuxtLink v-for="(item, index) in state.jobProvider" class="bodyGroup__anchor" :key="index"
                        :to="`/company/${item.organizationId}`" aria-label="more about this company">
                        <img format="webp" onerror="this.style.display='none'" class="anchor__image" alt="logo"
                            :src="item.image" />
                    </NuxtLink>
                </div>
            </div>
        </section>
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
state.affiliate = companyList.value.slice(0, 3)
onMounted(async () => {
    if (process.client) {
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
        state.jobProvider = jobProvider.slice(0, 3)
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


    .home__section {
        padding: 40px 20px;
    }

    .home__section--landing {
        .landing__banner {
            width: 335px;
            max-width: 743px;
        }

        .landing__textGroup {

            .textGroup__title {
                color: #0AB378;
                font-size: 40px;
                font-style: normal;
                font-weight: 600;
                line-height: 64px;
                /* 160% */
                letter-spacing: 2px;
                margin-top: 25px;
            }

            .textGroup__desc {
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: 30px;
                /* 166.667% */
                letter-spacing: 0.9px;
                margin-top: 25px;
                text-align: left;
            }

            .textGroup__btn {
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
        }

    }

    .home__section--manual {

        .manual__title {
            font-size: 36px;
            font-style: normal;
            font-weight: 600;
            line-height: 44px;
            /* 122.222% */
            letter-spacing: 3.6px;
        }

        .manual__cardGroup {
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
    }

    .home__section--new {
        background-color: white;

        .new__title {
            font-size: 36px;
            font-style: normal;
            font-weight: 600;
            line-height: 44px;
            /* 122.222% */
            letter-spacing: 3.6px;
        }

        .new__textGroup {
            margin-top: 25px;
            display: flex;
            flex-direction: column;
            gap: 25px;

            .textGroup__card {
                display: flex;
                flex-direction: column;
                align-items: center;

                .card__image {
                    width: 335px;
                }

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

    .home__section--jp {
        background: #0AB378;

        .jp_heart {
            position: absolute;
            left: 0;
            top: 50px;
            display: none;
        }

        .jp_logo {
            position: absolute;
            right: 0;
            top: 0px;
            height: 400px;
            display: none;
        }

        .jp__title {
            color: #FFD600;
            font-size: 36px;
            font-style: normal;
            font-weight: 600;
            line-height: 36px;
            /* 100% */
            letter-spacing: 3.6px;
        }

        .jp__desc {
            margin-top: 25px;
            color: white;
            text-align: left;
        }

        .jp__cardGroups {
            display: flex;
            overflow-x: auto;
            gap: 15px;
            margin-top: 25px;

            .cardGroups__card {
                padding: 30px;
                min-width: 335px;
                height: 254px;
                border-radius: 16px;
                background: #FFF;
                box-shadow: 0px 4px 6px 0px rgba(166, 166, 166, 0.30);
                text-align: left;
                position: relative;

                .card__bottom {
                    position: absolute;
                    bottom: 30px;
                    color: #1A1A31;

                    .bottom__name {
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 30px;
                        /* 166.667% */
                        letter-spacing: 0.9px;
                    }

                    .bottom__title {
                        font-size: 13px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 20px;
                        /* 153.846% */
                        letter-spacing: 0.65px;
                    }
                }
            }
        }
    }

    .home__section--partner {
        padding: 40px 0px;

        .partner__part {

            .partner__title {
                color: #0AB378;
                font-size: 36px;
                font-style: normal;
                font-weight: 600;
                /* 0% */
                letter-spacing: 3.6px;
            }

            .partner__title--mt {
                margin-top: 40px;
            }

            .partner__bodyGroup {
                display: flex;
                flex-direction: column;
                gap: 50px;
                margin-top: 50px;

                .bodyGroup__anchor {

                    .anchor__image {
                        width: auto;
                        height: 70px;
                    }

                }
            }
        }

    }

    .home__section--footer {
        padding: 0px;

        .footer__image {
            width: 100vw;
        }

    }

}

@media screen and (min-width:992px) {
    .home {
        .home__section--landing {
            display: flex;
            gap: 100px;
            justify-content: center;
            align-items: center;

            .landing__banner {
                width: 50vw;
            }

            .landing__textGroup {
                text-align: left;
                max-width: 408px;

                .textGroup__title {
                    font-size: 48px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 64px;
                    /* 133.333% */
                    letter-spacing: 2.4px;
                }

                .textGroup__desc {
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 30px;
                    /* 166.667% */
                    letter-spacing: 0.9px;
                    margin-top: 14px;
                }

                .textGroup__btn {
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    padding: 20px 30px;
                    margin-top: 80px;
                }
            }
        }

        .home__section--manual {
            height: 360px;

            .manual__title {
                font-size: 36px;
                font-style: normal;
                font-weight: 600;

                letter-spacing: 3.6px;
            }

            .manual__cardGroup {
                margin-top: 64px;
                flex-direction: row;
                justify-content: center;

                .cardGroup__card {
                    width: 27vw;
                    height: 27vw;
                    max-width: 400px;
                    max-height: 400px;

                    .card__image {
                        width: 130px;
                    }

                    .card__title {
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 110%;
                        /* 26.4px */
                        letter-spacing: 1.2px;
                    }

                    .card__desc {
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

        .home__section--new {
            padding: 200px 0px;

            .new__title {
                font-size: 36px;
                font-style: normal;
                font-weight: 600;
                /* 0% */
                letter-spacing: 3.6px;
                margin-top: 80px;
            }

            .new__textGroup {
                margin-top: 46px;
                gap: 120px;

                .textGroup__card {
                    display: flex;
                    gap: 70px;
                    justify-content: center;
                    text-align: left;
                    align-items: center;
                    flex-direction: row;

                    .card__group {
                        width: 500px;

                        .card__title {}

                        .card__desc {}
                    }
                }

                .textGroup__card--reverse {
                    flex-direction: row-reverse;
                }
            }
        }

        .home__section--jp {
            padding: 50px 0px;
            position: relative;
            width: 100vw;
            min-height: 650px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .jp_heart {
                position: absolute;
                left: 0;
                top: 50px;
                display: block;
            }

            .jp_logo {
                position: absolute;
                right: 0;
                top: 0px;
                height: 400px;
                display: block;
            }

            .jp__title {
                color: #FFD600;
                text-align: center;
                font-size: 36px;
                font-style: normal;
                font-weight: 600;
                /* 0% */
                letter-spacing: 3.6px;
                margin-top: 40px;
            }

            .jp__desc {
                position: absolute;
                top: 150px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 22px;
                font-style: normal;
                font-weight: 600;
                /* 181.818% */
                letter-spacing: 2.2px;
                line-height: 40px;
                /* 181.818% */
                color: white;
                margin: auto;
                margin-top: 50px;
                width: 824px;
            }

            .jp__cardGroups {
                margin-top: 95px;
                display: flex;
                justify-content: center;
                position: absolute;
                bottom: -140px;
                padding: 0px 24px;

                .cardGroups__card {
                    max-width: 400px;

                    .card__desc {
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 26px;
                        /* 162.5% */
                        letter-spacing: 0.8px;
                    }

                    .card__bottom {
                        .bottom__name {
                            font-size: 18px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: 30px;
                            /* 166.667% */
                            letter-spacing: 0.9px;
                        }

                        .bottom__title {
                            font-size: 13px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: 20px;
                            /* 153.846% */
                            letter-spacing: 0.65px;
                        }
                    }
                }
            }
        }

        .home__section--partner {
            min-height: 673px;
            padding-top: 280px;


            .partner__part {
                display: flex;
                flex-direction: row;
                gap: 14vw;
                align-items: center;
                justify-content: center;

                .partner__title {
                    font-size: 36px;
                    font-style: normal;
                    font-weight: 600;
                    /* 0% */
                    letter-spacing: 3.6px;
                }

                .partner__bodyGroup {
                    flex-direction: row;
                    margin: 0px;
                    gap: 14vw;

                    .bodyGroup__anchor {
                        .anchor__image {
                            height: 70px;
                            width: auto;
                        }
                    }
                }
            }

            .partner__part--mt {
                margin-top: 125px;
            }
        }

    }

}
</style>