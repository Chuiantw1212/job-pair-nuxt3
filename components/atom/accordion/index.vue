<template>
    <div class="accordion">
        <div class="accordion__header" :class="{ 'accordion__header--isOpened': modelValue }"
            @click="$emit('update:modelValue', !modelValue)">
            <span>{{ placeholder }}</span>
            <img v-if="arrow === 'up'" alt="up" class="accordion__image accordion__image__up" src="./icon_Down.svg" />
            <img v-if="arrow === 'right'" alt="right" class="accordion__image accordion__image__right"
                src="./icon_Down.svg" />
        </div>
        <div class="accordion__layer" :class="{ 'accordion__layer--isOpened': modelValue }">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'accordion',
    props: {
        modelValue: {
            type: Boolean,
            default: function () {
                return false
            },
        },
        placeholder: {
            type: String,
            default: "",
        },
        arrow: {
            type: String,
            default: "up",
        },
    },
}
</script>
<style lang="scss" scoped>
.accordion {
    .accordion__header {
        padding: 10px 0px;
        background-color: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        border-bottom: 1px solid #EDEAEA;
        line-height: 1;

        .accordion__image {
            width: 14px;
            height: 14px;
            transition: all 0.3s;
            transform: scaleY(-1);
        }

        .accordion__image__right {
            transform: rotate(-90deg);
        }
    }

    .accordion__header--isOpened {
        .accordion__image__up {
            transform: scaleY(1);
        }
    }

    .accordion__layer {
        border-radius: 5px;
        background-color: #fff;
        overflow: hidden;
        max-height: 0;
        transition: all 0.3s;
    }

    .accordion__layer--isOpened {
        border-bottom: 1px solid #EDEAEA;
        max-height: 1000vh;
    }
}
</style>