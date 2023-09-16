<template>
    <button class="colorPicker" @click="showPicker()">
        <div class="colorPicker__block" ref="pickr">

        </div>
        {{ localValue }}
    </button>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const currentInstance = getCurrentInstance()
const { $Pickr } = useNuxtApp()
const state = reactive({
    pickr: null,
})
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
watch(() => localValue.value, (newValue) => {
    if (newValue && state.pickr) {
        state.pickr.setColor(newValue)
    }
}, { immediate: true })
onMounted(() => {
    /**
     * 元件API
     * https://github.com/simonwep/pickr
     */
    const pickrElement = currentInstance.refs.pickr
    const pickr = $Pickr.create({
        el: pickrElement,
        theme: 'nano',
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                input: true,
                save: true
            }
        }
    })
    pickr.on('save', (color, instance) => {
        const HEXA = color.toHEXA().toString()
        localValue.value = HEXA
        state.pickr.hide()
    })
    state.pickr = pickr
    pickr.on('init', () => {
        state.pickr.setColor(localValue.value)
    })
})
function showPicker() {
    state.pickr.show()
}
</script>
<style lang="scss" scoped>
.colorPicker {
    background-color: inherit;
    padding: 10px;
    border-radius: 10px;
    border: solid 1px #d3d3d3;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 135px;

    .colorPicker__block {
        width: 30px;
        height: 30px;
        background-color: #5ea88e;
        border-radius: 5px;
    }

}
</style>