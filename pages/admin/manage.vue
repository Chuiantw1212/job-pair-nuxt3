<template>
    <div class="dashboard" :class="{ container: device.state.isLarge }">
        <div :class="{ 'col-2': device.state.isLarge }">
            <ul class="dashboard__menu">
                <li class="menu__item">
                    <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                        :to="{ name: 'admin-manage-company' }">
                        <img class="item__link__icon" src="~/assets/company/Company.svg">
                        企業檔案
                    </NuxtLink>
                </li>
                <li class="menu__item">
                    <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                        :to="{ name: 'admin-manage-preference' }">
                        <img class="item__link__icon" src="~/assets/company/Preference.svg">
                        企業風格文化
                    </NuxtLink>
                </li>
                <li class="menu__item">
                    <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                        :to="{ name: 'admin-manage-account' }" @click="forceRouteTo('admin-manage-account')">
                        <img class="item__link__icon" src="~/assets/company/Resume.svg">
                        帳戶管理
                    </NuxtLink>
                </li>
                <li class="menu__item">
                    <NuxtLink class="menu__item__link" active-class="menu__item__link--active"
                        :to="{ name: 'admin-manage-topup' }">
                        <img class="item__link__icon" src="~/assets/company/Resume.svg">
                        儲值管理
                    </NuxtLink>
                </li>
            </ul>
            <NuxtLink v-if="!state.isNewCompay" class="dashboard__preview" :to="{ 'name': 'admin-design' }">
                <div class="preview__title">
                    <img src="~/assets/company/Verified.svg">
                    客製公司頁面
                </div>
                <div class="preview__desc">
                    體驗客製化頁面，製作獨一無二的公司頁面！
                </div>
                <AtomBtnSimpleV2 class="preview__btn" outline>
                    立即開始
                </AtomBtnSimpleV2>
            </NuxtLink>
        </div>
        <div class="dashboard__view" :class="{ 'col-10': device.state.isLarge }">
            <NuxtPage />
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
const router = useRouter()
const repoAuth = useRepoAuth()
const repoAdmin = useRepoAdmin()
const state = reactive({
    isNewCompay: false,
})
watch(() => repoAuth.state.user, () => {
    initializeCompanyInfo()
}, { immediate: true })
// methods
async function initializeCompanyInfo() {
    // 生成本地端company資料
    const { user } = repoAuth.state
    if (!user || !user.id || state.companyInfo?.id) {
        return
    }
    // Load from store
    if (!repoAuth.state.company) {
        const companyRes = await repoAdmin.getAdminCompany()
        if (companyRes.status !== 200) {
            return
        }
        if (companyRes.data === false) {
            // 尚未註冊導回註冊畫面
            router.replace(`/admin/register`)
            state.isNewCompay = true
        }
    }
}
function forceRouteTo() {
    router.push({
        name: 'admin-manage-account'
    })
}
</script>
<style lang="scss" scoped>
.dashboard {
    padding: 20px 0;

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
        height: 57px;
        width: 100%;

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

    .dashboard__preview {
        border-radius: 10px;
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        background: var(--Grays-Quin, #FFF);
        padding: 20px;
        margin-top: 10px;
        display: block;
        text-decoration: none;

        &:hover {
            border: 1px solid var(--JP-Prim, #5EA88E);
        }

        .preview__title {
            color: var(--Grays-Prim, #222);

            /* H3-20-Medium */
            font-family: "PingFang TC";
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            display: flex;
            gap: 5px;
        }

        .preview__desc {
            color: var(--Grays-Prim, #222);

            /* SPAN-14-Regular */
            font-family: "PingFang TC";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            /* 157.143% */
        }

        .preview__btn {
            margin-top: 20px;
            width: 100%;
        }
    }
}

@media screen and (min-width: 992px) {
    .dashboard {
        display: flex;
        gap: 30px;
        padding: 70px 0;


        .dashboard__menu {
            bottom: unset;
            flex-direction: column;
            gap: 10px;
            padding: 30px;
            height: unset;
            position: relative;
            z-index: 1;
            border-radius: 6px;
            border: 1px solid #EDEAEA;
            width: 100%;

            .menu__item {
                .menu__item__link {
                    justify-content: flex-start;
                    gap: 10px;
                }
            }
        }
    }
}
</style>