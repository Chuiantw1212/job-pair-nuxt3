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
                <!-- </div> -->
                <!-- 手機縮圖列表 -->
                <!-- <div v-if="repoAuth.state.user && state.menuType === 'user'" class="d-lg-none container__icons"
                    @click="toggleMenu(false)">
                    <NuxtLink class="icons__Group" :active-class="'icons__Group--active'" aria-label="route to jobs"
                        :to="{ name: 'jobs' }">
                        <svg class="icons__Group__image" width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path class="image__fill image__fill--jobs"
                                d="M2.504 3.083c1.326-.022 2.593-.002 3.89 0 .099 0 .13-.038.128-.136a76.05 76.05 0 0 1 0-1.172c.002-.51.42-.951.915-.953 1.042-.005 2.085-.005 3.127 0 .494.002.913.444.916.952.002.386.003.773-.001 1.16-.002.109.03.15.141.15 1.093-.005 2.185-.006 3.277-.006.437 0 .874.015 1.31 0 .551-.019.976.464.975 1.015v2.472c0 .863.003 1.726-.001 2.589-.002.435-.18.77-.572.962-.077.038-.098.088-.098.17l.001 4.172c0 .588.002 1.176 0 1.763a.948.948 0 0 1-.933.96c-.713.003-1.426 0-2.139 0H2.447a.946.946 0 0 1-.947-.833c-.024-.22-.01-.446-.01-.668 0-1.777 0-3.554.003-5.331 0-.124-.027-.197-.145-.259-.352-.184-.523-.503-.525-.9-.006-1.695-.005-3.39 0-5.086.001-.43.159-.834.576-.942.268-.07.828-.075 1.105-.08zM16.42 9.608c.034-.004.103-.059.121-.081.034-.073.04-.256.04-.36V4.08a.405.405 0 0 0-.13-.322c-.095-.087-.21-.096-.328-.096H1.89c-.336 0-.47.138-.47.483 0 1.666.005 3.331-.005 4.997-.002.295.197.466.454.465 1.73-.009 3.461-.005 5.191-.005.336 0 .336 0 .337-.346.002-.574.408-1.005.968-1.014.425-.006.851-.012 1.276.002.327.011.603.148.799.434.157.228.171.485.164.75-.004.17.002.174.167.174h4.666l.983.006zM8.99 16.582h6.516c.066 0 .13.002.196-.027.194-.088.226-.255.226-.446v-5.704c0-.205 0-.205-.205-.205h-4.965c-.11-.011-.165.034-.156.154.006.077.002.155.001.232-.004.534-.413.955-.93.958-.446.002-.892 0-1.338 0-.342.001-.6-.156-.787-.442a.984.984 0 0 1-.152-.56c.002-.385.046-.34-.334-.341h-4.79c-.196 0-.2.002-.2.197 0 1.906.003 3.811-.002 5.717 0 .257.107.473.455.472 2.154-.008 4.31-.005 6.465-.005zm.509-13.5c.429-.002.858-.001 1.287 0 .08 0 .114-.035.113-.116v-.489c0-.227.008-.455-.007-.681-.016-.248-.165-.376-.404-.376H9.014c-.491 0-.983.01-1.474-.004-.266-.008-.44.176-.439.442.002.36.003.72 0 1.08-.002.103.032.147.137.146.392-.005.783-.005 1.175 0L9.5 3.083zm-.982 5.783c-.258-.01-.528.081-.535.343-.011.459-.008.918 0 1.376.004.21.13.347.335.364.445.036.891.03 1.335.005.251-.015.365-.166.369-.428.003-.21 0-.42 0-.63 0-.219.004-.437 0-.656-.006-.23-.15-.374-.373-.38-.05 0-.1.003-.15 0l-.981.006z"
                                fill="#484848" stroke="#484848" stroke-width=".7" />
                        </svg>
                    </NuxtLink>
                    <NuxtLink class="icons__Group" :active-class="'icons__Group--active'" aria-label="route to user proflie"
                        :to="{ name: 'user-profile' }">
                        <svg class="icons__Group__image" width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#xl40irzjfa)">
                                <path class="image__fill image__fill--profile"
                                    d="M17.329 14.69a8.454 8.454 0 0 0-1.833-2.703 8.545 8.545 0 0 0-2.717-1.822l-.027-.012a5.586 5.586 0 0 0 2.337-4.545C15.09 2.51 12.565 0 9.45 0 6.336 0 3.812 2.51 3.812 5.608c0 1.87.92 3.528 2.337 4.548l-.027.01a8.47 8.47 0 0 0-2.717 1.823 8.492 8.492 0 0 0-1.833 2.703A8.366 8.366 0 0 0 .9 17.815a.18.18 0 0 0 .182.185h1.364c.1 0 .18-.08.182-.176a6.724 6.724 0 0 1 1.997-4.62 6.796 6.796 0 0 1 4.825-1.988c1.824 0 3.536.706 4.825 1.988a6.724 6.724 0 0 1 1.997 4.62.18.18 0 0 0 .182.176h1.364a.183.183 0 0 0 .182-.185 8.386 8.386 0 0 0-.671-3.126zm-7.88-5.193a3.897 3.897 0 0 1-2.764-1.14 3.853 3.853 0 0 1-1.146-2.749c0-1.038.407-2.015 1.146-2.75a3.897 3.897 0 0 1 2.765-1.14c1.044 0 2.026.405 2.765 1.14a3.853 3.853 0 0 1 1.146 2.75 3.853 3.853 0 0 1-1.146 2.75 3.897 3.897 0 0 1-2.765 1.14z"
                                    fill="#484848" />
                            </g>
                            <defs>
                                <clipPath id="xl40irzjfa">
                                    <path fill="#fff" d="M0 0h18v18H0z" />
                                </clipPath>
                            </defs>
                        </svg>
                    </NuxtLink>
                </div> -->
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
    const newValue = status || !state.isBackgroundVisible
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
            font-size: 20px;
            font-weight: bold;
            background-color: inherit;
            border: none;
            display: flex;
            align-items: center;
            padding: 0px;
            // min-height: 26px;
            margin: 0px;

            .brand__logo {
                width: 92px;
                height: 16px;
                // margin-right: 8px;
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

@media screen and (min-width: 991px) {


    #myHeader {

        .myHeader__container {
            max-width: calc(1320px - 24px);
            padding: 0px 100px;

            .container__top {
                width: unset;
                padding: 0px;
                height: 72px;
            }

            .navbar-brand {
                // min-height: 32px;
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
