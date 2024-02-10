<template>
    <div class="accordion">
        <div class="accordion__header" :class="{ 'accordion__header--isOpened': modelValue }"
            @click="$emit('update:modelValue', !modelValue)">
            <div class="header__nameGroup">
                {{ name }}
                <div v-if="count" class="nameGroup__badge">{{ count }}</div>
            </div>
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
            default: false
        },
        name: {
            type: String,
            default: "",
        },
        arrow: {
            type: String,
            default: "up",
        },
        count: {
            type: Number,
            default: 0
        }
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

        .header__nameGroup {
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #222;
            display: flex;
            align-items: center;
            gap: 10px;

            .nameGroup__badge {
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
                width: 20px;
                height: 20px;
            }
        }

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
        padding: 0px !important; // 不可以有padding
    }

    .accordion__layer--isOpened {
        border-bottom: 1px solid #EDEAEA;
        max-height: 1000vh;
    }
}

@media screen and (min-width:992px) {

    .accordion {
        .accordion__header {
            .header__nameGroup {
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #222;
            }
        }
    }
}
</style>