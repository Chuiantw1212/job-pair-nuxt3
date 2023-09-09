<template>
    <div class="organizationBg">
        <div class="organizationBg__body">
            <LazyAtomInputCkeditorInline v-model="controllable.title.html" :toolbar="state.toolbar" class="body__title">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-model="controllable.desc.html" :toolbar="state.toolbar" class="body__desc">
            </LazyAtomInputCkeditorInline>
        </div>
        <div class="organizationBg__imageWrap">
            <img class="imageWrap__image" src="./screen.png" draggable="false">
        </div>
    </div>
</template>
<script>
export default {
    name: 'background',
}
</script>
<script setup>
const controllable = reactive({
    // Card1
    title: {
        isFocused: false,
        position: {
            left: 0,
            top: 0,
        },
        html: '<p style="text-align:center;"><span style="font-size:36px;"><strong>公司背景介紹</strong></span></p>'
    },
    desc: {
        html: `<p style="text-align:justify;">關於Job Pair Job&nbsp;<br>Pair 是一家致力於打造更友善、更有效率的人才媒合市場的公司。&nbsp;</p><p style="text-align:justify;">Job Pair 的創辦人 Sandy 擁有 8 年科技業獵頭經驗，累計超過萬人的履歷面談。2015年，她開始提供一對一職涯諮詢的服務，並解決了超過千人的職涯問題。多年來，Sandy 一直從不同的角度思考「如何找到適合的工作」，發現人才媒合市場需要更多考量軟性需求的功能。這些軟性需求包括企業文化、工作環境、人際交流與溝通模式等。&nbsp;</p><p style="text-align:justify;">因此，我們打造了一個新型態的媒合型人力銀行，不論求職者或企業都能夠先以雙方的軟性需求進行第一步演算，提供團隊適配度給雙方參考。跳脫了僅能以地區、薪資、職務類別、產業等硬性需求評估職缺，或者以性別、年齡、學歷等表象資訊評估求職者。</p><p style="text-align:justify;">&nbsp;Job Pair 為你從適合的角度切入，打造長遠的合作關係。</p>`
    },
})
const state = reactive({
    toolbar: [
        'fontSize',
        '|',
        'bold',
        'alignment',
    ]
})
</script>
<style lang="scss" scoped>
.organizationBg {
    display: flex;
    justify-content: space-evenly;
    padding: 50px 0px;
    align-items: center;
    flex-direction: column;

    .organizationBg__body {

        .body__title {
            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #1e3240;
        }

        .body__desc {
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #878787;
            max-width: 540px;
        }
    }

    .organizationBg__imageWrap {
        border-radius: 20px;
        overflow: hidden;
        margin-top: 20px;

        .imageWrap__image {
            display: block;
        }
    }
}

@media screen and (min-width: 992px) {
    .organizationBg {
        flex-direction: row;

        .organizationBg__imageWrap {
            margin-top: 0px;
        }
    }
}
</style>