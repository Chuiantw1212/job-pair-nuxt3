<template>
    <div class="inputGroup" :ref="`inputGroup`" :key="state.key">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
        </div>
        <div class="inputGroup__labelGroup" :class="{ 'inputGroup__label--disabled': disabled }" :style="listStyle">
            <label v-for="(item, key) in items" class="labelGroup__label" :key="`item${state.key}`">
                <div class="label__circle">
                    <div class="circle__ring">

                    </div>
                    <div v-if="localValue === item.value" class="circle__content">

                    </div>
                </div>
                <input v-show="false" v-model="localValue" :value="item.value" type="radio" />
                <div class="label__text">
                    {{ item.text }}
                </div>
            </label>

        </div>
    </div>
</template>
<script>
export default {
    name: 'radio2',
}
</script >
<script setup>
const { $uuid4, } = useNuxtApp()
const state = reactive({
    key: null,
})
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        default: null
    },
    items: {
        type: Array,
        default: function () {
            return []
        },
    },
    itemText: {
        type: String,
        default: "text",
    },
    itemValue: {
        type: String,
        default: "value",
    },
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    listStyle: {
        type: Object,
        default: function () {
            return {}
        }
    }
})
// hooks
onMounted(() => {
    state.key = $uuid4()
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
</script>
<style lang="scss" scoped>
.inputGroup {
    .inputGroup__nameGroup {
        font-size: 18px;
        color: #1f1f1f;
        margin-bottom: 4px;
        font-weight: bold;
    }

    .inputGroup__labelGroup {
        gap: 18px;
        min-height: 40px;

        .labelGroup__label {
            display: flex;
            align-items: center;
            gap: 14px;

            .label__circle {
                position: relative;
                width: 16.4px;
                height: 16.4px;


                .circle__ring {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 16.4px;
                    height: 16.4px;
                    border: 1px solid #999999;
                    border-radius: 50%;
                }

                .circle__content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8.2px;
                    height: 8.2px;
                    background-color: #5ea88e;
                    border-radius: 50%;
                }
            }

            .label__text {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.57;
                letter-spacing: normal;
                text-align: left;
                color: #222;
            }
        }
    }

    .inputGroup__label {
        padding: 7px 12px;
        border-radius: 10px;
        width: 100%;
        background-color: white;

        .label__input {
            border: none;
            width: 100%;

            &:focus {
                outline: none;
            }

            &::placeholder {
                color: #d3d3d3;
            }
        }
    }

    .inputGroup__label--disabled {
        background-color: rgba(239, 239, 239);

        .label__input {
            background-color: rgba(239, 239, 239);
        }
    }
}
</style>