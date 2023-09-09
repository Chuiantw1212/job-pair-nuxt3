<template>
    <div class="slide">
        <div :id="`slide-${state.id}`" class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide">
                        <div class="slide__content">
                            <div>聽聽大家怎麼說</div>
                            <div>
                                <div>Ramen</div>
                                <div>
                                    如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...
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
const state = reactive({
    id: null,
    glideInstance: null
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
}
</style>