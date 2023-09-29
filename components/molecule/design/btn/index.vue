<template>
    <button :id="id" class="btnDesign" :class="{ 'btnDesign--disabled': disabled, 'btnDesign--editing': state.isEditing }"
        :disabled="disabled" ref="simple" @mouseenter="startEditing()" @mouseleave="completeEditing($event)">
        <div class="btnDesign__toolbar" ref="toolbar">
            <LazyAtomInputColor v-if="localValue" v-model="localValue.color" class="btnDesign__colorPickr">
            </LazyAtomInputColor>
            <!-- <img src="./Frame.svg"> -->
            <img src="./Frame2.svg">
        </div>
        <slot></slot>
    </button>
    <!-- <div> -->
    <!-- </div> -->
</template>
<script>
export default {
    name: 'simple'
}
</script>
<script setup>
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    isEditing: false
})
const props = defineProps({
    modelValue: {
        type: Object,
        defualt: function () {
            return {
                color: ""
            }
        }
    },
    id: {
        type: String
    },
    disabled: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'success',
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
const instance = getCurrentInstance()
// onMounted(() => {
//     if (props.color && props.outline) {
//         instance.refs.simple.classList.add(`btnDesign--outline--${props.color}`)
//     }
// })
function startEditing() {
    console.log('start');
    state.isEditing = true
}
function completeEditing(event) {
    // const toolbar = instance.refs.toolbar
    // const target = event.target
    // if (target.contains(toolbar)) {
    //     return
    // }
    state.isEditing = false
}
</script>
<style lang="scss" scoped>
.btnDesign {
    line-height: 1.3;
    border-radius: 5px;
    background-color: #5ea88e;
    font-size: 18px;
    padding: 12px;
    border: none;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    justify-content: center;
    display: flex;
    align-items: center;
    position: relative;

    >* {
        display: block;
    }

    &:hover {
        outline: solid 5px #252f3d;
    }

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
    }

    .btnDesign__colorPickr {
        background-color: white;
        // position: absolute;
        // display: none;
    }
}

.btnDesign--editing {
    outline: solid 5px #252f3d;

    .btnDesign__toolbar {
        display: flex;
    }
}

// IMPORTANT: 直接由外部套用樣式
.btnDesign--outline--success {
    background-color: rgba(0, 0, 0, 0);
    color: #5ea88e;
    border: solid 1px #5ea88e;

    &:hover {
        background-color: rgba(0, 0, 0, 0);
        color: #21cc90;
    }
}

.btnDesign--outline--light {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: solid 1px white;

    &:hover {
        background-color: rgba(0, 0, 0, 0);
        color: white;
    }
}

.btnDesign--outline--danger {
    background-color: white;
    color: #da4437;
    border: 1px solid #da4437;

    &:hover {
        background-color: white;
    }
}

.btnDesign--disabled {
    background-color: #d3d3d3;
    color: #969696;
    cursor: unset;

    &:hover {
        background-color: #d3d3d3;
    }
}
</style>