<template>
    <div class="container accountManagement">
        <h1 class="accountManagement__header">帳戶管理</h1>
        <hr class="accountManagement__hr" />
        <template v-if="state.tempUser">
            <div class="accountManagement__card">
                <h2 class="card__header">基本資料</h2>
                <!-- <div class="card__headerGroup">
                    <h1 class="headerGroup__title">帳號資訊</h1>
                    <LazyOrganismDeleteModal v-if="state.VITE_APP_FIREBASE_ENV !== 'production'"
                        class="managemement__others"></LazyOrganismDeleteModal>
                </div> -->
                <div class="card__form">
                    <LazyAtomInputText v-model="state.tempUser.name" name="聯絡人姓名" required>
                    </LazyAtomInputText>
                    <!-- <LazyAtomInputEmail v-model="state.tempUser.email" name="接收履歷的電子信箱" class="card__item">
                    </LazyAtomInputEmail> -->
                    <div class="form__btnGroup">
                        <LazyAtomBtnSimpleV2 class="btnGroup__btn" @click="saveUserName()">儲存</LazyAtomBtnSimpleV2>
                        <!-- <LazyAtomBtnSimpleV2 class="btnGroup__btn" outline>取消</LazyAtomBtnSimpleV2> -->
                    </div>
                    <!-- <div class="mb-1"><span class="nameGroup__required">*</span> 聯絡人電子郵件</div>
                    <LazyAtomInputText v-model="state.tempUser.email" :disabled="true" class="mb-3"></LazyAtomInputText>
                    <button class="btn btn-danger" @click="logout()">登出</button> -->
                </div>
            </div>
            <div class="accountManagement__card">
                <h2 class="card__header">管理員</h2>
                <div class="card__desc">電子信箱不可以被修改，可設定多個電子信箱</div>
                <LazyAtomInputAdmin class="card__list" :modelValue="state.admins" @remove="removeAdmin($event)">
                </LazyAtomInputAdmin>
                <h3 class="card__header3">管理員</h3>
                <div class="card__emailGroup">
                    <LazyAtomInputEmail class="w-100" v-model="state.newAdminEmail" required>
                    </LazyAtomInputEmail>
                    <LazyAtomBtnSimpleV2 class="emailGroup__btn" @click="addNewAdmin()" size="sm"
                        :disabled="!state.newAdminEmail">
                        新增管理員
                    </LazyAtomBtnSimpleV2>
                    <!-- <button class="card__add" ></button> -->
                </div>
                <!-- <LazyOrganismNewAdminModal></LazyOrganismNewAdminModal> -->
            </div>
            <!-- <div class="accountManagement__card">
                <h2 class="card__header">接收履歷的電子信箱</h2>
                <div class="card__desc">電子信箱可被修改，可設定一個電子信箱</div>
                <div class="card__form">
                    <div class="form__btnGroup">
                        <LazyAtomBtnSimpleV2 class="btnGroup__btn" outline>取消</LazyAtomBtnSimpleV2>
                        <LazyAtomBtnSimpleV2 class="btnGroup__btn">儲存</LazyAtomBtnSimpleV2>
                    </div>
                </div>
            </div> -->
            <div class="accountManagement__card">
                <h2 class="card__header">帳號</h2>
                <div class="card__form">
                    <div class="form__btnGroup">
                        <LazyAtomBtnSimpleV2 class="btnGroup__btn" outline>重設密碼</LazyAtomBtnSimpleV2>
                        <LazyAtomBtnSimpleV2 class="btnGroup__btn" @click="logout()">登出帳號</LazyAtomBtnSimpleV2>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import { getAuth, } from "firebase/auth"
const { $sweet, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const repoAuth = useRepoAuth()
const repoCompany = useRepoCompany()
const router = useRouter()
const repoAdmin = useRepoAdmin()
const state = reactive({
    tempUser: null,
    pass: null,
    toggleChangePassword: false,
    newPass: null,
    newPassAgain: null,
    chatIcon: null,
    balance: 0,
    newAdminEmail: '',
    VITE_APP_FIREBASE_ENV: runTimeConfig?.public?.VITE_APP_FIREBASE_ENV,
})
// hooks
useHead({
    title: '帳戶管理 - 招募中心'
})
watch(() => repoAuth.state.user, async (newValue) => {
    if (!process.client || !newValue) {
        return
    }
    state.tempUser = JSON.parse(JSON.stringify(newValue))
    // get company admins
    state.admins = await repoCompany.getCompanyAdmins()
}, { immediate: true })
// methods
async function removeAdmin(item) {
    $sweet.loader(true)
    const admins = await repoAdmin.deleteAdmin(item)
    $sweet.loader(false)
    state.admins = admins
}
async function addNewAdmin() {
    $sweet.loader(true)
    if (!String(state.newAdminEmail).trim()) {
        return
    }
    const res = await repoAdmin.postAdminInvitation({
        email: state.newAdminEmail
    })
    if (res.status === 200) {
        await $sweet.succeed()
        state.admins = res
    }
    state.newAdminEmail = ''
}
async function saveUserName() {
    const validateResult = await $validate()
    if (!validateResult.isValid) {
        return
    }

    const result = await repoAdmin.patchAdmin(state.tempUser)
    if (result.status === 200) {
        await $sweet.succeed()
    }
}
async function logout() {
    localStorage.removeItem("user")
    await repoAuth.userSignout()
    let user = null
    try {
        const auth = getAuth()
        user = auth.currentUser
    } finally {
        if (!user) {
            router.push({
                name: "admin",
            })
        }
    }
}
async function handleCredential() {
    const auth = getAuth()
    const user = auth().currentUser
    const credential = auth.EmailAuthProvider.credential(user.email, state.pass)
    try {
        const authResult = await user.reauthenticateWithCredential(credential)
        if (authResult.user.refreshToken) {
            // 驗證成功，允許變更密碼
            state.pass = null
            state.toggleChangePassword = true
        }
    } catch (error) {
        // 驗證失敗
        $sweet.alert(error.message)
    }
}
async function submitNewPass() {
    if (state.newPass !== state.newPassAgain) {
        $sweet.alert("密碼不一致")
        return
    }
    const user = firebase.auth().currentUser
    try {
        const res = await user.updatePassword(state.newPass)
        state.newPass = null
        state.newPassAgain = null
        state.toggleChangePassword = false
        $sweet.succeed({
            text: '修改密碼完成',
        })
    } catch (error) {
        // 更新失敗
        $sweet.alert(error.message)
    }
}
async function submitProfile() {
    const auth = getAuth()
    const user = auth().currentUser
    try {
        await user.updateProfile({
            name: state.tempUser.name,
        })
        const response = await repoAdmin.patchAdmin(state.tempUser)
        if (response.status === 200) {
            repoAuth.setUser(state.tempUser)
            $sweet.succeed()
        }
    } catch (error) {
        // 更新失敗
        $sweet.alert(error.message)
    }
}
</script>
<style lang="scss" scoped>
.accountManagement {
    background-color: #F9F9F9;

    .accountManagement__header {
        color: #222;
        /* Title/H1-36-Semibold */
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
        /* 100% */
    }

    .accountManagement__hr {
        margin-top: 30px;
        border: 1px solid #EDEAEA;
    }

    .accountManagement__card {
        border-radius: 10px;
        background: #FFF;
        padding: 20px;
        border-radius: 10px;
        margin-top: 30px;

        .card__header {
            color: #484848;
            font-family: "PingFang TC";
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .card__header3 {
            color: var(--Grays-Seco, #484848);
            /* P-16-Rugular */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 26px;
            /* 162.5% */
            margin-top: 30px;
        }

        .card__emailGroup {
            display: flex;
            gap: 10px;
            align-items: center;

            .emailGroup__btn {
                height: 42px;
            }
        }

        .card__desc {
            color: #A6A6A6;
            /* H4-12-Regular */
            font-family: "PingFang TC";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .card__list {
            margin-top: 10px
        }

        .card__item {
            margin-top: 10px
        }
    }

    .card__form {
        margin-top: 30px;

        .form__btnGroup {
            display: flex;
            gap: 30px;
            width: 100%;
            margin-top: 40px;

            .btnGroup__btn {
                width: 100%;
            }
        }
    }

    .balance__inputGroup {
        display: flex;
        gap: 5px;

        .inputGroup__input {
            width: 131px;
        }

        .inputGroup__btn {
            width: 112px;
            height: 42px;
            border-radius: 10px;
        }
    }

    .ballance__table {
        border-top: 1px solid #d3d3d3;
        margin-top: 8px;
        font-weight: normal;

        .table__cell {
            padding: 24px 0;
        }
    }

    .form__confirm {
        width: 105px;
        height: 48px;
        background: #29b0ab;
        border: none;
        color: white;
        border-radius: 10px;
        margin-top: 32px;
    }
}
</style>