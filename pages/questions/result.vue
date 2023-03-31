<template>
    <div class="questions">
        <div class="questions__result">
            <img class="questions__leftImage" src="~/assets/questions/left.png" />
            <img class="questions__rightImage" src="~/assets/questions/right.png" />
            <p class="result__header"></p>
            <div class="result__final">
                <div class="final__header">求職偏好已完成！</div>
                <div class="final__sub">接下來開始編輯個人檔案吧！</div>
                <div class="final__text">完成個人檔案將大幅提升被企業看到的機會唷</div>
                <div v-if="state.isSigned" class="final__text">
                    已成功報名 {{ $filter.date(state.event.startDate) }} 講座活動 - {{ state.event.name }}</div>
            </div>
            <LazyAtomBtnSimple class="result__submit mt-4" @click="routeToProfile()">編輯個人檔案</LazyAtomBtnSimple>
            <div class="result__footer">
                <button type="button" class="btn btn-light" @click="routeToJobs()">查看職缺</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const repoEvent = useRepoEvent()
const router = useRouter()
const repoAuth = useRepoAuth()
const state = reactive({
    isSigned: false,
})
// hooks
useSeoMeta({
    title: `偏好量表結果 - Job Pair`,
})
onMounted(() => {
    const eventItemString = sessionStorage.getItem('event')
    if (eventItemString) {
        const eventItem = JSON.parse(eventItemString)
        repoEvent.state.eventId = eventItem.id
        repoEvent.state.contributor = eventItem.contributor
    }
})
watch(() => repoAuth.state.user, async (newValue, oldValue) => {
    if (newValue) {
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
<style lang="scss">
.questions__result {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 128px 5vw 200px 5vw;
    min-height: calc(100vh - 88px);

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
    }

    .result__submit {
        max-width: 310px;
    }

    .result__tooltip {
        .tooltip__icon {
            margin-left: 8px;
        }
    }
}

@media screen and (min-width: 991px) {}
</style>