<template>
    <div class="inputSort" :ref="'inputSort'">
        <button class="inputSort__button" @click="isSortOpen = !isSortOpen">
            <span class="button__text">{{ placeholder }}</span>
            <img src="./sort-down.png" />
        </button>
        <div class="inputSort__dropdown" :class="{ 'inputSort__dropdown--active': isSortOpen }">
            <div class="dropdown__menu">
                <button v-for="(item, index) in items" :key="index" class="menu__item" @click="sortBy(item)">
                    {{ item.text }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    data: function () {
        return {
            isSortOpen: false,
        }
    },
    props: {
        modelValue: {
            type: String,
            default: "similarity",
        },
    },
    mounted() {
        this.toggleClickOutside(true)
    },
    beforeUnmount() {
        this.toggleClickOutside(false)
    },
    computed: {
        placeholder() {
            const targetItem = this.items.find((item) => {
                return item.value === this.modelValue
            })
            if (targetItem) {
                return targetItem.text
            }
            return ""
        },
        items() {
            const defaultItems = [
                {
                    text: "依照刊登日期排序(最高)",
                    value: "datePosted",
                },
                {
                    text: "依照薪資排序(最高)",
                    value: "salaryMin",
                },
            ]
            if (this.user && this.user.id) {
                defaultItems.push({
                    text: "依照適配度排序(最新)",
                    value: "similarity",
                })
            }
            return defaultItems
        },
        ...mapGetters(["user"]),
    },
    methods: {
        toggleClickOutside(isSortOpen) {
            if (isSortOpen) {
                document.addEventListener("click", this.handleClickoutSide)
            } else {
                document.removeEventListener("click", this.handleClickoutSide)
            }
        },
        handleClickoutSide(event) {
            const area = this.$refs.inputSort
            if (!area.contains(event.target)) {
                this.isSortOpen = false
            }
        },
        sortBy(item) {
            if (item.value !== this.modelValue) {
                this.placeholder = item.text
                this.$emit("update:modelValue", item.value)
            }
            this.isSortOpen = false
        },
    },
}
</script>
<style lang="scss" scoped>
.inputSort {
    background: #ffdf33;
    position: relative;
    .inputSort__button {
        padding: 16px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        text-align: right;
        .button__text {
            margin-right: 4px;
        }
    }
    .inputSort__dropdown {
        position: absolute;
        right: 0;
        background-color: white;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s;
        .dropdown__menu {
            width: 216px;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #d9d9d9;
            .menu__item {
                padding: 12px;
                width: 100%;
                border: none;
                border-bottom: 1px solid #dde2e5;
                transition: all 0.3s;
                background: white;
                &:hover {
                    background: #29b0ab;
                    color: white;
                }
            }
        }
    }
    .inputSort__dropdown--active {
        max-height: 100vh;
    }
}
</style>