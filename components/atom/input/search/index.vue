<template>
    <label class="inputSearch">
        <div class="inputSearch__div">
            <img class="label__image" src="./icon_Search.svg" alt="search" />
            <input v-model="localValue" :placeholder="placeholder" class="inputSearch__label__input"
                @keyup.delete="resetSearch($event)" />
        </div>
        <button class=" inputSearch__button" @click="$emit('search', $event)">搜尋</button>
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
            default: "搜尋公司＆職缺",
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
    border-radius: 50px;
    border: solid 1px #d3d3d3;
    padding: 12px 18px;
    display: flex;
    justify-content: space-between;
    background-color: white;

    .inputSearch__div {
        display: flex;
        align-items: center;
        width: 100%;

        .label__image {
            width: 16px;
            height: 16px;
            display: block;
        }

        .inputSearch__label__input {
            border: none;
            line-height: 1;
            width: 100%;
            margin-left: 10px;

            input::-webkit-input-placeholder {
                font-size: 16px;
                color: #999;
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