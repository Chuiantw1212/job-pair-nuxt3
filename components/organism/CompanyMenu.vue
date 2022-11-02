<template>
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <template v-if="repoAuth.state.user">
            <template v-if="isRegistered">
                <li class="nav-item" @click="$emit('collapse')">
                    <NuxtLink class="navItem__button" to="/admin/recruit/jobs">
                        招募中心
                    </NuxtLink>
                </li>
                <li class="nav-item" @click="$emit('collapse')">
                    <NuxtLink class="navItem__button" to="/admin/company">
                        管理中心
                    </NuxtLink>
                </li>
            </template>
            <template v-else>
                <li class="nav-item">
                    <NuxtLink class="navItem__button" to="/admin/register">
                        企業註冊
                    </NuxtLink>
                </li>
                <li class="nav-item" @click="$emit('collapse')">
                    <button class="navItem__button" @click="logout()">登出</button>
                </li>
            </template>
        </template>
        <template v-else>
            <li class="nav-item" @click="$emit('collapse')">
                <button class="navItem__button" type="button" @click.stop="showModal()">註冊/登入</button>
            </li>
        </template>
    </ul>
</template>
<script setup>
const { $emitter } = useNuxtApp()
const loginComposable = useLogin()
const repoAuth = useRepoAuth()
const router = useRouter()
onMounted(() => {
    loginComposable.listenToAuthState()
})
const isRegistered = computed(() => {
    return !!repoAuth.state.company
})
// methods
async function logout() {
    repoAuth.userSignout()
    router.push({
        name: "admin",
    })
}
function showModal() {
    $emitter.emit("showSwitchModal")
}
</script>
<style lang="scss" scoped>
.nav-item {
    font-size: 16px;

    .navItem__button {
        color: black;

        &:hover {
            color: #21cc90;
        }
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
</style>