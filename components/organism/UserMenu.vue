<template>
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <template v-if="repoUser.state.user">
            <template v-if="isRegistered">
                <li class="nav-item" @click="emit('collapse')">
                    <router-link class="navItem__button" :to="{ name: 'adminScout' }">招募中心</router-link>
                </li>
                <li class="nav-item" @click="emit('collapse')">
                    <router-link class="navItem__button" :to="{ name: 'companyInfo' }">管理中心</router-link>
                </li>
            </template>
            <template v-else>
                <li class="nav-item">
                    <router-link class="navItem__button" :to="{ name: 'companyRegister' }"> 企業註冊
                    </router-link>
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
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
const { $emitter } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const repoUser = useRepoUser()
function logout() {
    router.push({
        name: "admin",
    })
}
function showModal() {
    $emitter.emit("showSwitchModal")
}
function routeToDashboard() {
    router.push({
        name: "companyInfo",
    })
}
async function routeToHome() {
    // if (this.auth) {
    //     await this.auth.signOut()
    // }
    router.push({
        name: "index",
    })
}

// import { mapActions, mapGetters } from "vuex"
// import isDesktopMixin from "@/libs/desktopMixin.js"
// import authMixin from "./authMixin.js"
// export default {
//     // mixins: [authMixin, isDesktopMixin],
//     async created() {
//         // this.listenToAuthState()
//     },
//     computed: {
//         isRegistered() {
//             return !!this.company
//         },
//         // ...mapGetters(["user", 'company']),
//     },
//     methods: {
//         async logout() {
//             // this.userSignout()
//             this.$router.push({
//                 name: "admin",
//             })
//         },
//         showModal() {
//             this.$emitter.emit("showSwitchModal")
//         },
//         routeToDashboard() {
//             this.$router.push({
//                 name: "companyInfo",
//             })
//         },
//         async routeToHome() {
//             if (this.auth) {
//                 await this.auth.signOut()
//             }
//             this.$router.push({
//                 name: "index",
//             })
//         },
//         // ...mapActions(["userSignout"]),
//     },
// }
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