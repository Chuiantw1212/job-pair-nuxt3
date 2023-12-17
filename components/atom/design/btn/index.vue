<template>
    <div class="btnDesign" :class="{ 'btnDesign--editing': state.isEditing }" @mouseenter="startEditing()"
        @mouseleave="completeEditing($event)">
        <div class="btnDesign__toolbar" ref="toolbar">
            <LazyAtomInputColor v-if="localValue" v-model="localValue.backgroundColor" class="btnDesign__colorPickr">
            </LazyAtomInputColor>
            <button class="toolbar__icon" @click="switchStyle()">
                顏色反轉
                <!-- <img v-show="localValue.outline" src="./contain.svg">
                <img v-show="!localValue.outline" src="./cover.svg"> -->
            </button>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'simple'
}
</script>
<script setup>
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    isEditing: false,
})
const props = defineProps({
    modelValue: {
        type: Object,
        defualt: function () {
            return {
                backgroundColor: "",
                outline: false,
            }
        }
    },
    outline: {
        type: Boolean,
        default: false
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
function startEditing() {
    state.isEditing = true
}
function completeEditing() {
    state.isEditing = false
}
function switchStyle() {
    localValue.value.outline = !localValue.value.outline
}
</script>
<style lang="scss" scoped>
.btnDesign {
    position: relative;

    .btnDesign__toolbar {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, calc(-100%));
        padding: 10px;
        display: none;
        gap: 10px;
        border-radius: 10px;
        background-color: #252f3d;

        .toolbar__icon {
            word-break: keep-all;
            color: white;
            background-color: inherit;
            border: none;
        }
    }

    .btnDesign__colorPickr {
        background-color: white;
    }
}

.btnDesign--editing {
    outline: solid 5px #252f3d;

    .btnDesign__toolbar {
        display: flex;
    }
}
</style>