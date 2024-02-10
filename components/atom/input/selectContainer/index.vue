<template>
    <div class="inputDropdownContainer" ref="input">
        <button class="inputDropdownContainer__trigger" @click="toggleDropdown()" :disabled="disabled"
            :class="{ 'inputDropdownContainer__trigger--isOn': modelValue }">
            <span class="placeholder__text">{{ placeholder }}</span>
            <img src="./Up.svg" alt="down" class="inputDropdownContainer__icon">
        </button>
        <div class="inputDropdownContainer__layer" :class="{ 'inputDropdownContainer__layer--isOn': modelValue }">
            <div class="layer__header">
                <slot name="header"></slot>
            </div>
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


        .placeholder__text {
            margin-right: 8px;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #484848;
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

        .layer__header {
            padding: 20px;
            padding-bottom: 0px;
        }
    }

    .inputDropdownContainer__layer--isOn {
        max-height: 1000vh;
    }
}

@media screen and (min-width: 992px) {
    .inputDropdownContainer {
        .inputDropdownContainer__trigger {
            padding: 13px 20px;
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
            width: unset;
            margin-top: 5px;
        }
    }
}
</style>