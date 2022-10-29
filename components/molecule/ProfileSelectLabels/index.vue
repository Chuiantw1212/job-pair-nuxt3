<template>
    <div class="category__labelGroup">
        <template v-if="localValue && localValue.length">
            <div v-for="(item, index) in localValue" :key="index">
                <div v-if="$filter.optionText(item, items)" class="item__badge">
                    <span class="badge__span">{{ $filter.optionText(item, items) }}</span>
                    <img class="badge__image" src="./Icon_delete_g.svg" @click.stop="removeSelf(index)" />
                </div>
                <div v-else class="item__badge">
                    <span class="badge__span">{{ item, items }}</span>
                    <img class="badge__image" src="./Icon_delete_g.svg" @click.stop="removeSelf(index)" />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="labelGroup__placeholder">
                {{ placeholder }}
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: {
            type: Array,
            default: function () {
                return []
            }
        },
        jobCategoryMap: {
            type: Object,
            default: function () {
                return {}
            }
        },
        items: {
            type: Array,
            default: function () {
                return []
            }
        },
        placeholder: {
            type: String,
            default: '職務類別'
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
        removeSelf(index) {
            this.localValue.splice(index, 1)
        },
    }
}
</script>
<style lang="scss">
.category__labelGroup {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 0px;

    .item__badge {
        display: flex;
        // margin-bottom: 4px;
        border-radius: 10px;
        // border: solid 1px #5ea88e;
        align-items: center;
        color: white;
        font-size: 18px;
        background-color: #5ea88e;
        text-align: left;
        padding: 4px 10px;

        .badge__span {
            // padding: 0px 8px;
            // margin-left: 8px;
        }

        .badge__image {
            width: 16px;
            height: 16px;
            margin-left: 8px;
            // margin-right: 8px;
            display: block;
            cursor: pointer;
        }

        &:last-child {
            margin-right: 8px;
        }
    }

    .labelGroup__placeholder {
        margin-left: 8px;
    }
}
</style>