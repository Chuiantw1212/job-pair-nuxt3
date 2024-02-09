<template>
    <div>
        <div v-if="name" class="inputGroup__nameGroup mb-2">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
            <span v-if="max !== 0">(最多{{ max }}項)</span>
        </div>
        <div class="checkMultiple" :style="listStyle">
            <input v-show="false" :value="localValue.length !== 0" :data-required="required" :data-name="name">
            <template v-for="(item, key) in items">
                <label v-if="item[itemText]" class="checkMultiple__label" :style="itemStyle">
                    <div v-if="isItemSelected(item)" class="label__checkbox">
                        <img class="checkbox__check" src="./checkboxSelected.svg" />
                    </div>
                    <div v-else class="label__checkbox label__checkbox--unselected"
                        :class="{ 'label__checkbox--disabled': checkDisabled(item) }"></div>
                    <input v-show="false" v-model="localValue" class="label__input" :value="item[itemValue]" type="checkbox"
                        :disabled="checkDisabled(item)" />
                    {{ item[itemText] }}
                </label>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'checkMultiple2',
    props: {
        modelValue: {
            type: Array,
            default: function () {
                return []
            },
        },
        items: {
            type: Array,
            default: function () {
                return []
            },
        },
        align: {
            type: String,
            default: "column",
        },
        flexDirection: {
            type: String,
            default: "column",
        },
        listStyle: {
            type: Object,
            default: function () {
                return {}
            },
        },
        itemStyle: {
            type: Object,
            default: function () {
                return {}
            },
        },
        itemValue: {
            type: String,
            default: "value",
        },
        itemText: {
            type: String,
            default: "text",
        },
        max: {
            type: Number,
            default: 0
        },
        required: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: ''
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
    methods: {
        checkDisabled(item) {
            const isDisabled = this.max && this.modelValue.length >= this.max
            const isSelected = this.isItemSelected(item)
            return isDisabled && !isSelected
        },
        isItemSelected(item) {
            if (!this.modelValue) {
                return false
            }
            const itemValue = item[this.itemValue]
            return this.modelValue.includes(itemValue)
        },
    },
}
</script> 
<style lang="scss" scoped>
.checkMultiple {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;

    .checkMultiple__label {
        display: flex;
        align-items: center;
        font-size: 15px;

        .label__checkbox {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            border-radius: 2px;
            line-height: 0;
            border-radius: 2px;
            background-color: white;

            .checkbox__check {
                transform: translate(-1px, -1px);
            }
        }

        .label__checkbox--unselected {
            overflow: hidden;
            border: solid 0.7px #edeaea;
        }

        .label__checkbox--disabled {
            background-color: #d3d3d3;
        }
    }
}

@media screen and (min-width: 992px) {
    .checkMultiple {
        .checkMultiple__label {

            .label__checkbox {
                width: 20px;
                height: 20px;

                .checkbox__check {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
}
</style>