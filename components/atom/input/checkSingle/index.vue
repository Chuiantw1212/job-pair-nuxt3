<template>
    <div class="checkSingle d-flex flex-column">
        <div class="checkSingle__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
        </div>
        <label class="checkSingle__label">
            <div class="label__checkbox">
                <img v-show="modelValue === true" class="checkbox__check" src="@/assets/checkboxSelected.svg" />
            </div>
            <input v-show="false" v-model="localValue" class="label__input" :value="modelValue" :data-required="required"
                :data-name="name" type="checkbox" />
            <div class="label__desc">
                <slot></slot>
            </div>
        </label>
    </div>
</template>
<script>
export default {
    name: 'checkSingle',
    props: {
        modelValue: {
            type: Boolean,
            default: function () {
                return false
            },
        },
        itemText: {
            type: String,
            default: "",
        },
        itemValue: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
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
}
</script>
<style lang="scss" scoped>
.checkSingle {
    .checkSingle__nameGroup {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
    }

    .checkSingle__label {
        display: flex;
        align-items: center;
        margin-right: 20px;
        border-radius: 2.5px;

        .label__checkbox {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            border: solid 0.7px #484848;
            line-height: 0;
            border-radius: 2.5px;

            .checkbox__check {
                transform: translate(-1px, -1px);
            }
        }

        .label__desc {
            white-space: nowrap;
        }
    }
}

@media screen and (min-width: 992px) {
    .checkSingle {
        .checkSingle__label {
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