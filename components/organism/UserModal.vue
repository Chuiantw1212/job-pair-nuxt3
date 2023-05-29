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
                            <MoleculeFirebaseUI v-if="state.isContentVisible"></MoleculeFirebaseUI>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import firebase from "firebase"
const { $emitter, $bootstrap, $sweet, $firebaseuiAuth, $validate, } = useNuxtApp()
const device = useDevice()
const loginComposable = useLogin()
const state = reactive({
    bsModal: null,
    isContentVisible: false,
    email: '',
    password: '',
    isShowPasswordLogin: false,
    isShowPasswordRegister: false,
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
})
// methods
function handleFirebaseError(error) {
    // 參考自FirebaseUI的錯誤訊息翻譯
    const messageMap = {
        'auth/email-already-in-use': '已有其他帳戶使用這個電子郵件地址',
        'auth/too-many-requests': '您輸入錯誤密碼的次數過多，請於幾分鐘後再試一次。',
        'auth/operation-not-allowed': '操作代碼無效。如果代碼已過期、已使用或格式不正確，就有可能發生這種情況。',
        'auth/weak-password': '安全強度高的密碼至少需有 6 個字元並混用字母和數字',
        'auth/wrong-password': '您輸入的電子郵件地址和密碼不相符',
        'auth/user-not-found': '找不到與這個電子郵件地址相符的帳戶'
    }
    // 顯示錯誤訊息
    const { code = '', message = '' } = error
    state.errorMessage = messageMap[code] || message
}
function clearForm() {
    state.email = ''
    state.password = ''
}
function hideModal() {
    loginComposable.state.isSent = false
    state.isContentVisible = false
    state.bsModal.hide()
}
function showModal() {
    state.bsModal.show()
    state.isContentVisible = true
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