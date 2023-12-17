<template>
    <div class="modal fade" :id="`jobModal${state.id}`" tabindex="-1" a aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
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
                            <LazyAtomInputResume v-model="state.application.resume" name="履歷" :sizeLimit="5242880"
                                :disabled="true" class="resume__input" :getFileBuffer="getFileBuffer"></LazyAtomInputResume>
                        </div>
                    </template>
                    <LazyAtomInputSelect v-else v-model="state.application.resume.name" name="履歷" itemText="name"
                        itemValue="name" :items="repoAuth.state.user.resumes" :placeholder="'請選擇本次投遞之履歷'" :required="true"
                        ref="resume" class="mt-3 mb-3">
                    </LazyAtomInputSelect>
                    <template v-if="repoAuth.state.user.portfolio && repoAuth.state.user.portfolio.length">
                        <div class="content__portfolio__header mt-3">作品集(雲端檔案請開啟瀏覽權限)</div>
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
                    <LazyAtomInputCkeditor id="coverLetter" ref="coverLetterRef" v-model="state.application.coverLetter"
                        class="mt-3" name="自薦信" placeholder="依照職務的條件要求書寫個人的亮點將會提高被面試的機率喔！"></LazyAtomInputCkeditor>
                    <div class="modal__footer mt-3">
                        <LazyAtomBtnSimple @click="closeModal()">
                            取消
                        </LazyAtomBtnSimple>
                        <LazyAtomBtnSimple @click="handleSubmit()">
                            確定投遞
                        </LazyAtomBtnSimple>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LazyAtomBtnSimple @click="handleApply()" :disabled="disabled">
        <slot>立即應徵</slot>
    </LazyAtomBtnSimple>
</template>
<script setup>
const emit = defineEmits(['applied'])
const { $bootstrap, $uuid4, $emitter, $sweet, $requestSelector } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
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
            state.bsModal = new window.bootstrap.Modal(modelElement, {
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
async function getFileBuffer(item = {}) {
    const { name = '' } = item
    $sweet.loader(true)
    const res = await repoUser.getUserResume({
        fileName: name
    })
    $sweet.loader(false)
    if (res.status !== 200) {
        return
    }
    const buffer = res.data
    return buffer
}
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
        $emitter?.emit("showUserModal")
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
.modal-content {
    border-radius: 10px;
    line-height: 1;

    .modal-header {
        .modal-title {
            font-size: 18px;
            font-weight: bold;
        }
    }

    .body__resume {
        display: flex;
        margin-top: 8px;

        .resume__input {
            width: 100%;
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
        font-weight: bold;
    }

    .modal__footer {
        display: flex;
        justify-content: space-between;
        gap: 12px;
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