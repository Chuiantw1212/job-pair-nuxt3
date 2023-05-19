<template>
    <div class="myHeader">
        <nav id="myHeader" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid myHeader__container">
                <div class="d-flex">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <button class="navbar-brand" @click="routeByMenuType()">
                        <img class="brand__logo" src="./Job-Pair-SEO.png" alt="logo">
                        <template v-if="state.menuType === 'admin'">
                            企業用戶
                        </template>
                    </button>
                </div>
                <!-- 手機縮圖列表 -->
                <div v-if="repoAuth.state.user && state.menuType === 'user'" class="d-lg-none container__icons"
                    @click="collapseNavbar()">
                    <NuxtLink class="icons__Group" :to="{ name: 'jobs' }">
                        <img class="icons__Group__image" src="./icon_nav_job.svg" alt="jobs" />
                    </NuxtLink>
                    <NuxtLink class="icons__Group" :to="{ name: 'user-profile' }">
                        <img class="icons__Group__image" src="./icon_nav_member.svg" alt="account" />
                    </NuxtLink>
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <LazyOrganismUserMenu v-if="state.menuType === 'user'" @collapse="collapseNavbar()">
                    </LazyOrganismUserMenu>
                    <LazyOrganismCompanyMenu v-if="state.menuType === 'admin'" @collapse="collapseNavbar()">
                    </LazyOrganismCompanyMenu>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: 'customHeader',
}
</script>
<script setup>
const repoAuth = useRepoAuth()
const state = reactive({
    bsCollapse: null,
    menuType: "user",
})
const router = useRouter()
const route = useRoute()
const { $emitter, $bootstrap } = useNuxtApp()
// Lifecycles
onMounted(() => {
    $emitter.on("setMenuType", (menuType) => {
        state.menuType = menuType
    })
    if (process.client) {
        const menuToggle = document.getElementById("navbarSupportedContent")
        state.bsCollapse = new $bootstrap.Collapse(menuToggle, {
            toggle: false,
        })
        toggleClickOutside(true)
    }
})
onUnmounted(() => {
    toggleClickOutside(false)
})
watch(() => route.path, (path,) => {
    collapseNavbar()
    const chunks = path.split("/")
    const isCompany = chunks[1] === "admin"
    if (isCompany) {
        state.menuType = "admin"
    } else {
        state.menuType = "user"
    }
}, { immediate: true })
// methods
function toggleClickOutside(isOn) {
    if (isOn) {
        document.addEventListener("click", handleClickoutSide)
    } else {
        document.removeEventListener("click", handleClickoutSide)
    }
}
function handleClickoutSide(event) {
    const clickedTarget = event.target
    const navigation = document.getElementById("myHeader")
    if (!navigation.contains(clickedTarget)) {
        collapseNavbar()
    }
}
function collapseNavbar() {
    if (state.bsCollapse) {
        state.bsCollapse.hide()
    }
}
function routeByMenuType() {
    if (state.menuType === 'admin') {
        router.push({
            name: 'admin'
        })
    } else {
        router.push({
            name: 'index'
        })
    }
}
</script>
<style lang="scss" scoped>
.myHeader {
    height: 60px;
}

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

            .brand__logo {
                height: 22px;
                width: 140px;
                margin-right: 8px;
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
