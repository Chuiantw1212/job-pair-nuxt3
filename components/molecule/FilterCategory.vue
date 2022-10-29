<template>
    <div class="filterCategory">
        <input v-show="false" :value="localValue.length !== 0" :data-required="required" :data-name="name">
        <div class="filterCategory__header">
            <label class="header__inputGroup">
                <input v-model="keyword" class="inputGroup__input" placeholder="搜尋" @input="searchOptions()" />
            </label>
        </div>
        <div class="filterCategory__body">
            <div class="filterCategory__list">
                <template v-for="(list, categoryKey) in categoryMap" :key="categoryKey">
                    <Accordion v-show="checkMatched(categoryKey)" v-model="openFlagsTop[categoryKey]"
                        :placeholder="$filter.optionText(categoryKey, items)" class="list__subList"
                        :arrow="isDesktop ? 'right' : 'up'" @update:modelValue="closeOtherItems(categoryKey, $event)">
                        <div v-show="!keyword.trim() && showSelectAll" class="d-lg-none subList__header">
                            <label class="subList__inputGroup">
                                <input v-model="isAllSelected[categoryKey]" type="checkbox"
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
                    </Accordion>
                </template>
            </div>
            <div class="d-none d-lg-block body__sublist">
                <template v-for="(list, categoryKey) in categoryMap" :key="categoryKey">
                    <div v-show="!keyword.trim() && openFlagsTop[categoryKey] && showSelectAll" class="subList__header">
                        <label class="subList__inputGroup">
                            <input v-model="isAllSelected[categoryKey]" type="checkbox"
                                @change="setCategory(categoryKey)" />
                            全選
                        </label>
                    </div>
                    <div class="subList__body">
                        <template v-for="(item, index) in list" :key="index">
                            <label v-show="openFlagsTop[categoryKey] && checkMatched(item.value)" class="body__item">
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
import Fuse from "fuse.js"
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        Accordion: defineAsyncComponent(() =>
            import('@/components/atoms/Accordion/Accordion.vue')
        ),
    },
    data: function () {
        return {
            openFlagsTop: {},
            isAllSelected: {},
            fuseInstance: null,
            keyword: "",
            searchVisible: {},
        }
    },
    props: {
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
            type: Array,
            default: function () {
                return []
            },
        },
        isDesktop: {
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
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit("update:modelValue", newValue)
            },
        },
    },
    watch: {
        categoryMap: {
            immediate: true,
            handler: function (newValue) {
                this.initializeData(newValue)
            },
        },
        localValue() {
            for (let key in this.categoryMap) {
                const allItems = this.categoryMap[key]
                const isAllSelected = allItems.every((item) => {
                    return this.localValue.includes(item.value)
                })
                this.isAllSelected[key] = isAllSelected
            }
        }
    },
    methods: {
        checkItemDisabled(item) {
            const isExceedMax = this.max && this.localValue.length >= this.max
            const isNotSelected = !this.localValue.includes(item.value)
            return isExceedMax && isNotSelected
        },
        checkMatched(key) {
            if (!this.keyword.trim()) {
                return true
            } else {
                return this.searchVisible[key]
            }
        },
        initializeData(category) {
            let fuseItems = []
            for (let key in category) {
                // 初始化Flag
                this.openFlagsTop[key] = false
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
            this.fuseInstance = new Fuse(fuseItems, options)
            this.$nextTick(() => {
                if (this.isDesktop) {
                    const [first] = Object.keys(this.categoryMap)
                    this.openFlagsTop[first] = true
                }
            })
        },
        searchOptions() {
            for (let key in this.categoryMap) {
                this.openFlagsTop[key] = false
            }
            if (!this.keyword.trim()) {
                for (let key in this.openFlagsTop) {
                    this.openFlagsTop[key] = false
                }
                for (let key in this.searchVisible) {
                    this.searchVisible[key] = false
                }
                if (this.isDesktop) {
                    const [first] = Object.keys(this.categoryMap)
                    this.openFlagsTop[first] = true
                }
                return
            }
            const searchedResult = this.fuseInstance.search(this.keyword.trim())
            searchedResult.forEach((result, index) => {
                const { item } = result
                const { parent, value } = item
                this.searchVisible[parent] = true
                this.searchVisible[value] = true
            })
            const parentValues = searchedResult.map((result) => {
                return result.item.parent
            })
            parentValues.sort((a, b) => {
                return a - b
            })
            this.openFlagsTop[parentValues[0]] = true
        },
        setCategory(categoryKey) {
            const isChecked = this.isAllSelected[categoryKey]
            if (isChecked) {
                const allItems = this.categoryMap[categoryKey]
                allItems.forEach((item) => {
                    const isSelected = this.modelValue.includes(item.value)
                    if (!isSelected) {
                        this.localValue.push(item.value)
                    }
                })
            } else {
                const allItems = this.categoryMap[categoryKey]
                allItems.forEach((item) => {
                    const index = this.modelValue.findIndex((value) => {
                        return value === item.value
                    })
                    this.localValue.splice(index, 1)
                })
            }
        },
        closeOtherItems(categoryKey, newFlag) {
            for (let key in this.openFlagsTop) {
                this.openFlagsTop[key] = false
            }
            this.openFlagsTop[categoryKey] = newFlag
        },
    },
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

            // &:first-child {}

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
            }
        }
    }
}
</style>