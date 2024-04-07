<template>
    <button class="card__add" @click="openModal()">
        新增管理員
    </button>
    <div class="modal fade" :id="`newAdmin-${state.id}`" tabindex="-1" a aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">應徵邀約</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" ref="modalBodyRef">
                    <p class="text-center">若您點選「應徵邀約」，Job Pair 將會寄送職缺資訊給對方，邀請人選應徵。</p>
                    
                </div>
                <div class="modal-footer">
                    <div class="footer__buttonGroup">
                        <LazyAtomBtnSimple class="footer__button" @click="handleSubmit()">確定</LazyAtomBtnSimple>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $uuid4, $rank, $validate, $sweet, $requestSelector } = useNuxtApp()
const repoAuth = useRepoAuth()
const emit = defineEmits(['applied', 'update:modelValue'])
const state = reactive({
    id: $uuid4(),
    bsModal: {
        show: () => { }
    },
    form: {}
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    },
})
onMounted(() => {
    if (process.client) {
        const editableElement = document.getElementById(`newAdmin-${state.id}`)
        if (!editableElement) {
            return
        }
        state.bsModal = new window.bootstrap.Modal(editableElement, {
            keyboard: false,
            backdrop: "static",
        })
    }
})
function openModal() {
    if (state.bsModal) {
        state.bsModal.show()
    }
    // const { user } = repoAuth.state
    // if (user && user.id) {
    //     setInvitationTemplate()
    //     state.bsModal.show()
    // } else {
    //     router.push('index')
    // }
}
function handleSubmit() {

}
</script>
<style lang="scss">
.card__add {
    border-radius: 10px;
    border: 1px dashed #A6A6A6;
    margin-top: 30px;
    padding: 10px 0px;
    width: 100%;
    background-color: white;
    color: #000;
    font-family: "PingFang TC";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
}
</style>