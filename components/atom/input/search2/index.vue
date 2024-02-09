<template>
    <label class="inputSearch">
        <div class="inputSearch__div">
            <img class="label__image" src="./Search.svg" alt="search" />
            <input v-model="localValue" :placeholder="placeholder" class="inputSearch__label__input"
                @keyup.delete="resetSearch($event)" />
        </div>
    </label>
</template>
<script setup>
const emit = defineEmits(['update:modelValue', 'search'])
const state = reactive({
    debounceTimer: null
})
const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "搜尋",
    },
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit("update:modelValue", val)
    },
})
watch(() => localValue.value, (newValue = '') => {
    if (!String(newValue).trim()) {
        return
    }
    debounce(() => {
        emit("search")
    })
})
// methods
function resetSearch() {
    if (!String(localValue.value).trim()) {
        debounce(() => {
            emit("search")
        })
    }
}
function debounce(func, timeout = 100) {
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => {
        func();
    }, timeout);
}
</script>
<style lang="scss" scoped>
.inputSearch {
    border-radius: 10px;
    border: solid 1px #d3d3d3;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: white;

    &:focus-within {
        outline: 1px solid #5EA88E;
    }

    .inputSearch__div {
        display: flex;
        align-items: center;
        width: 100%;

        .label__image {
            width: 20px;
            height: 20px;
            display: block;
        }

        .inputSearch__label__input {
            border: none;
            width: 100%;
            margin-left: 10px;

            input::-webkit-input-placeholder {
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 24px;
                color: #A6A6A6;
            }

            &:focus {
                outline: none;
            }
        }
    }

    .inputSearch__button {
        border: none;
        background-color: white;
        color: #61ab91;
        white-space: nowrap;
    }
}

@media screen and (min-width: 992px) {
    .inputSearch {
        font-size: 20px;
        font-weight: normal;
    }
}
</style>