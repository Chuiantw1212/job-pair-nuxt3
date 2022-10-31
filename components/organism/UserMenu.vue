<template>
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <template v-if="repoAuth.state.user && repoAuth.state.user.type === 'employee'">
            <template v-if="isRegistered">
                <li class="nav-item" @click="emit('collapse')">
                    <NuxtLink id="navItem__button" class="navItem__button" to="/jobs">
                        職缺探索
                    </NuxtLink>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <NuxtLink class="navItem__button" to="/user/profile">
                        會員中心
                    </NuxtLink>
                </li>
            </template>
            <template v-else>
                <li class="nav-item" @click="emit('collapse')">
                    <button class="navItem__button navItem__button--disabled" disabled>
                        職缺探索
                    </button>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <button class="navItem__button navItem__button--disabled" disabled>
                        會員中心
                    </button>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <button class="navItem__button" @click="logout()">登出</button>
                </li>
            </template>
        </template>
        <template v-else>
            <li class="nav-item" @click="emit('collapse')">
                <NuxtLink class="navItem__button" :to="{
                    name: 'admin'
                }">企業專區</NuxtLink>
            </li>
            <li class="nav-item" @click="emit('collapse')">
                <button class="navItem__button" type="button" @click.stop="showUserModal()">註冊/登入</button>
            </li>
        </template>
    </ul>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { reactive, onMounted, onUnmounted, watch, nextTick, ref, watchEffect, computed } from 'vue'
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
        name: "index",
    })
}
function showUserModal() {
    const { user } = repoAuth.state
    if (user && user.id && user.type === 'employee') {
        router.push({
            name: "jobs",
        })
    } else {
        $emitter.emit("showSwitchModal")
    }
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