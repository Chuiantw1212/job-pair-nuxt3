<template>
    <div class="firebase">
        <div v-if="loginComposable.state.isSent" class="body__emailSent">
            <h1 class="emailSent__header">驗證信已寄出</h1>
            <div class="emailSent__desc">
                <div>請至{{ loginComposable.state.basicInfo.email }}收驗證信開始配對工作</div>
                <div>( 若無請至垃圾信箱查找 )</div>
            </div>
            <div class="emailSent__footer">
                <LazyAtomBtnSimple v-if="loginComposable.state.countdownInterval" class="emailSent__resend" disabled>{{
                    loginComposable.state.cdVisible
                }}
                </LazyAtomBtnSimple>
                <LazyAtomBtnSimple v-else class="emailSent__resend" @click="loginComposable.sendEmailLink(props.type)">
                    再次寄送驗證信
                </LazyAtomBtnSimple>
            </div>
        </div>
        <div v-else-if="loginComposable.state.isReset" class="body__emailSent">
            <h1 class="emailSent__header">信件已寄出</h1>
            <div class="emailSent__desc">
                <div>請至{{ state.form.email }}收信重設密碼</div>
                <div>( 若無請至垃圾信箱查找 )</div>
            </div>
            <div class="emailSent__footer">
                <LazyAtomBtnSimple v-if="loginComposable.state.countdownInterval" class="emailSent__resend" disabled>{{
                    loginComposable.state.cdVisible
                }}</LazyAtomBtnSimple>
                <LazyAtomBtnSimple v-else class="emailSent__resend" @click="handleForgotPassword()">
                    再次寄送密碼重設信件
                </LazyAtomBtnSimple>
                <LazyAtomBtnSimple class="emailSent__resend" @click="loginComposable.state.isReset = false">
                    使用新密碼登入帳戶
                </LazyAtomBtnSimple>
            </div>
        </div>
        <div v-else id="company-auth-container">
            <div style="" id="user-auth-container" data-v-19384ea0="">
                <div v-if="state.dialogName === 'default'"
                    class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner">
                    <div class="firebaseui-card-content">
                        <form onsubmit="return false;">
                            <ul class="firebaseui-idp-list">
                                <template v-for="(provider, index) in props.signInOptions">
                                    <li v-if="provider === 'password'" class="firebaseui-list-item"><button
                                            class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button"
                                            data-provider-id="password" style="background-color:#db4437"
                                            data-upgraded=",MaterialButton" @click.prevent="signInWithEmail()"><span
                                                class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt=""
                                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"></span><span
                                                class="firebaseui-idp-text firebaseui-idp-text-long">使用電子郵件登入</span>
                                        </button>
                                    </li>
                                    <li v-if="provider === 'google.com'" class="firebaseui-list-item"><button
                                            class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
                                            data-provider-id="google.com" style="background-color:#ffffff"
                                            data-upgraded=",MaterialButton" @click.prevent="signInWithGoogle()"><span
                                                class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt=""
                                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span><span
                                                class="firebaseui-idp-text firebaseui-idp-text-long">使用Google登入</span></button>
                                    </li>
                                </template>
                            </ul>
                        </form>
                    </div>
                    <div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">
                        <p class="firebaseui-tos firebaseui-tospp-full-message">選擇繼續即表示您同意接受我們的<br />
                            <a :href="state.termOfUse" class="firebaseui-link firebaseui-tos-link" target="_blank">服務條款</a>
                            與 <a :href="state.privacyPolicy" class="firebaseui-link firebaseui-pp-link"
                                target="_blank">隱私權政策</a>.
                        </p>
                    </div>
                </div>
                <div v-if="state.dialogName === 'email'" class="mdl-card firebaseui-container firebaseui-id-page-sign-in">
                    <form onsubmit="return false;">
                        <div class="firebaseui-card-header">
                            <h1 class="firebaseui-title">用Email登入註冊</h1>
                        </div>
                        <div class="firebaseui-card-content">
                            <div class="firebaseui-relative-wrapper">
                                <div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                                    data-upgraded=",MaterialTextfield">
                                    <LazyAtomInputEmail id="loginEmail" v-model="state.form.email" name="電子郵件信箱"
                                        placeholder="電子郵件信箱" @update:modelValue="clearErrorMessage()" required
                                        @keypress.enter.prevent="checkEmailRegistered()">
                                    </LazyAtomInputEmail>
                                </div>
                                <div v-show="state.isPassLogin"
                                    class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                                    data-upgraded=",MaterialTextfield">
                                    <LazyAtomInputPass v-model="state.form.password" name="密碼" placeholder="密碼"
                                        @update:modelValue="clearErrorMessage()" required ref="pass">
                                    </LazyAtomInputPass>
                                    <button class="firebaseui-link firebaseui-tos-link firebase__password"
                                        @click="handleForgotPassword()">忘記密碼
                                    </button>
                                </div>
                                <div v-show="state.isPassRegister"
                                    class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                                    data-upgraded=",MaterialTextfield">
                                    <LazyAtomInputPass v-model="state.form.password" name="設定密碼" placeholder="密碼"
                                        @update:modelValue="clearErrorMessage()" required
                                        @keypress.enter.prevent="handlePassNext()">
                                    </LazyAtomInputPass>
                                </div>
                                <div class="firebaseui-error-wrapper">
                                    <p class="firebaseui-error firebaseui-text-input-error firebaseui-id-email-error">
                                        {{ state.errorMessage }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="firebaseui-card-actions">
                            <div class="firebaseui-form-actions">
                                <button
                                    class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                                    data-upgraded=",MaterialButton" @click="cancelEmail()">取消</button>
                                <button v-if="state.isPassLogin" type="submit"
                                    class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                    data-upgraded=",MaterialButton" @click="loginAndRegister()">登錄</button>
                                <button v-else-if="state.isPassRegister" type="submit"
                                    class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                    data-upgraded=",MaterialButton" @click="signupUser()">註冊</button>
                                <button v-else type="submit"
                                    class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                    data-upgraded=",MaterialButton" @click="checkEmailRegistered()">下一步</button>
                            </div>
                        </div>
                        <div class="firebaseui-card-footer">
                            <ul class="firebaseui-tos-list firebaseui-tos">
                                <li class="firebaseui-inline-list-item"><a :href="state.termOfUse"
                                        class="firebaseui-link firebaseui-tos-link" target="_blank">服務條款</a>
                                </li>
                                <li class="firebaseui-inline-list-item"><a :href="state.privacyPolicy"
                                        class="firebaseui-link firebaseui-pp-link" target="_blank">隱私權聲明</a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div v-if="state.dialogName === 'federatedLinking'"
                    class="mdl-card firebaseui-container firebaseui-id-page-federated-linking">
                    <form onsubmit="return false;">
                        <div class="firebaseui-card-header">
                            <h1 class="firebaseui-title">登入</h1>
                        </div>
                        <div class="firebaseui-card-content">
                            <h2 class="firebaseui-subtitle">您已經有了帳戶</h2>
                            <p class="firebaseui-text">目前您使用的是 <strong>{{ state.form.email }}</strong>。如要繼續，請使用
                                {{ state.federatedProvider.name }} 帳戶登入。</p>
                        </div>
                        <div class="firebaseui-card-actions">
                            <div class="firebaseui-form-actions"><button type="submit"
                                    class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                    data-upgraded=",MaterialButton"
                                    @click="signInWithFirstFederatedProvider({ isLink: true })">以 {{
                                        state.federatedProvider.name }}
                                    帳戶登入</button>
                            </div>
                        </div>
                        <div class="firebaseui-card-footer">
                            <ul class="firebaseui-tos-list firebaseui-tos">
                                <li class="firebaseui-inline-list-item"><a
                                        href="https://storage.googleapis.com/public.prd.job-pair.com/meta/%E4%BD%BF%E7%94%A8%E8%80%85%E6%A2%9D%E6%AC%BE.pdf"
                                        class="firebaseui-link firebaseui-tos-link" target="_blank">服務條款</a>
                                </li>
                                <li class="firebaseui-inline-list-item"><a
                                        href="https://storage.googleapis.com/public.prd.job-pair.com/meta/%E5%80%8B%E4%BA%BA%E8%B3%87%E6%96%99%E4%BF%9D%E8%AD%B7%E7%AE%A1%E7%90%86%E6%94%BF%E7%AD%96%20v2.pdf"
                                        class="firebaseui-link firebaseui-pp-link" target="_blank">隱私權聲明</a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithPopup, sendPasswordResetEmail } from "firebase/auth"
import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from "firebase/auth";
const { $validate, } = useNuxtApp()
const loginComposable = useLogin()
const state = reactive({
    form: {
        email: '',
        password: '',
    },
    defaultProviderNames: {
        'google.com': 'Google',
        'github.com': 'GitHub',
        'facebook.com': 'Facebook',
        'twitter.com': 'Twitter',
        'password': 'Password',
        'phone': 'Phone',
        'anonymous': 'Guest',
        'microsoft.com': 'Microsoft',
        'yahoo.com': 'Yahoo',
        'apple.com': 'Apple',
    },
    federatedProvider: {
        id: '',
        name: '',
    },
    dialogName: 'default',
    isPassLogin: false,
    isReset: false,
    isPassRegister: false,
    isShowFederatedLinking: false,
    pendingCredential: null,
    errorMessage: '',
})
const props = defineProps({
    type: {
        type: String,
        default: 'employee'
    },
    signInOptions: {
        type: Array,
        default: function () {
            return []
        },
        required: true,
    }
})
// methods
function handlePassNext() {
    if (state.isPassLogin) {
        loginAndRegister()
    }
    if (state.isPassRegister) {
        signupUser()
    }
}
async function handleForgotPassword() {
    try {
        // https://firebase.google.com/docs/auth/web/manage-users#web-modular-api_9
        const auth = getAuth()
        // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#sendpasswordresetemail
        await sendPasswordResetEmail(auth, state.form.email)
        loginComposable.state.isReset = true
    } catch (error) {
        const { code = '', message = '', email = '', } = error
        const messageMap = {
            'auth/invalid-email': '電子郵件地址異常',
            'auth/invalid-continue-uri': '連結異常，請通知管理員',
            'auth/unauthorized-continue-uri': '連結權限異常，請通知管理員',
            'auth/user-not-found': '找不到該使用者',
        }
        state.errorMessage = messageMap[code] || message
    }
}
async function handleFirebaseError(error) {
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#fetchsigninmethodsforemail
    const { code = '', message = '', email = '', } = error
    switch (code) {
        case 'auth/email-already-in-use':
        case 'auth/account-exists-with-different-credential': {
            const auth = getAuth()
            const providers = await fetchSignInMethodsForEmail(auth, email)
            handleFederatedLinking({
                error,
                providers
            })
            break;
        }
        default: {
            const messageMap = {
                'auth/email-already-in-use': '已有其他帳戶使用這個電子郵件地址',
                'auth/too-many-requests': '您輸入錯誤密碼的次數過多，請於幾分鐘後再試一次。',
                'auth/operation-not-allowed': '操作代碼無效。如果代碼已過期、已使用或格式不正確，就有可能發生這種情況。',
                'auth/weak-password': '安全強度高的密碼至少需有 6 個字元並混用字母和數字',
                'auth/wrong-password': '您輸入的電子郵件地址和密碼不相符',
                'auth/user-not-found': '找不到與這個電子郵件地址相符的帳戶',
                'auth/argument-error': '',
                'auth/popup-closed-by-user': '使用者在完成操作前關閉了彈出視窗',
                'auth/missing-password': '請輸入密碼',
            }
            state.errorMessage = messageMap[code] || message
        }
    }
}
function handleFederatedLinking(data = {}) {
    // 先Email再臉書也會出此錯誤
    const { providers = [], error = {}, } = data
    const { credential = {}, } = error
    state.pendingCredential = credential
    // Get First Federated Provider
    const providerId = getFirstFederatedProvider(providers)
    if (providerId) {
        setFederatedDialog(providerId)
    }
}
function setFederatedDialog(providerId) {
    const providerName = state.defaultProviderNames[providerId]
    state.federatedProvider.id = providerId
    state.federatedProvider.name = providerName
    state.dialogName = 'federatedLinking'
}
function getFirstFederatedProvider(providers = []) {
    const nonFederatedProviders = [
        'emailLink',
        'password',
        'phone'
    ]
    const enabledProviders = providers.filter(item => {
        return !nonFederatedProviders.includes(item)
    })
    const providerId = enabledProviders[0]
    return providerId
}
async function clearErrorMessage() {
    state.errorMessage = ''
}
async function cancelEmail() {
    state.form = {
        email: '',
        password: '',
    }
    state.dialogName = 'default'
    state.isPassLogin = false
    state.isPassRegister = false
}
async function signInWithEmail() {
    state.dialogName = 'email'
    state.errorMessage = ''
}
async function signInWithFirstFederatedProvider(data = {}) {
    const providerId = state.federatedProvider.id
    if (providerId === GoogleAuthProvider.PROVIDER_ID) {
        signInWithGoogle(data)
    }
    if (providerId === FacebookAuthProvider.PROVIDER_ID) {
        signInWithFacebook(data)
    }
}
async function signInWithGoogle(data = {}) {
    try {
        const { isLink = false } = data
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        const authResult = await signInWithPopup(auth, provider)
        loginComposable.handleAuthResult(authResult, props.type)
        if (isLink && state.pendingCredential) {
            const { user = {} } = authResult
            user.linkWithCredential(state.pendingCredential)
        }
    } catch (error) {
        handleFirebaseError(error)
    }
}
async function signInWithFacebook(data = {}) {
    try {
        const { isLink = false } = data
        const provider = new FacebookAuthProvider();
        provider.addScope('public_profile')
        provider.addScope('email')
        const auth = getAuth()
        const authResult = await signInWithPopup(auth, provider)
        // 比照Email登入流程，也需要信箱驗證
        loginComposable.handleAuthResult(authResult, props.type)
        if (isLink && state.pendingCredential) {
            const { user = {} } = authResult
            user.linkWithCredential(state.pendingCredential)
        }
    } catch (error) {
        handleFirebaseError(error)
    }
}
async function loginAndRegister() {
    const validateResult = await $validate()
    if (!validateResult.isValid) {
        return
    }
    try {
        const { email = '', password = '' } = state.form
        const auth = getAuth()
        const authResult = await signInWithEmailAndPassword(auth, email, password)
        loginComposable.handleAuthResult(authResult, props.type)
        clearForm()
    } catch (error) {
        handleFirebaseError(error)
    }
}
async function signupUser() {
    try {
        const { email = '', password = '' } = state.form
        const auth = getAuth()
        const authResult = await createUserWithEmailAndPassword(auth, email, password)
        loginComposable.handleAuthResult(authResult, props.type)
        clearForm()
    } catch (error) {
        handleFirebaseError(error)
    }
}
const currentInstance = getCurrentInstance()
async function checkEmailRegistered() {
    const validateResult = await $validate()
    if (!validateResult.isValid) {
        return
    }
    const { email = '', password = '' } = state.form
    const auth = getAuth()
    const providers = await fetchSignInMethodsForEmail(auth, email)
    // 已用第三方登入註冊
    const providerId = getFirstFederatedProvider(providers)
    if (providerId) {
        setFederatedDialog(providerId)
        return
    }
    // 非第三方登入註冊
    const emailProviderId = EmailAuthProvider.PROVIDER_ID
    if (providers.includes(emailProviderId)) {
        // 顯示密碼
        state.isPassLogin = true
    } else {
        // 註冊用戶
        state.isPassRegister = true
    }
    currentInstance.refs.pass.focus()
}
function clearForm() {
    state.form = {
        email: '',
        password: ''
    }
}
</script>
<style lang="scss" scoped>
.firebase {
    .firebase__password {
        text-align: right;
        font-size: 12px;
        margin-top: 4px;
        cursor: pointer;
        float: right;
        border: none;
        background-color: inherit;
    }
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
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .emailSent__resend {
            width: 226px;
        }
    }
}
</style>