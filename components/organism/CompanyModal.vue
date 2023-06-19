<template>
    <div class="register">
        <div class="modal fade" id="companyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <h3 class="body__header">人資與企業主登入註冊</h3>
                        <div v-if="!device.state.isNativeWeb" class="body__subheader">
                            <div>
                                ※系統偵測到內嵌瀏覽器※<br>
                                可能不符合Google安全瀏覽器政策，並造成網站異常，請用原生(預設)瀏覽器開啟此網站<br>
                            </div>
                        </div>
                        <MoleculeFirebaseUI v-if="state.isContentVisible" :signInOptions="state.signInOptions" type="admin">
                        </MoleculeFirebaseUI>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $emitter, $bootstrap, } = useNuxtApp()
const device = useDevice()
const state = reactive({
    bsModal: null,
    isContentVisible: false,
    signInOptions: ['password', 'google.com']
})
onMounted(() => {
    $emitter.on("showCompanyModal", showModal)
    $emitter.on("hideCompanyModal", hideModal)
    state.bsModal = new window.bootstrap.Modal(document.getElementById("companyModal"), {
        keyboard: false,
        backdrop: "static"
    })
})
function hideModal() {
    state.isContentVisible = false
    state.bsModal.hide()
}
function showModal() {
    state.isContentVisible = true
    state.bsModal.show()
}
</script>
<style lang="scss" scoped>
.modal-content {
    border-radius: 20px;

    .modal-header {
        border: none;
    }

    .modal-body {
        min-height: 24rem;

        .body__header {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
        }
    }
}
</style>