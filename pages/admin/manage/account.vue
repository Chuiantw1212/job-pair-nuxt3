<template>
    <div class="container accountManagement">
        <h1 class="accountManagement__header">帳戶管理</h1>
        <hr class="accountManagement__hr" />
        <template v-if="state.tempUser">
            <div class="accountManagement__card">
                <h2 class="card__header">基本資料</h2>
                <div class="card__form" ref="nameRef">
                    <LazyAtomInputText v-model="state.tempUser.name" name="聯絡人姓名" required>
                    </LazyAtomInputText>
                    <div class="form__btnGroup">
                        <LazyAtomBtnSimpleV2 class="btnGroup__btn" @click="saveUserName()">儲存</LazyAtomBtnSimpleV2>
                    </div>
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
                </div>
            </div>
            <div class="accountManagement__card">
                <h2 class="card__header">接收履歷的電子信箱</h2>
                <div class="card__desc">電子信箱可被修改，可設定一個電子信箱</div>
                <LazyAtomInputSelect class="mt-1" v-model="state.mainAdmin" :items="adminItems"
                    @update:modelValue="setMainAdmin($event)">
                </LazyAtomInputSelect>
            </div>
            <div class="accountManagement__card">
                <div class="card__headerGroup">
                    <h2 class="card__header">帳號</h2>
                    <LazyOrganismDeleteModal v-if="state.VITE_APP_FIREBASE_ENV !== 'production'"
                        class="managemement__others"></LazyOrganismDeleteModal>
                </div>
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
const { $sweet, $validate, } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
const repoAuth = useRepoAuth()
const repoCompany = useRepoCompany()
const router = useRouter()
const repoAdmin = useRepoAdmin()
const nameRef = ref()
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
    mainAdmin: '',
    admins: [],
})
// hooks
useHead({
    title: '帳戶管理 - 招募中心'
})
const adminItems = computed({
    get() {
        const adminItemsCopy = state.admins.map(item => {
            return {
                text: item.email,
                value: item.email
            }
        })
        return adminItemsCopy
    }
})
watch(() => repoAuth.state.user, async (newValue) => {
    if (!process.client || !newValue) {
        return
    }
    state.tempUser = JSON.parse(JSON.stringify(newValue))
    state.admins = await repoCompany.getCompanyAdmins()
    state.mainAdmin = state.admins[0].email
}, { immediate: true })
// methods
async function setMainAdmin(mainEmail) {
    const adminIndex = state.admins.findIndex(item => {
        return item.email === mainEmail
    })
    const adminsCopy = JSON.parse(JSON.stringify(state.admins))
    const selectedAdmin = adminsCopy.splice(adminIndex, 1)[0]
    adminsCopy.unshift(selectedAdmin)
    const adminUids = adminsCopy.map(item => item.uid)
    await repoCompany.patchCompanyAdmins(adminUids)
    state.admins = await repoCompany.getCompanyAdmins()
}
async function removeAdmin(item) {
    $sweet.loader(true)
    const admins = await repoAdmin.deleteAdmin(item)
    await $sweet.succeed()
    state.admins = admins
    if (item.email === repoAuth.state.user.email) {
        repoAuth.userSignout()
        router.push({
            name: 'admin',
        })
    }
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
        state.admins = res.data
    }
    state.newAdminEmail = ''
}
async function saveUserName() {
    const validateResult = await $validate(nameRef.value)
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
</script>
<style lang="scss" scoped>
.accountManagement {
    background-color: #F9F9F9;
    padding-top: 20px;

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

        .card__headerGroup {
            display: flex;
            justify-content: space-between;
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