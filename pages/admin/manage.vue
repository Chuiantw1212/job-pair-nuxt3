<template>
    <div class="dashboard" :class="{ container: device.state.isDesktop }">
        <div :class="{ row: device.state.isDesktop }">
            <div class="dashboard__menu">
                <ul class="menu__content">
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            :to="`/admin/manage/company`">
                            <div class="menu__item__text">企業檔案</div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            :to="`/admin/manage/account`">
                            <div class="menu__item__text">帳戶管理</div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="dashboard__view" :class="{ col: device.state.isDesktop }">
            <NuxtPage></NuxtPage>
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
</script>
<style lang="scss" scoped>
.dashboard {
    .dashboard__view {
        padding: 20px 0;
    }

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
                    margin-top: 4px;
                }
            }
        }


    }
}

@media screen and (min-width: 992px) {
    .dashboard {


        .dashboard__menu {
            min-height: 64px;

            .menu__content {
                top: 61px !important;
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