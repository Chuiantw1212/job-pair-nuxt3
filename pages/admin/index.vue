<template>
    <div class="home">
        <section class="home__section home__section--landing">
            <img class="landing__banner" alt="banner" src="@/assets/admin/index/KV11.png">
            <div class="landing__textGroup">
                <h1 class="textGroup__title">
                    開創理想團隊
                    <br>
                    引領多樣工作風潮
                </h1>
                <div class="textGroup__desc">
                    在多元職涯時代，擁有不同類型的人才是成功的關鍵，正職、兼職、接案人才應有盡有。
                    <br>
                    <br>
                    只需三分鐘，立即配對適合企業的理想團隊，讓人才源源而來！
                </div>
                <button class="textGroup__btn" @click="openAdminModal()">立即開始</button>
            </div>
        </section>
        <!-- <section class="home__section home__section--manual">
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
        </section> -->
        <section class="home__section home__section--new">
            <h2 class="new__title">
                為什麼 Job Pair 更優秀？
            </h2>
            <div class="new__textGroup">
                <div class="textGroup__card">
                    <img class="card__image" alt="img4" src="@/assets/admin/index/Frame2500.png">
                    <div class="card__group">
                        <h3 class="card__title">媒合型機制</h3>
                        <div class="card__desc">Job Pair採用「媒合型」的人才配對方式，透過適配度匹配求職者和企業，從源頭上提升媒合的精準度，使得招聘更為有效。</div>
                    </div>
                </div>
                <div class="textGroup__card textGroup__card--reverse">
                    <img class="card__image" alt="img5" src="@/assets/admin/index/Frame2501.png">
                    <div class="card__group">
                        <h3 class="card__title">專注內在需求</h3>
                        <div class="card__desc">Job Pair注重求職者的內在需求，包括企業文化、工作環境、管理模式等，有助於減少不適應而快速離職的風險，提高到職率。
                        </div>
                    </div>
                </div>
                <div class="textGroup__card">
                    <img class="card__image" alt="img6" src="@/assets/admin/index/Frame2502.png">
                    <div class="card__group">
                        <h3 class="card__title">客製化企業頁面</h3>
                        <div class="card__desc">Job Pair提供客製化企業頁面的服務，使企業能夠在平台上呈現獨特的形象，突顯企業文化，提升品牌吸引力。
                        </div>
                    </div>
                </div>
                <div class="textGroup__card textGroup__card--reverse">
                    <img class="card__image" alt="img7" src="@/assets/admin/index/Frame2503.png">
                    <div class="card__group">
                        <h3 class="card__title">一鍵帶入功能</h3>
                        <div class="card__desc">Job Pair的一鍵帶入功能允許企業輕鬆快速地從其他招聘平台導入資訊，降低資料轉移的複雜度，加速上線過程。</div>
                    </div>
                </div>
                <div class="textGroup__card">
                    <img class="card__image" alt="img6" src="@/assets/admin/index/Frame2505.png">
                    <div class="card__group">
                        <h3 class="card__title">AI智能生成和優化</h3>
                        <div class="card__desc">Job Pair擁有AI智能生成和AI內容優化功能，能夠快速生成引人注目的招聘內容，並優化現有內容，提高招聘訊息的吸引力。
                        </div>
                    </div>
                </div>
                <div class="textGroup__card textGroup__card--reverse">
                    <img class="card__image" alt="img7" src="@/assets/admin/index/Frame2504.png">
                    <div class="card__group">
                        <h3 class="card__title">多元招募選項</h3>
                        <div class="card__desc">Job Pair不僅提供正職兼職招聘，還能配對彈性、短期接案人員，確保企業能夠應對不同時期的人力需求，保持團隊的活力。</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="home__section home__section--jp">
            <img class="jp_heart" alt="heart" src="@/assets/admin/index/Vector.svg">
            <img class="jp_logo" alt="logo" src="@/assets/admin/index/logo.svg">
            <h2 class="jp__title">Job Pair 團隊理念</h2>
            <div class="jp__desc">
                Job Pair致力於創造一個讓每個人在適合的環境中發揮所長的職場。 <br>
                <br>
                在資訊氾濫的時代，除了熱門職業，還有更多適合個人特質和價值觀的選擇。透過獨特的媒合與AI功能，我們重新定義招聘，精準曝光拉近人才與企業的距離，助企業應對複雜的招聘挑戰。
            </div>
            <div class="jp__cardGroups">
                <div class="cardGroups__card">
                    <div class="card__desc">“ 在Job Pair上架職缺，所收到的履歷可以透過「適配度」排序，因此不用一下子看上百封履歷，還能透過「適配度」來安排面試的優先順序。 ”</div>
                    <div class="card__bottom">
                        <div class="bottom__name">Mandy</div>
                        <div class="bottom__title">HR人力資源主管</div>
                    </div>
                </div>
                <div class="cardGroups__card">
                    <div class="card__desc">“ Job Pair 讓用人單位自行決定用人偏好，讓符合主管需求的求職者投遞履歷，降低到職後因文化、合作與溝通模式的落差而產生流動率。 ”</div>
                    <div class="card__bottom">
                        <div class="bottom__name">Sandy</div>
                        <div class="bottom__title">HR人力資源主管</div>
                    </div>
                </div>
                <div class="cardGroups__card">
                    <div class="card__desc"> “ 在 Job Pair，透過用人偏好，讓適合的人加入不只強化企業文化，人資與用人單位更能有效率的招募到人選，進而減少成本、流動率，提升績效與組織凝聚力。 ”
                    </div>
                    <div class="card__bottom">
                        <div class="bottom__name">Monica</div>
                        <div class="bottom__title">人資招募主任</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="home__section home__section--partner">
            <div v-if="state.affiliate?.length" class="partner__part">
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
            <div v-if="state.affiliate?.length" class="partner__part partner__part--mt">
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
    name: 'admin',
}
</script>
<script setup>
const { $emitter, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const repoJob = useRepoJob()
const device = useDevice()
const router = useRouter()
const repoAuth = useRepoAuth()
const state = reactive({
    jobList: [],
    affiliate: [],
    jobProvider: [],
})
const { data: companyList } = await useFetch(`${runTimeConfig.public.apiBase}/company/affiliate`, { initialCache: false })
state.affiliate = companyList.value
// hooks
useSeoMeta({
    title: `Job Pair - 讓企業有效被人才看見的人力銀行徵才網`,
    ogTitle: `Job Pair - 讓企業有效被人才看見的人力銀行徵才網`,
    description: '在這個充滿資訊噪音的時代，吸引人才越來越困難。除了眾所矚目的熱門職業，還有更多適合個人特質和價值觀的選擇。Job Pair媒合型人力銀行，讓企業與職缺有效被看見，釋放人才的無限可能，幫助企業長期的發展。',
    ogDescription: `在這個充滿資訊噪音的時代，吸引人才越來越困難。除了眾所矚目的熱門職業，還有更多適合個人特質和價值觀的選擇。Job Pair媒合型人力銀行，讓企業與職缺有效被看見，釋放人才的無限可能，幫助企業長期的發展。`,
})
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
        state.jobProvider = jobProvider
    }
})
// methods
function openAdminModal() {
    const { user } = repoAuth.state
    if (user && user.type === 'admin') {
        router.push('/admin/recruit/jobs')
    } else {
        $emitter?.emit("showCompanyModal")
    }
}
</script>
<style lang="scss" scoped>
.home {
    text-align: center;
    background-color: rgba(50, 215, 209, 0.10);
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
                color: #32D7D1;
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
                background: #32D7D1;
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

                .card__image {
                    width: 445px;
                }

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
                    color: #32D7D1;
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
        background: #32D7D1;

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
            text-align: center;
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
                    text-align: left;
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
            // padding: 200px 0px;

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
                margin-top: 25px;
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