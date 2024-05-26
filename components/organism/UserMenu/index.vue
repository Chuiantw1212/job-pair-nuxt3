<template>
    <ul class="navbar-nav ms-auto mb-lg-0">
        <template v-if="repoAuth.state.user && repoAuth.state.user.type === 'employee'">
            <template v-if="isRegistered">
                <li class="nav-item" @click="emit('collapse')">
                    <NuxtLink class="navItem__button" active-class="navItem__button--active" to="/jobs">
                        <span>職缺探索</span>
                    </NuxtLink>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <LazyAtomUser>
                        
                    </LazyAtomUser>
                    <!-- <NuxtLink class="navItem__button" active-class="navItem__button--active" to="/user/profile">
                        <span>會員中心</span>
                    </NuxtLink> -->
                </li>
            </template>
            <template v-else>
                <li class="nav-item" @click="emit('collapse')">
                    <button class="navItem__button navItem__button--disabled" disabled>
                        <span>職缺探索</span>
                    </button>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <button class="navItem__button navItem__button--disabled" disabled>
                        <span>會員中心</span>
                    </button>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <button class="navItem__button" @click="logout()">登出</button>
                </li>
            </template>
        </template>
        <template v-else>
            <li class="nav-item" @click="emit('collapse')">
                <NuxtLink class="navItem__button" active-class="navItem__button--active" :to="{
                    name: 'admin'
                }">
                    <span>
                        企業專區
                    </span>
                </NuxtLink>
            </li>
            <li class="nav-item" @click="emit('collapse')">
                <NuxtLink class="navItem__button" active-class="navItem__button--active" :to="{
                    name: 'jobs'
                }">
                    <img src="./Search.svg" alt="search">
                    <span>職缺探索</span>
                </NuxtLink>
            </li>
            <li class="nav-item" @click="emit('collapse')">
                <button class="navItem__button" type="button" @click.stop="showUserModal()">註冊/登入</button>
            </li>
        </template>
    </ul>
</template>
<script setup>
import { useRouter, } from 'vue-router'
import { onMounted, computed } from 'vue'
const { $emitter } = useNuxtApp()
const router = useRouter()
const repoAuth = useRepoAuth()
const loginComposable = useLogin()
// Hooks
const emit = defineEmits(['collapse'])
onMounted(() => {
    loginComposable.listenToAuthState()
})
const isRegistered = computed({
    get() {
        const { user } = repoAuth.state
        if (user && user.preference) {
            return true
        }
        return false
    },
})
// methods
async function logout() {
    repoAuth.userSignout()
    router.push({
        name: 'index',
    })
}
function showUserModal() {
    const { user } = repoAuth.state
    if (user && user.id && user.type === 'employee') {
        router.push({
            name: "jobs",
        })
    } else {
        // $emitter?.emit("showSwitchModal")
        $emitter?.emit("showUserModal")
    }
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