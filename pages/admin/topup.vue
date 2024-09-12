<template>
    <div class="container topup">
        <h1 class="topup__title">選擇訂閱方案</h1>
        <div class="topup__desc">可隨時升級或取消</div>
        <div class="topup__toggleWrap">
            <AtomInputToggle class="topup__toggle" v-model="state.test"></AtomInputToggle>
        </div>
        <div class="topup__cardGroups">
            <div class="topup__card">
                <div class="card__title">{{ subscription[0]?.text }}</div>
                <div class="card__plan">
                    <span class="plan__number">
                        ${{ Number(subscription[0]?.price).toLocaleString() }}
                    </span>
                    <span class="plan__type">/ month</span>
                </div>
                <hr class="card__hr">
                <ul class="card__ul">
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">企業刊登職缺免費
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">AI功能建立職缺與收取應徵履歷
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">應徵人選適配度
                    </li>
                </ul>
            </div>
            <div class="topup__card">
                <div class="card__title">{{ subscription[1]?.text }}</div>
                <div class="card__plan">
                    <span class="plan__number">
                        ${{ Number(subscription[1]?.price).toLocaleString() }}
                    </span>
                    <span class="plan__type">/ month</span>
                </div>
                <hr class="card__hr">
                <ul class="card__ul">
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">包含免費方案所有功能
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">升級至基礎客製化頁面（最多五個欄位可自由設計）
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">適合對象：
                        微型企業，渴望打造具有獨特風格的企業形象頁面，以吸引客戶和潛在人才。
                    </li>
                </ul>
                <LazyAtomBtnSimpleV2 class="card__btn" outline @click="subscribeSerice(subscription[1])">訂閱
                </LazyAtomBtnSimpleV2>
            </div>
            <div class="topup__card">
                <div class="card__title">{{ subscription[2]?.text }}</div>
                <div class="card__plan">
                    <span class="plan__number">
                        ${{ Number(subscription[2]?.price).toLocaleString() }}
                    </span>
                    <span class="plan__type">/ month</span>
                </div>
                <hr class="card__hr">
                <ul class="card__ul">
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">包含免費方案所有功能
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">提升至專業客製化頁面（最多十個欄位可自由設計）
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">無限觀看潛在合適人選的適配度
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">發送邀請給 100 位潛在合適人選
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">適合對象：
                        一般企業，建立具有專業企業文化風格的形象頁面，加強僱主品牌，並主動聯繫潛在合適人選，擴大企業影響力。
                    </li>
                </ul>
                <LazyAtomBtnSimpleV2 class="card__btn" outline @click="subscribeSerice(subscription[2])">訂閱
                </LazyAtomBtnSimpleV2>
            </div>
            <div class="topup__card">
                <div class="card__title">{{ subscription[3]?.text }}</div>
                <div class="card__plan">
                    <span class="plan__number">
                        ${{ Number(subscription[3]?.price).toLocaleString() }}
                    </span>
                    <span class="plan__type">/ month</span>
                </div>
                <hr class="card__hr">
                <ul class="card__ul">
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">包含免費方案所有功能
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">提升至專業客製化頁面（最多十個欄位可自由設計）
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">無限觀看潛在合適人選的適配度
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">無限發送邀請給潛在合適人選
                    </li>
                    <li class="card__item">
                        <img class="item__img" src="@/assets/admin/topup/Check.svg">適合對象：
                        中大型企業，希望透過客製化頁面和廣泛的潛在人選邀請，更有效地推廣企業形象和吸引人才。
                    </li>
                </ul>
                <LazyAtomBtnSimpleV2 class="card__btn" outline @click="subscribeSerice(subscription[3])">訂閱
                </LazyAtomBtnSimpleV2>
            </div>
        </div>
    </div>
</template>
<script setup>
const repoSelect = useRepoSelect()
const repoOrganization = useRepoOrganization()
const subscription = computed(() => {
    return repoSelect.state.selectByQueryRes?.subscription || []
})
const state = reactive({
    test: ''
})
// methods
async function subscribeSerice(subscription) {
    // const result = await $validate()
    // if (!result.isValid) {
    //     return
    // }
    // state.appointmentForm.userId = repoAuth.state.user.id
    // state.appointmentForm.amount = subscription.price
    // if (repoAuth.state?.user?.email === 'ian.chu@job-pair.com') {
    //     state.appointmentForm.amount = 5
    // }
    const response = await repoOrganization.postSubscription({
        amount: subscription.price,
        service: subscription.text,
    })
    document.write(response)
    // if (response.status !== 200) {
    //     state.consultants.forEach(item => {
    //         item.key = Math.random()
    //     })
    //     state.appointmentForm = {
    //         consultantId,
    //         service: service,
    //         question,
    //         time: {}, // 重新設定時段就好
    //     }
    //     return
    // }
    // document.write(response.data)
}
</script>
<style lang=scss scoped>
.topup {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    background-color: #F9F9F9;

    .topup__title {
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
    }

    .topup__desc {
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 20px;
    }

    .topup__toggleWrap {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

    .topup__cardGroups {


        .topup__card {
            border: 1px solid #EDEAEA;
            border-radius: 10px;
            overflow: hidden;
            background-color: white;
            padding: 30px;
            padding-bottom: 80px;
            margin-top: 20px;
            text-align: left;
            position: relative;
            width: 100%;

            .card__title {
                font-size: 24px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }

            .card__plan {
                margin-top: 20px;

                .plan__number {
                    font-size: 40px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 36px;
                    /* 90% */
                }

                .plan__type {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    /* 150% */
                }
            }

            .card__hr {
                margin: 30px 0px;
            }

            .card__ul {
                list-style: none;
                padding: 0px;
                margin: 0px;
                margin-bottom: 30px;

                .card__item {
                    text-align: left;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal;

                    .item__img {
                        margin-right: 16px;
                    }
                }
            }

            .card__btn {
                width: calc(100% - 30px);
                left: 15px;
                position: absolute;
                bottom: 30px;
            }
        }
    }
}

@media screen and (min-width:992px) {
    .topup {
        .topup__cardGroups {
            // display: flex;
            gap: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;

            .topup__card {

                // max-width: 245px;
                .card__ul {
                    min-height: 320px;
                }
            }
        }
    }

}
</style>