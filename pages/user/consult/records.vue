<template>
    <div class="consult">
        <img class="consult__banner" src="~/assets/consult/img_banner.png" />
        <div v-if="device.state.isLarge" class="consult__themeDesktop">
            <div class="themeDesktop__card">
                <div class="card__header">
                    <img class="header__image" src="~/assets/consult/img2.webp" onerror="this.style.display = 'none'" />
                    <div class="header__header">{{ state.careerCard.title }}</div>
                    <!-- <div class="header__sub">釐清你的職業方向</div> -->
                </div>
                <div class="card__body">
                    <div class="body__title">關於</div>
                    <div class="body__desc">
                        {{ state.careerCard.desc }}
                    </div>
                    <div class="body__title">
                        適合想解決
                    </div>
                    <ul class="body__desc">
                        <li v-for="(item, index) in state.careerCard.list" :key="index">{{ item }}</li>
                    </ul>
                </div>
                <div class="card__footer">
                    <div class="footer__price">
                        NT.2000 - 1小時
                    </div>
                    <NuxtLink class="footer__link" :to="`/user/consult/appointment/career`">
                        <LazyAtomBtnSimple class="footer__link__button w-100">
                            立即預約
                        </LazyAtomBtnSimple>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <LazyMoleculeConsultCard v-else class="consult__themeMobile">
            <template v-slot:header>
                <img class="me-1" src="~/assets/consult/icon_Heart.svg">
                諮詢主題類型
            </template>
            <template v-slot:body>
                <!-- <ul v-if="repoSelect.state.selectByQueryRes && repoSelect.state.selectByQueryRes.consultService"
                    class="themeMobile__list">
                    <li v-for="(service, index) in repoSelect.state.selectByQueryRes.consultService" :key="index"
                        class="themeMobile__list__item">
                        <div class="themeMobile__list__item__content"
                            :class="{ 'themeMobile__list__item__content--active': state.activeTab === service.value }"
                            @click="setActiveTab(service)">{{ service.text }}
                        </div>
                    </li>
                </ul> -->
                <div class="themeMobile__main">
                    <template v-if="state.activeTab === 'career'">
                        <div class="main__headerGroup">
                            <img class="headerGroup__image" src="~/assets/consult/img2.webp"
                                onerror="this.style.display = 'none'" />
                            <h2 class="headerGroup__header">盤點線索探索職業方向</h2>
                            <!-- <div class="headerGroup__desc">釐清你的職業方向</div> -->
                        </div>
                        <div class="main__body">
                            <div class="body__header">關於</div>
                            <div class="body__text">
                                美國 O-NET 系統把職業分成 1,000 多種，但大部分的人講得出來的職業，大概只有 5-6
                                種，在那麼稀少的選項當中要找到適合的工作，是非常困難的。但只要我們對職業的眼界打開了，就很容易找到適合自己的路，並在對的賽道長期累積。
                                職涯諮詢由專業的諮詢師團隊生涯設計師提供服務，帶你盤點性格/適合的組織/工作型態/工作價值觀/動機並找出共通點，綜合評估您過往經驗後制定長期行動方案，讓你的求職之路更加精準有效率！
                            </div>
                            <div class="body__header">適合想解決</div>
                            <div class="body__text">
                                <ul class="main__body__list">
                                    <li>適合的工作是什麼？有哪些方向？特徵？線索？</li>
                                    <li>轉職沒頭緒，先後順序要注意什麼？如何取捨？（地點？薪資？未來性？）</li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="themeMobile__footer">
                    <div class="footer__price">NT.2000 - 1小時</div>
                    <NuxtLink class="footer__link" :to="`/user/consult/appointment/${state.activeTab}`">
                        <LazyAtomBtnSimple class="footer__link">
                            立即預約
                        </LazyAtomBtnSimple>
                    </NuxtLink>
                </div>
            </template>
        </LazyMoleculeConsultCard>
        <LazyMoleculeFeedbackList v-model="state.feedbacks" class="mt-2"></LazyMoleculeFeedbackList>
        <LazyMoleculeConsultCard class="consult__record mt-2">
            <template v-slot:header>
                <img class="me-1" src="~/assets/consult/icon_record.svg">
                預約紀錄
            </template>
            <template v-slot:body>
                <div class="record__content">
                    <div v-if="state.records.length" class="content__tableWrapper">
                        <table class="table table-striped record__table">
                            <thead>
                                <tr class="table__row">
                                    <th>
                                        <div class="row__cell--first">
                                            安排時段
                                        </div>
                                    </th>
                                    <th>預約服務</th>
                                    <th>生涯設計師</th>
                                    <th>
                                        建立預約時間
                                    </th>
                                    <th>付款狀態</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in state.records" :key="index" class="table__row">
                                    <td>
                                        <div v-if="item.time.start" class="row__cell row__cell--first">
                                            {{ $time(item.time.start) }}
                                        </div>
                                        <div v-else class="row__cell row__cell--first">
                                            安排中
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row__cell">
                                            {{ getServiceText(item.service) }}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row__cell">
                                            {{ getConsultantName(item.consultantId) }}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row__cell">
                                            {{ $time(item.date) }}
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="item.status === 'scheduled'"
                                            class="row__cell row__cell--last row__cell--paid">
                                            預約完成
                                        </div>
                                        <div v-if="item.status === 'paid'"
                                            class="row__cell row__cell--last row__cell--paid">
                                            付款完成
                                        </div>
                                        <button v-if="item.status === 'unpaid'"
                                            class="row__cell row__cell--last row__cell--unpaid"
                                            @click="payUnpaidItem(item)">
                                            <template v-if="item.RtnCode">
                                                付款失敗
                                            </template>
                                            <template v-else>
                                                未付款
                                            </template>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="!state.records.length" class="content__noRecord">
                        <img class="noRecord__icon" src="~/assets/consult/icon5.svg" />
                        <div class="noRecord__textGroup">
                            <div class="noRecord__line1">還沒有預約記錄</div>
                            <div class="noRecord__line2">讓以下生涯設計師陪你找定位、解決問題吧</div>
                        </div>
                    </div>
                </div>
            </template>
        </LazyMoleculeConsultCard>
    </div>
</template>
<script setup>
const { $time, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const device = useDevice()
const repoConsult = useRepoConsult()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const state = reactive({
    records: [],
    consultants: [],
    feedbacks: [],
    activeTab: 'career',
    careerCard: {
        title: '盤點線索探索職業方向',
        desc: `美國 O-NET 系統把職業分成 1,000 多種，但大部分的人講得出來的職業，大概只有 5-6 種，在那麼稀少的選項當中要找到適合的工作，是非常困難的。
        但只要我們對職業的眼界打開了，就很容易找到適合自己的路，並在對的賽道長期累積。
        職涯諮詢由專業的諮詢師團隊生涯設計師提供服務，帶你盤點性格/適合的組織/工作型態/工作價值觀/動機並找出共通點，綜合評估您過往經驗後制定長期行動方案，讓你的求職之路更加精準有效率！`,
        list: ['更精準的職缺配對', '專業的盤點與梳理', '完整的諮詢報吿書']
    }
})
// hooks
useHead({
    title: '職涯諮詢 - 會員中心'
})
onMounted(async () => {
    const consultantsRes = await repoConsult.getConsultants()
    const consultants = consultantsRes.data
    let allFeedbacks = []
    consultants.forEach((consultant) => {
        const { name = "", feedbacks = [] } = consultant
        feedbacks.forEach((feedback) => {
            feedback.to = name
        })
        allFeedbacks = [...allFeedbacks, ...feedbacks]
    })
    state.feedbacks = shuffle(allFeedbacks)
    state.consultants = shuffle(consultants) // method有用到
})
watch(() => repoAuth.state.user, async (user) => {
    if (user && user.id) {
        const dateInstance = new Date()
        const date = dateInstance.getDate()
        dateInstance.setDate(date - 30)
        const isoString = dateInstance.toISOString()
        // 取30天內的預約紀錄
        const recordRes = await repoConsult.getConsultRecords({
            status: ['scheduled', 'paid', 'unpaid'],
            userId: user.id,
            dateMin: isoString,
        })
        // 如果有RtnCode代表有從綠界收到付款回應
        state.records = recordRes.data
    }
}, { immediate: true })
// methods
async function payUnpaidItem({ id }) {
    const result = await repoConsult.patchUnpaidRecord(id)
    document.write(result)
}
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[rand]] = [array[rand], array[i]]
    }
    return array
}
function getServiceText(service) {
    const { consultService = [] } = repoSelect.state.selectByQueryRes
    const targetItem = consultService.find((item) => {
        return item.value === service
    })
    if (targetItem) {
        return targetItem.text
    }
}
function getConsultantName(id) {
    if (id === "recommend") {
        return "生涯設計師"
    }
    const consultant = state.consultants.find((item) => {
        return item.id === id
    })
    if (consultant) {
        return consultant.name
    }
}
</script>
<style lang="scss" scoped>
.consult {
    padding-bottom: 20px;

    .consult__banner {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }

    .consult__themeMobile {
        margin-top: 20px;

        .themeMobile__list {
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #ddd;


            .themeMobile__list__item {
                padding: 0 10px;

                .themeMobile__list__item__content {
                    padding: 10px 8px;
                    border-bottom: 2px solid white;
                    color: #5ea88e;
                    font-size: 15px;
                    line-height: 1.3;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .themeMobile__list__item__content--active {
                    border-bottom: 2px solid #5ea88e;
                }
            }
        }

        .themeMobile__main {
            margin-top: 20px;

            .main__headerGroup {
                text-align: center;

                .headerGroup__image {
                    width: 84px;
                    height: 84px;
                }

                .headerGroup__header {
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 1.3;
                }

                .headerGroup__desc {
                    font-size: 18px;
                    line-height: 1.4;
                    color: #5ea88e;
                }
            }

            .main__body {
                padding: 0 20px;

                .body__header {
                    font-size: 16px;
                    color: #999;
                    margin-top: 20px;
                }

                .main__body__list {
                    margin: 0;
                    // margin-top: 8px;
                }

                .body__text {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #333;
                    margin-top: 8px;
                }

            }

        }

        .themeMobile__footer {
            text-align: center;
            padding: 20px;

            .footer__price {
                font-size: 18px;
                font-weight: bold;
                line-height: 1.3;
                color: #5ea88e;
            }

            .footer__link {
                width: 172px;
                margin: 10px auto auto auto;
                display: block;
                text-decoration: none;


            }
        }
    }

    .consult__record {

        .record__content {

            // padding: 10px 0px;
            .content__tableWrapper {
                overflow-x: scroll;

                .record__table {
                    width: 100%;
                    margin-bottom: 0px;

                    .table__row {

                        th {
                            white-space: nowrap;
                            color: #999;
                            font-weight: normal;
                        }

                        .row__cell {
                            min-height: 66px;
                            display: flex;
                            align-items: center;
                            white-space: nowrap;
                            color: #484848;
                            padding: 20px 0;
                        }

                        .row__cell--unpaid {
                            color: #5ea88e;
                            border: none;
                            background-color: inherit;
                        }

                        .row__cell--paid {
                            color: #eeb540;
                        }

                        .row__cell--first {
                            margin-left: 20px;
                        }
                    }
                }
            }

            .content__noRecord {
                padding: 20px;
                text-align: center;

                .noRecord__line1 {
                    margin-top: 20px;
                    color: #484848;
                }

                .noRecord__line2 {
                    margin-top: 8px;
                    color: #999;
                }
            }
        }
    }


}

@media screen and (min-width: 992px) {
    .consult {

        .consult__themeDesktop {
            display: flex;
            gap: 20px;
            margin-top: 20px;

            .themeDesktop__card {
                background-color: white;
                border-radius: 5px;
                border: solid 1px #d3d3d3;
                padding: 20px 20px 40px 20px;
                flex-grow: 1;
                flex-basis: 0;
                position: relative;

                .card__header {
                    text-align: center;

                    .header__image {
                        width: 200px;
                        height: 200px;
                        margin-top: 40px;
                    }

                    .header__header {
                        font-size: 34px;
                        font-weight: bold;
                        line-height: 1.3;
                        color: #333;
                        margin-top: 40px;
                    }

                    .header__sub {
                        font-size: 24px;
                        line-height: 1.4;
                        color: #0ab378;
                        margin-top: 4px;
                    }
                }

                .card__body {
                    .body__title {
                        font-size: 24px;
                        color: #999;
                        margin-top: 40px;
                    }

                    .body__desc {
                        font-size: 24px;
                        line-height: 1.5;
                        color: #333;
                    }
                }

                .card__footer {
                    text-align: center;
                    text-decoration: none;
                    width: 100%;

                    .footer__price {
                        font-size: 26px;
                        font-weight: bold;
                        color: #0ab378;
                    }

                    .footer__link {
                        width: 172px;
                        margin: 20px auto auto auto;
                        text-decoration: none;
                        display: block;
                    }
                }

                .card__footer--bottom {
                    position: absolute;
                    bottom: 40px;
                    left: 0;
                }
            }
        }

        .consult__record {
            .record__content {

                // padding: 0px 50px;
                .content__tableWrapper {
                    overflow-x: auto;

                    .record__table {
                        .table__row {
                            .row__cell {
                                padding: 32px 0px;
                            }

                            .row__cell--first {
                                margin-left: 40px;
                            }
                        }
                    }
                }

                .content__noRecord {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    padding: 45px;

                    .noRecord__icon {
                        width: 80px;
                        height: 80px;
                    }

                    .noRecord__textGroup {
                        text-align: left;
                        align-self: center;

                        .noRecord__line1 {
                            margin-top: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>