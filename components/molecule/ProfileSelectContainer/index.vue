<template>
    <div class="inputDropdownContainer" ref="input">
        <div class="container__nameGroup"><span v-if="required" class="text-danger">* </span>{{ name }}
            <span v-if="max">(最多{{ max }}個)</span>
        </div>
        <button class="inputDropdownContainer__trigger" @click="toggleDropdown()" :disabled="disabled"
            :class="{ 'inputDropdownContainer__trigger--isOn': modelValue }">
            <div class="inputDropdownContainer__trigger__header">
                <slot name="header"></slot>
            </div>
            <img v-if="!disabled" src="./icon_Down.svg" class="inputDropdownContainer__icon">
        </button>
        <div class="inputDropdownContainer__layer"
            :class="{ 'inputDropdownContainer__layer--flat': flat, 'inputDropdownContainer__layer--isOn': modelValue }">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false,
            required: true,
        },
        placeholder: {
            type: String,
            default: "請選擇",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        // 純顯示用，不做資料運用
        name: {
            type: String,
            default: ''
        },
        max: {
            type: Number,
            default: 0
        },
        items: {
            type: Array,
            default: function () {
                return []
            }
        },
        flat: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.toggleClickOutside(true)
    },
    beforeUnmount() {
        this.toggleClickOutside(false)
    },
    watch: {
        items: {
            deep: true,
            handler: function () {
                if (this.max && this.items.length === this.max) {
                    this.$emit("update:modelValue", false)
                }
            }
        }
    },
    methods: {
        toggleDropdown() {
            this.$emit("update:modelValue", !this.modelValue)
            this.$emit("click")
        },
        toggleClickOutside(isOn) {
            if (isOn) {
                document.addEventListener("click", this.handleClickoutSide)
            } else {
                document.removeEventListener("click", this.handleClickoutSide)
            }
        },
        handleClickoutSide(event) {
            const area = this.$refs.input
            if (!area.contains(event.target)) {
                this.$emit("update:modelValue", false)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.inputDropdownContainer {
    position: relative;

    .container__nameGroup {
        margin-bottom: 8px;
    }

    .inputDropdownContainer__trigger {
        background-color: white;
        display: flex;
        justify-items: center;
        align-items: center;
        border: solid 1px #d3d3d3;
        width: 100%;
        padding: 8px;
        border-radius: 4px;

        .inputDropdownContainer__trigger__header {
            width: 100%;
        }

        .inputDropdownContainer__icon {
            transition: all 0.3s;
        }
    }

    .inputDropdownContainer__trigger--isOn {
        .inputDropdownContainer__icon {
            transform: scaleY(-1);
        }
    }

    .inputDropdownContainer__layer {
        border-radius: 4px;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
        background-color: white;
        position: absolute;
        left: 0;
        max-height: 0;
        overflow: hidden;
        z-index: 10;
        border: none;
        margin-top: 4px;
        min-width: 100%;
    }

    .inputDropdownContainer__layer--flat {
        position: inherit;
    }

    .inputDropdownContainer__layer--isOn {
        max-height: 1000vh;
        border: solid 1px #d3d3d3;
    }
}

@media screen and (min-width: 992px) {
    .inputDropdownContainer {
        .inputDropdownContainer__trigger {
            // padding: 13px 20px;
            // border-radius: 4px;
            // // background-color: #eee;
            // display: flex;
            // justify-items: center;
            // justify-content: space-between;
            // border: none;
            // width: 100%;

            .placeholder__text {
                font-size: 20px;
            }
        }

        .inputDropdownContainer__layer {
            // width: 420px;
        }
    }
}
</style>