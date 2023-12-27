<template>
    <div class="questions__result">
        <div class="questions__frame">
            <img class="frame__image" alt="成功" src="@/assets/event/img_報名成功.svg">
            <h1 class="frame__title">想了解自己的求職方向嗎？</h1>
            <div class="frame__textarea">
                經過以上的求職偏好測驗發現好像不太了解自己的求職方向？<br><br>
                來職涯探索吧！
            </div>
        </div>
        <div v-if="state.isSigned" class="result__final">
            <div class="final__text">
                已成功報名 {{ $filter.date(state.event.startDate) }} 講座活動 - {{ state.event.name }}</div>
        </div>
        <LazyAtomBtnSimple class="result__submit mt-4" @click="routeToConsult()">瞭解求職方向</LazyAtomBtnSimple>
        <div class="result__footer">
            <button type="button" class="footer__btn" @click="routeToProfile()">其他</button>
        </div>
    </div>
</template>
<script setup>
const repoEvent = useRepoEvent()
const router = useRouter()
const repoAuth = useRepoAuth()
const runTimeConfig = useRuntimeConfig()
const state = reactive({
    isSigned: false,
})
// hooks
useHead({
    title: '註冊完成 - 註冊流程'
})
onMounted(() => {
    const eventItemString = sessionStorage.getItem('event')
    if (eventItemString) {
        const eventItem = JSON.parse(eventItemString)
        repoEvent.state.eventId = eventItem.eventId
        repoEvent.state.contributor = eventItem.contributor
    }
})
watch(() => repoAuth.state.user, async (newValue, oldValue) => {
    if (newValue && repoEvent.state.eventId) {
        setEventInformation()
    }
}, { immediate: true })
// methods
async function setEventInformation() {
    // Retrieve event information
    const res = await repoEvent.getEvent({
        id: repoEvent.state.eventId
    })
    if (res.status !== 200) {
        return
    }
    state.event = res.data
    // check signup information
    const response = await repoEvent.getEventRegistered({
        eventId: repoEvent.state.eventId
    })
    if (response.status !== 200) {
        return
    }
    const mostRecentEvent = response.data[0]
    if (mostRecentEvent) {
        state.isSigned = true
    }
}
async function routeToConsult() {
    router.push({
        name: 'user-consult-records'
    })
}
async function routeToProfile() {
    router.push({
        name: 'user-profile'
    })
}
async function routeToJobs() {
    router.push({
        name: 'jobs'
    })
}
</script>
<style lang="scss" scoped>
.questions__result {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 200px 20px 0 20px;

    .questions__leftImage {
        position: absolute;
        left: 0;
        width: 15vw;
        top: 0;
    }

    .questions__rightImage {
        position: absolute;
        right: 0;
        width: 15vw;
        bottom: 0;
    }

    .questions__frame {
        padding: 40px 20px 20px;
        border-radius: 10px;
        border: solid 1px #5b2714;
        background-color: #fff;
        position: relative;
        margin: 0 auto;

        .frame__image {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -90%);
        }

        .frame__title {
            font-size: 24px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: #332b00;
            border-bottom: 4px solid #ffd600;
            width: fit-content;
            margin: auto;
            white-space: nowrap;
        }

        .frame__textarea {
            margin-top: 20px;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: #332b00;
        }
    }

    .result__header {
        font-size: 28px;
        font-weight: bold;
        text-align: left;
        line-height: 45px;
        z-index: 10;
        width: 100%;
        max-width: 616px;
    }

    .result__final {
        text-align: center;

        .final__header {
            font-size: 28px;
            font-weight: bold;
        }

        .final__sub {
            font-size: 24px;
            font-weight: bold;
            margin-top: 8px;
        }

        .final__text {
            margin-top: 4px;
        }
    }

    .result__category {
        background-color: white;
        width: 100%;
        max-width: 616px;
        z-index: 10;

        .category__header {
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #333;
        }

        .category__select {
            margin-top: 20px;
        }
    }

    .result__button {
        background-color: #2ec5bf;
        color: white;
        font-size: 20px;
        height: 50px;
        border-radius: 100px;
        width: 234px;
        border: none;
        margin-bottom: 8px;
    }

    .result__footer {
        margin-top: 16px;
        display: flex;
        gap: 16px;

        .footer__btn {
            color: #70A68F;
            text-align: center;
            font-family: Roboto;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 130%;
            background-color: inherit;
            border: none;
        }
    }

    .result__submit {
        width: 256px;
    }

    .result__tooltip {
        .tooltip__icon {
            margin-left: 8px;
        }
    }
}

@media screen and (min-width:992px) {
    .questions__result {
        .questions__frame {
            min-width: 324px;
        }
    }
}
</style>