<template>
    <div class="register">
        <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <h3 class="body__header">求職者登入註冊</h3>
                        <div v-show="state.isSent" class="body__emailSent">
                            <h1 class="emailSent__header">驗證信已寄出</h1>
                            <div class="emailSent__desc">
                                <div>請至E-mail收註冊信開始配對工作</div>
                                <div>( 若無請至垃圾信箱查找 )</div>
                            </div>
                            <div class="emailSent__footer">
                                <AtomBtnSimple v-if="state.countdownInterval" class="emailSent__resend" disabled>{{
                                        cdVisible
                                }}
                                </AtomBtnSimple>
                                <AtomBtnSimple v-else class="emailSent__resend" @click="sendEmailLink('employee')">
                                    重新寄送驗證信
                                </AtomBtnSimple>
                            </div>
                        </div>
                        <div v-show="!state.isSent" id="user-auth-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { getAuth, } from "firebase/auth"
import firebase from "firebase/compat/app"
const { $emitter, $bootstrap, $toggleLoader, $isNativeWeb, $store, $firebaseuiAuth, $firebaseApp } = useNuxtApp()
// const { auth } = $firebaseui
// import { auth } from "firebaseui"
const router = useRouter()
const route = useRoute()
const loginComposable = useLogin()
const state = reactive({
    bsModal: null,
    ui: null,
    isSent: false,
    countdownInterval: null
})
onMounted(() => {
    $emitter.on("showUserModal", showModal)
    $emitter.on("hideUserModal", hideModal)
    if (process.client) {
        state.bsModal = new $bootstrap.Modal(document.getElementById("userModal"), {
            keyboard: false,
            backdrop: "static"
        })
    }
    // 初始化FirebaseUI使系統可以自動跳轉
    console.log({
        route
    });
    if (!route.path.includes("admin") && process.client) {
        renderFirebaseUI()
    }
})
function hideModal() {
    state.isSent = false
    state.bsModal.hide()
}
function showModal() {
    // localStorage.removeItem("user") // 這一行新增會把使用者的作答紀錄清除
    state.bsModal.show()
    renderFirebaseUI()
}
async function renderFirebaseUI() {
    let ui = $firebaseuiAuth.AuthUI.getInstance("manualLogin")
    const firebaseAuth = getAuth()
    if (!ui) {
        ui = new $firebaseuiAuth.AuthUI(firebaseAuth, "manualLogin")
    }
    const isPendingRedirect = ui.isPendingRedirect()
    if (isPendingRedirect) {
        $toggleLoader(true)
    }
    // 不同裝置給予不同登入方式
    const signInOptions = [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        }
    ]
    if ($isNativeWeb) {
        signInOptions.push({
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
        })
        signInOptions.push({
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: ["public_profile", "email"]
        })
    }
    const element = document.querySelector("#user-auth-container")
    state.ui = ui.start(element, {
        callbacks: {
            signInSuccessUrl: `${window.location.href}`,
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