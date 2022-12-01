<template>
    <div class="inputGroup" :ref="`inputGroup`">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
        </div>
        <label class="inputdropdown" :class="{ 'inputdropdown--disabled': disabled }">
            <select v-model="localValue" class="inputdropdown__select" :data-required="required" :data-name="name"
                :class="{ 'inputdropdown__select--placeholder': [undefined].includes(localValue) }"
                :disabled="disabled">
                <!-- 配合DB不用null為初始值 -->
                <option v-if="placeholder" :value="''" :disabled="placeholderDisabled" selected
                    class="select__placeholder">{{
                            placeholder
                    }}</option>
                <option v-for="(item, index) in items" :key="index" :value="item[itemValue]">
                    {{ item[itemText] }}
                </option>
            </select>
        </label>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: "",
        },
        modelValue: {
            type: [String, Boolean, Number],
            default: "",
        },
        placeholder: {
            type: String,
            default: "請選擇",
        },
        placeholderDisabled: {
            type: Boolean,
            default: true
        },
        required: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Array,
            default: function () {
                return [
                    {
                        value: true,
                        text: "是",
                    },
                    {
                        value: false,
                        text: "否",
                    },
                ]
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
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue = "") {
                this.$emit("update:modelValue", newValue)
            },
        },
    },
}
</script>
<style lang="scss" scoped>
.inputGroup {
    font-size: 18px;

    .inputGroup__nameGroup {
        font-size: 16px;
        color: #1f1f1f;
        margin-bottom: 4px;
    }

    .inputdropdown {
        display: flex;
        flex-direction: column;
        padding: 6px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        background-color: white;
        font-size: 18px;



        .inputdropdown__placeholder {
            font-size: 16px;
            color: #595959;
        }

        .inputdropdown__select {
            border: none;
            text-overflow: ellipsis;
            background-color: inherit;


            option:not(:first-of-type) {
                color: black;
            }

            &:focus {
                border: none;
                outline: none;
            }
        }

        .inputdropdown__select--placeholder {
            color: #d3d3d3;
        }
    }

    .inputdropdown--disabled {
        background-color: rgb(239, 239, 239);
    }

    .inputGroup__message {
        // font-size: 20px;
        line-height: 1.3;
        text-align: right;
    }
}

.inputGroup--error {
    .inputdropdown {
        border-color: #ff7373;
    }

    .inputGroup__message {
        color: #ff7373;
    }
}
</style>