<template>
    <div class="inputDropdownContainer" ref="input">
        <button class="inputDropdownContainer__trigger" @click="toggleDropdown()" :disabled="disabled"
            :class="{ 'inputDropdownContainer__trigger--isOn': modelValue }">
            <span class="placeholder__text">{{ placeholder }}</span>
            <img src="./icon_Down.svg" class="inputDropdownContainer__icon">
            <!-- <img > -->
        </button>
        <div class="inputDropdownContainer__layer" :class="{ 'inputDropdownContainer__layer--isOn': modelValue }">
            <slot></slot>
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

    .inputDropdownContainer__trigger {
        padding: 11px 9.6px 10px 10px;
        border-radius: 5px;
        background-color: #eee;
        display: flex;
        justify-items: center;
        justify-content: space-between;
        align-items: center;
        border: none;
        width: 100%;

        .placeholder__text {
            margin-right: 8px;
            color: #595959;
        }
    }

    .inputDropdownContainer__trigger--isOn {
        background-color: #eef6ed;

        .inputDropdownContainer__icon {
            transform: scaleY(-1);
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
        z-index: 10;
        padding: 0px !important; // 不可以有Padding
        min-width: 100%;
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
            background-color: #eee;
            display: flex;
            justify-items: center;
            justify-content: space-between;
            border: none;
            width: 100%;

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