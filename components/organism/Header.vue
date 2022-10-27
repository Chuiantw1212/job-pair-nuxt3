<template>
    <div>
        <nav id="myHeader" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid myHeader__container">
                <div class="d-flex">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <button class="navbar-brand" @click="routeByMenuType()">
                        <img class="logoGroup__logo" src="@/assets/logo.png" alt="logo" />
                        <img class="logoGroup__name" src="@/assets/name.png" alt="name" />
                        <template v-if="state.menuType === 'admin'">
                            企業用戶
                        </template>
                    </button>
                </div>
                <!-- 手機縮圖列表 -->
                <div v-if="userStore.user && state.menuType === 'user'" class="d-lg-none container__icons"
                    @click="collapseNavbar()">
                    <!-- <router-link class="icons__Group" :to="{ name: 'jobs' }">
                        <img class="icons__Group__image" src="./assets/icon_nav_job.svg" />
                    </router-link>
                    <router-link class="icons__Group" :to="{ name: 'userDashboard' }">
                        <img class="icons__Group__image" src="./assets/icon_nav_member.svg" />
                    </router-link> -->
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <OrganismUserMenu v-if="state.menuType === 'user'" @collapse="collapseNavbar()"></OrganismUserMenu>
                    <!-- <OrganismCompanyMenu v-if="state.menuType === 'admin'" @collapse="collapseNavbar()">
                    </OrganismCompanyMenu> -->
                </div>
            </div>
        </nav>
        <!-- 如果條件渲染有異布渲染問題 -->
        <!-- <UserModal></UserModal>
        <CompanyModal></CompanyModal> -->
        <OrganismSwitchModal></OrganismSwitchModal>
    </div>
</template>
<script setup>
// import { Collapse } from "bootstrap"
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
import useUserStore from '@/stores/user'
const userStore = useUserStore()
const state = reactive({
    bsCollapse: null,
    menuType: "user",
})
</script>
<!-- <script>
import { Collapse } from "bootstrap"
import { mapGetters } from "vuex"
import { defineAsyncComponent } from 'vue'
export default {
    data: () => ({
        bsCollapse: null,
        menuType: "user",
    }),
    components: {
        UserModal: defineAsyncComponent(() =>
            import('./UserModal.vue')
        ),
        CompanyModal: defineAsyncComponent(() =>
            import('./CompanyModal.vue')
        ),
        UserMenu: defineAsyncComponent(() =>
            import('./UserMenu.vue')
        ),
        CompanyMenu: defineAsyncComponent(() =>
            import('./CompanyMenu.vue')
        ),
        SwitchModal: defineAsyncComponent(() =>
            import('./SwitchModal.vue')
        ),
    },
    props: {
        routes: {
            type: Array,
        },
    },
    mounted() {
        this.$emitter.on("setMenuType", (menuType) => {
            this.menuType = menuType
        })
        const menuToggle = document.getElementById("navbarSupportedContent")
        this.bsCollapse = new Collapse(menuToggle, {
            toggle: false,
        })
        this.toggleClickOutside(true)
    },
    computed: {
        ...mapGetters(["userRes", "user"]),
    },
    beforeUnmount() {
        this.toggleClickOutside(false)
    },
    watch: {
        $route: {
            handler: function (route) {
                this.collapseNavbar()
                const { path = "" } = route
                const chunks = path.split("/")
                const isCompany = chunks[1] === "admin"
                if (isCompany) {
                    this.menuType = "admin"
                } else {
                    this.menuType = "user"
                }
            },
            immediate: true,
        },
    },
    methods: {
        routeByMenuType() {
            if (this.menuType === 'admin') {
                this.$router.push({
                    name: 'admin'
                })
            } else {
                this.$router.push({
                    name: 'home'
                })
            }
        },
        toggleClickOutside(isOn) {
            if (isOn) {
                document.addEventListener("click", this.handleClickoutSide)
            } else {
                document.removeEventListener("click", this.handleClickoutSide)
            }
        },
        handleClickoutSide(event) {
            const clickedTarget = event.target
            const navigation = document.getElementById("myHeader")
            if (!navigation.contains(clickedTarget)) {
                this.collapseNavbar()
            }
        },
        collapseNavbar() {
            if (this.bsCollapse) {
                this.bsCollapse.hide()
            }
        },
    },
}
</script> -->
<style lang="scss" scoped>
:deep(.navbar) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1040;
    padding: 7px 20px;
    border-bottom: 1px solid #d3d3d3;

    .myHeader__container {
        padding: 0;

        .navbar-brand {
            font-size: 20px;
            font-weight: bold;
            background-color: inherit;
            border: none;
            display: flex;
            align-items: center;
            min-height: 46px;

            .logoGroup__logo {
                height: 20px;
                width: auto;
                margin-right: 4px;
            }

            .logoGroup__name {
                height: 20px;
                width: 90px;
            }
        }

        .navbar-toggler {
            border: none;
            align-self: center;
            padding: 0;
            margin-right: 10px;

            .navbar-toggler-icon {
                width: 26px;
                height: 26px;
            }
        }



        .container__icons {
            display: flex;
            gap: 16px;

            .icons__Group {
                .icons__Group__image {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }

    // Deep style
    .navItem__button {
        background-color: unset;
        border: none;
        line-height: 40px;
        font-size: 20px;
        font-weight: bold;
        text-decoration: none;
        padding: 0 4px;
    }
}

@media screen and (min-width: 991px) {
    #myHeader {

        .myHeader__container {
            max-width: calc(1320px - 24px);

            .navbar-brand {
                min-height: 46px;
                font-size: 24px;

                .logoGroup__logo {
                    height: 30px;
                    width: auto;
                    // width: 150px;
                }
            }

            .container__icons {
                display: flex;
                gap: 16px;

                .icons__Group {
                    .icons__Group__image {
                        width: 26px;
                        height: 26px;
                    }
                }
            }
        }
    }
}
</style>
