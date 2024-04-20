<template>
    <div class="topup">
        <h1 class="topup__title">選擇訂閱方案</h1>
        <div class="topup__desc">可隨時升級或取消</div>
        <div class="topup__toggleWrap">
            <AtomInputToggle class="topup__toggle" v-model="state.test"></AtomInputToggle>
        </div>
        <div class="topup__cardGroups">
            <div class="topup__card">
                <div class="card__title">Free</div>
                <div class="card__plan">
                    <span class="plan__number">
                        $0
                    </span>
                    <span class="plan__type">per month</span>
                </div>
                <hr class="card__hr">
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">企業刊登職缺免費
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">AI功能建立職缺與收取應徵履歷
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">應徵人選適配度
                </div>
                <LazyAtomBtnSimpleV2 class="card__btn" outline>訂閱</LazyAtomBtnSimpleV2>
            </div>
            <div class="topup__card">
                <div class="card__title">基礎型</div>
                <div class="card__plan">
                    <span class="plan__number">
                        $699
                    </span>
                    <span class="plan__type">per month</span>
                </div>
                <hr class="card__hr">
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">包含免費方案所有功能
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">升級至基礎客製化頁面（最多五個欄位可自由設計）
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">適合對象： 微型企業，渴望打造具有獨特風格的企業形象頁面，以吸引客戶和潛在人才。
                </div>
                <LazyAtomBtnSimpleV2 class="card__btn" outline>訂閱</LazyAtomBtnSimpleV2>
            </div>
            <div class="topup__card">
                <div class="card__title">標準型</div>
                <div class="card__plan">
                    <span class="plan__number">
                        $0
                    </span>
                    <span class="plan__type">per month</span>
                </div>
                <hr class="card__hr">
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">包含免費方案所有功能
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">提升至專業客製化頁面（最多十個欄位可自由設計）
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">無限觀看潛在合適人選的適配度
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">發送邀請給 100 位潛在合適人選
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">適合對象：
                    一般企業，建立具有專業企業文化風格的形象頁面，加強僱主品牌，並主動聯繫潛在合適人選，擴大企業影響力。
                </div>
                <LazyAtomBtnSimpleV2 class="card__btn" outline>訂閱</LazyAtomBtnSimpleV2>
            </div>
            <div class="topup__card">
                <div class="card__title">專業型</div>
                <div class="card__plan">
                    <span class="plan__number">
                        $2899
                    </span>
                    <span class="plan__type">per month</span>
                </div>
                <hr class="card__hr">
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">包含免費方案所有功能
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">提升至專業客製化頁面（最多十個欄位可自由設計）
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">無限觀看潛在合適人選的適配度
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">無限發送邀請給潛在合適人選
                </div>
                <div class="card__item">
                    <img class="item__img" src="@/assets/admin/topup/Check.svg">適合對象：
                    中大型企業，希望透過客製化頁面和廣泛的潛在人選邀請，更有效地推廣企業形象和吸引人才。
                </div>
                <LazyAtomBtnSimpleV2 class="card__btn" outline>訂閱</LazyAtomBtnSimpleV2>
            </div>
        </div>
    </div>
</template>
<script setup>
const state = reactive({
    test: ''
})
</script>
<style lang=scss scoped>
.topup {
    padding-top: 20px;
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

    .topup__card {
        border: 1px solid #EDEAEA;
        border-radius: 10px;
        overflow: hidden;
        background-color: white;
        padding: 30px;
        margin-top: 20px;
        text-align: left;

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

        .card__btn {
            width: 100%;
            margin-top: 30px;
        }
    }
}

@media screen and (min-width:992px) {
    .topup {
        .topup__cardGroups {
            display: flex;
            gap: 20px;
            justify-content: center;

            .topup__card {
                max-width: 245px;
            }
        }
    }

}
</style>