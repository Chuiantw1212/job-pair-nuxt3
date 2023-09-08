<template>
    <div class="banner2">
        <h2 class="banner__title">公司服務介紹</h2>
        <div class="banner2__body">
            <div class="body__card">
                <img class="card__image" src="@/assets/admin/design/organizationDesc/img4@2x.webp" format="webp"
                    loading="lazy" />
                <LazyAtomInputCkeditorInline v-model="controllable.card1Title.html" :toolbar="state.toolbar"
                    class="card__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-model="controllable.card1Desc.html" class="card__desc"
                    :toolbar="state.toolbar">
                </LazyAtomInputCkeditorInline>
            </div>
            <div class="body__card">
                <img class="card__image" src="@/assets/admin/design/organizationDesc/img5@2x.webp" format="webp"
                    loading="lazy" />
                <LazyAtomInputCkeditorInline v-model="controllable.card2Title.html" :toolbar="state.toolbar"
                    class="card__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-model="controllable.card2Desc.html" class="card__desc"
                    :toolbar="state.toolbar">
                </LazyAtomInputCkeditorInline>
            </div>
            <div class="body__card">
                <img class="card__image" src="@/assets/admin/design/organizationDesc/img6@2x.webp" format="webp"
                    loading="lazy" />
                <LazyAtomInputCkeditorInline v-model="controllable.card3Title.html" :toolbar="state.toolbar"
                    class="card__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-model="controllable.card3Desc.html" class="card__desc"
                    :toolbar="state.toolbar">
                </LazyAtomInputCkeditorInline>
            </div>
        </div>
    </div>
</template>
<script setup>
const controllable = reactive({
    // Card1
    card1Title: {
        isFocused: false,
        position: {
            left: 0,
            top: 0,
        },
        html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>解決生活焦慮</strong></span></p>'
    },
    card1Desc: {
        html: '<p>理想生活探索是透過專業引導，釐清個人內在的「價值觀」，並將內在需求與外在行動對焦，制訂相對應的行動，有意識的創造個人的理想生活。</p><p>本服務也有助於個人面對工作選擇或其他生涯抉擇時，下一個真正貼近個人內在需求的決策。</p>'
    },
    // Card2
    card2Title: {
        html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>釐清職業方向</strong></span></p>',
    },
    card2Desc: {
        html: '<p>職涯偏好探索，目的是探索合適的工作，需從「價值觀」與「個性」兩個層面做自我分析。</p><p>價值觀就是個人的信念、人生意義、道德觀念等組合，對應工作就是企業對文化、理念、願景的實踐；個性則是評估自己在什麼樣的工作環境、工作內容與什麼樣的主管合作，能更勝任愉快。</p><p>所以，評估適合的工作發展，兩者缺一不可。</p>'
    },
    // Card3
    card3Title: {
        html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>履歷與面試輔導</strong></span></p>'
    },
    card3Desc: {
        html: '<p>提供履歷與面試輔導的生涯設計師，除了來自不同產業的經驗，同時具備生涯設計的思維；不只從個人角度出發，還能從就業市場的角度，提供更全面的情報，為更好的職涯做準備。</p>'
    }
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
<style lang="scss">
.banner2 {
    background-color: rgba(42, 169, 132, 0.1);
    padding: 20px 0px;

    .banner__title {
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #000;
        text-align: center;
        width: fit-content;
        margin: 0 auto;
    }

    .banner2__body {
        display: flex;
        gap: 20px;
        margin-top: 30px;
        flex-direction: column;

        .body__card {
            flex-grow: 1;
            flex-basis: 0;
            padding: 50px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
            background-color: #fff;
            display: flex;
            flex-direction: column;

            .card__image {
                width: 100px;
                height: auto;
                margin: 0 auto;
            }

            .card__title {
                margin-top: 20px;
            }

            .card__desc {
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #333;
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .banner2 {
        .banner2__body {
            flex-direction: row;
        }
    }
}
</style>