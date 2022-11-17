<template>
    <MoleculeConsultCard class="consult__feedback">
        <template v-slot:header>
            <img src="~/assets/consult/icon_Comment.svg">
            <span class="ms-2">諮詢者回饋</span>
        </template>
        <template v-slot:body>
            <div :id="`glide${state.id}`" class="feedback__list" ref="glideRef">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        <li class="glide__slide feedback__list__feedback" v-for="(feedback, index) in modelValue"
                            :key="index" ref="feedbackItem">
                            <div class="feedback__content">
                                <div class="content__name">{{ feedback.name }}</div>
                                <div class="content__to">諮詢師：{{ feedback.to }}</div>
                                <div class="content__desc">
                                    {{ feedback.desc }}
                                </div>
                                <button class="content__openModal" @click="showFeedback(feedback)">詳全文</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&lt;</button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">></button>
                </div>
            </div>
            <div class="modal fade consult__modal" id="feedbackModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div v-if="state.modalFeedback" class="modal-content">
                        <div class="modal-header">
                            <div class="header__group">
                                <div>{{ state.modalFeedback.name }}</div>
                                <div class="group__to">諮詢師：{{ state.modalFeedback.to }}</div>
                            </div>
                            <button type="button" class="btn-close" @click="hideModal()"></button>
                        </div>
                        <div class="modal-body">
                            <div class="content__desc">
                                {{ state.modalFeedback.desc }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MoleculeConsultCard>
</template>
<script setup>
const { $requestSelector, $uuid4, $bootstrap, $Glide } = useNuxtApp()
const state = reactive({
    id: null,
    feedbackGlideInstance: null,
    bsModal: null,
    modalFeedback: null,
})
const props = defineProps({
    modelValue: {
        type: Array,
        default: function () {
            return []
        },
    },
    limit: {
        type: Number,
        default: 75,
    },
})
const glideRef = ref(null)
// hooks
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        $requestSelector('#feedbackModal', (element) => {
            if (!state.bsModal) {
                state.bsModal = new $bootstrap.Modal(element, {
                    keyboard: false,
                })
            }
        })
        mountGlideInstance()  // IMPORTANT
    }
})
watch(() => props.modelValue, () => {
    mountGlideInstance() // IMPORTANT
})
// methods
function showFeedback(feedback) {
    state.modalFeedback = feedback
    state.bsModal.show()
}
function hideModal() {
    state.bsModal.hide()
}
function mountGlideInstance() {
    if (state.feedbackGlideInstance) {
        state.feedbackGlideInstance.destroy()
    }
    if (!props.modelValue.length || !process.client || !state.id) {
        return
    }
    $requestSelector(`#glide${state.id}`, (element) => {
        nextTick(() => {
            const feedbackGlideInstance = new $Glide.Default(element, {
                gap: 10,
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
            gap: 10,
            perView: 1.5,
            rewind: true,
            bound: true,
        })
    } else {
        state.feedbackGlideInstance.update({
            gap: 10,
            perView: 3,
            rewind: true,
            bound: true,
        })
    }
}
function getSlicedDesc(desc = "") {
    const slicedResult = desc.slice(0, props.limit)
    return `${slicedResult}`
}
</script>
<style lang="scss" scoped>
.consult__feedback {
    // margin-top: 20px;
    position: relative;
    border-top: 1px solid #c4c4c4;

    .feedback__header {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: #333;
        padding: 20px;
    }

    .feedback__list {
        padding: 0 20px;
        margin-top: 20px;

        .feedback__list__feedback {
            border-radius: 10px;
            border: solid 1px #cecece;
            padding: 15px;
            background-color: white;
        }
    }

    .consult__modal {

        .modal-dialog {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100vw - 40px);
            margin: 0;
        }

        .modal-content {
            padding: 20px 0px 0px 0px;
            border-radius: 10px;
        }

        .modal-header {
            font-size: 22px;
            padding: 0 20px;
            border-bottom: none;
            display: flex;
            align-items: flex-start;

            .header__group {
                font-size: 20px;
                line-height: 1.3;
                color: #333;

                .group__to {
                    margin-top: 10px;
                    font-size: 16px;
                    line-height: 1.3;
                    color: #7f7f7f;
                    font-weight: normal;
                }
            }
        }
    }

    .feedback__content {
        min-height: 160px;

        .content__name {
            font-size: 24px;
            color: #000;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all 0.3s;
        }

        .content__to {
            font-size: 16px;
            line-height: 1.3;
            color: #7f7f7f;
            margin: 10px 0;
        }

        .content__desc {
            font-size: 15px;
            line-height: 1.3;
            color: #484848;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all 0.3s;
        }

        .content__openModal {
            background-color: inherit;
            border: none;
            color: #5ea88e;
        }
    }
}

@media screen and (min-width: 992px) {
    .consult__feedback {
        .feedback__list {
            padding: 30px 50px;
            position: relative;
            margin: 0;
        }

        .glide__arrow {
            color: black;
            font-size: 36px;
            border: none;
            box-shadow: unset;
        }

        .glide__arrow--left {
            left: 0;
        }

        .glide__arrow--right {
            right: 0;
        }
    }
}
</style>