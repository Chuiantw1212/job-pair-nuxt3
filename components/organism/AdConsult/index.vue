<template>
    <div v-if="getAdVisibility()" class="jobView__ad" :key="state.adRenderKey">
        <div class="ad__card">
            <NuxtLink class="ad__card__link" to="/user/consult/records">
                <div class="card__header">職涯發展從認識自己開始！</div>
                <div class="card__subheader">一對一求職諮詢</div>
                <div class="card__body">
                    透過多次的輔導貫徹求職策略，達到最好的求職效率，迅速找到目標工作。<br>
                    毎一位生涯設計師，將為不同領域、不同生活背景的人們，提供合適的生涯引導與諮詢服務。<br>
                    讓我們幫您配對適合的生涯設計師，或是觀看生涯設計師，了解不同生涯設計師的資歷。
                </div>
            </NuxtLink>
            <button class="btn-close card__cancel" @click="hideAd()" aria-label="close ads"></button>
            <img class="d-none d-lg-block ad__card__image" alt="promotion" src="./img_consult.png" />
        </div>
    </div>
</template>
<script setup>
const repoAuth = useRepoAuth()
const state = reactive({
    adRenderKey: Math.random(),
})
const browserConfig = computed({
    get() {
        if (process.client) {
            const configString = localStorage.getItem('jobPair')
            const config = JSON.parse(configString) || { ads: {} }
            return config
        }
    },
    set(newValue) {
        if (process.client) {
            const configString = JSON.stringify(newValue)
            localStorage.setItem('jobPair', configString)
        }
    }
})
// methods
function getAdVisibility() {
    if (process.client) {
        return browserConfig.value?.ads?.jobDetails !== false && repoAuth.state.user
    }
}
function hideAd() {
    if (!process.client) {
        return
    }
    if (browserConfig.value.ads) {
        browserConfig.value.ads.jobDetails = false
    } else {
        browserConfig.ads = {
            jobDetails: false
        }
    }
    browserConfig.value = Object.assign({}, browserConfig.value)
    state.adRenderKey = Math.random()
}
</script>
<style lang="scss" scoped>
.jobView__ad {
    position: relative;

    .card__cancel {
        position: absolute;
        top: 15px;
        right: 15px;
    }

    .ad__card {
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        display: block;

        >* {
            text-decoration: none;
        }

        .card__header {
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #5ea88e;
        }

        .card__subheader {
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #484848;
            margin-top: 20px
        }

        .card__body {
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #484848;
        }
    }
}

@media screen and (min-width: 992px) {
    .jobView__ad {
        padding: 0;

        .ad__card {
            padding: 20px;
            position: relative;

            .card__header {
                font-size: 16px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #5ea88e;
            }

            .card__subheader {
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #484848;
                margin-top: 20px
            }

            .card__body {
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #484848;
            }

            .ad__card__image {
                position: absolute;
                right: 30px;
                bottom: 0;
                width: 120px;
                height: 120px;
            }
        }
    }
}
</style>