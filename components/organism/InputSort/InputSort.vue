<template>
    <div class="inputSort" :ref="'inputSort'">
        <button class="inputSort__button" @click="state.isSortOpen = !state.isSortOpen">
            <span class="button__text">{{ placeholder }}</span>
            <img src="./sort-down.png" />
        </button>
        <div class="inputSort__dropdown" :class="{ 'inputSort__dropdown--active': state.isSortOpen }">
            <div class="dropdown__menu">
                <button v-for="(item, index) in items" :key="index" class="menu__item" @click="sortBy(item)">
                    {{ item.text }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
// // import { mapGetters } from "vuex"
// import useUserStore from '@/stores/user'
// const userStore = useUserStore()
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    isSortOpen: false,
})
const props = defineProps({
    modelValue: {
        type: String,
        default: "similarity",
    },
})
onMounted(() => {
    toggleClickOutside(true)
})
const items = computed(() => {
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
    // const { user } = userStore
    // if (user && user.id) {
    //     defaultItems.push({
    //         text: "依照適配度排序(最新)",
    //         value: "similarity",
    //     })
    // }
    return defaultItems
})
const placeholder = computed(() => {
    const targetItem = items.find((item) => {
        return item.value === modelValue
    })
    if (targetItem) {
        return targetItem.text
    }
    return ""
})
function toggleClickOutside(isSortOpen) {
    if (!process.client) {
        return
    }
    if (isSortOpen) {
        document.addEventListener("click", handleClickoutSide)
    } else {
        document.removeEventListener("click", handleClickoutSide)
    }
}
const inputSort = ref(null)
function handleClickoutSide(event) {
    const area = inputSort.value
    if (!area.contains(event.target)) {
        state.isSortOpen = false
    }
}
function sortBy(item) {
    if (item.value !== modelValue) {
        placeholder = item.text
        emit("update:modelValue", item.value)
    }
    state.isSortOpen = false
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
            border: 1px solid #d3d3d3;

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