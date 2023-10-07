<template>
    <div class="register">
        <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <!-- <div id="manualLogin"></div> -->
                        <h3 class="body__header">求職者登入註冊</h3>
                        <div v-if="!device.state.isNativeWeb" class="body__subheader">
                            <div>
                                ※系統偵測到內嵌瀏覽器※<br>
                                可能不符合Google安全瀏覽器政策，並造成網站異常，請用原生(預設)瀏覽器開啟此網站<br>
                            </div>
                        </div>
                        <MoleculeFirebaseUI v-if="state.isContentVisible" :signInOptions="state.signInOptions"
                            type="employee"></MoleculeFirebaseUI>
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
    signInOptions: ['password', 'google.com', 'facebook.com']
})
onMounted(() => {
    $emitter.on("showUserModal", showModal)
    $emitter.on("hideUserModal", hideModal)
    if (process.client) {
        state.bsModal = new window.bootstrap.Modal(document.getElementById("userModal"), {
            keyboard: false,
            backdrop: "static"
        })
    }
})
// methods
function hideModal() {
    state.isContentVisible = false
    state.bsModal.hide()
}
function showModal() {
    state.bsModal.show()
    state.isContentVisible = true
    // renderFirebaseUI()
}
async function renderFirebaseUI() {
    let ui = $firebaseuiAuth.AuthUI.getInstance("manualLogin")
    const firebaseAuth = getAuth()
    if (!ui) {
        ui = new $firebaseuiAuth.AuthUI(firebaseAuth, "manualLogin")
    }
    const isPendingRedirect = ui.isPendingRedirect()
    if (isPendingRedirect) {
        $sweet.loader(true)
    }
    // 不同裝置給予不同登入方式
    const signInOptions = [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        }
    ]
    if (device.state.isNativeWeb) {
        signInOptions.push({
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
        })
        signInOptions.push({
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: ["public_profile", "email"]
        })
    }
    const element = document.querySelector("#user-auth-container")
    ui = ui.start(element, {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                loginComposable.handleAuthResult(authResult, "employee")
                return false
            }
        },
        signInFlow: 'popup',
        signInOptions,
        tosUrl:
            "https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/%E4%BD%BF%E7%94%A8%E8%80%85%E6%A2%9D%E6%AC%BE.pdf",
        privacyPolicyUrl:
            "https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/%E5%80%8B%E4%BA%BA%E8%B3%87%E6%96%99%E4%BF%9D%E8%AD%B7%E7%AE%A1%E7%90%86%E6%94%BF%E7%AD%96%20v2.pdf"
    })
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

        .body__subheader {
            color: red;
            text-align: center;
        }
    }
}
</style>