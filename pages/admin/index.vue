<template>
    <div class="companyHome">
        <div class="container__banner">
            <div class="glide">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        <li class="glide__slide">
                            <img v-if="device.state.isDesktop" class="banner__image"
                                src="~/assets/admin/index/img_banner2.png">
                            <img v-else class="banner__image" src="~/assets/admin/index/img_banner_phone@2x.png">
                        </li>
                    </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&lt;</button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">></button>
                </div>
                <div class="glide__bullets" data-glide-el="controls[nav]">
                    <button class="glide__bullet" data-glide-dir="=0"></button>
                    <button class="glide__bullet" data-glide-dir="=1"></button>
                </div>
            </div>
            <button class="companyHome__btn banner__button" @click="openAdminModal()">
                免費加入
            </button>
        </div>
        <div class="container__section">
            <h2 class="section__header">大缺工時代，人難找嗎？</h2>
            <img class="d-none d-lg-block section__decoration section__decoration--1"
                src="~/assets/admin/index/MaskGroup.png">
            <img class="d-none d-lg-block section__decoration section__decoration--2"
                src="~/assets/admin/index/Group459.png">
            <div class="section__card section__card--left">
                <img class="section__image section__image--1" src="~/assets/admin/index/img1@2x.png" />
                <h3 class="card__header">
                    <span class="header__decoration">
                        不花錢買廣告
                    </span>
                    ，很難被看見？
                </h3>
                <div class="card__body">求職者在搜尋職缺時，是透過「適配度」排序，讓適合的人才更快看到你的公司。</div>
            </div>
            <div class="section__card section__card--right">
                <img class="section__image section__image--2" src="~/assets/admin/index/img2.png" />
                <h3 class="card__header">
                    要怎麼<span class="header__decoration">提升招聘效能</span>，減少時間成本呢？
                </h3>
                <div class="card__body">透過「適配度」排序，不用一下子看上百封履歷，直接從最適合的人選評估安排面試優先順序。</div>
            </div>
            <div class="section__card section__card--left">
                <img class="section__image section__image--3" src="~/assets/admin/index/img3.png" />
                <h3 class="card__header">
                    好不容易徵到人，<span class="header__decoration">怎麼又離職了</span>？
                </h3>
                <div class="card__body">讓用人單位自行決定用人偏好，降低到職後因文化、合作與溝通模式的落差而產生流動率。</div>
            </div>
        </div>
        <div class="container__section container__section--blue">
            <h2 class="section__header">用最快、最有效的專業方式找到最精準的人才</h2>
            <div class="section__body">
                <div class="section__card mt-4">
                    <div class="card__headerGroup">
                        <img class="header__image" src="~/assets/admin/index/img4@2x.png" />
                        <div class="header__text">提升招聘效能</div>
                    </div>
                    <div class="card__body">人們傾向相信自己意願的選擇；透過求職偏好的篩選，所選出的職缺，不是依據公司大小、品牌知名度，而是個人的需求，強化人選投遞的意願。<br><br>
                        只要在Job Pair上架職缺，所收到的履歷可以透過「適配度」排序，因此人資不用一下子看上百封履歷，還能透過「適配度」來安排面試的優先順序。</div>
                </div>
                <div class="section__card mt-4">
                    <div class="card__headerGroup">
                        <img class="header__image" src="~/assets/admin/index/img5@2x.png" />
                        <div class="header__text">精準找到合適人選</div>
                    </div>
                    <div class="card__body">
                        每位主管需求與做事方法都不一樣，除了工作職掌，合作與溝通模式也是重點。然求職者為了獲取工作機會，面試時會刻意表現出高度配合，難以判斷到職後能否融入組織。<br><br>
                        Job Pair讓用人單位自行決定用人偏好，讓符合主管需求的求職者投遞履歷，降低到職後因文化、合作與溝通模式的落差而產生流動率。</div>
                </div>
                <div class="section__card mt-4">
                    <div class="card__headerGroup">
                        <img class="header__image" src="~/assets/admin/index/img6@2x.png" />
                        <div class="header__text">節省成本</div>
                    </div>
                    <div class="card__body">
                        根據美國人力資源管理協會的報告指出，一位因不適應公司文化離職的員工，浪費的人事成本可以高達其年薪的50%-60%。<br><br>

                        在Job Pair上架職缺，透過精心設計的用人偏好，讓適合的人加入不只強化企業文化，人資與用人單位更能有效率的招募到人選，進而減少成本、流動率，提升績效與組織凝聚力。
                    </div>
                </div>
            </div>
        </div>
        <div class="container__section container__section--affiliate">
            <h2 class="affiliate__header">我們的合作夥伴</h2>
            <div class="affiliate__body">
                <NuxtLink v-for="(item, index) in state.affiliate" class="body__imageWrap" :key="index"
                    :to="`/company/${item.organizationId}`">
                    <img class="body__image" :src="item.logo" />
                </NuxtLink>
            </div>
            <h2 class="affiliate__header mt-5">我們的合作對象</h2>
            <div class="affiliate__body">
                <NuxtLink v-for="(item, index) in state.jobProvider" class="body__imageWrap" :key="index"
                    :to="`/company/${item.organizationId}`">
                    <img class="body__image" :src="item.image" />
                </NuxtLink>
            </div>
        </div>
        <div class="container__footer">
            <img class="footer__image d-lg-none" src="~/assets/admin/index/bg3.png">
            趕快加入 搶人才
            <button class="companyHome__btn footer__button" @click="openAdminModal()">免費加入</button>
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
            if (item.image) {
                logoMap[item.organizationId] = item
            }
        })
        state.jobProvider = Object.values(logoMap)
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
.companyHome {
    .companyHome__btn {
        background-color: #ffd600;
        border: none;
        border-radius: 21.5px;
        font-size: 22px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #332b00;
        padding: 6px 24px;
        white-space: nowrap;
        box-shadow: 0 7px #b29600;
    }

    .container__banner {
        .banner__image {
            width: 100%;
        }

        position: relative;

        .banner__button {
            position: absolute;
            left: 50%;
            bottom: 16vw;
            transform: translateX(-50%);
            width: 135px;
        }
    }



    .container__section {
        text-align: center;
        padding: 39px 26px;
        background-color: #f7f8fc;

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
            color: #332b00;
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

        .section__image {
            left: 50%;
            transform: translate(-50%, 20px);
            position: absolute;
            bottom: 100%;
        }

        .section__image--1 {
            width: 195px;
            height: 225px;
        }

        .section__image--2 {
            width: 320px;
            height: 213px;
        }

        .section__image--3 {
            width: 247px;
            height: 227px;
        }

        .section__card {
            border-radius: 10px;
            border: solid 1px #806b00;
            background-color: #fff;
            padding: 30px 20px;
            text-align: left;
            position: relative;
        }

        .section__card--left {
            margin-top: 250px;
        }

        .section__card--right {
            margin-top: 250px;
        }

        .card__header {
            font-size: 24px;
            font-weight: bold;
            line-height: 1.5;
            color: #332b00;

            .header__decoration {
                text-decoration-line: underline;
                text-decoration-thickness: 8px;
                text-decoration-color: #ffd600;
            }
        }

        .card__body {
            margin-top: 10px;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #707070;
        }

        .card__headerGroup {
            font-size: 20px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: #333;

            .header__text {
                margin-top: 20px;
                font-size: 20px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                color: #333;
            }
        }
    }

    .container__section--blue {
        background-color: #dae7fd;
    }

    .container__footer {
        position: fixed;
        bottom: 0;
        z-index: 10;
        width: 100%;
        background-color: #f7f8fc;
        height: 60px;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        color: #332b00;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.1);

        .footer__image {
            width: 70px;
            height: 51px;
            position: absolute;
            bottom: 0;
            left: 15px;
        }

        .footer__button {
            background-color: #ffd600;
            border: none;
            border-radius: 21.5px;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
            color: #332b00;
            padding: 6px 19px;
            white-space: nowrap;
            box-shadow: 0 7px #b29600;
            position: absolute;
            right: 15px;
            top: 11px;
        }
    }
}

@media screen and (min-width: 992px) {
    .companyHome {
        .container__banner {
            position: relative;

            .banner__button {
                position: absolute;
                left: 50%;
                bottom: 3.5vw;
                transform: translateX(-50%);
                width: 239px;
                height: 60px;
                border-radius: 100px;
            }
        }

        .container__section {
            // min-height: 986px;
            position: relative;
            padding: 60px 0;

            .section__header {
                font-size: 42px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: center;
                color: #332b00;
            }


            .section__card {
                position: relative;
                max-width: 1072px;
                margin: 100px auto auto auto;
            }

            .section__body {
                display: flex;
                gap: 50px;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.7;
                letter-spacing: normal;
                text-align: left;
                color: #707070;
                justify-content: center;

                .section__card {
                    min-height: 630px;
                    max-width: 362px;
                    margin: 0;
                    padding: 40px 30px;

                    .card__headerGroup {
                        margin: 20px 0;
                        font-size: 24px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.5;
                        letter-spacing: normal;
                        color: #333;
                    }
                }
            }

            .section__card--left {
                padding-left: 250px;
            }

            .section__card--right {
                padding-right: 300px;
            }

            .section__image {
                position: absolute;
                bottom: -10px;
                transform: none;
                z-index: 1;
            }



            .section__image--1 {
                left: 0;
            }

            .section__image--2 {
                right: -10px;
                left: inherit;
            }

            .section__image--3 {
                left: -10px;
            }


            .section__decoration {
                position: absolute;
            }

            .section__decoration--1 {
                left: 0;
                top: 10px;
            }

            .section__decoration--2 {
                right: 0;
                bottom: 10px;
            }

        }

        .container__section--blue {
            background-image: url('~/assets/admin/index/bg1.png');
        }

        .container__footer {
            position: relative;
            height: 202px;
            font-size: 38px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: #332b00;
            background-image: url('~/assets/admin/index/bg2.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: bottom;

            .footer__button {
                position: relative;
                right: unset;
                top: unset;
                width: 239px;
                height: 60px;
                font-size: 22px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.3;
                letter-spacing: normal;
                border-radius: 100px;
                color: #332b00;
                margin-left: 40px;
            }
        }
    }
}
</style>