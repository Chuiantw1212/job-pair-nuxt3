<template>
    <div class="slide">
        <div :id="`slide-${state.id}`" class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide">
                        <div class="slide__content">
                            <LazyAtomInputCkeditorInline v-model="controllable.card1Title.html" :toolbar="state.toolbar"
                                class="card__title">
                            </LazyAtomInputCkeditorInline>
                            <hr class="content__hr">
                            <div class="content__body">
                                <div class="body__left">
                                    <img src="./default.webp">
                                    <LazyAtomInputCkeditorInline v-model="controllable.card1Desc1.html"
                                        :toolbar="state.toolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                                <div class="body__right">
                                    <LazyAtomInputCkeditorInline v-model="controllable.card1Desc2.html"
                                        :toolbar="state.toolbar">
                                    </LazyAtomInputCkeditorInline>
                                </div>
                            </div>
                        </div>

                    </li>
                    <li class="glide__slide">1</li>
                    <li class="glide__slide">2</li>
                </ul>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&lt;</button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">">></button>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $uuid4, $Glide, $requestSelector } = useNuxtApp()
const controllable = reactive({
    // Card1
    card1Title: {
        isFocused: false,
        position: {
            left: 0,
            top: 0,
        },
        html: '<p style="text-align:center;"><span style="font-size:36px;">聽聽大家怎麼說</span></p>'
    },
    card1Desc1: {
        html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="font-size:18px;">Owener, Softia, UK</span></p>'
    },
    card1Desc2: {
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
        'alignment',
    ]

})
onMounted(() => {
    state.id = $uuid4()
    if (process.client) {
        $requestSelector(`#slide-${state.id}`, (element) => {
            // if (!state.bsModal) {
            //     state.bsModal = new window.bootstrap.Modal(element, {
            //         keyboard: false,
            //     })
            // }
            const glideInstance = new $Glide.Default(element, {
                gap: 10,
                // rewind: true,
                bound: true,
            })
            glideInstance.mount({
                Controls: $Glide.Controls,
            })
            // glideInstance.mount({
            //     type: 'carousel',
            // })
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

    .content__title {
        // font-size: 36px;
        // font-weight: 600;
        // font-stretch: normal;
        // font-style: normal;
        // line-height: normal;
        // letter-spacing: normal;
        // text-align: left;
        // color: #fff;
        // text-align: center;
    }

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

        .body__left {
            width: 50%;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .body__right {
            width: 50%;
        }
    }
}
</style>