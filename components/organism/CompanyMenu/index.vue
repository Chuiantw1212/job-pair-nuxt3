<template>
    <ul class="navbar-nav ms-auto mb-lg-0">
        <template v-if="repoAuth.state.user">
            <template v-if="isRegistered">
                <li class="nav-item" @click="handleClick()">
                    <NuxtLink class="navItem__button" active-class="navItem__button--active" to="/admin/recruit/jobs">
                        <img src="./Report.svg" alt="Report">
                        招募中心
                    </NuxtLink>
                </li>
                <li class="nav-item" @click="handleClick()">
                    <NuxtLink class="navItem__button" active-class="navItem__button--active" to="/admin/manage/company">
                        <img src="./Setting.svg" alt="Setting">
                        管理中心
                    </NuxtLink>
                </li>
                <li class="nav-item" @click="handleClick()">
                    <NuxtLink class="navItem__button" active-class="navItem__button--active" to="/admin/topup">
                        <img src="./Wallet.svg" alt="Setting">
                        儲值管理
                    </NuxtLink>
                </li>
            </template>
            <template v-else>
                <li class="nav-item">
                    <NuxtLink class="navItem__button" active-class="navItem__button--active" to="/admin/register">
                        企業註冊
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <button class="navItem__button" @click="revokeUser()">
                        取消
                    </button>
                </li>
                <li class="nav-item" @click="handleClick()">
                    <button class="navItem__button" @click="logout()">登出</button>
                </li>
            </template>
        </template>
        <template v-else>
            <li class="nav-item" @click="handleClick()">
                <button class="navItem__button" type="button" @click.stop="showModal()">註冊/登入</button>
            </li>
        </template>
    </ul>
</template>
<script setup>
const { $emitter, $sweet } = useNuxtApp()
const loginComposable = useLogin()
const repoAuth = useRepoAuth()
const repoAdmin = useRepoAdmin()
const router = useRouter()
onMounted(() => {
    loginComposable.listenToAuthState()
})
const isRegistered = computed(() => {
    return !!repoAuth.state.company
})
// methods
async function revokeUser() {
    const res = await repoAdmin.deleteAdminCompany()
    if (res.status === 200) {
        repoAuth.userSignout()
        router.push({
            name: 'index',
        })
        // 刪除帳號後重新整理避免Firebase資料快取
        setTimeout(() => {
            if (process.client) {
                location.reload()
            }
        }, 300)
    }
}
function handleClick() {
    $emitter?.emit('collapse')
}
async function logout() {
    repoAuth.userSignout()
    router.push({
        name: 'admin',
    })
}
function showModal() {
    $emitter?.emit("showCompanyModal")
}
</script>
<style lang="scss" scoped>
.navbar-nav {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .nav-item {
        font-size: 16px;

        .navItem__button {
            display: flex;
            gap: 10px;
            color: black;
            transition: all 0.3s;
            align-items: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            /* 150% */

            &:hover {
                color: #21cc90;
            }
        }

        // 重要不可刪除
        .navItem__button--active {
            color: #21cc90;
        }

        .navItem__button--disabled {
            background-color: unset;
            color: #999;
            font-weight: bold;
            cursor: unset;

            &:hover {
                color: #999;
            }
        }
    }
}

@media screen and (min-width:992px) {
    .navbar-nav {
        flex-direction: row;
        padding: 0px;
    }
}
</style>