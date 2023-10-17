<template>
    <div class="slide">
        <div :id="`slide-${state.id}`" class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul v-if="localValue.controllable" class="glide__slides">
                    <li class="glide__slide" v-for="(slide, index) in localValue.controllable.items">
                        <div class="slide__content">
                            <template v-if="readonly">
                                <div v-html="slide.title.html" class="ck ck-editor__editable_inline">
                                </div>
                                <hr class="content__hr">
                                <div class="content__body">
                                    <div class="body__left">
                                        <img src="./default.webp">
                                        <div v-html="slide.image.html" class="ck ck-editor__editable_inline">
                                        </div>
                                    </div>
                                    <div class="body__right">
                                        <div v-html="slide.desc.html" class="ck ck-editor__editable_inline">
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="content__body">
                                    <img src="./SLIDE02_BG.webp">
                                    <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].desc.html"
                                        :toolbar="state.titleToolbar">
                                    </LazyAtomInputCkeditorInline>
                                    <!-- <div class="body__left">
                                        <img src="./default.webp">
                                    </div> -->
                                    <!-- <div class="body__right">
                                        <LazyAtomInputCkeditorInline
                                            v-model="localValue.controllable.items[index].desc.html">
                                        </LazyAtomInputCkeditorInline>
                                    </div> -->
                                </div>
                            </template>
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
const state = reactive({
    id: null,
    glideInstance: null,
    titleToolbar: [
        // 'fontSize',
        // '|',
        'bold',
        'fontColor',
        '|',
        'alignment',
    ]
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'SLIDE01',
            }
        }
    },
    readonly: {
        type: Boolean,
        default: false
    }
})
onMounted(() => {
    state.id = $uuid4()
    if (process.client) {
        $requestSelector(`#slide-${state.id}`, (element) => {
            const glideInstance = new $Glide.Default(element, {
                gap: 10,
                bound: true,
                perView: 2,
            })
            glideInstance.mount({
                Controls: $Glide.Controls,
            })
            state.glideInstance = glideInstance
        })
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
watch(() => localValue.value, (newValue) => {
    if (!newValue.controllable) {
        const defaultValue = {
            name: 'SLIDE01',
            controllable: {
                items: [
                    {
                        title: {
                            html: '<p style="text-align:center;"><span>聽聽大家怎麼說</span></p>'
                        },
                        image: {
                            html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>',
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span>聽聽大家怎麼說</span></p>'
                        },
                        image: {
                            html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>',
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span>聽聽大家怎麼說</span></p>'
                        },
                        image: {
                            html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>',
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
                        }
                    }
                ]
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })

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