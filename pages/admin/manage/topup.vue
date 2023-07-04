<template>
    <div class="topup">
        <div class="topup__section1">
            ＂給你最彈性的使用！以點數計費，用多少 付多少！＂
        </div>
        <div class="topup__section2">
            開啟一個職缺時計費，每週自動扣一點（未滿一週以一週計）
            <br />
            每點 $100，往後儲值最低購買10點 $1000，用多少付多少！
        </div>
        <div class="topup__tableGroup">
            <div class="tableGroup__item tableGroup__header">
                <div class="header__plan">
                    方案
                </div>
                <div class="header__calculation">
                    計費方式
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    刊登筆數
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    人才搜尋
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    招募課程
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    面談技巧
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    品牌0到1
                </div>
            </div>
            <div class="tableGroup__item tableGroup__item--plan">
                <img class="item__icon" src="@/assets/admin/topup/851.png" />
                <div class="item__name">
                    免費
                    <div class="item__desc">
                        免費刊登
                    </div>
                </div>
                <div class="item__calculation">
                    免費刊登 <br /> 1 筆職缺
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    1筆
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/cross.svg" alt="cross" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/cross.svg" alt="cross" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/cross.svg" alt="cross" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/cross.svg" alt="cross" />
                </div>
            </div>
            <div class="tableGroup__item tableGroup__item--plan">
                <img class="item__icon" src="@/assets/admin/topup/881.png" />
                <div class="item__name">
                    10點
                </div>
                <div class="item__calculation">
                    免費刊登 <br /> 1 筆職缺
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    1筆
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
            </div>
            <div class="tableGroup__item tableGroup__item--plan">
                <img class="item__icon" src="@/assets/admin/topup/841.png" />
                <div class="item__name">
                    50點
                </div>
                <div class="item__calculation">
                    免費刊登 <br /> 1 筆職缺
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    1筆
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
            </div>
            <div class="tableGroup__item tableGroup__item--plan">
                <img class="item__icon" src="@/assets/admin/topup/881.png" />
                <div class="item__name">
                    100點
                </div>
                <div class="item__calculation">
                    免費刊登 <br /> 1 筆職缺
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    1筆
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
                <hr class="item__hr" />
                <div class="item__value">
                    <img src="@/assets/admin/topup/check.svg" alt="check" />
                </div>
            </div>
        </div>
        <div class="topup__card d-lg-none">
            <div class="card__header">
                <img src="@/assets/admin/topup/851.png" />
                <div class="header__textGroup">
                    <div class="textGroup__largeText">
                        免費
                    </div>
                    <div class="textGroup__smallText">
                        免費刊登職缺
                    </div>
                </div>
            </div>
            <hr />
            <ul class="card__list">
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        刊登筆數1筆
                    </div>
                </li>
            </ul>
            <LazyAtomBtnSimple class="btnSimple--outline--success card__btn">去看看</LazyAtomBtnSimple>
        </div>
        <div class="topup__card d-lg-none">
            <div class="card__header">
                <img src="@/assets/admin/topup/885.png" />
                <div class="header__textGroup">
                    <div class="textGroup__largeText">
                        10點 <span class="largeText__hightlight">省下 5％ 的費用</span>
                    </div>
                    <div class="textGroup__smallText">
                        NT$ <span class="smallText__hightlight">1,000</span>
                    </div>
                </div>
            </div>
            <hr />
            <ul class="card__list">
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        刊登筆數1筆
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        人才搜尋
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        招募課程
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        招募面談技巧
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        品牌0到1
                    </div>
                </li>
            </ul>
            <LazyAtomBtnSimple class="btnSimple--outline--success card__btn">去看看</LazyAtomBtnSimple>
        </div>
        <div class="topup__card d-lg-none">
            <div class="card__header">
                <img src="@/assets/admin/topup/841.png" />
                <div class="header__textGroup">
                    <div class="textGroup__largeText">
                        50點 <span class="largeText__hightlight">省下 5％ 的費用</span>
                    </div>
                    <div class="textGroup__smallText">
                        NT$ <span class="smallText__hightlight">4,700</span><del class="smallText__priceOff">$5,000</del>
                    </div>
                </div>
            </div>
            <hr />
            <ul class="card__list">
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        刊登筆數1筆
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        人才搜尋
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        招募課程
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        招募面談技巧
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        品牌0到1
                    </div>
                </li>
            </ul>
            <LazyAtomBtnSimple class="btnSimple--outline--success card__btn">去看看</LazyAtomBtnSimple>
        </div>
        <div class="topup__card d-lg-none">
            <div class="card__header">
                <img src="@/assets/admin/topup/881.png" />
                <div class="header__textGroup">
                    <div class="textGroup__largeText">
                        100點 <span class="largeText__hightlight">省下 10％ 的費用</span>
                    </div>
                    <div class="textGroup__smallText">
                        NT$ <span class="smallText__hightlight">9,000</span><del class="smallText__priceOff">$10,000</del>
                    </div>
                </div>
            </div>
            <hr />
            <ul class="card__list">
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        刊登筆數1筆
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        人才搜尋
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        招募課程
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        招募面談技巧
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        品牌0到1
                    </div>
                </li>
            </ul>
            <LazyAtomBtnSimple class="btnSimple--outline--success card__btn">去看看</LazyAtomBtnSimple>
        </div>
        <div class="topup__other">
            不確定哪個方案適合您？請與我們聯繫<br />
            <a class="other__email" href="mailto:support@job-pair.com">
                support@job-pair.com
            </a>
            <div class="other__gurantee">
                7天內退款保證（僅適用於首次訂閱）
            </div>
        </div>
    </div>
</template>
<style lang=scss>
.topup {


    .topup__section1 {
        background-color: #5ea88e;
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
    }

    .topup__section2 {
        padding: 20px;
        border-top: 7px solid #5ea88e;
        background-color: #fff;
        margin-top: 20px;
        border-radius: 7px 7px 0 0;
        text-align: center;
    }

    .topup__card {
        padding: 20px;
        background-color: #fff;
        margin-top: 20px;

        .card__header {
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: center;

            .header__textGroup {
                .textGroup__largeText {
                    font-size: 24px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    text-align: left;
                    color: #333;

                    .largeText__hightlight {
                        font-size: 13px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: normal;
                        text-align: left;
                        color: #5ea88e;
                    }
                }

                .textGroup__smallText {
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    text-align: left;
                    color: #333;

                    .smallText__hightlight {
                        font-size: 24px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: normal;
                        text-align: left;
                        color: #333;
                    }

                    .smallText__priceOff {
                        font-size: 13px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.62;
                        letter-spacing: normal;
                        text-align: left;
                        color: #7a7a7a;
                        margin-left: 5.5px;
                    }
                }
            }
        }

        .card__list {
            list-style: none;
            width: fit-content;
            margin: auto;
        }

        .card__btn {
            margin-top: 20px;
        }

    }

    .topup__other {
        font-size: 17px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #333;
        margin-top: 20px;

        .other__email {
            color: #5ea88e;
        }

        .other__gurantee {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: #333;
            margin-top: 11px;
        }
    }
}

@media screen and (min-width:992px) {
    .topup {
        .topup__section2 {
            max-width: 743px;
            margin: 30px auto auto auto;
        }

        .topup__tableGroup {
            display: flex;
            gap: 20px;
            margin-top: 30px;
            justify-content: space-between;


            .tableGroup__item {
                padding: 0 28px;
                text-align: center;
                border-radius: 10px;
                background-color: #e1ebf0;

                .item__hr {
                    // margin-top: 70px;
                }

                .item__value {
                    // margin-top: 70px;
                    text-align: center;
                    font-size: 22px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: center;
                    color: #000;
                    white-space: nowrap;
                    min-height: 173px;
                    line-height: 173px;
                }
            }

            .tableGroup__item--plan {
                flex-grow: 1;
                padding: 80px 28px;
                background-color: white;

                .item__icon {
                    width: 96px;
                    height: 96px;
                    display: block;
                    margin: auto;
                }

                .item__name {
                    font-size: 50px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: center;
                    color: #333;
                    margin-top: 100px;
                    min-height: 112px;
                }

                .item__desc {
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: center;
                    color: #333;
                }

                .item__calculation {
                    font-size: 22px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: center;
                    color: #000;
                    margin-top: 164px;
                }
            }

            .tableGroup__header {
                font-size: 22px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: center;
                color: #000;

                .header__plan {
                    margin-top: 227px;
                }

                .header__calculation {
                    margin-top: 291px;
                    min-height: 66px;
                }

            }
        }
    }
}
</style>