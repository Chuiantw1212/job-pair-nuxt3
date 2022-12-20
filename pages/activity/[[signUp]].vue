<template>
    <div class="activity">
        <div class="activity__frame">
            <img class="frame__image" alt="成功" src="@/assets/activity/img_報名成功.svg">
            <h1 class="frame__title">活動報名完成</h1>
            <div class="frame__textarea">
                <div>
                    時間：2023/1/5 (四) 19 : 30 - 21 : 00
                </div>
                <div>
                    地點：Zoom 線上會議室（講座前一週將發送，請至信箱收信）
                </div>
                <div>
                    報名日期：{{ $filter.time(state.record?.signUpDate) }}
                </div>
            </div>
        </div>
        <LazyAtomBtnSimple class="activity__button">
            列印頁面
        </LazyAtomBtnSimple>
    </div>
</template>
<script setup>
const { $filter, $emitter } = useNuxtApp()
const repoActivity = useRepoActivity()
const repoAuth = useRepoAuth()
const route = useRoute()
const state = reactive({
    record: null
})
watch(() => repoAuth.state.user, async (newValue) => {
    if (process.client && !newValue) {
        $emitter.emit("showUserModal")
    }
    if (process.client && route.params.signUp === 'auto') {
        sessionStorage.setItem('autoSignUp', true)
    }
    if (process.client && newValue) {
        signUp()
    }
}, { immediate: true })
async function signUp() {
    const response = await repoActivity.postSignUp()
    state.record = response.data
    sessionStorage.removeItem('autoSignUp')
}
</script>
<style lang="scss">
.activity {
    padding-top: 250px;

    .activity__frame {
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

    .activity__button {
        max-width: 232px;
        padding: 9px 80px 8px;
        border-radius: 5px;
        background-color: #5ea88e;
        margin: auto;
        margin-top: 30px;
    }
}
</style>