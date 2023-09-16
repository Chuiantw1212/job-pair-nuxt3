<template>
    <div class="slide">
        <div :id="`slide-${state.id}`" class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide">
                        <div class="slide__content">
                            <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                v-model="localValue.controllable.items[0].title.html" :toolbar="state.titleToolbar"
                                class="card__title">
                            </LazyAtomInputCkeditorInline>
                            <hr class="content__hr">
                            <div class="content__body">
                                <div class="body__left">
                                    <img src="./default.webp">
                                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                        v-model="localValue.controllable.items[0].image.html" :toolbar="state.titleToolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                                <div class="body__right">
                                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                        v-model="localValue.controllable.items[0].desc.html">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="glide__slide">
                        <div class="slide__content">
                            <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                v-model="localValue.controllable.items[1].title.html" :toolbar="state.titleToolbar"
                                class="card__title">
                            </LazyAtomInputCkeditorInline>
                            <hr class="content__hr">
                            <div class="content__body">
                                <div class="body__left">
                                    <img src="./default.webp">
                                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                        v-model="localValue.controllable.items[1].image.html" :toolbar="state.titleToolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                                <div class="body__right">
                                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                        v-model="localValue.controllable.items[1].desc.html">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="glide__slide">
                        <div class="slide__content">
                            <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                v-model="localValue.controllable.items[2].title.html" :toolbar="state.titleToolbar"
                                class="card__title">
                            </LazyAtomInputCkeditorInline>
                            <hr class="content__hr">
                            <div class="content__body">
                                <div class="body__left">
                                    <img src="./default.webp">
                                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                        v-model="localValue.controllable.items[2].image.html" :toolbar="state.titleToolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                                <div class="body__right">
                                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                                        v-model="localValue.controllable.items[2].desc.html">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <button class="glide__bullet" data-glide-dir="=0"></button>
                <button class="glide__bullet" data-glide-dir="=1"></button>
                <button class="glide__bullet" data-glide-dir="=2"></button>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $uuid4, $Glide, $requestSelector } = useNuxtApp()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'SLIDE01',
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
    id: null,
    glideInstance: null,
    titleToolbar: [
        'fontSize',
        '|',
        'bold',
        'fontColor',
        '|',
        'alignment',
    ]

})
onMounted(() => {
    state.id = $uuid4()
    if (process.client) {
        $requestSelector(`#slide-${state.id}`, (element) => {
            const glideInstance = new $Glide.Default(element, {
                gap: 10,
                bound: true,
            })
            glideInstance.mount({
                Controls: $Glide.Controls,
            })
            state.glideInstance = glideInstance
        })
    }
})
</script>
<style lang="scss" scoped>
.slide__content {
    background-color: #2aa984;
    color: white;
    padding: 50px 100px;

    .content__hr {
        width: 56px;
        margin: auto;
        border: 2px solid white;
        opacity: 1;
    }

    .content__body {
        display: flex;
        flex-grow: 1;
        flex-basis: 0;
        margin-top: 50px;
        flex-direction: column;

        .body__left {
            width: 50%;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .body__right {
            width: 100%;
        }
    }
}

@media screen and (min-width: 992px) {
    .slide__content {
        .content__body {
            flex-direction: row;

            .body__right {
                width: 50%;
            }
        }
    }
}
</style>