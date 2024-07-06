<template>
    <div class="preference">
        <h1 class="preference__header">求職偏好</h1>
        <div class="preference__desc">此選填內容只有您可以看到，請安心填答。每次修改求職偏好答案後，需等待 14 天後才能再次修改。</div>
        <hr class="preference__hr">
        <div class="preference__body">
            <div class="body__item" v-for="(questionGroup, key) in state.questionsForTeam" :key="key">
                <div class="body__item__header">{{ questionGroup.descUser }}...</div>
                <label v-for="(item, index) in questionGroup.items" :key="index" class="body__item__label"
                    :class="{ 'body__item__label--selected': checkSelectedRadio(questionGroup, item) }">
                    <input v-model="state.preference[questionGroup.key]" class="body__item__label__radio"
                        :type="'radio'" :value="item.value" :disabled="state.isLocked" />
                    <span class="body__item__label__desc">{{ item.textUser }}</span>
                </label>
            </div>
            <div class="body__item" v-for="(questionGroup, key) in state.questionsForCompany" :key="key">
                <div class="body__item__header">{{ questionGroup.descUser }}</div>
                <div class="body__item__desc">可選 2 個選項</div>
                <label v-for="(item, index) in questionGroup.items" :key="index" class="body__item__label"
                    :class="{ 'body__item__label--selected': checkCultureSelected(questionGroup, item) }">
                    <input v-model="state.preference[questionGroup.key]" class="body__item__label__radio"
                        :type="'checkbox'" :value="item.value" :disabled="checkCultureDisabled(item)" />
                    <span class="body__item__label__desc">{{ item.textUser }}</span>
                </label>
            </div>
        </div>
        <div class="preference__footer">
            <div class="body__hint">
                <span v-if="state.isLocked">
                    {{ $date(state.lockEndDate) }} 後才能再次修改。
                </span>
                <span v-else>
                    為有效計算您與企業的適配度<br class="d-lg-none">
                    儲存後將於
                    14天 後才能再次修改。
                </span>
            </div>
            <LazyAtomBtnSimpleV2 class="w-100" @click="handleConfirm()" :disabled="state.isLocked">
                儲存更新
            </LazyAtomBtnSimpleV2>
        </div>
    </div>
</template>
<script setup>
const { $sweet, $date, } = useNuxtApp()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
const repoJob = useRepoJob()
const state = reactive({
    preference: {},
    isLocked: false,
    // 工作環境偏好
    questionsForTeam: [],
    // 企業的偏好
    questionsForCompany: [],
    lockEndDate: 0
})
// hooks
useHead({
    title: '求職偏好 - 會員中心'
})
watchEffect(() => {
    const { user } = repoAuth.state
    if (user) {
        setPreferenceInfo()
    }
})
watchEffect(() => {
    if (!repoSelect.state.questionsRes) {
        return
    }
    state.questionsForTeam = repoSelect.state.questionsRes.slice(0, 5)
    state.questionsForCompany = repoSelect.state.questionsRes.slice(-1)
})
// methods
function checkCultureDisabled(item) {
    const { culture = [] } = state.preference
    const isMax = culture.length >= 2
    const isSelected = culture.includes(item.value)
    return state.isLocked || (isMax && !isSelected)
}
function checkCultureSelected(questionGroup, item) {
    const answer = state.preference[questionGroup.key]
    if (answer || answer === '') {
        const isSelected = answer.includes(item.value)
        return isSelected
    }
}
function checkSelectedRadio(questionGroup, item) {
    const answer = state.preference[questionGroup.key]
    if (answer || answer === '') {
        const isSelected = answer === item.value
        return isSelected
    }
}
async function handleConfirm() {
    $sweet.loader(true)
    const response = await repoUser.patchUserPreference(state.preference)
    if (response.status !== 200) {
        return
    }
    $sweet.loader(false)
    // 重新設定preference
    const updatedResult = response.data
    const { user } = repoAuth.state
    const updatedUser = Object.assign({}, user, updatedResult)
    repoAuth.setUser(updatedUser)
    setPreferenceInfo()
    repoJob.getJobRecommended()
}
function setPreferenceInfo() {
    const { user } = repoAuth.state
    const { preference, preferenceDate, } = user
    state.preference = JSON.parse(JSON.stringify(preference))
    // Set profile disabled
    const currentTime = new Date().getTime()
    const lockEndDate = new Date(preferenceDate)
    // 設定兩週
    const preferenceDay = lockEndDate.getDate()
    lockEndDate.setDate(preferenceDay + 14)
    const lockEndTime = lockEndDate.getTime()
    state.isLocked = lockEndTime >= currentTime
    state.lockEndDate = lockEndDate
}
</script>
<style lang="scss" scoped>
.preference {
    padding: 20px;

    .preference__header {
        color: var(--Grays-Prim, #222);

        /* Title/H1-36-Semibold */
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
        /* 100% */
    }

    .preference__desc {
        color: var(--Grays-Seco, #484848);

        /* SPAN-14-Regular */
        font-family: "PingFang TC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        /* 157.143% */
        margin-top: 30px;
    }

    .preference__hr {
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        margin: 30px 0px;
    }

    .preference__body {
        display: flex;
        flex-direction: column;
        // padding: 20px;
        gap: 20px;

        .body__item__header {
            color: var(--Grays-Prim, #222);

            /* H2-24-Medium */
            font-family: "PingFang TC";
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        .body__item__desc {
            color: var(--Grays-Tert, #A6A6A6);

            /* H5-12-Regular */
            font-family: "PingFang TC";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin: 10px 0px;
        }

        .body__item {
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            gap: 10px;
            color: #333333;

            .body__item__label {
                display: flex;
                align-items: center;

                .body__item__label__desc {
                    margin-left: 10px;
                }

                .body__item__label__radio {
                    accent-color: green;
                    min-width: 20px;
                    min-height: 20px;
                    display: inline-block;
                    vertical-align: middle;
                }

            }

            .body__item__label--selected {
                color: #5ea88e;
            }
        }

    }

    .preference__footer {
        display: flex;
        width: 100%;
        padding: 20px;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        background: var(--Grays-Quin, #FFF);
        margin-top: 30px;
    }

    .body__hint {
        color: var(--Grays-Seco, #484848);
        text-align: center;

        /* SPAN-14-Regular */
        font-family: "PingFang TC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        /* 157.143% */
    }
}

@media screen and (min-width: 992px) {

    .preference {
        padding: 0px;
        padding-bottom: 70px;
        padding-left: 30px;

        .preference__headerGroup {
            border-radius: 10px;
        }

        .preference__body {
            padding: 0;
            margin-top: 20px;
        }
    }
}
</style>