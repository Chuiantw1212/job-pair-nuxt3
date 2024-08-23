<template>
    <div class="consult">
        <div class="d-md-none">
            <div class="consult__headerGroup">
                <img class="consult__header" src="~/assets/consult/header.png"></img>
                <a class="consult__anchor" href="https://lifecareerdesigner.com/" target="_blank">
                    <button class="consult__btn">了解更多</button>
                </a>
            </div>
            <img class="consult__image" src="~/assets/consult/image1.png"></img>
            <img class="consult__image" src="~/assets/consult/image2.png"></img>
            <div class="consult__card">
                <img class="consult__image" src="~/assets/consult/image3.png"></img>
                <button class="consult__btn consult__btn--outline">諮詢師列表</button>
            </div>
            <div class="consult__card">
                <a class="consult__anchor" href="https://lifecareerdesigner.com/" target="_blank">
                    <img class="consult__image" src="~/assets/consult/image4.png"></img>
                    <button class="consult__btn consult__btn--outline">了解更多</button>
                </a>
            </div>
        </div>
        <div class="d-none d-md-block w-100">
            <div class="consult__background">
                <div class="consult__imageGroup consult__imageGroup--absolute">
                    <img class="consult__image" src="~/assets/consult/desktop1.png">
                    </img>
                    <a class="consult__anchor" href="https://lifecareerdesigner.com/" target="_blank">
                        <button class="imageGroup__btn">了解更多</button>
                    </a>
                </div>
            </div>
            <img class="consult__image consult__image--mt" src="~/assets/consult/desktop2.png"></img>
            <div class="consult__card">
                <img class="consult__image" src="~/assets/consult/desktop3.png"></img>
                <a class="consult__anchor" href="https://lifecareerdesigner.com/about/#member" target="_blank">
                    <button class="card__btn">諮詢師列表</button>
                </a>
            </div>
            <div class="consult__card">
                <img class="consult__image" src="~/assets/consult/desktop4.png"></img>
                <a class="consult__anchor" href="https://lifecareerdesigner.com/" target="_blank">
                    <button class="card__btn">了解更多</button>
                </a>
            </div>
        </div>
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
    background: white;

    .consult__headerGroup {
        text-align: center;

        .consult__header {
            width: 100%;
        }
    }

    .consult__anchor {
        text-decoration: none;
    }

    .consult__btn {
        border-radius: 100px;
        border: 2px solid #50BDBC;
        display: block;
        padding: 10px 30px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        background: inherit;
        color: #50BDBC;
        font-family: "PingFang TC";
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        max-width: 275px;
        margin: auto;
        margin-top: 40px;
    }

    .consult__btn--outline {
        border-radius: 100px;
        border: 2px solid #50BDBC;
        background: #50BDBC;
        color: white;
    }

    .consult__imageGroup {
        .imageGroup__btn {
            position: absolute;
            z-index: 10;
            bottom: 20%;
            left: 20%;
            border-radius: 100px;
            border: 2px solid #50BDBC;
            color: #50BDBC;
            font-family: "PingFang TC";
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            padding: 10px 30px;
            background: inherit;
        }
    }

    .consult__image {
        width: 100%;
    }

    .consult__card {
        border-radius: 30px;
        background: #DCF2F2;
        padding: 30px;
        margin-top: 40px;
    }
}

@media screen and (min-width: 768px) {
    .consult {
        padding-bottom: 75px;

        .consult__background {
            background: #DCF2F2;
            width: 100%;
            min-height: 377px;
            position: absolute;
            left: 0px;
            z-index: 10;
        }


        .consult__imageGroup--absolute {
            width: 100%;
            position: absolute;
            left: 50%;
            top: 0px;
            transform: translate(-50%, 0);
            max-width: 1296px;

            .background__btn {
                border-radius: 100px;
                border: 2px solid #50BDBC;
                display: block;
                padding: 10px 30px;
                justify-content: center;
                align-items: center;
                gap: 10px;
                align-self: stretch;
                background: inherit;
                color: #50BDBC;
                font-family: "PingFang TC";
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                max-width: 275px;
                top: 410px;
                left: 320px;
                position: absolute;
            }
        }

        .consult__image--mt {
            margin-top: 45vw;
        }

        .consult__card {
            padding: 40px;
            margin-top: 70px;

            .card__btn {
                display: flex;
                width: fit-content;
                padding: 10px 30px;
                justify-content: center;
                align-items: center;
                gap: 10px;
                border-radius: 100px;
                border: 2px solid #50BDBC;
                background: #50BDBC;
                color: #FFF;
                font-family: "PingFang TC";
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                margin-left: 200px;
                margin-top: 20px;
            }
        }
    }
}

@media screen and (min-width: 1140px) {
    .consult {
        .consult__image--mt {
            margin-top: 600px;
        }
    }
}
</style>