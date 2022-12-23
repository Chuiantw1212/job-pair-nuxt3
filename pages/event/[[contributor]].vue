<template>
    <div class="event">
        <template v-if="!state.isFailed">
            <div class="event__frame">
                <img class="frame__image" alt="成功" src="@/assets/event/img_報名成功.svg">
                <h1 class="frame__title">活動報名完成</h1>
                <div class="frame__textarea">
                    <div>
                        時間：2023/01/16 (一) 19 : 30 - 21 : 30
                    </div>
                    <div>
                        地點：Zoom 線上會議室（講座前一週將發送，請至信箱收信）
                    </div>
                    <div>
                        報名日期：<span id="signUpDate">{{ $filter.time(state.signUpDate) }}</span>
                    </div>
                </div>
            </div>
            <LazyAtomBtnSimple class="event__button" @click="printPage()">
                列印頁面
            </LazyAtomBtnSimple>
        </template>
        <template v-else>
            <div class="event__frame">
                <img class="frame__image" alt="失敗" src="@/assets/event/img_報名失敗.svg">
                <h1 class="frame__title">活動報名失敗</h1>
                <div class="frame__textarea">
                    請確認網路連線狀況
                </div>
            </div>
            <LazyAtomBtnSimple class="event__button" @click="signUp()">
                再報名一次
            </LazyAtomBtnSimple>
        </template>
    </div>
</template>
<script setup>
const { $filter, $emitter, $sweet, } = useNuxtApp()
const repoEvent = useRepoEvent()
const repoAuth = useRepoAuth()
const route = useRoute()
const state = reactive({
    record: {
        signUpDate: null
    },
    signUpDate: null,
    isFailed: false,
    timeoutId: null,
})
watch(() => repoAuth.state.user, (newValue, oldValue) => {
    if (process.client) {
        // 未登入前紀錄Flag，登入後自動報名活動
        if (route.params?.contributor) {
            repoAuth.state.memberOf = route.params.contributor
        }
        if (newValue?.id && oldValue === null) {
            signUp()
        }
    }
    if (process.client && !newValue) {
        requestSelector('#userModal', () => {
            $emitter.emit("showUserModal")
        })
    }
}, { immediate: true })
function requestSelector(selectorString, callback,) {
    let localCount = 0
    function step() {
        if (localCount >= 100) {
            console.error(`Cannot find element ${selectorString}`)
            return
        }
        const queryResult = document.querySelector(selectorString)
        const hasEvent = $emitter.all.has('showUserModal')
        if (queryResult && hasEvent) {
            callback(queryResult)
        } else {
            localCount++
            window.requestAnimationFrame(step)
        }
    }
    step()
}
async function signUp() {
    $sweet.loader(true)
    state.timeoutId = setTimeout(() => {
        state.isFailed = true
        $sweet.loader(false)
    }, 10 * 1000)
    const response = await repoEvent.postSignUp({
        contributor: repoAuth.state.memberOf ?? ''
    })
    if (response.status !== 200) {
        return
    }
    clearTimeout(state.timeoutId)
    state.timeoutId = null
    state.isFailed = false
    const { signUpDate } = response.data
    state.signUpDate = signUpDate
    const element = document.querySelector('#signUpDate')
    element.innerHTML = $filter.time(signUpDate)
    $sweet.loader(false)
}
function printPage() {
    print()
}
</script>
<style lang="scss">
.event {
    padding-top: 250px;
    padding-bottom: 80px;

    .event__frame {
        padding: 40px 20px 20px;
        border-radius: 10px;
        border: solid 1px #5b2714;
        background-color: #fff;
        position: relative;
        max-width: 324px;
        margin: auto;

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
            width: 144px;
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
            text-align: left;
            color: #332b00;
        }
    }

    .event__button {
        max-width: 232px;
        padding: 9px 80px 8px;
        border-radius: 5px;
        background-color: #5ea88e;
        margin: auto;
        margin-top: 30px;
    }
}
</style>