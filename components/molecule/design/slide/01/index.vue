<template>
    <div class="slide">
        <div :id="`slide-${state.id}`" class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide">
                        <div class="slide__content">
                            <LazyAtomInputCkeditorInline v-model="slide1.title.html" :toolbar="state.toolbar"
                                class="card__title">
                            </LazyAtomInputCkeditorInline>
                            <hr class="content__hr">
                            <div class="content__body">
                                <div class="body__left">
                                    <img src="./default.webp">
                                    <LazyAtomInputCkeditorInline v-model="slide1.imgDesc.html" :toolbar="state.toolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                                <div class="body__right">
                                    <LazyAtomInputCkeditorInline v-model="slide1.desc.html" :toolbar="state.toolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="glide__slide">
                        <div class="slide__content">
                            <LazyAtomInputCkeditorInline v-model="slide1.title.html" :toolbar="state.toolbar"
                                class="card__title">
                            </LazyAtomInputCkeditorInline>
                            <hr class="content__hr">
                            <div class="content__body">
                                <div class="body__left">
                                    <img src="./default.webp">
                                    <LazyAtomInputCkeditorInline v-model="slide1.imgDesc.html" :toolbar="state.toolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                                <div class="body__right">
                                    <LazyAtomInputCkeditorInline v-model="slide1.desc.html" :toolbar="state.toolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="glide__slide">
                        <div class="slide__content">
                            <LazyAtomInputCkeditorInline v-model="slide1.title.html" :toolbar="state.toolbar"
                                class="card__title">
                            </LazyAtomInputCkeditorInline>
                            <hr class="content__hr">
                            <div class="content__body">
                                <div class="body__left">
                                    <img src="./default.webp">
                                    <LazyAtomInputCkeditorInline v-model="slide1.imgDesc.html" :toolbar="state.toolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                                <div class="body__right">
                                    <LazyAtomInputCkeditorInline v-model="slide1.desc.html" :toolbar="state.toolbar">
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
const slide1 = reactive({
    title: {
        isFocused: false,
        position: {
            left: 0,
            top: 0,
        },
        html: '<p style="text-align:center;"><span style="font-size:36px;">聽聽大家怎麼說</span></p>'
    },
    imgDesc: {
        html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>'
    },
    desc: {
        html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
    },
})
const slide2 = reactive({
    title: {
        isFocused: false,
        position: {
            left: 0,
            top: 0,
        },
        html: '<p style="text-align:center;"><span style="font-size:36px;">聽聽大家怎麼說</span></p>'
    },
    imgDesc: {
        html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>'
    },
    desc: {
        html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
    },
})
const slide3 = reactive({
    title: {
        isFocused: false,
        position: {
            left: 0,
            top: 0,
        },
        html: '<p style="text-align:center;"><span style="font-size:36px;">聽聽大家怎麼說</span></p>'
    },
    imgDesc: {
        html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>'
    },
    desc: {
        html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
    },
})
const state = reactive({
    id: null,
    glideInstance: null,
    toolbar: [
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