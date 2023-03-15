<template>
    <div class="preference">
        <div class="preference__headerGroup">
            <h3 class="headerGroup__header">求職偏好</h3>
            <div class="preference__desc">此選填內容只有您可以看到，請安心填答</div>
        </div>
        <div class="preference__body">
            <div class="body__item" v-for="(questionGroup, key) in state.questionsForTeam" :key="key">
                <div class="body__item__desc">{{ questionGroup.descUser }}...</div>
                <label v-for="(item, index) in questionGroup.items" :key="index" class="body__item__label"
                    :class="{ 'body__item__label--selected': checkSelectedRadio(questionGroup, item) }">
                    <input v-model="state.preference[questionGroup.key]" class="body__item__label__radio"
                        :type="'radio'" :value="item.value" :disabled="state.isLocked" />
                    <span class="body__item__label__desc">{{ item.textUser }}</span>
                </label>
            </div>
            <div class="body__item" v-for="(questionGroup, key) in state.questionsForCompany" :key="key">
                <div class="body__item__desc">{{ questionGroup.descUser }}</div>
                <label v-for="(item, index) in questionGroup.items" :key="index" class="body__item__label"
                    :class="{ 'body__item__label--selected': checkCultureSelected(questionGroup, item) }">
                    <input v-model="state.preference[questionGroup.key]" class="body__item__label__radio"
                        :type="'checkbox'" :value="item.value" :disabled="checkCultureDisabled(item)" />
                    <span class="body__item__label__desc">{{ item.textUser }}</span>
                </label>
            </div>
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
            <LazyAtomBtnSimple @click="handleConfirm()" :disabled="state.isLocked">
                儲存
            </LazyAtomBtnSimple>
        </div>
    </div>
</template>
<script setup>
const { $sweet, $date } = useNuxtApp()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
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
    title: `求職偏好 - 會員中心 - Job Pair`,
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

    .preference__headerGroup {
        background-color: #d8e4eb;
        text-align: center;
        padding: 20px 0;

        .headerGroup__header {
            font-size: 18px;
            font-weight: bold;
            line-height: 1.5;
            text-align: center;
            color: #333;
        }

        .preference__desc {
            font-size: 16px;
            line-height: 1.5;
            color: #333;
        }
    }

    .preference__body {
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 20px;

        .body__item__desc {
            font-size: 20px;
            font-weight: bold;
            line-height: 1.5;
            color: #333;
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

        .body__hint {
            font-size: 15px;
            font-weight: bold;
            line-height: 1.5;
            text-align: center;
            color: #ff5858;
        }
    }

    .preference__submit {
        width: 105px;
        height: 48px;
        background: #29b0ab;
        border: none;
        color: white;
        border-radius: 10px;
        margin-top: 32px;
    }
}

@media screen and (min-width: 992px) {
    .preference {
        .preference__headerGroup {
            border-radius: 10px;
        }

        .preference__body {
            padding: 0;
            margin-top: 20px;

            .body__item {
                border: solid 1px #d3d3d3;
            }
        }
    }
}
</style>