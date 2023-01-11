<template>
    <div class="home__intro">
        <div class="home__intro__landing" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <h1 class="landing__header">在Job Pair配對「適合的工作」</h1>
            <p class="landing__desc">
                找到一份適合的工作如大海撈針
                <br />
                Job Pair從企業文化、公司環境、主管風格等關鍵角度為你精準配對
            </p>
            <div class="landing__buttonGroup">
                <button class="buttonGroup__button" @click="routeToQuestions()">開始配對</button>
            </div>
        </div>
        <div class="home__intro__whatis">
            <div class="whatis__textGroup">
                <h1 class="whatis__header">什麼是探索求職偏好？</h1>
                <hr class="whatis__line" />
                <div class="whatis__description">
                    求職偏好歸納了求職者在判斷一份工作是否適合自己的關鍵因素，搭配企業端用人偏好的資訊，能夠協助您精準配對適合的公司與職缺。
                </div>
            </div>
            <img class="whatis__image" src="~/assets/index/img_home1.svg" alt="preference" />
        </div>
        <div class="home__intro__section1">
            <div class="section1__headerGroup">
                <div class="section1__badge"></div>
                <h2 class="section1__header">為什麼瞭解求職偏好很重要？</h2>
            </div>
            <div class="section1__body">
                <div class="body__textGroup">
                    <div class="section1__number">01</div>
                    <h3 class="section1__subtitle">適合的工作不光是看興趣與專長</h3>
                    <hr class="section1__line" />
                    <div class="section1__description">
                        就算學歷、專長相似，適合的工作與環境也不盡相同；例如，一樣是工程師，有些人喜歡新創組織、有人喜歡在大企業，有些人則想多元的接案。
                    </div>
                    <br />
                    <div class="section1__description">
                        在工作選擇上，不僅培養專業能力很重要，對自己的覺察與了解其實也是一種關鍵能力。當我們越了解自己喜歡什麼、擅長什麼，不喜歡什麼、不擅長什麼，就會對於「適合」有更精準的方向。
                    </div>
                </div>
                <img class="section1__body__image" src="~/assets/index/img_home2.svg" alt="similarity" />
            </div>
        </div>
        <div class="home__intro__section2">
            <div class="section__textGroup">
                <div class="section2__number">02</div>
                <h3 class="section2__subtitle">更多求職思考面向</h3>
                <hr class="section2__line" />
                <div class="section2__description">
                    就明明喜歡畫畫，也努力學習平面設計的技能，工作也選擇平面設計師，卻還是遇到不適合的工作，為什麼？
                </div>
                <br />
                <div class="section2__description">
                    因為一份適合自己的工作不光是工作內容本身，還包含企業文化、工作環境與主管風格等隱性需求。所以「適不適合」乍聽之下是一種主觀判斷的感受，但其實他是有跡可循的——有些「關鍵因素」會特別影響人們是否認為自己適合一份工作，只是通常在求職時沒有相關資訊可以參考，而容易忽略了這些重要的思考面向。
                </div>
            </div>
        </div>
        <div class="home__intro__section3">
            <img class="section3__image d-lg-none" src="~/assets/index/img_home3.svg" alt="questions" />
            <div class="section3__textGroup">
                <div class="section3__number">03</div>
                <h3 class="section3__subtitle">六大面向問答題</h3>
                <hr class="section3__line" />
                <div class="section3__description">
                    Job
                    Pair透過六大面向問答題，讓求職者有機會設定自己的求職偏好，並搭配企業端的用人偏好，讓雙方都能更有效率地探索理念、工作模式、氛圍價值觀契合的工作/人選，發揮「媒合」實質的意義，實現「適才適所」的願望。
                </div>
                <br />
                <div class="section3__description">立即開始回答你的求職偏好，媒合適合的工作吧！</div>
                <div class="section3__buttonGroup">
                    <button class="buttonGroup__button" @click="routeToQuestions()">開始配對</button>
                </div>
            </div>
        </div>
        <div class="container__section container__section--affiliate">
            <h2 class="affiliate__header">我們的合作夥伴</h2>
            <div class="affiliate__body">
                <a v-for="(item, index) in state.affiliate" class="body__imageWrap" :key="index"
                    :href="item?.url?.default" target="_blank" aria-label="more about this company">
                    <img class="body__image" alt="logo" :src="item.logo" />
                </a>
            </div>
            <h2 class="affiliate__header mt-5">我們的合作對象</h2>
            <div class="affiliate__body">
                <NuxtLink v-for="(item, index) in state.jobProvider" class="body__imageWrap" :key="index"
                    :to="`/company/${item.id}`" aria-label="more about this company">
                    <img class="body__image" alt="logo" :src="item.image" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
}
</script>
<script setup>
import backgroundImage from "~/assets/index/landing.png"
const { $emitter } = useNuxtApp()
const runTime = useRuntimeConfig()
const repoJob = useRepoJob()
const repoAuth = useRepoAuth()
const router = useRouter()
const state = reactive({
    affiliate: [],
    jobProvider: [],
})
const { data: companyList } = await useFetch(`${runTime.apiBase}/company/affiliate`, { initialCache: false })
state.affiliate = companyList.value
useHead({
    meta: [
        { property: 'og:image', content: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImageJob.png' }
    ],
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
.home__intro {
    .home__intro__landing {
        background-color: white;
        background-size: cover;
        padding: 160px 20px 105px 20px;
        background-position: center;

        .landing__header {
            font-size: 35px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.26;
            letter-spacing: 1.05px;

            .header__badge {
                background-image: url("~/assets/index/首頁_黃色元素.png");
                background-size: cover;
                padding: 0 8px;
                background-repeat: no-repeat;
                background-position-x: 1px;
                background-position-y: 1px;
                display: inline-block;
                width: 175px;
                height: 55px;
                text-align: center;
            }
        }

        .landing__desc {
            font-size: 18px;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.32;
            letter-spacing: normal;
            text-align: left;
            color: #484848;
        }

        .landing__buttonGroup {
            text-align: center;
            width: 234px;
            padding-top: 50px;
            margin: auto;

            .buttonGroup__button {
                color: white;
                font-size: 20px;
                font-weight: bold;
                width: 100%;
                border: none;
                height: 50px;
                flex-grow: 0;
                margin: 0 3px 5px 0;
                border-radius: 10px;
                background-color: #5ea88e;
                margin-bottom: 8px;
                box-shadow: 2px 2px 2px 1px #008053;

                &:hover {
                    background-color: #21cc90;
                }
            }
        }
    }

    .home__intro__whatis {
        padding: 40px 30px;
        background-color: #5ea88e;
        color: white;

        .whatis__header {
            font-size: 30px;
            font-weight: bold;
            line-height: 1.3;
            color: #fff;
        }

        .whatis__line {
            border-bottom: 2px solid #ffd600;
            width: 58px;
            margin: 30px 0;
            opacity: 1;
        }

        .whatis__description {
            font-size: 18px;
            line-height: 1.5;
            color: #fff;
            margin-bottom: 30px;
        }

        .whatis__image {
            display: block;
            margin: auto;
            transition: all 0.3s;
            width: 300px;
            height: 192px;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .home__intro__section1 {
        padding: 40px 30px;
        background-color: #fff;

        .section1__headerGroup {
            display: flex;

            .section1__badge {
                width: 8px;
                height: 29px;
                flex-grow: 0;
                margin: 0 10px 0 0;
                background-color: #eeb540;
            }

            .section1__header {
                font-size: 22px;
                font-weight: bold;
                line-height: 1.3;
                color: #eeb540;
                margin-bottom: 54px;
            }
        }

        .section1__number {
            font-family: Montserrat;
            font-size: 102px;
            color: #eeb540;
            line-height: 1;
            margin-bottom: 15px;
        }

        .section1__subtitle {
            font-size: 20px;
            font-weight: 500;
            line-height: 1.58;
            color: #5ea88e;
            min-height: 32px;
        }

        .section1__line {
            border-bottom: 1px solid #5ea88e;
            opacity: 1;
        }

        .section1__description {
            font-size: 18px;
            font-weight: 500;
            line-height: 1.58;
            color: #707070;
        }

        .section1__body__image {
            display: block;
            margin: auto;
            margin-top: 20px;
            transition: all 0.3s;
            width: 300px;
            height: 194px;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .home__intro__section2 {
        padding: 30px 30px;
        background-color: #fff;
        background-image: url("~/assets/index/bg_home2.jpg");
        background-size: cover;

        .section2__header {
            font-size: 22px;
            font-weight: bold;
            line-height: 1.3;
            color: #eeb540;
            margin-bottom: 54px;
        }

        .section2__number {
            font-family: Montserrat;
            font-size: 102px;
            color: #eeb540;
            line-height: 1;
            margin-bottom: 15px;
        }

        .section2__subtitle {
            font-size: 20px;
            font-weight: 500;
            line-height: 1.58;
            color: white;
            min-height: 32px;
        }

        .section2__line {
            border-bottom: 1px solid white;
            opacity: 1;
        }

        .section2__description {
            font-size: 18px;
            font-weight: 500;
            line-height: 1.58;
            color: white;
        }
    }

    .home__intro__section3 {
        padding: 86px 30px 74px 30px;
        background-color: #fff;
        background-size: cover;
        position: relative;

        .section3__image {
            position: absolute;
            top: 20px;
            right: 0;
        }

        .section3__header {
            font-size: 22px;
            font-weight: bold;
            line-height: 1.3;
            color: #eeb540;
            margin-bottom: 54px;
        }

        .section3__number {
            font-family: Montserrat;
            font-size: 102px;
            color: #eeb540;
            line-height: 1;
            margin-bottom: 15px;
        }

        .section3__subtitle {
            font-size: 20px;
            font-weight: 500;
            line-height: 1.58;
            color: #5ea88e;
            min-height: 32px;
        }

        .section3__line {
            border-bottom: 1px solid #5ea88e;
            opacity: 1;
        }

        .section3__description {
            font-size: 18px;
            font-weight: 500;
            line-height: 1.58;
            color: #707070;
        }

        .section3__buttonGroup {
            text-align: center;
            width: 234px;
            padding-top: 50px;
            margin: auto;

            .buttonGroup__button {
                color: white;
                font-size: 20px;
                font-weight: bold;
                width: 100%;
                border: none;
                height: 50px;
                flex-grow: 0;
                margin: 0 3px 5px 0;
                border-radius: 10px;
                background-color: #5ea88e;
                margin-bottom: 8px;
                box-shadow: 2px 2px 2px 1px #008053;

                &:hover {
                    background-color: #21cc90;
                }
            }
        }
    }

    .container__section {
        text-align: center;
        padding: 39px 26px;
        background-color: rgba(14, 174, 117, 0.9);

        .section__header {
            font-size: 28px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            color: #332b00;
        }

        .affiliate__header {
            font-size: 42px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: white;
        }

        .affiliate__body {
            display: flex;
            justify-content: center;
            gap: 70px;
            margin-top: 50px;
            flex-wrap: wrap;
            max-width: 66rem;
            margin: 50px auto auto auto;

            .body__imageWrap {
                width: 116px;
                height: 116px;
                border-radius: 50%;
                background-color: white;
                overflow: hidden;
                position: relative;

                .body__image {
                    display: block;
                    margin: auto;
                    width: 64px;
                    max-height: 64px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .home__intro {
        .home__intro__landing {
            background-color: white;
            background-size: contain;
            height: 700px;
            padding: 165px 7vw 165px 7vw;
            background-position: right;
            background-repeat: no-repeat;

            .landing__header {
                font-size: 52px;
                font-weight: bold;
                line-height: 1.3;
                color: #084530;
            }

            .landing__desc {
                font-size: 23px;
                color: #484848;
            }

            .landing__buttonGroup {
                margin: initial;

                .buttonGroup__button {
                    width: 239px;
                    height: 65px;
                    font-size: 23px;
                }
            }
        }

        .home__intro__whatis {
            background-color: white;
            background-image: url("~/assets/index/bg_home4.svg");
            background-size: cover;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            padding: 72px 11vw 76px 17vw;

            .whatis__image {
                width: 506px;
                height: 329px;
                margin-right: 8vw;
            }

            .whatis__header {
                margin-top: 52px;
                font-size: 50px;
                font-weight: bold;
            }

            .whatis__line {
                margin: 41px 0 50px 0;
            }

            .whatis__description {
                font-size: 23px;
                line-height: 1.58;
            }
        }

        .home__intro__section1 {
            padding: 100px 7vw 100px 10vw;

            .section1__headerGroup {
                justify-content: center;
                margin-bottom: 100px;

                .section1__badge {
                    width: 14px;
                    height: 56px;
                    margin: 0 10px 0 0;
                    background-color: #eeb540;
                    align-self: center;
                }

                .section1__header {
                    font-size: 50px;
                    font-weight: bold;
                    align-self: center;
                    margin: 0;
                }
            }

            .section1__body {
                display: flex;

                .body__textGroup {
                    margin-right: 14vw;

                    .section1__subtitle {
                        font-size: 36px;
                        min-height: 58px;
                    }

                    .section1__line {
                        background-color: #5ea88e;
                    }

                    .section1__description {
                        font-size: 23px;
                        color: #707070;
                    }
                }

                .section1__body__image {
                    width: 675px;
                    height: 431px;
                }
            }
        }

        .home__intro__section2 {
            padding: 0;
            background-image: url("~/assets/index/section2__background__desktop.jpg");
            display: flex;
            justify-content: flex-end;

            .section__textGroup {
                height: 766px;
                width: 748px;
                padding: 89px 1vw 114px 5vw;
                background-image: url("~/assets/index/section2__background.svg");
                margin-right: 11vw;

                .section2__subtitle {
                    font-size: 36px;
                    min-height: 58px;
                }

                .section2__line {
                    border-bottom: 1px solid white;
                    background-color: white;
                }

                .section2__description {
                    font-size: 23px;
                }
            }
        }

        .home__intro__section3 {
            padding: 66px 0 132px 10vw;
            min-height: 778px;
            background-image: url("~/assets/index/img_home3.svg");
            background-size: 499px 718px;
            background-repeat: no-repeat;
            background-position: right 0px top 20px;

            .section3__image {
                height: 718px;
            }

            .section3__textGroup {
                width: 640px;

                .section3__subtitle {
                    font-size: 36px;
                    min-height: 58px;
                }

                .section3__description {
                    font-size: 23px;
                }
            }

            .section3__buttonGroup {
                margin: initial;
            }
        }
    }
}
</style>