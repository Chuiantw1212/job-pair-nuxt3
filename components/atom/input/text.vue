<template>
    <div class="inputGroup" :ref="`inputGroup`" :key="state.key">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
        </div>
        <label class="inputGroup__label" :class="{ 'inputGroup__label--disabled': disabled }">
            <input v-if="!disabled" class="label__input" v-model="localValue" :placeholder="localPlaceholder"
                :data-required="required" :data-name="name" autocomplete="off" />
            <input v-else :disabled="true" class="label__input" :class="{ 'label__input--disabled': disabled }"
                :value="localValue" :readonly="modelValue" />
        </label>
    </div>
</template>
<script >
export default {
    name: 'customText',
}
</script>
<script setup>
const { $uuid4, } = useNuxtApp()
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    key: null,
})
const props = defineProps({
    name: {
        type: String,
        default: "",
    },
    width: {
        type: [String, Number],
        default: "1",
    },
    modelValue: {
        type: [String, Number],
        default: "",
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "",
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 0,
    },
})
onMounted(() => {
    state.key = $uuid4()
})
const localPlaceholder = computed(() => {
    if (props.placeholder) {
        return props.placeholder
    }
    if (props.name) {
        return `請輸入${props.name}`
    }
    return props.placeholder
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
watch(() => localValue.value, () => {
    if (props.max && localValue.value && localValue.value.length > props.max) {
        localValue.value = localValue.value.slice(0, props.max)
    }
})
</script>
<style lang="scss" scoped>
.inputGroup {
    .inputGroup__nameGroup {
        font-size: 16px;
        color: #1f1f1f;
        margin-bottom: 4px;
    }

    .inputGroup__label {
        padding: 7px 12px;
        border: 1px solid #d9d9d9;
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