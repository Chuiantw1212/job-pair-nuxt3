<template>
    <div class="modal fade" :id="`jobModal${state.id}`" tabindex="-1" a aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title">應徵申請</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()"></button>
                </div>
                <div v-if="repoAuth.state.user" class="modal-body" ref="modalBody">
                    <div class="content__desc mb-1">
                        <div class="desc__organizationName">{{ modelValue.organizationName }}</div>
                        <div class="desc__name">{{ modelValue.name }}</div>
                    </div>
                    <template v-if="repoAuth.state.user.resumes && repoAuth.state.user.resumes.length === 1">
                        <div class="body__resume">
                            <InputResume v-model="state.application.resume" name="履歷" :sizeLimit="5242880"
                                :disabled="true" class="resume__input" :hasPreviewButton="true"></InputResume>
                        </div>
                    </template>
                    <InputSelect v-else v-model="state.application.resume.name" name="履歷" itemText="name"
                        itemValue="name" :items="repoAuth.state.user.resumes" :placeholder="'請選擇本次投遞之履歷'"
                        :required="true" ref="resume" class="mt-3 mb-3">
                    </InputSelect>
                    <template v-if="repoAuth.state.user.portfolio && repoAuth.state.user.portfolio.length">
                        <div class="content__portfolio__header">作品集</div>
                        <div class="checkMultiple d-flex">
                            <label v-for="(work, key) in repoAuth.state.user.portfolio" class="checkMultiple__label"
                                :key="key">
                                <div v-if="hasSelected(work)" class="label__checkbox">
                                    <img class="checkbox__check" src="@/assets/checkboxSelected.svg" />
                                </div>
                                <div v-else class="label__checkbox label__checkbox--unselected"></div>
                                <input v-show="false" v-model="state.application.portfolio" class="label__input"
                                    :value="work" type="checkbox" />
                                <a target="_blank" :href="work.url">{{ work.name }}</a>
                            </label>
                        </div>
                    </template>
                    <InputTextarea v-model="state.application.coverLetter" class="mt-3" name="自薦信"
                        placeholder="依照職務的條件要求書寫個人的亮點將會提高被面試的機率喔！" rows="6"></InputTextarea>
                    <div class="modal__footer mt-3">
                        <BtnSimple @click="closeModal()">
                            取消
                        </BtnSimple>
                        <BtnSimple @click="handleSubmit()">
                            確定投遞
                        </BtnSimple>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <BtnSimple @click="handleApply()" :disabled="disabled">
        <slot>立即應徵</slot>
    </BtnSimple>
</template>
<script setup>
const emit = defineEmits(['applied'])
const { $bootstrap, $uuid4, $emitter, $toggleLoader, $succeed } = useNuextApp()
const repoAuth = useRepoAuth()
const repoJobApplication = useRepoJobApplication()
const state = reactive({
    id: uuid(),
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
        type: Object,
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
        const modelElement = document.getElementById(`jobModal${state.id}`)
        if (!modelElement) {
            return
        }
        state.bsModal = new $bootstrap.Modal(modelElement, {
            keyboard: false,
        })
        modelElement.addEventListener("shown.bs.modal", async () => {
            setApplication()
        })
    }
})
// methods
function setApplication() {
    const { user } = repoAuth
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
    const { user } = repoAuth
    if (user && user.id) {
        state.bsModal.show()
    } else {
        $emitter.emit("showUserModal")
    }
}
async function handleSubmit() {
    $toggleLoader(true)
    const postResponse = await repoJobApplication.postJobApplication(state.application)
    if (postResponse.status !== 200) {
        return
    }
    await $succeed()
    const { applyFlow } = postResponse.data
    emit("applied", applyFlow)
    closeModal()
}
function closeModal() {
    state.bsModal.hide()
}
</script>
<style lang="scss" scoped>
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