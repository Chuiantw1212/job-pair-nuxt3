<template>
    <div class="dashboard" :class="{ container: device.state.isLarge }">
        <div :class="{ row: device.state.isLarge }">
            <div class="dashboard__menu">
                <ul class="menu__content">
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active" to="/user/profile">
                            <img class="item__link__icon" src="~/assets/user/icon_nav_profile.svg" />
                            <div class="menu__item__text">個人檔案</div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active" to="/user/jobs">
                            <img class="item__link__icon" src="~/assets/user/icon_Heart.svg" />
                            <div class="menu__item__text">求職狀態</div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" :class="{ 'menu__item__link--active': checkConsultActive() }"
                            to="/user/consult/records">
                            <img class="item__link__icon" src="~/assets/user/icon_consult.svg" />
                            <div class="menu__item__text">職涯諮詢</div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            to="/user/preference">
                            <img class="item__link__icon" src="~/assets/user/icon_job.svg" />
                            <div class="menu__item__text">求職偏好</div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <NuxtPage />
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
const route = useRoute()
function checkConsultActive() {
    return route.path.includes('/user/consult')
}
</script>
<style lang="scss" scoped>
.dashboard {

    .dashboard__menu {
        .menu__content {
            background-color: #f8f9fa;
            display: flex;
            list-style-type: none;
            padding: 0;
            justify-content: space-around;
            position: fixed;
            width: 100%;
            bottom: 0;
            z-index: 1040;
            margin-bottom: 0;
            border-top: 1px solid #c4c4c4;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

            .menu__item {
                .menu__item__link {
                    display: block;
                    padding: 6px 12px;
                    text-decoration: none;
                    color: #6c6c6c;
                    transition: all 0.3s;
                    border: 2px solid rgba(0, 0, 0, 0);
                    text-align: center;

                    &:hover {
                        color: #5ea88e;
                        border-bottom: 3px solid #5ea88e;

                        .item__link__icon {
                            filter: grayscale(0);
                        }
                    }

                    .item__link__icon {
                        transition: all 0.3s;
                        filter: grayscale(1);
                    }
                }

                .menu__item__link--active {
                    color: #5ea88e;
                    border-bottom: 3px solid #5ea88e;

                    .item__link__icon {
                        filter: grayscale(0);
                    }
                }

                .menu__item__text {
                    white-space: nowrap;
                    margin-top: 4px;
                }
            }
        }


    }

}

@media screen and (min-width: 992px) {
    .dashboard {
        .dashboard__menu {
            min-height: 65px;

            .menu__content {
                top: 72px !important;
                left: 0;
                bottom: unset;
                border-top: unset;
                justify-content: center;
                gap: 60px;

                .menu__item {
                    .menu__item__link {
                        display: flex;
                        align-items: center;
                        padding: 18px 0;
                    }

                    .menu__item__text {
                        margin-top: 0;
                        margin-left: 8px;
                    }
                }
            }
        }
    }
}
</style>