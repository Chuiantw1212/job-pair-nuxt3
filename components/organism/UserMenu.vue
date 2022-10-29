<template>
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <template v-if="repoAuth.state.user">
            <template v-if="isRegistered">
                <li class="nav-item" @click="emit('collapse')">
                    <NuxtLink class="navItem__button">招募中心</NuxtLink>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <NuxtLink class="navItem__button">管理中心</NuxtLink>
                </li>
            </template>
            <template v-else>
                <li class="nav-item">
                    <NuxtLink class="navItem__button"> 企業註冊
                    </NuxtLink>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <button class="navItem__button" @click="logout()">登出</button>
                </li>
            </template>
        </template>
        <li class="nav-item" @click="emit('collapse')">
            <button class="navItem__button" type="button" @click.stop="showModal()">註冊/登入</button>
        </li>
    </ul>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { reactive, onMounted, onUnmounted, watch, nextTick, ref, watchEffect, computed, defineEmits } from 'vue'
const { $emitter } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const repoAuth = useRepoAuth()
const loginComposable = useLogin()
// Hooks
const emit = defineEmits(['collapse'])
onMounted(() => {
    loginComposable.listenToAuthState()
})
const isRegistered = computed({
    // getter
    get() {
        const { user } = repoAuth.state
        if (user && user.preference) {
            return true
        }
        return false
    },
})
// methods
function logout() {
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
    // padding: 0 8px;

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