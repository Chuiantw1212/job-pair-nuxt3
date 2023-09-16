<template>
    <div class="description">
        <div class="description__imageGroup">
            <img src="./Image.webp">
        </div>
        <div class="description__textGroup">
            <!-- <h2></h2> -->
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.desc.html">
            </LazyAtomInputCkeditorInline>
            <div class="textGroup__footer">
                <div>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[0].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[0].desc.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
                <div>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[1].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[1].desc.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
                <div>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[2].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[2].desc.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'HYBRID01',
            }
        }
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }

})
const state = reactive({
    titleToolbar: [
        'fontSize',
        '|',
        'bold',
        'fontColor',
        '|',
        'alignment',
    ],
})
</script>
<style lang="scss" scoped>
.description {
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;

    .description__textGroup {}
}

@media screen and (min-width: 992px) {
    .description {
        flex-direction: row;
        gap: 100px;

        .description__textGroup {
            padding: 50px;

            .textGroup__footer {
                margin-top: 30px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>