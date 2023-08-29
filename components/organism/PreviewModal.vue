<template>
    <div class="modal fade" :id="`jobModal${state.id}`" tabindex="-1" a aria-hidden="true">
        <div class="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <input class="header__input"
                        :value="'https://job-pair.com/job/492f48b3-20d2-4d03-b8c0-1e3574dba960?openExternalBrowser=1'"
                        readonly>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" ref="modalBody">

                </div>
                <div class="modal-footer justify-content-center">
                    <LazyAtomBtnSimple>
                        確定
                    </LazyAtomBtnSimple>
                </div>
            </div>
        </div>
    </div>
    <AtomBtnSimple class="footer__btn" @click="handlePreview()" outline>儲存並預覽職缺
    </AtomBtnSimple>
    <!-- <a class="modal__link">
        程度說明
    </a> -->
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
function handlePreview() {
    state.bsModal.show()
    // const {} = 
}
function handleApply() {
    const { user } = repoAuth.state
    if (user && user.id) {
        state.bsModal.show()
    } else {
        $emitter.emit("showUserModal")
    }
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

.modal-content {
    border-radius: 10px;
    line-height: 1;

    .modal-header {
        .modal-title {
            font-size: 18px;
            font-weight: bold;
        }

        .header__input {
            width: 100%;
        }
    }

}
</style>