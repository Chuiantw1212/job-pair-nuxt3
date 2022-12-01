<template>
    <div class="accordion">
        <div class="accordion__header" :class="{ 'accordion__header--isOpened': modelValue }"
            @click="$emit('update:modelValue', !modelValue)">
            <span>{{ placeholder }}</span>
            <img v-if="arrow === 'up'" class="accordion__image accordion__image__up" src="./icon_Down.svg" />
            <img v-if="arrow === 'right'" class="accordion__image accordion__image__right" src="./icon_Down.svg" />
        </div>
        <div class="accordion__layer" :class="{ 'accordion__layer--isOpened': modelValue }">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
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
        padding: 11px 9.6px 10px 10px;
        border-radius: 4px;
        background-color: #eee;
        display: flex;
        justify-items: center;
        justify-content: space-between;
        cursor: pointer;

        .accordion__image {
            transition: all 0.3s;
        }

        .accordion__image__up {
            // transform: rotate(-90deg);
        }

        .accordion__image__right {
            transform: rotate(-90deg);
        }
    }

    .accordion__header--isOpened {
        background-color: #eef6ed;

        .accordion__image__up {
            transform: scaleY(-1);
        }
    }

    .accordion__layer {
        border-radius: 4px;
        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;
        overflow: hidden;
        max-height: 0;
    }

    .accordion__layer--isOpened {
        max-height: 1000vh;
    }
}

@media screen and (min-width: 992px) {}
</style>