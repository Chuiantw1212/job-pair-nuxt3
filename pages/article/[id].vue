<template>
    <div class="article">
        <div class=article__image :style="{ 'background-image': `url(${state.article.images[0]?.url})` }"></div>
        <!-- <img class="article__image" :src="state.article.images[0]?.url"> -->
        <div class="article__body">
            <div class="article__keywords">
                <div v-for="(keyword, index) in state.article.keywords" :key="index">
                    {{ `#${keyword}` }}
                </div>
            </div>
            <h1 class="article__title">{{ state.article.name }}</h1>
            <div class="article__date">{{ $filter.date(state.article.dateCreated) }}</div>
            <div class="article__text" v-html="state.article.text"></div>
            <hr class="article__hr" />
            <div class="article__links">
                <span>分享</span>
                <!-- https://stackoverflow.com/questions/9120539/facebook-share-link-without-javascript -->
                <a :href="`https://www.facebook.com/sharer/sharer.php?u=${windowLocationHref}`" target="_blank">
                    <!-- Share -->
                    <img src="@/assets/articles/Facebook.svg">
                </a>
                <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${windowLocationHref}`" target="_blank">
                    <img src="@/assets/articles/Linkdin.svg">
                </a>
                <button v-if="state.navigator?.share" class="links__btn" @click="shareLinkNative()">
                    <img src="@/assets/articles/Share.svg">
                </button>
                <button v-else class="links__btn" @click="shareLinkBootstrap()">
                    <img src="@/assets/articles/Share.svg">
                </button>
            </div>
            <div class="article__more">更多文章</div>
            <div :id="`glide${state.id}`" class="article__glide" ref="glideRef">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        <li class="glide__slide" v-for="(item, index) in state.articles" :key="index">
                            <!-- <div :style="{ 'background-image': `url(${item.images[0].url})` }"></div> -->
                            <img class="content__image" :src="item.images[0].url">
                            <NuxtLink class="slide__content" :to="{ name: 'article-id', params: { 'id': item.id } }">
                                <div class="content__keywordsWrap">
                                    <div v-for="(keyword, index) in item.keywords" :key="index"
                                        class="keywordsWrap__keywords">
                                        {{ `#${keyword}` }}
                                    </div>
                                </div>
                                <div class="content__title">{{ item.name }}</div>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $requestSelector, $uuid4, $Glide } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const route = useRoute()
const repoArticle = useRepoArticle()
const state = reactive({
    article: {
        images: []
    },
    articles: [],
    glideInstance: null,
    debounceTimer: null,
    navigator: null,
})
if (process.client) {
    state.navigator = window.navigator
}
// hooks
const articleId = computed(() => {
    return route.params.id
})
const { data: article } = await useFetch(`${runTimeConfig.public.apiBase}/article/${articleId.value}`, { initialCache: false })
state.article = article
const windowLocationHref = computed(() => {
    const encoded = encodeURI(`${runTimeConfig.public.siteUrl}/article/${article.id}`)
    return encoded
})
onMounted(async () => {
    if (process.client) {
        if (!state.article) {
            setArticle()
        }
        await getAllArticles()
        state.id = $uuid4()
        mountGlideInstance()  // IMPORTANT
    }
})
// methods
async function shareLinkNative() {
    const { origin } = window.location
    const url = `${origin}/article/${articleId.value}?openExternalBrowser=1`
    await navigator.share({
        title: state.article.name,
        text: state.article.description,
        url,
    })
}
async function shareLinkBootstrap() {
    // 不支援貼到記憶體裡面
    const { origin } = window.location
    const url = `${origin}/article/${articleId.value}?openExternalBrowser=1`
    await navigator.clipboard.writeText(url)
    state.shareButtonToolTip.hide()
}
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
                gap: 10,
                rewind: true,
                bound: true,
                perView: 2.1
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
    debounce(() => {
        const glideConfig = {
            type: 'carousel',
            gap: 10,
            rewind: true,
            bound: true,
        }
        if (event.target.innerWidth >= 992) {
            glideConfig.perView = 3.5
            state.glideInstance.update(glideConfig)
        } else {
            glideConfig.perView = 2.1
            state.glideInstance.update(glideConfig)
        }
    })
}
async function setArticle() {
    const article = await repoArticle.getArticleById({
        id: articleId.value
    })
    state.article = article
}

</script>
<style lang="scss" scoped>
.article {
    background-color: white;
    text-align: center;

    .article__image {
        height: 100vw;
        width: 100vw;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 0 0 10px 10px;
    }

    .article__body {
        padding: 20px;

        .article__keywords {
            display: flex;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #a6a6a6;
        }

        .article__title {
            font-size: 22px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.27;
            letter-spacing: normal;
            text-align: left;
            color: #222;
            margin-top: 20px;
        }

        .article__date {
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #a6a6a6;
            margin-top: 20px;
        }

        .article__text {
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: 1px;
            text-align: justify;
            color: #222;
            margin-top: 60px;
        }

        .article__hr {
            background-color: #edeaea;
        }

        .article__links {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
            margin-top: 30px;

            .links__btn {
                background-color: inherit;
                border: none;
            }
        }

        .article__more {
            font-size: 20px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #222;
            margin-top: 20px;
        }

        .article__glide {
            margin-top: 20px;
        }

        .content__image {
            width: 150px;
            height: 150px;
            border-radius: 10px;
        }

        .slide__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 150px;
            color: black;
            text-decoration: none;
            margin: auto;

            .content__keywordsWrap {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                margin-top: 10px;

                &:hover {
                    text-decoration: underline;
                }
            }

            .content__title {
                font-size: 20px;
                font-weight: 600;
                max-width: 250px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: justify;
                margin-top: 10px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .article {
        // display: flex;
        // flex-direction: column;
        // justify-content: center;

        .article__image {
            max-height: 480px;
            margin: auto;
            max-width: 870px;
        }

        .article__body {
            max-width: 870px;
            margin: auto;

            .article__keywords {
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #a6a6a6;
            }

            .article__title {
                font-size: 22px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.27;
                letter-spacing: normal;
                text-align: left;
                color: #222;
            }

            .article__date {
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #a6a6a6;
            }

            .article__text {
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: 1px;
                text-align: left;
                color: #222;
            }

            .article__hr {
                margin-top: 30px;
            }

            .article__more {
                margin-top: 30px;
                font-size: 20px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #222;
            }

            .content__image {
                width: 150px;
                height: 150px;
                border-radius: 10px;
            }
        }
    }
}
</style>