<template>
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <template v-if="userStore.user && userStore.user.type === 'employee'">
            <template v-if="isRegistered">
                <li class="nav-item" @click="$emit('collapse')">
                    <!-- <router-link id="navItem__button" class="navItem__button" :to="{ name: 'jobs' }">
                        職缺探索
                    </router-link> -->
                </li>
                <li class="nav-item" @click="$emit('collapse')">
                    <!-- <router-link class="navItem__button" :to="{ name: 'userDashboard' }">
                        會員中心
                    </router-link> -->
                </li>
            </template>
            <template v-else>
                <li class="nav-item" @click="$emit('collapse')">
                    <button class="navItem__button navItem__button--disabled" disabled>
                        職缺探索
                    </button>
                </li>
                <li class="nav-item" @click="$emit('collapse')">
                    <button class="navItem__button navItem__button--disabled" disabled>
                        會員中心
                    </button>
                </li>
                <li class="nav-item" @click="$emit('collapse')">
                    <button class="navItem__button" @click="logout()">登出</button>
                </li>
            </template>
        </template>
        <template v-else>
            <li class="nav-item" @click="$emit('collapse')">
                <!-- <router-link class="navItem__button" @click="signOut()" :to="{
                    name: 'admin'
                }">企業專區</router-link> -->
            </li>
            <li class="nav-item" @click="$emit('collapse')">
                <button class="navItem__button" type="button" @click.stop="showUserModal()">註冊/登入</button>
            </li>
        </template>
        <!-- <li class="nav-item" @click="$emit('collapse')">
            <button class="navItem__button">關於Job Pair</button>
        </li> -->
    </ul>
</template>
<script setup>
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
function logout() {
    userSignout()
    router.push({
        name: "home",
    })
}
function showUserModal() {
    // if (this.user && this.user.id && this.user.type === 'employee') {
    //     this.$router.push({
    //         name: "jobs",
    //     })
    // } else {
    //     this.$emitter.emit("showSwitchModal")
    // }
}
function signOut() {
    // if (this.auth) {
    //     await this.auth.signOut()
    // }
}
// import { mapGetters, mapActions } from "vuex"
// import authMixin from "./authMixin.js"
// export default {
//     mixins: [authMixin],
//     data: function () {
//         return {
//             unsubscribe: null,
//             auth: null,
//         }
//     },
//     created() {
//         this.listenToAuthState()
//     },
//     computed: {
//         isRegistered() {
//             if (this.user && this.user.preference) {
//                 return true
//             }
//             return false
//         },
//         ...mapGetters(["userRes", "user"]),
//     },
//     methods: {
//         async logout() {
//             this.userSignout()
//             this.$router.push({
//                 name: "home",
//             })
//         },
//         showUserModal() {
//             if (this.user && this.user.id && this.user.type === 'employee') {
//                 this.$router.push({
//                     name: "jobs",
//                 })
//             } else {
//                 this.$emitter.emit("showSwitchModal")
//             }
//         },
//         collapseNavbar() {
//             this.bsCollapse.hide()
//         },
//         ...mapActions(["userSignout"]),
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