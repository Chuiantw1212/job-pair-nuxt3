<template>
    <div class="dashboard" :class="{ container: device.state.isLarge }">
        <div :class="{ row: device.state.isLarge }">
            <div class="dashboard__menu">
                <ul class="menu__content">
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            :to="{ name: 'admin-manage-company' }">
                            <img class="item__link__icon" src="@/assets/company/Company.svg">
                            企業檔案
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            :to="{ name: 'admin-manage-account' }">
                            <img class="item__link__icon" src="@/assets/company/Resume.svg">
                            帳戶管理
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="dashboard__view" :class="{ col: device.state.isLarge }">
            <NuxtPage />
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
definePageMeta({
    redirect: () => {
        return { name: 'admin-manage-company' }
    },
})
</script>
<style lang="scss" scoped>
.dashboard {
    .dashboard__view {
        padding: 20px 0;
    }

    .dashboard__menu {
        .menu__content {
            background-color: #FFF;
            display: flex;
            list-style-type: none;
            padding: 0;
            justify-content: space-around;
            position: fixed;
            width: 100%;
            bottom: 0;
            z-index: 1040;
            margin-bottom: 0;
            border-top: 1px solid #EDEAEA;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
            height: 57px;

            .menu__item {
                height: 100%;
                width: 100%;

                .menu__item__link {
                    justify-content: center;

                    display: flex;
                    align-items: center;
                    height: 100%;
                    text-decoration: none;
                    color: #6c6c6c;
                    transition: all 0.3s;
                    text-align: center;

                    .item__link__icon {
                        transition: all 0.3s;
                        filter: grayscale(1);
                        margin-right: 4px;
                    }

                    &:hover {
                        color: #5ea88e;

                        .item__link__icon {
                            filter: grayscale(0);
                        }
                    }
                }

                .menu__item__link--active {
                    color: #5ea88e;

                    .item__link__icon {
                        filter: grayscale(0);
                    }
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

                }
            }

        }
    }
}
</style>