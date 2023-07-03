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
        <div class="topup__card">
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
                        刊登筆數無上限
                    </div>
                </li>
                <li class="list__item">
                    <div>
                        <img src="@/assets/admin/topup/Vector.svg" />
                        品牌0到1
                    </div>
                </li>
                <!-- <li></li> -->
            </ul>
        </div>
        <div class="topup__card">
            <img src="@/assets/admin/topup/841.png" />
        </div>
        <div class="topup__card">
            <img src="@/assets/admin/topup/881.png" />
        </div>
        <div class="topup__card">
            <img src="@/assets/admin/topup/885.png" />
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
        min-height: 152px;
        padding: 40px 20px;
    }

    .topup__section2 {
        padding: 20px;
        border-top: 7px solid #5ea88e;
        background-color: #fff;
        margin-top: 20px;
        border-radius: 7px 7px 0 0;
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
                }
            }
        }

        .card__list {
            list-style: none;
            width: fit-content;
            margin: auto;
        }
    }
}
</style>