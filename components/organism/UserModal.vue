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
                        <div v-if="!device.state.isNativeWeb" class="body__subheader">
                            <div>
                                ※系統偵測到內嵌瀏覽器※<br>
                                可能不符合Google安全瀏覽器政策，並造成網站異常，請用原生(預設)瀏覽器開啟此網站<br>
                            </div>
                        </div>
                        <div v-show="loginComposable.state.isSent" class="body__emailSent">
                            <h1 class="emailSent__header">驗證信已寄出</h1>
                            <div class="emailSent__desc">
                                <div>請至{{ loginComposable.state.basicInfo.email }}收註冊信開始配對工作</div>
                                <div>( 若無請至垃圾信箱查找 )</div>
                            </div>
                            <div class="emailSent__footer">
                                <LazyAtomBtnSimple v-if="loginComposable.state.countdownInterval" class="emailSent__resend"
                                    disabled>{{
                                        loginComposable.state.cdVisible
                                    }}
                                </LazyAtomBtnSimple>
                                <LazyAtomBtnSimple v-else class="emailSent__resend"
                                    @click="loginComposable.sendEmailLink('employee')">
                                    重新寄送驗證信
                                </LazyAtomBtnSimple>
                            </div>
                        </div>
                        <div v-show="!loginComposable.state.isSent">
                            <div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-in">
                                <form onsubmit="return false;">
                                    <div class="firebaseui-card-header">
                                        <h1 class="firebaseui-title">用Email登入註冊</h1>
                                    </div>
                                    <div class="firebaseui-card-content">
                                        <div class="firebaseui-relative-wrapper">
                                            <div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                                                data-upgraded=",MaterialTextfield">
                                                <!-- <label class="mdl-textfield__label firebaseui-label"
                                                    for="ui-sign-in-email-input">Email</label> -->
                                                <input v-model="state.email" type="email" name="email"
                                                    id="ui-sign-in-email-input" autocomplete="username" placeholder="email"
                                                    class="mdl-textfield__input firebaseui-input firebaseui-id-email">
                                            </div>
                                            <div v-if="state.isShowPassword"
                                                class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                                                data-upgraded=",MaterialTextfield">
                                                <LazyAtomInputPass v-model="state.password" name="密碼" placeholder="密碼"
                                                    required>
                                                </LazyAtomInputPass>
                                                <!-- <input v-model="state.password" type="password" placeholder="密碼"
                                                    name="password" id="ui-sign-in-password-input"
                                                    autocomplete="current-password"
                                                    class="mdl-textfield__input firebaseui-input firebaseui-id-password"> -->
                                            </div>
                                            <div class="firebaseui-error-wrapper">
                                                <p
                                                    class="firebaseui-error firebaseui-text-input-error firebaseui-id-email-error">
                                                    {{ state.errorMessage }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="firebaseui-card-actions">
                                        <div class="firebaseui-form-actions">
                                            <button
                                                class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                                                data-upgraded=",MaterialButton">取消</button>
                                            <button v-if="state.isShowPassword" type="submit"
                                                class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                                data-upgraded=",MaterialButton" @click="loginAndRegister()">登錄/註冊</button>
                                            <button v-else type="submit"
                                                class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                                data-upgraded=",MaterialButton" @click="checkEmailRegistered()">下一步</button>
                                        </div>
                                    </div>
                                    <div class="firebaseui-card-footer">
                                        <ul class="firebaseui-tos-list firebaseui-tos">
                                            <li class="firebaseui-inline-list-item"><a href="javascript:void(0)"
                                                    class="firebaseui-link firebaseui-tos-link" target="_blank">使用者條款</a>
                                            </li>
                                            <li class="firebaseui-inline-list-item"><a href="javascript:void(0)"
                                                    class="firebaseui-link firebaseui-pp-link" target="_blank">隱私權聲明</a>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import firebase from "firebase"
const { $emitter, $bootstrap, $sweet, $firebaseuiAuth, $validate, } = useNuxtApp()
const device = useDevice()
const route = useRoute()
const loginComposable = useLogin()
const state = reactive({
    bsModal: null,
    email: '',
    isShowPassword: false,
})
onMounted(() => {
    $emitter.on("showUserModal", showModal)
    $emitter.on("hideUserModal", hideModal)
    if (process.client) {
        state.bsModal = new $bootstrap.Modal(document.getElementById("userModal"), {
            keyboard: false,
            backdrop: "static"
        })
        // 初始化FirebaseUI使系統可以自動跳轉
        if (route && !route.path.includes("admin")) {
            // renderFirebaseUI()
        }
    }
})
// methods
async function checkEmailRegistered() {
    const res = await firebase.auth().fetchSignInMethodsForEmail(state.email)
    const emailProviderId = firebase.auth.EmailAuthProvider.PROVIDER_ID
    if (res.includes(emailProviderId)) {
        // 顯示密碼
        state.isShowPassword = true
    } else {
        // 註冊用戶
    }
}
async function loginAndRegister() {
    const validateResult = await $validate()
    if (!validateResult.isValid) {
        return
    }
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(state.email, state.password)
    } catch (error) {
        // 參考自FirebaseUI的錯誤訊息翻譯
        const messageMap = {
            'auth/email-already-in-use': '已有其他帳戶使用這個電子郵件地址',
            'auth/too-many-requests': '您輸入錯誤密碼的次數過多，請於幾分鐘後再試一次。',
            'auth/operation-not-allowed': '操作代碼無效。如果代碼已過期、已使用或格式不正確，就有可能發生這種情況。',
            'auth/weak-password': '安全強度高的密碼至少需有 6 個字元並混用字母和數字',
            'auth/admin-restricted-operation': '',
            'auth/wrong-password': '您輸入的電子郵件地址和密碼不相符',
        }
        // 顯示錯誤訊息
        const { code = '', message = '' } = error
        console.log(code);
        state.errorMessage = messageMap[code] || message
    }
}
function hideModal() {
    loginComposable.state.isSent = false
    state.bsModal.hide()
}
function showModal() {
    state.bsModal.show()
    // renderFirebaseUI()
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
        },
        {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: ["public_profile", "email"]
        }
    ]
    const element = document.querySelector("#user-auth-container")
    ui.start(element, {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                loginComposable.handleAuthResult(authResult, "employee")
                return false
            }
        },
        signInFlow: 'popup', // redirect會造成臉書登入失效
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