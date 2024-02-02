<template>
    <div class="articles">
        <!-- <img src="@/assets/articles/Mask.png"> -->
        <div :id="`glide${state.id}`" class="feedback__list" ref="glideRef">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide" v-for="(number, index) in 3" :key="index" ref="feedbackItem">
                        <div class="slide__content">
                            <div class="content__imageWrap">
                                <img class="content__image" src="@/assets/articles/Mask.png">
                            </div>
                        </div>
                        <!-- <div class="feedback__content">
                            <div class="content__name">{{ feedback.name }}</div>
                            <div class="content__to">諮詢師：{{ feedback.to }}</div>
                            <div class="content__desc">
                                <div v-html="feedback.desc"></div>
                            </div>
                            <button class="content__openModal" @click="showFeedback(feedback)">詳全文</button>
                        </div> -->
                    </li>
                </ul>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&lt;</button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">">></button>
            </div>
        </div>
        <div class="articles__body">
            <div class="body__title">
                文章列表（{{ state.articles.length }}）
            </div>
            <ul class="body__list">
                <li v-for="(item, index) in state.articles" class="list__item">
                    <img class="item__image" src="@/assets/articles/thumbnail.png">
                    <div>
                        <div class="item__title">
                            {{ formatKeywords(item.keywords) }}
                        </div>
                        <div class="item__desc">
                            {{ item.name }}
                            <!-- 錢能買到幸福嗎？深入思考薪水與人生滿足感的關係 -->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const { $requestSelector, $uuid4, $Glide } = useNuxtApp()
const repoArticle = useRepoArticle()
const state = reactive({
    id: null,
    feedbackGlideInstance: null,
    bsModal: null,
    modalFeedback: null,
    articles: [],
})
const glideRef = ref(null)
// hooks
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        $requestSelector('#feedbackModal', (element) => {
            if (!state.bsModal) {
                state.bsModal = new window.bootstrap.Modal(element, {
                    keyboard: false,
                })
            }
        })
        mountGlideInstance()  // IMPORTANT
    }
    getAllArticles()

})
async function getAllArticles() {
    const response = await repoArticle.getAllArticles()
    if (response.status === 200) {
        state.articles = response.data
    }
}
function mountGlideInstance() {
    if (state.feedbackGlideInstance) {
        state.feedbackGlideInstance.destroy()
    }
    $requestSelector(`#glide${state.id}`, (element) => {
        nextTick(() => {
            const feedbackGlideInstance = new $Glide.Default(element, {
                type: 'carousel',
                gap: 20,
                rewind: true,
                bound: true,
            })
            feedbackGlideInstance.mount({
                Controls: $Glide.Controls,
            })
            state.feedbackGlideInstance = feedbackGlideInstance
            window.addEventListener("resize", setGlideConfig)
            setGlideConfig({ target: window })
        })
    })
}
function setGlideConfig(event) {
    if (event.target.innerWidth < 992) {
        state.feedbackGlideInstance.update({
            gap: 20,
            perView: 1,
            rewind: true,
            bound: true,
        })
    } else {
        state.feedbackGlideInstance.update({
            gap: 20,
            perView: 3,
            rewind: true,
            bound: true,
        })
    }
}
function formatKeywords(list = []) {
    return list.map(item => `#${item}`).join(' ')
}
</script>
<style lang="scss" scoped>
.articles {
    padding: 20px;

    .slide__content {
        display: flex;
        justify-content: center;

        .content__imageWrap {
            border-radius: 10px;
            overflow: hidden;

            .content__image {
                width: 311px;
            }
        }
    }

    .articles__body {

        .body__title {
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            margin-top: 20px;
        }

        .body__list {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 20px;
            margin-top: 20px;

            .list__item {
                display: flex;
                gap: 10px;

                .item__image {
                    width: 100px;
                    height: 100px;
                }

                .item__title {
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                }

                .item__desc {
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 22px;
                    /* 122.222% */
                }
            }
        }
    }
}
</style>