<template>
    <label class="inputSearch">
        <div class="inputSearch__div">
            <img class="label__image" src="./Search.svg" alt="search" />
            <input v-model="localValue" :placeholder="placeholder" class="inputSearch__label__input"
                @keyup.delete="resetSearch($event)" />
        </div>
    </label>
</template>
<script>
export default {
    name: 'search',
    props: {
        modelValue: {
            type: String,
            default: "",
            debounceTimer: null
        },
        placeholder: {
            type: String,
            default: "搜尋",
        },
    },
    computed: {
        localValue: {
            get: function () {
                return this.modelValue
            },
            set: function (val) {
                this.$emit("update:modelValue", val)
            },
        }
    },
    watch: {
        localValue: {
            handler: function (newValue = '') {
                if (!String(newValue).trim()) {
                    return
                }
                this.debounce(() => {
                    this.$emit("search")
                })()
            }
        }
    },
    methods: {
        resetSearch() {
            if (!String(this.localValue).trim()) {
                this.debounce(() => {
                    this.$emit("search")
                })()
            }
        },
        debounce(func, delay = 800) {
            return (...args) => {
                clearTimeout(this.debounceTimer)
                this.debounceTimer = setTimeout(() => {
                    this.debounceTimer = undefined
                    func.apply(this, args)
                }, delay)
            }
        },
    }
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