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
    }

}
</style>