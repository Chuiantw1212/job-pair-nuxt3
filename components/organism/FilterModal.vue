<template>
    <div class="filterModal">
        <!-- Button trigger modal -->
        <button type="button" class="filterModal__btn" @click="openModal()">
            篩選選項
            <template v-if="getFilterValues()">
                ({{ getFilterValues() }})
            </template>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterModalLabel">篩選選項</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="repoSelect.state.selectByQueryRes" class="filter__list">
                            <LazyAtomInputSelectContainer v-model="state.filterOpen.status" :placeholder="'職缺狀態'">
                                <LazyAtomInputCheckMultiple v-model="localValue.status"
                                    :items="repoSelect.state.selectByQueryRes.jobStatus" class="m-3">
                                </LazyAtomInputCheckMultiple>
                            </LazyAtomInputSelectContainer>
                            <LazyAtomInputSelectLabel v-model="localValue.status"
                                :items="repoSelect.state.selectByQueryRes.jobStatus" class="mt-2">
                            </LazyAtomInputSelectLabel>
                            <LazyAtomInputSelectContainer v-model="state.filterOpen.occupationalCategory"
                                :placeholder="'職務類型'" class="mb-2">
                                <LazyMoleculeFilterCategory v-model="localValue.occupationalCategory"
                                    :items="repoSelect.jobCategory" :categoryMap="repoSelect.jobCategoryMap"
                                    :isLarge="device.state.isLarge" :showSelectAll="true">
                                </LazyMoleculeFilterCategory>
                            </LazyAtomInputSelectContainer>
                            <div>
                                <template v-for="(items, categoryKey) in repoSelect.jobCategoryMap" :key="categoryKey">
                                    <LazyAtomInputSelectLabel v-model="localValue.occupationalCategory" :items="items">
                                    </LazyAtomInputSelectLabel>
                                </template>
                            </div>
                            <template v-if="repoSelect.state.locationRes" class="filter__list__item">
                                <LazyAtomInputSelectContainer v-model="state.filterOpen.division" :placeholder="'地點'">
                                    <LazyAtomInputCheckMultiple v-model="localValue.addressRegion"
                                        :items="repoSelect.state.locationRes.taiwan" class="m-3" :flexDirection="'row'">
                                    </LazyAtomInputCheckMultiple>
                                </LazyAtomInputSelectContainer>
                                <LazyAtomInputSelectLabel v-model="localValue.addressRegion"
                                    :items="repoSelect.state.locationRes.taiwan" class="mt-2">
                                </LazyAtomInputSelectLabel>
                            </template>
                            <LazyAtomInputSelectContainer v-model="state.filterOpen.jobLocationType" :placeholder="'遠端彈性'">
                                <LazyAtomInputCheckMultiple v-model="localValue.jobLocationType"
                                    :items="repoSelect.state.selectByQueryRes.jobLocationType" class="m-3">
                                </LazyAtomInputCheckMultiple>
                            </LazyAtomInputSelectContainer>
                            <LazyAtomInputSelectLabel v-model="localValue.jobLocationType"
                                :items="repoSelect.state.selectByQueryRes.jobLocationType" class="mt-2">
                            </LazyAtomInputSelectLabel>
                            <LazyAtomInputSelectContainer v-model="state.filterOpen.employmentType" :placeholder="'雇用性質'">
                                <LazyAtomInputCheckMultiple v-model="localValue.employmentType"
                                    :items="repoSelect.state.selectByQueryRes.employmentType" class="m-3">
                                </LazyAtomInputCheckMultiple>
                            </LazyAtomInputSelectContainer>
                            <LazyAtomInputSelectLabel v-model="localValue.employmentType"
                                :items="repoSelect.state.selectByQueryRes.employmentType" class="mt-2">
                            </LazyAtomInputSelectLabel>
                            <LazyAtomInputSelectContainer v-model="state.filterOpen.responsibilities" :placeholder="'資歷'">
                                <LazyAtomInputCheckMultiple v-model="localValue.responsibilities"
                                    :items="repoSelect.state.selectByQueryRes.responsibilities" class="m-3">
                                </LazyAtomInputCheckMultiple>
                            </LazyAtomInputSelectContainer>
                            <LazyAtomInputSelectLabel v-model="localValue.responsibilities"
                                :items="repoSelect.state.selectByQueryRes.responsibilities" class="mt-2">
                            </LazyAtomInputSelectLabel>
                            <div>
                                <template v-for="(items, categoryKey) in repoSelect.industryCategoryMap"
                                    :key="categoryKey">
                                    <LazyAtomInputSelectLabel v-model="localValue.industry" :items="items">
                                    </LazyAtomInputSelectLabel>
                                </template>
                            </div>
                            <div class="section__header">薪資類型</div>
                            <ul class="section__salaryType">
                                <li v-for="(item, index) in getSalaryTypeItems()" :key="index"
                                    class="filterSalary__item">
                                    <label class="item__inputGroup">
                                        <input type="radio" v-model="localValue.salaryType" :value="item.value" />
                                        <span class="item__text">{{ item.text }}</span>
                                    </label>
                                </li>
                            </ul>
                            <div class="section__salaryRange">
                                <LazyAtomInputMoney v-model="localValue.salaryMin" name="薪資下限" placeholder="請輸入">
                                </LazyAtomInputMoney>
                                <LazyAtomInputMoney v-model="localValue.salaryMax" name="薪資上限" placeholder="請輸入">
                                </LazyAtomInputMoney>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <LazyAtomBtnSimple type="button" @click="closeModal()">關閉彈窗</LazyAtomBtnSimple>
                        <LazyAtomBtnSimple type="button" @click="$emit('reset')">重置所有搜尋條件</LazyAtomBtnSimple>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $requestSelector } = useNuxtApp()
const repoSelect = useRepoSelect()
const device = useDevice()
const state = reactive({
    filterOpen: {
        status: false,
        division: false,
        occupationalCategory: false,
        responsibilities: false,
        jobLocationType: false,
        employmentType: false,
        industry: false,
    },
    bsModal: null
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    }
})
onMounted(() => {
    $requestSelector('#filterModal', (element) => {
        const bsModal = new window.bootstrap.Modal(element, {
            keyboard: false,
        })
        state.bsModal = bsModal
    })
})
let localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
function getFilterValues() {
    const values = Object.values(localValue.value)
    const validValues = values.filter(value => {
        if (Array.isArray(value)) {
            return value.length !== 0
        } else {
            return !!value
        }
    })
    return validValues.length
}
function getSalaryTypeItems() {
    const items = repoSelect.state.selectByQueryRes.salaryType
    return [
        {
            text: '不限',
            value: ''
        },
        ...items
    ]
}
function openModal() {
    state.bsModal.show()
}
function closeModal() {
    state.bsModal.hide()
}
</script>
<style lang="scss" scoped>
.filterModal {
    .filterModal__btn {
        border-radius: 0 5px 5px 0;
        border: solid 1px #d3d3d3;
        border-left: 0;
        background-color: inherit;
        white-space: nowrap;
        color: #5ea88e;
        font-size: 14px;
        padding: 14px 14px;
    }

    .filter__list {
        list-style: none;
        display: flex;
        flex-direction: column;

        .section__salaryType {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0 16px;

            .filterSalary__item {
                .item__inputGroup {
                    display: flex;
                    align-items: center;
                    flex-wrap: nowrap;
                }

                .item__text {
                    margin-left: 10px;
                    white-space: nowrap;
                }
            }
        }

        .section__salaryRange {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }

    .modal-footer {
        display: flex;
        flex-wrap: nowrap;
    }
}
</style>