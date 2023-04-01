<template>
    <div class="dashboard" :class="{ container: device.state.isDesktop }">
        <div :class="{ row: device.state.isDesktop }">
            <div class="dashboard__menu">
                <ul class="menu__content">
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active" to="/admin/recruit/jobs">
                            <img class="item__link__icon" src="~/assets/admin/icon_nav_profile.svg">
                            <div class="menu__item__text">
                                職缺管理
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="menu__item">
                        <template v-if="checkApplicationEnabled()">
                            <NuxtLink class="menu__item__link" :class="{ 'menu__item__link--active': checkActiveClass() }"
                                to="/admin/recruit/applied">
                                <img class="item__link__icon" src="~/assets/admin/icon_job.svg">
                                <div class="menu__item__text">應徵者
                                    <span class="menu__item__badge">
                                        {{ getUnhandledNumber() }}
                                    </span>
                                </div>
                            </NuxtLink>
                        </template>
                        <template v-else>
                            <div class="menu__item__link menu__item__link--noHover">
                                <img class="item__link__icon" src="~/assets/admin/icon_job_disabled.svg">
                                <div class="menu__item__text">應徵者</div>
                            </div>
                        </template>
                    </li>
                    <li class="menu__item">
                        <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                            to="/admin/recruit/prospect">
                            <img class="item__link__icon" src="~/assets/admin/icon_consult.svg">
                            <div class="menu__item__text">潛在合適人選</div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="dashboard__view" :class="{ col: device.state.isDesktop }">
            <NuxtPage v-model="state.appliedList"></NuxtPage>
        </div>
    </div>
</template>
<script setup>
const { $sweet } = useNuxtApp()
const device = useDevice()
const repoAuth = useRepoAuth()
const repoCompany = useRepoCompany()
const repoJobApplication = useRepoJobApplication()
const route = useRoute()
const state = reactive({
    appliedList: [],
})
// hooks
watch(() => repoAuth.state.company, (company) => {
    initialize()
}, { immediate: true })
// methods
function checkActiveClass() {
    return route.path.includes('/admin/recruit/applied')
}
function getUnhandledNumber() {
    const unhandledItems = state.appliedList.filter(item => {
        return ['applied'].includes(item.applyFlow)
    })
    return unhandledItems.length
}
function checkApplicationEnabled() {
    if (!repoAuth.state.company || !state.appliedList) {
        return
    }
    return repoAuth.state.company.hasActiveJobs || state.appliedList.length
}
async function initialize() {
    const { company } = repoAuth.state
    if (!company) {
        return
    }
    const response = await repoJobApplication.getApplicationByQuery({
        organizationId: company.id,
        applyFlow: ['applied', 'notified', 'rejected']
    })
    state.appliedList = response.data
    await repoCompany.getCompanyJobs({
        organizationId: company.id,
        orderBy: 'datePosted',
    })
}
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
                    border: 3px solid rgba(0, 0, 0, 0);
                    text-align: center;
                    white-space: nowrap;

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

                .menu__item__link--noHover {
                    &:hover {
                        color: #6c6c6c;
                        border: 3px solid rgba(0, 0, 0, 0);

                        .item__link__icon {
                            filter: grayscale(1);
                        }
                    }

                    .menu__item__text {
                        color: lightgrey;
                    }
                }

                .menu__item__link--active {
                    color: #5ea88e;
                    border-bottom: 3px solid #5ea88e;

                    .item__link__icon {
                        filter: grayscale(0);
                    }
                }

                .menu__item__link--disabled {
                    display: block;
                    padding: 6px 12px;
                    text-decoration: none;
                    transition: all 0.3s;
                    border: 2px solid rgba(0, 0, 0, 0);
                    text-align: center;
                    background-color: inherit;
                    color: lightgrey;
                }

                .menu__item__text {
                    margin-top: 4px;
                    display: flex;
                    align-items: center;

                }

                .menu__item__badge {
                    width: 20px;
                    height: 20px;
                    background-color: #5ea88e;
                    color: white;
                    border-radius: 50%;
                    display: block;
                    line-height: 20px;
                    font-size: 16px;
                    margin-left: 8px;
                    line-height: 1;
                    text-align: center;
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

                    // .menu__item__link--noHover {
                    //     display: flex;
                    //     align-items: center;
                    //     padding: 18px 0;
                    // }

                    .menu__item__link--disabled {
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