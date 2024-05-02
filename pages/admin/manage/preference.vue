<template>
    <div class="preference">
        <h1 class="preference__header">企業風格文化</h1>
        <hr />
        <div class="preference__card">
            <h2 class="card__header">選擇企業領導偏好</h2>
            <div class="card__desc">可選 2 個選項</div>
            <ul class="card__list">
                <li class="list__item" v-for="(item, index) in cultureItems" :key="index">
                    <label class="item__label"
                        :class="{ 'item__label--isSelected': checkIsSelected(item.value), 'item__label--disabled': checkDisabled(item.value) }"
                        :for="item.value">
                        {{ item.textCompany }}
                        <input v-show="false" type="checkbox" :id="item.value" :value="item.value"
                            v-model="checkedCultures" :disabled="checkDisabled(item.value)">
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const repoSelect = useRepoSelect()
const cultureItems = computed(() => {
    if (repoSelect.state.questionsRes?.length) {
        return repoSelect.state.questionsRes[5].items
    } else {
        return []
    }
})
const checkedCultures = ref([])
const props = defineProps({

})
function checkIsSelected(value) {
    return checkedCultures.value.includes(value)
}
function checkDisabled(value) {
    const isMax = checkedCultures.value.length === 2
    const isNotSelected = !checkedCultures.value.includes(value)
    return isMax && isNotSelected
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
}
</style>