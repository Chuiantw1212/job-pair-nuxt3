<template>
    <div class="preference">
        <h1 class="preference__header">企業風格文化</h1>
        <hr />
        <div class="preference__card">
            <h2 class="card__header">選擇企業領導偏好</h2>
            <div class="card__desc">可選 2 個選項</div>
            <ul class="card__list">
                <input v-show="false" :value="state.companyInfo.preference.culture.length !== 0" :data-required="true"
                    :data-name="'企業風格文化'">
                <li class="list__item" v-for="(item, index) in state.questionItems" :key="index">
                    <label class="item__label"
                        :class="{ 'item__label--isSelected': checkIsSelected(item.value), 'item__label--disabled': checkDisabled(item.value) }"
                        :for="item.value">
                        {{ item.textCompany }}
                        <input v-show="false" type="checkbox" :id="item.value" :value="item.value"
                            v-model="state.companyInfo.preference.culture" :disabled="checkDisabled(item.value)">
                    </label>
                </li>
            </ul>
        </div>
        <div class="preference__footerGroup">
            <!-- <template v-if="state.isNewCompay"> -->
            <button v-if="state.isNewCompay" class="footerGroup__submit" type="button" @click="saveCompanyInfo()">
                下一步
            </button>
            <button v-else class="footerGroup__submit" type="button" @click="saveCompanyInfo()">
                儲存
            </button>
            <!-- <button class="footerGroup__submit" type="button" @click="gotoCulture()">
                下一步
            </button> -->
            <!-- </template> -->
            <!-- <template v-else>
                <NuxtLink class="footerGroup__submit" :to="{ 'name': 'admin-design' }">
                    客製公司頁面
                </NuxtLink>
                <NuxtLink v-if="state.companyInfo.seoName" class="footerGroup__submit" target="_blank" :to="{
                    name: 'company-id',
                    params: {
                        id: state.companyInfo.seoName
                    }
                }">
                    檢視公司頁面
                </NuxtLink>
                <NuxtLink v-else class="footerGroup__submit" target="_blank" :to="`/company/${state.companyInfo.id}`">
                    檢視公司頁面
                </NuxtLink>
            </template> -->
        </div>
    </div>
</template>
<script setup>
const { $validate, $sweet, } = useNuxtApp()
const repoSelect = useRepoSelect()
const repoAdmin = useRepoAdmin()
const repoAuth = useRepoAuth()
const repoCompany = useRepoCompany()
const state = reactive({
    isNewCompay: false,
    companyInfo: {
        preference: {
            culture: []
        }
    },
    questionItems: []
})
onMounted(() => {
    initializeCompanyInfo()
})
watch(() => repoAuth.state.user, () => {
    initializeCompanyInfo()
}, { deep: true })
async function initializeCompanyInfo() {
    if (repoSelect.state.questionsRes) {
        state.questionItems = repoSelect.state.questionsRes[5].items
    }
    const companyRes = await repoAdmin.getAdminCompany()
    if (companyRes.status !== 200) {
        return
    }
    const companyInfo = companyRes.data
    const noPreference = companyInfo.preference.culture.length === 0
    if (noPreference) {
        state.isNewCompay = true
    }
    if (companyInfo) {
        state.companyInfo = companyInfo
    }
}
function checkIsSelected(value) {
    const { culture } = state.companyInfo.preference
    return culture.includes(value)
}
function checkDisabled(value) {
    const { culture } = state.companyInfo.preference
    const isMax = culture.length === 2
    const isNotSelected = !culture.includes(value)
    return isMax && isNotSelected
}
async function saveCompanyInfo() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    $sweet.loader(true)
    const companyRes = await repoCompany.patchCompany(state.companyInfo)
    const updatedResult = companyRes.data
    repoAuth.setCompany(updatedResult)
    if (state.isNewCompay) {
        await $sweet.info('可以發佈職缺囉！記得至e-mail信箱收身份驗證信。', {
            title: '身分驗證',
            icon: 'info',
            confirmButtonText: '發佈職缺',
        })
        router.push({
            name: "admin-recruit-jobs"
        })
    } else {
        $sweet.succeed()
    }
}
</script>
<style lang="scss" scoped>
.preference {
    background-color: #F9F9F9;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;

    .preference__header {
        color: #222;
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
    }

    .preference__card {
        border-radius: 10px;
        background: var(--Grays-Quin, #FFF);
        padding: 20px;

        .card__header {
            color: var(--Grays-Prim, #222);
            /* H2-24-Medium */
            font-family: "PingFang TC";
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        .card__desc {
            color: var(--Grays-Tert, #A6A6A6);
            font-family: "PingFang TC";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .card__list {
            margin: 0px;
            padding: 0px;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
            width: 100%;

            .list__item {
                width: 100%;

                .item__label {
                    padding: 10px 20px;
                    color: var(--Grays-Prim, #222);
                    font-family: "PingFang TC";
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    background: inherit;
                    border-radius: 100px;
                    border: 1px solid var(--Grays-Quat, #EDEAEA);
                    width: 100%;
                }

                .item__label--isSelected {
                    background-color: #D3F5E9;
                }

                .item__label--disabled {
                    background-color: rgb(239, 239, 239);
                }
            }
        }
    }

    .preference__footerGroup {
        display: flex;
        justify-content: flex-end;
        gap: 24px;
        margin-top: 40px;

        .footerGroup__submit {
            border: none;
            color: white;
            background-color: #29b0ab;
            border-radius: 10px;
            padding: 12px 16px;
            text-decoration: none;
        }
    }
}
</style>