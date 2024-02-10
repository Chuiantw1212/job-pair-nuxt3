<template>
    <div class="filterCategory">
        <input v-show="false" :value="localValue.length !== 0" :data-required="required" :data-name="name">
        <div class="filterCategory__header">
            <label class="header__inputGroup">
                <input v-model="state.keyword" class="inputGroup__input" placeholder="搜尋" @input="searchOptions()" />
            </label>
        </div>
        <div class="filterCategory__body">
            <div class="filterCategory__list">
                <template v-for="(list, categoryKey) in categoryMap" :key="categoryKey">
                    <LazyAtomAccordion v-show="checkMatched(categoryKey)" v-model="state.openFlagsTop[categoryKey]"
                        :placeholder="$optionText(categoryKey, items)" class="list__subList"
                        :arrow="isLarge ? 'right' : 'up'" @update:modelValue="closeOtherItems(categoryKey, $event)">
                        <div v-show="!state.keyword.trim() && showSelectAll" class="d-lg-none subList__header">
                            <label class="subList__inputGroup">
                                <input v-model="state.isAllSelected[categoryKey]" type="checkbox"
                                    @change="setCategory(categoryKey)" />
                                全選
                            </label>
                        </div>
                        <div class="d-lg-none subList__body">
                            <template v-for="(item, index) in list" :key="index">
                                <label v-show="checkMatched(item.value)" class="body__item">
                                    <input v-model="localValue" type="checkbox" :value="item.value"
                                        :disabled="checkItemDisabled(item)" />
                                    <span class="body__item__name">{{ item.text }}</span>
                                </label>
                            </template>
                        </div>
                    </LazyAtomAccordion>
                </template>
            </div>
            <div class="d-none d-lg-block body__sublist">
                <template v-for="(list, categoryKey) in categoryMap" :key="categoryKey">
                    <div v-show="!state.keyword.trim() && state.openFlagsTop[categoryKey] && showSelectAll"
                        class="subList__header">
                        <label class="subList__inputGroup">
                            <input v-model="state.isAllSelected[categoryKey]" type="checkbox"
                                @change="setCategory(categoryKey)" />
                            全選
                        </label>
                    </div>
                    <div class="subList__body">
                        <template v-for="(item, index) in list" :key="index">
                            <label v-show="state.openFlagsTop[categoryKey] && checkMatched(item.value)" class="body__item">
                                <input v-model="localValue" type="checkbox" :value="item.value"
                                    :disabled="checkItemDisabled(item)" />
                                <span class="body__item__name">{{ item.text }}</span>
                            </label>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'filterCategory',
}
</script>
<script setup>
import { computed, nextTick } from 'vue'
const { $optionText, $Fuse } = useNuxtApp()
const emit = defineEmits(['update:modelValue'])
const device = useDevice()
const state = reactive({
    openFlagsTop: {},
    isAllSelected: {},
    fuseInstance: null,
    keyword: "",
    searchVisible: {},
})
const props = defineProps({
    modelValue: {
        type: Array,
        default: function () {
            return []
        },
    },
    categoryMap: {
        type: Object,
        default: function () {
            return {}
        }
    },
    placeholder: {
        type: String,
        default: "",
    },
    items: {
        type: [Array, Object],
        default: function () {
            return []
        },
    },
    isLarge: {
        type: Boolean,
        default: false,
    },
    max: {
        type: Number,
        default: 0
    },
    width: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: '類別選單'
    },
    required: {
        type: Boolean,
        default: false
    },
    showSelectAll: {
        type: Boolean,
        default: false
    },
    middleLayerMap: {
        type: Object,
        default: null
    }
})
// hooks
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
watch(() => props.categoryMap, (value) => {
    if (process.client) {
        initializeData(value)
    }
}, { immediate: true })
watch(() => localValue.value, () => {
    for (let key in props.categoryMap) {
        const allItems = props.categoryMap[key]
        const isAllSelected = allItems.every((item) => {
            return localValue.value.includes(item.value)
        })
        state.isAllSelected[key] = isAllSelected
    }
})
// methods
function checkItemDisabled(item) {
    const isExceedMax = props.max && localValue.value.length >= props.max
    const isNotSelected = !localValue.value.includes(item.value)
    return isExceedMax && isNotSelected
}
function checkMatched(key) {
    if (!state.keyword.trim()) {
        return true
    } else {
        return state.searchVisible[key]
    }
}
function initializeData(category) {
    let fuseItems = []
    for (let key in category) {
        // 初始化Flag
        state.openFlagsTop[key] = false
        const items = category[key]
        // fuseItems
        items.forEach((item) => {
            item.parent = key
        })
        fuseItems = [...fuseItems, ...items]
    }
    // initizlize fuseInstance
    const options = {
        location: 4,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        threshold: 0.4,
        distance: 100,
        keys: ["text"],
    }
    state.fuseInstance = new $Fuse(fuseItems, options)
    nextTick(() => {
        if (device.state.isLarge) {
            const [first] = Object.keys(props.categoryMap)
            state.openFlagsTop[first] = true
        }
    })
}
function searchOptions() {
    for (let key in props.categoryMap) {
        state.openFlagsTop[key] = false
    }
    if (!state.keyword.trim()) {
        for (let key in state.openFlagsTop) {
            state.openFlagsTop[key] = false
        }
        for (let key in state.searchVisible) {
            state.searchVisible[key] = false
        }
        if (device.state.isLarge) {
            const [first] = Object.keys(props.categoryMap)
            state.openFlagsTop[first] = true
        }
        return
    }
    const searchedResult = state.fuseInstance.search(state.keyword.trim())
    searchedResult.forEach((result, index) => {
        const { item } = result
        const { parent, value } = item
        state.searchVisible[parent] = true
        state.searchVisible[value] = true
    })
    const parentValues = searchedResult.map((result) => {
        return result.item.parent
    })
    parentValues.sort((a, b) => {
        return a - b
    })
    state.openFlagsTop[parentValues[0]] = true
}
function setCategory(categoryKey) {
    const isChecked = state.isAllSelected[categoryKey]
    if (isChecked) {
        const allItems = props.categoryMap[categoryKey]
        allItems.forEach((item) => {
            const isSelected = props.modelValue.includes(item.value)
            if (!isSelected) {
                localValue.value.push(item.value)
            }
        })
    } else {
        const allItems = props.categoryMap[categoryKey]
        allItems.forEach((item) => {
            const index = props.modelValue.findIndex((value) => {
                return value === item.value
            })
            localValue.value.splice(index, 1)
        })
    }
}
function closeOtherItems(categoryKey, newFlag) {
    for (let key in state.openFlagsTop) {
        state.openFlagsTop[key] = false
    }
    state.openFlagsTop[categoryKey] = newFlag
}
</script>
<style lang="scss" scoped>
.filterCategory {
    border-radius: 5px;
    max-height: 453px;
    overflow-y: auto;
    // border: solid 1px #d3d3d3;

    .filterCategory__header {
        padding: 10px 15px;
        border-bottom: 1px solid #d3d3d3;

        .header__inputGroup {
            line-height: 1.2;
            padding: 6px 10px;
            border-radius: 5px;
            border: solid 1px #d3d3d3;
            width: 100%;

            .inputGroup__input {
                border: none;
                width: 100%;

                &:focus {
                    outline: none;
                }
            }
        }
    }

    .filterCategory__list {
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .subList__header {
        border-bottom: 1px solid #d3d3d3;
    }

    .subList__body {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .body__item {
            margin: 0 20px;

            &:last-child {
                margin-bottom: 10px;
            }
        }

        .body__item--firstItem {
            margin-top: 10px;
        }

        .body__item__name {
            margin-left: 4px;
        }
    }

    .subList__inputGroup {
        padding: 10px 20px;
    }
}

@media screen and (min-width: 992px) {
    .filterCategory {
        min-width: 836px;

        .filterCategory__body {
            display: flex;
            height: 330px;

            .filterCategory__list {
                overflow-y: auto;
                width: 50%;
                padding: 15px;
            }

            .body__sublist {
                width: 50%;
                overflow-y: auto;
                padding-top: 15px;
            }
        }
    }
}
</style>