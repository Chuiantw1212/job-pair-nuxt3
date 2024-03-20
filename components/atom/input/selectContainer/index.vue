<template>
    <div class="inputDropdownContainer" ref="input">
        <button class="inputDropdownContainer__trigger" @click="toggleDropdown()" :disabled="disabled"
            :class="{ 'inputDropdownContainer__trigger--isOn': modelValue }">
            <div class="trigger__nameGroup">
                <span class="placeholder__text">{{ name }}</span>
                <span v-if="count" class="nameGroup__badge">{{ count }}</span>
            </div>
            <img src="./Up.svg" alt="down" class="inputDropdownContainer__icon">
        </button>
        <div class="inputDropdownContainer__layer" :class="{ 'inputDropdownContainer__layer--isOn': modelValue }"
            :style="{ 'width': width }">
            <div class="layer__padding">
                <slot name="header"></slot>
                <slot name="body"></slot>
                <slot name="default"></slot>
                <div class="layer__footer">
                    <slot name="footer">

                    </slot>
                </div>
            </div>
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
        name: {
            type: String,
            default: "請選擇",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: 'unset'
        },
        count: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.toggleClickOutside(true)
    },
    beforeUnmount() {
        this.toggleClickOutside(false)
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
            if (!area.contains(event.target) && this.modelValue) {
                this.$emit("update:modelValue", false)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.inputDropdownContainer {
    position: relative;

    .inputDropdownContainer__trigger {
        padding: 10px;
        border-radius: 5px;
        background-color: #edeaea;
        display: flex;
        justify-items: center;
        justify-content: space-between;
        align-items: center;
        border: none;
        width: 100%;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #484848;
        min-height: 40px;

        .trigger__nameGroup {
            gap: 10px;
            display: flex;
            align-items: center;

            .placeholder__text {
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #484848;
            }

            .nameGroup__badge {
                width: 20px;
                height: 20px;
                border-radius: 100px;
                background-color: #f5fffb;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: center;
                color: #5ea88e;
            }
        }

        .inputDropdownContainer__icon {
            transition: all 0.3s;
            transform: scaleY(-1);
        }
    }

    .inputDropdownContainer__trigger--isOn {
        background-color: #eef6ed;

        .inputDropdownContainer__icon {
            transform: scaleY(1);
        }
    }

    .inputDropdownContainer__layer {
        border-radius: 10px;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
        background-color: white;
        position: absolute;
        left: 0;
        max-height: 0;
        overflow: hidden;
        z-index: 110;
        padding: 0px !important; // 不可以有Padding
        width: 100%;

        .layer__padding {
            padding: 20px;

            :deep(.layer__footer) {
                display: flex;
                gap: 10px;
                margin-top: 20px;

                >* {
                    width: 100%;
                }
            }
        }
    }

    .inputDropdownContainer__layer--isOn {
        max-height: 1000vh;
    }
}

@media screen and (min-width: 992px) {
    .inputDropdownContainer {
        .inputDropdownContainer__trigger {
            padding: 10px;
            border-radius: 5px;
            background-color: #edeaea;
            display: flex;
            justify-items: center;
            justify-content: space-between;
            border: none;
            width: 100%;
        }

        .inputDropdownContainer__layer {
            min-width: 100%;
            margin-top: 5px;
        }
    }
}
</style>