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
                        <div v-show="loginComposable.state.isSent" class="body__emailSent">
                            <h1 class="emailSent__header">驗證信已寄出</h1>
                            <div class="emailSent__desc">
                                <div>請至E-mail收註冊信開始配對工作</div>
                                <div>( 若無請至垃圾信箱查找 )</div>
                            </div>
                            <div class="emailSent__footer">
                                <LazyAtomBtnSimple v-if="loginComposable.state.countdownInterval" class="emailSent__resend"
                                    disabled>{{
                                        loginComposable.state.cdVisible
                                    }}
                                </LazyAtomBtnSimple>
                                <LazyAtomBtnSimple v-else class="emailSent__resend"
                                    @click="loginComposable.sendEmailLink('admin')">重新寄送驗證信
                                </LazyAtomBtnSimple>
                            </div>
                        </div>
                        <div v-show="!loginComposable.state.isSent" id="company-auth-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import firebase from "firebase"

const { $emitter, $bootstrap, $sweet, $firebaseuiAuth, } = useNuxtApp()
const device = useDevice()
const loginComposable = useLogin()
const route = useRoute()
const state = reactive({
    bsModal: null
})
onMounted(() => {
    $emitter.on("showCompanyModal", showModal) // listen
    $emitter.on("hideCompanyModal", hideModal)
    state.bsModal = new $bootstrap.Modal(document.getElementById("companyModal"), {
        keyboard: false,
        backdrop: "static"
    })
    if (route.path.includes("admin") && process.client) {
        renderFirebaseUI()
    }
})
function hideModal() {
    loginComposable.state.isSent = false
    state.bsModal.hide()
}
function showModal() {
    sessionStorage.removeItem("firebaseui::pendingEmailCredential")
    state.bsModal.show()
    renderFirebaseUI()
}
async function renderFirebaseUI() {
    const firebaseAuth = firebase.auth()
    const ui = $firebaseuiAuth.AuthUI.getInstance() || new $firebaseuiAuth.AuthUI(firebaseAuth)
    const isPendingRedirect = ui.isPendingRedirect()
    if (isPendingRedirect) {
        $sweet.loader(true)
    }
    // 不同裝置給予不同登入方式
    const signInOptions = [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true // 這邊沒寫的話，寄送的信件會沒有名稱
        },
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
        }
    ]
    const element = document.querySelector("#company-auth-container")
    ui.start(element, {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                loginComposable.handleAuthResult(authResult, "admin")
                return false
            }
        },
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

        .body__desc {
            text-align: center;
            font-size: 14px;
        }

        .body__emailSent {
            text-align: center;
            padding: 20px 0 0 0;

            .emailSent__header {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 4px;
            }

            .emailSent__desc {
                font-size: 14px;
                margin-bottom: 2rem;
            }

            .emailSent__footer {
                display: flex;
                justify-content: center;

                .emailSent__resend {
                    width: 226px;
                }
            }
        }
    }
}
</style>