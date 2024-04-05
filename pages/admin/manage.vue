<template>
    <div class="dashboard" :class="{ container: device.state.isLarge }">
        <div :class="{ 'col-2': device.state.isLarge }">
            <ul class="dashboard__menu">
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
        <div class="dashboard__view" :class="{ 'col-10': device.state.isLarge }">
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
    padding: 20px 0;
    // .dashboard__view {
    // }

    .dashboard__menu {
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
        // box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
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

@media screen and (min-width: 992px) {
    .dashboard {
        display: flex;
        gap: 30px;


        .dashboard__menu {
            bottom: unset;
            max-width: 160px;
            flex-direction: column;
            gap: 10px;
            padding: 30px;
            height: unset;
            position: relative;
            z-index: 1;
            border-radius: 6px;
            border: 1px solid #EDEAEA;

            .menu__item {
                .menu__item__link {
                    justify-content: flex-start;
                    gap: 10px;
                }
            }
        }
    }
}

@media screen and (min-width: 1200px) {
    .dashboard {
        .dashboard__menu {
            max-width: 190px;
        }
    }
}

@media screen and (min-width: 1400px) {
    .dashboard {
        .dashboard__menu {
            max-width: 220px;
        }
    }
}
</style>