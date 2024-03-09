<template>
    <div class="articles">
        <div :id="`glide${state.id}`" class="feedback__list" ref="glideRef">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <li class="glide__slide" v-for="(item, index) in state.articles" :key="index">
                        <div class="slide__content">
                            <NuxtLink class="content__imageWrap" :to="{ name: 'article-id', params: { 'id': item.id } }">
                                <img class="imageWrap__image" :src="item.images[0].url">
                                <div class="imageWrap__cover"></div>
                                <div class="imageWrap__keywordsWrap">
                                    <div v-for="(keyword, index) in item.keywords" :key="index"
                                        class="keywordsWrap__keywords">
                                        {{ `#${keyword}` }}
                                    </div>
                                </div>
                                <div class="imageWrap__title">{{ item.name }}</div>
                            </NuxtLink>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="articles__body">
            <div class="body__title">
                文章列表（{{ state.articles.length }}）
            </div>
            <ul class="body__list">
                <li v-for="(item, index) in state.articles" class="list__item">
                    <NuxtLink class="item__link" :to="{ name: 'article-id', params: { 'id': item.id } }">
                        <img class="item__image" :src="item.images[0].url">
                    </NuxtLink>
                    <NuxtLink class="item__link" :to="{ name: 'article-id', params: { 'id': item.id } }">
                        <div class="item__keywords">
                            {{ formatKeywords(item.keywords) }}
                        </div>
                        <div class="item__title">
                            {{ item.name }}
                        </div>
                        <div v-html="item.description" class="item__desc">

                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const { $requestSelector, $uuid4, $Glide } = useNuxtApp()
useHead({
    title: '文章'
})
const repoArticle = useRepoArticle()
const state = reactive({
    id: null,
    glideInstance: null,
    bsModal: null,
    modalFeedback: null,
    articles: [],
    debounceTimer: null,
})
const glideRef = ref(null)
// hooks
onMounted(async () => {
    if (process.client) {
        await getAllArticles()
        state.id = $uuid4()
    }
})
// methods
async function getAllArticles() {
    const response = await repoArticle.getAllArticles()
    if (response.status === 200) {
        state.articles = response.data
        mountGlideInstance()  // IMPORTANT
    }
}
function mountGlideInstance() {
    if (state.glideInstance) {
        state.glideInstance.destroy()
    }
    $requestSelector(`#glide${state.id}`, (element) => {
        nextTick(() => {
            const glideInstance = new $Glide.Default(element, {
                type: 'carousel',
                gap: 20,
                rewind: true,
                bound: true,
            })
            glideInstance.mount({
                Swipe: $Glide.Swipe,
            })
            state.glideInstance = glideInstance
            window.addEventListener("resize", setGlideConfig)
            setGlideConfig({ target: window })
        })
    })
}
function debounce(func, timeout = 100) {
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => {
        func();
    }, timeout);
}
function setGlideConfig(event) {
    const preview = Math.floor(event.target.innerWidth / 400)
    const maxPreview = Math.max(1.2, preview)
    debounce(() => {
        state.glideInstance.update({
            gap: 20,
            perView: maxPreview,
            rewind: true,
            bound: true,
        })
    })
}
function formatKeywords(list = []) {
    return list.map(item => `#${item}`).join(' ')
}
</script>
<style lang="scss" scoped>
.articles {
    padding: 20px;
    background-color: white;

    .slide__content {
        display: flex;
        justify-content: center;

        .content__imageWrap {
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            display: flex;
            z-index: 10;

            .imageWrap__keywordsWrap {
                position: absolute;
                left: 30px;
                top: 30px;
                color: white;
                display: flex;
                gap: 4px;

                .imageWrap__keywords {
                    color: white;
                    position: absolute;
                }

            }

            .imageWrap__image {
                max-width: 360px;
            }


            .imageWrap__cover {
                width: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }

            .imageWrap__title {
                position: absolute;
                left: 30px;
                bottom: 30px;
                color: white;
                font-size: 20px;
                font-weight: 600;
                max-width: 250px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: justify;
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
                align-items: center;

                .item__image {
                    width: 100px;
                    height: 100px;
                    border-radius: 10px;
                }

                .item__link {
                    color: black;
                    text-decoration: none;

                    .item__keywords {
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                    }

                    .item__title {
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 22px;
                        margin-top: 4px;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .item__desc {
                        display: none;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (min-width:992px) {
    .articles {
        padding: 70px 20px;

        .slide__content {
            display: flex;
            justify-content: center;

            .content__imageWrap {
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                display: flex;
                z-index: 10;

                .imageWrap__keywordsWrap {
                    position: absolute;
                    left: 30px;
                    top: 30px;
                    color: white;
                    display: flex;
                    gap: 4px;

                    .imageWrap__keywords {
                        color: white;
                        position: absolute;
                    }

                }

                .imageWrap__image {
                    max-width: 400px;
                }
            }
        }

        .articles__body {
            max-width: 870px;
            margin: auto;

            .body__title {
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                margin-top: 70px;
            }

            .body__list {
                display: flex;
                flex-direction: column;
                list-style: none;
                margin: 0;
                padding: 0;
                gap: 20px;
                margin-top: 30px;

                .list__item {
                    display: flex;
                    gap: 10px;
                    align-items: center;

                    .item__image {
                        width: 160px;
                        height: 160px;
                        border-radius: 10px;
                    }

                    .item__link {
                        .item__keywords {
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                        }

                        .item__title {
                            font-size: 18px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 22px;
                            margin-top: 10px;
                        }

                        .item__desc {
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 400;
                            margin-top: 10px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
    }

}
</style>