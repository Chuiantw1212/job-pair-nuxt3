<template>
    <div class="modal fade" :id="`jobModal${state.id}`" tabindex="-1" a aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title">英文程度對照表</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()"></button>
                </div>
                <div class="modal-body text-center" ref="modalBody">
                    <img src="./5b18d747-cefr_10hm094000000000000028.png" alt="rank">

                </div>
                <div class="modal-footer justify-content-center">
                    <LazyAtomBtnSimple @click="closeModal()">
                        確定
                    </LazyAtomBtnSimple>
                </div>
            </div>
        </div>
    </div>
    <a class="modal__link" @click="handleApply()">
        程度說明
    </a>
    <!-- <LazyAtomBtnSimple @click="handleApply()" :disabled="disabled">
        <slot>立即應徵</slot>
    </LazyAtomBtnSimple> -->
</template>
<script setup>
const emit = defineEmits(['applied'])
const { $bootstrap, $uuid4, $emitter, $sweet, $requestSelector } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoJobApplication = useRepoJobApplication()
const state = reactive({
    id: null,
    bsModal: null,
    glideIndex: 0,
    application: {
        resume: {
            name: '',
            url: ''
        }
    },
    resume: null,
    renderKey: Math.random(),
})
const props = defineProps({
    modelValue: {
        // job
        type: [Object, Boolean],
        default: function () {
            return {}
        },
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
// hooks
onMounted(() => {
    if (process.client) {
        state.id = $uuid4()
        $requestSelector(`#jobModal${state.id}`, (modelElement) => {
            state.bsModal = new $bootstrap.Modal(modelElement, {
                keyboard: false,
            })
            modelElement.addEventListener("shown.bs.modal", async () => {
                setApplication()
            })
        })
    }
})
// methods
const coverLetterRef = ref(null)
function setApplication() {
    const { user } = repoAuth.state
    // 拉取資料
    const application = JSON.parse(JSON.stringify(user))
    const { resumes } = user
    if (resumes.length === 1) {
        application.resume = resumes[0]
    }
    // 設定資料
    const jobId = props.modelValue.identifier
    const { uid, resume = { name: '', url: '' }, portfolio, description } = application
    state.application = {
        applicantUid: uid,
        resume,
        portfolio,
        coverLetter: description,
        jobId
    }
    $requestSelector(`#coverLetter`, () => {
        coverLetterRef.value.setData(description)
    })
}
function hasSelected(work) {
    if (!state.application || !state.application.portfolio) {
        return
    }
    const isSelected = state.application.portfolio.find((item) => {
        return item.name === work.name
    })
    return isSelected
}
function handleApply() {
    const { user } = repoAuth.state
    if (user && user.id) {
        state.bsModal.show()
    } else {
        $emitter.emit("showUserModal")
    }
}
async function handleSubmit() {
    $sweet.loader(true)
    const postResponse = await repoJobApplication.postJobApplication(state.application)
    if (postResponse.status !== 200) {
        return
    }
    await $sweet.succeed()
    const { applyFlow } = postResponse.data
    emit("applied", applyFlow)
    closeModal()
}
function closeModal() {
    state.bsModal.hide()
}
</script>
<style lang="scss" scoped>
.modal__link {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #5ea88e;
    text-decoration: none;
}

.modal__button {
    width: 182px;
    height: 48px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 12px;
    border: 1px solid #1f1f1f;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        margin-right: 8px;
    }

    &:hover {
        background-color: #29b0ab;
        color: white;

        border: none svg {
            color: white;
        }
    }
}

.modal-content {
    border-radius: 10px;
    line-height: 1;

    .modal-header {
        .modal-title {
            font-size: 18px;
            font-weight: bold;
        }
    }

    .body__subHeader {
        font-size: 16px;
        line-height: 1.5;
        color: #000;
        margin-top: 20px;
    }

    .body__resume {
        display: flex;
        // align-items: center;
        margin-top: 8px;

        .resume__header {
            font-size: 16px;
        }

        .resume__inputGroup {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .resume__input {
            width: 100%;
        }

        .resume__preview {
            background-color: inherit;
            border: none;
            padding: 0;

            .preview__icon {
                margin: auto;
                display: block;
                width: 32px;
                height: 32px;
            }
        }
    }

    .content__desc {
        text-align: center;
        background-color: #d8e4eb;
        border-radius: 10px;
        font-weight: bold;
        text-align: center;
        padding: 20px 48px;
        font-size: 18px;
    }

    .content__portfolio__header {
        font-size: 18px;
    }

    .modal__footer {
        display: flex;
        justify-content: space-between;
        gap: 12px;

        .footer__button {
            padding: 12px 16px;
            color: #29b0ab;
            border-radius: 10px;
            white-space: nowrap;
            border: none;
            width: 100%;
            border: 1px solid #29b0ab;
            background-color: white;
            transition: all 0.3s;

            &:hover {
                background-color: #29b0ab;
                color: white;
            }
        }
    }
}

.checkMultiple {
    margin-top: 4px;

    .checkMultiple__label {
        display: flex;
        align-items: center;
        white-space: nowrap;


        .label__checkbox {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            border-radius: 2px;
            line-height: 0;
            border-radius: 2px;

            .checkbox__check {
                transform: translate(-1px, -1px);
            }
        }

        .label__checkbox--unselected {
            overflow: hidden;
            border: solid 0.7px #484848;
        }
    }
}

@media screen and (min-width: 992px) {
    .checkMultiple {
        margin-top: 10px;

        .checkMultiple__label {
            font-size: 18px;

            .label__checkbox {
                width: 30px;
                height: 30px;

                .checkbox__check {
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
}
</style>