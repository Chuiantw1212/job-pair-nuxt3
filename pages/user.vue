<template>
    <div class="dashboard" :class="{ container: device.state.isLarge }">
        <div :class="{ row: device.state.isLarge }">
            <div class="dashboard__menuMobile">
                <ul class="menu__content">
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active" to="/user/profile">
                            <img class="item__link__icon" src="~/assets/user/Resume.svg" />
                            <div class="menu__item__text">個人檔案</div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            :to="{ 'name': 'user-applications' }">
                            <img class="item__link__icon" src="~/assets/user/Company.svg" />
                            <div class="menu__item__text">求職狀態</div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" :class="{ 'menu__item__link--active': checkConsultActive() }"
                            :to="{ 'name': 'user-jobs' }">
                            <img class="item__link__icon" src="~/assets/user/Compare.svg" />
                            <div class="menu__item__text">職缺比較</div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            to="/user/preference">
                            <img class="item__link__icon" src="~/assets/user/Preference.svg" />
                            <div class="menu__item__text">求職偏好</div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="dashboard__menuDesktop d-none d-lg-block col-2">
                <div class="menu__avatar" :style="{ 'background-image': `url(${state.profileBasic?.image})` }"></div>
                <div class="menu__name">
                    {{ repoAuth.state.user?.name }}
                </div>
                <hr class="menu__hr">
                <ul class="menu__list">
                    <li class="list__item">
                        <img class="item__image" src="@/assets/user/profile/Resume.svg">
                        <NuxtLink class="item__link" :to="{ name: 'user-profile' }">我的履歷</NuxtLink>
                    </li>
                    <li class="list__item">
                        <img class="item__image" src="@/assets/user/profile/Company.svg">
                        <NuxtLink class="item__link" :to="{ name: 'user-applications' }">求職狀態</NuxtLink>
                    </li>
                    <li class="list__item">
                        <img class="item__image" src="@/assets/user/profile/Compare.svg">
                        <NuxtLink class="item__link" :to="{ name: 'user-jobs' }">職缺比較</NuxtLink>
                    </li>
                    <li class="list__item">
                        <img class="item__image" src="@/assets/user/profile/Preference.svg">
                        <NuxtLink class="item__link" :to="{ name: 'user-preference' }">求職偏好</NuxtLink>
                    </li>
                </ul>
            </div>
            <NuxtPage class="col-lg-10" />
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
const route = useRoute()
const repoAuth = useRepoAuth()
const state = reactive({
    profileBasic: null,
})
watch(() => repoAuth.state.user, () => {
    initialize()
}, { immediate: true })
// methods
function checkConsultActive() {
    return route.path.includes('/user/consult')
}
function initialize() {
    const { user = '' } = repoAuth.state
    if (!user) {
        return
    }
    const profile = JSON.parse(JSON.stringify(user))
    // profileBasic
    const {
        image,
        name = '',
        email = '',
        telephone = '',
        occupationalCategory = [],
        description = '',
        employmentType,
    } = profile
    const profileBasic = {
        image,
        name,
        email,
        telephone,
        occupationalCategory,
        description,
        employmentType,
    }
    state.profileBasic = profileBasic
}

</script>
<style lang="scss" scoped>
.dashboard {

    .dashboard__menuMobile {
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
                width: 25%;

                .menu__item__link {
                    padding: 15px 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--Grays-Tert, #A6A6A6);
                    text-align: center;
                    /* H5-12-Medium */
                    font-family: "PingFang TC";
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    gap: 5px;

                    text-decoration: none;

                    &:hover {
                        color: #5ea88e;

                        .item__link__icon {
                            filter: grayscale(0);
                        }
                    }

                    .item__link__icon {
                        transition: all 0.3s;
                        filter: grayscale(1);
                        width: 18px;
                        height: 18px;
                    }
                }

                .menu__item__link--active {
                    color: #5ea88e;

                    .item__link__icon {
                        filter: grayscale(0);
                    }
                }

                .menu__item__text {
                    white-space: nowrap;
                }
            }
        }


    }

}

@media screen and (min-width: 992px) {
    .dashboard {
        padding-top: 70px;

        .dashboard__menuMobile {
            display: none;
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

        .dashboard__menuDesktop {
            border-radius: 6px;
            border: 1px solid var(--Grays-Quat, #EDEAEA);
            background: var(--Grays-Quin, #FFF);
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            padding: 30px;

            .menu__avatar {
                width: 120px;
                height: 120px;
                background-size: cover;
                background-position: center;
                border-radius: 50%;
                margin: auto;
            }

            .menu__name {
                color: var(--svGrays-Prim-Light, var(--Grays-Prim, #222));
                font-family: "PingFang TC";
                font-size: 18px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                margin-top: 10px;
            }

            .menu__hr {
                border-top: 0px;
                border-bottom: 1px solid var(--Grays-Quat, #EDEAEA);
                opacity: 1;
                margin: 30px 0px;
            }

            .menu__list {
                padding: 0px;
                margin: 0px;
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 30px;

                .list__item {
                    display: flex;
                    align-items: center;
                    // justify-content: center;
                    gap: 10px;

                    &:hover {
                        .item__link {
                            color: var(--JP-Prim, #5EA88E);
                        }

                        .item__image {
                            filter: unset;
                        }
                    }

                    .item__image {
                        filter: grayscale(100%);
                    }

                    .item__link {
                        color: var(--JP-Prim, #484848);

                        /* Title/H2-20-Regular */
                        font-family: "PingFang TC";
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        text-decoration: none;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>