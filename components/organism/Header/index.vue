<template>
    <div class="myHeader">
        <nav id="myHeader" class="navbar navbar-expand-lg">
            <div class="container-fluid myHeader__container">
                <div class="container__top">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" @click="toggleMenu()">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <button class="navbar-brand" @click="routeByMenuType()">
                        <img class="brand__logo" src="./Job-Pair-SEO.png" alt="logo">
                        <template v-if="state.menuType === 'admin'">
                            企業用戶
                        </template>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <hr class="collapse__hr">
                    <LazyOrganismUserMenu v-if="state.menuType === 'user'" @collapse="toggleMenu(false)">
                    </LazyOrganismUserMenu>
                    <LazyOrganismCompanyMenu v-if="state.menuType === 'admin'" @collapse="toggleMenu(false)">
                    </LazyOrganismCompanyMenu>
                </div>
            </div>
        </nav>
        <div v-if="state.isBackgroundVisible && state.isMobile" class="myHeader__background"
            :class="{ 'myHeader__background--fadeIn': state.isBackgroundFading }" @click="toggleMenu(false)">
        </div>
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
    isBackgroundVisible: false,
    isBackgroundFading: false,
    isMobile: true,
    backgroundTimeout: false,
    menuType: "user",
})
const router = useRouter()
const route = useRoute()
const { $emitter, } = useNuxtApp()
// hooks
onMounted(() => {
    $emitter.on("setMenuType", (menuType) => {
        state.menuType = menuType
    })
    if (process.client) {
        const menuToggle = document.getElementById("navbarSupportedContent")
        state.bsCollapse = new window.bootstrap.Collapse(menuToggle, {
            toggle: false,
        })
        // add resize listener
        window.addEventListener('resize', handleResize)
        handleResize()
    }
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
watch(() => route.path, (path,) => {
    toggleMenu(false)
    const chunks = path.split("/")
    const isCompany = chunks[1] === "admin"
    if (isCompany) {
        state.menuType = "admin"
    } else {
        state.menuType = "user"
    }
}, { immediate: true })
// methods
function handleResize() {
    state.isMobile = window.innerWidth < 992
}
function toggleMenu(status) {
    if (state.backgroundTimeout || !state.bsCollapse || window.innerWidth >= 992) {
        return
    }
    // clear existed timer 
    const newValue = status ?? !state.isBackgroundVisible
    if (newValue) {
        state.isBackgroundVisible = newValue
        state.bsCollapse.show()
        // start fadeIn animation
        setTimeout(() => {
            state.isBackgroundFading = true
        })
        // is only for setting the transition timer
        state.backgroundTimeout = setTimeout(() => {
            state.backgroundTimeout = null
        }, 300)
    } else {
        // start fadeOut animation
        state.isBackgroundFading = false
        state.bsCollapse.hide()
        state.backgroundTimeout = setTimeout(() => {
            state.isBackgroundVisible = newValue
            state.backgroundTimeout = null
        }, 300)
    }
}
function routeByMenuType() {
    let routeName = null
    if (state.menuType === 'admin') {
        routeName = 'admin'
    } else {
        routeName = 'index'
        router.push({
            name: 'index'
        })
    }
    if (route.name === routeName) {
        location.reload()
    } else {
        router.push({
            name: routeName
        })
    }
}

</script>
<style lang="scss" scoped>
.myHeader {
    height: 76px;

    .myHeader__background {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0);
        z-index: 1030;
        position: fixed;
        transition: all 0.3s;

    }

    .myHeader__background--fadeIn {
        background: rgba(0, 0, 0, 0.5);
    }
}

:deep(.navbar) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1040;
    padding: 0px;
    // padding: 28px 20px;
    border-bottom: 1px solid #d3d3d3;
    background-color: white;

    .myHeader__container {
        padding: 0px;
        // display: flex;
        // flex-direction: row-reverse;

        .container__top {
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            height: 75px;
            padding: 0 20px;
        }


        .navbar-brand {
            font-size: 18px;
            font-weight: bold;
            background-color: inherit;
            border: none;
            display: flex;
            align-items: center;
            padding: 0px;
            // min-height: 26px;
            margin: 0px;
            // margin-left: 8px;

            .brand__logo {
                width: 92px;
                height: 16px;
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

        .navbar-collapse {
            .collapse__hr {
                margin: 0px;
            }
        }



        .container__icons {
            display: flex;
            gap: 16px;
            background-color: white;

            .icons__Group {
                .icons__Group__image {
                    width: 24px;
                    height: 24px;

                    &:hover {
                        .image__fill--jobs {
                            stroke: #21cc90;
                        }

                        .image__fill--profile {
                            fill: #21cc90;
                        }

                    }
                }
            }

            .icons__Group--active {
                .image__fill--jobs {
                    stroke: #21cc90;
                }

                .image__fill--profile {
                    fill: #21cc90;
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

@media screen and (min-width: 992px) {


    #myHeader {

        .myHeader__container {
            max-width: calc(1320px - 24px);
            padding: 0px 100px;

            .container__top {
                width: unset;
                padding: 0px;
                height: 72px;
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
