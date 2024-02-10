<template>
    <div class="filterCategory">
        <input v-show="false" :value="localValue.length !== 0" :data-required="required" :data-name="name">
        <div class="filterCategory__body">
            <div class="filterCategory__list">
                <template v-for="(list, categoryKey) in categoryMap" :key="categoryKey">
                    <LazyAtomAccordion v-show="checkMatched(categoryKey)" v-model="state.openFlagsTop[categoryKey]"
                        :name="$optionText(categoryKey, items)" class="list__subList"
                        :count="getCheckedItemsCount(categoryKey)" @update:modelValue="handleToggle(categoryKey, $event)">
                        <div v-show="!state.keyword.trim() && showSelectAll" class="subList__header">
                            <label class="subList__inputGroup">
                                <input v-show="false" v-model="state.isAllSelected[categoryKey]" type="checkbox"
                                    @change="setCategory(categoryKey)" />
                                <img v-if="state.isAllSelected[categoryKey]" src="./checked.svg" alt="selected">
                                <img v-else src="./frame.svg" alt="unselected">
                                <div class="inputGroup__name">全選</div>
                            </label>
                        </div>
                        <div class="subList__body">
                            <template v-for="(item, index) in list" :key="index">
                                <label v-show="checkMatched(item.value)" class="body__item">
                                    <input v-show="false" v-model="localValue" type="checkbox" :value="item.value"
                                        :disabled="checkItemDisabled(item)" />
                                    <img v-if="localValue.includes(item.value)" src="./checked.svg" alt="selected">
                                    <img v-else src="./frame.svg" alt="unselected">
                                    <span class="body__item__name">{{ item.text }}</span>
                                </label>
                            </template>
                        </div>
                    </LazyAtomAccordion>
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
        default: "搜尋",
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
    },
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
function getCheckedItemsCount(categoryKey) {
    const items = props.categoryMap[categoryKey]
    const itemValues = items.map(item => item.value)
    const included = props.modelValue.filter(selected => {
        return itemValues.includes(selected)
    })
    return included.length
}
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
function handleToggle(categoryKey, newFlag) {
    state.openFlagsTop[categoryKey] = newFlag
}
</script>
<style lang="scss" scoped>
.filterCategory {
    border-radius: 5px;

    .filterCategory__body {}

    .filterCategory__search {
        margin-top: 10px;
    }

    .filterCategory__list {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: calc(100vh - 200px - 180px);
        overflow-y: auto;
    }

    .subList__inputGroup {
        padding: 10px 0px;
        display: flex;
        align-items: center;
        gap: 10px;
        // margin: 0 20px;
    }

    .subList__body {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .body__item {
            display: flex;
            gap: 10px;
            align-items: center;
            // margin: 0 20px;

            &:last-child {
                margin-bottom: 10px;
            }
        }
    }

    .filterCategory__footer {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 20px;

        .footer__btn {
            width: 100%;
            height: 42px;
        }
    }
}

@media screen and (min-width: 992px) {
    .filterCategory {
        min-width: 375px;

        // .filterCategory__body {
        //     display: flex;
        //     height: 330px;

        //     .filterCategory__list {
        //         overflow-y: auto;
        //         width: 50%;
        //         padding: 15px;
        //     }

        //     .body__sublist {
        //         width: 50%;
        //         overflow-y: auto;
        //         padding-top: 15px;
        //     }
        // }
    }
}
</style>