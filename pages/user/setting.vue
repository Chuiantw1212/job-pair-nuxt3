<template>
    <div class="setting">
        <h1 class="setting__header">設定</h1>
        <hr class="setting__hr">
        <div class="setting__card">
            <h2 class="card__header">通知</h2>
            <div class="card__subGroup">
                <LazyAtomInputCheckSingle class="subGroup__item" v-model="profileBroadcast.isActive" name="訂閱適合工作">
                    <span class="isActive__desc">若有適合的職缺，請讓企業主發職缺邀請給我參考</span>
                </LazyAtomInputCheckSingle>
                <LazyAtomInputCheckSingle class="subGroup__item" v-model="profileBroadcast.isSubscribed" name="EDM訂閱">
                    <span class="isActive__desc">職涯講座活動與功能更新資訊（每週不超過一封）</span>
                </LazyAtomInputCheckSingle>
            </div>
            <LazyAtomBtnSimpleV2 @click="handleSubmitBroadcast()">儲存</LazyAtomBtnSimpleV2>
        </div>
        <div class="setting__card setting__card--mt">
            <h2 class="card__header">帳號</h2>
            <div class="card__desc">刪除帳號</div>
            <!-- <LazyOrganismDeleteModal class="managemement__others"></LazyOrganismDeleteModal> -->
            <LazyAtomBtnSimpleV2 :style="{ 'width': '140px' }" @click="showSecondConfirm()" outline>永久刪除帳號
            </LazyAtomBtnSimpleV2>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $sweet, $requestSelector, $validate, } = useNuxtApp()
const profileBroadcast = reactive({})
const state = reactive({
    bsModal: null,
})
const router = useRouter()
const repoUser = useRepoUser()
const repoAuth = useRepoAuth()
const repoAdmin = useRepoAdmin()
// hooks
watch(() => repoAuth.state.user, (newValue, oldValue) => {
    if (newValue && !oldValue) {
        initialize()
    }
}, { immediate: true })
// methods
function initialize() {
    const { user = '' } = repoAuth.state
    if (!user) {
        return
    }
    profileBroadcast.isActive = user.isActive
    profileBroadcast.isSubscribed = user.isSubscribed
}
async function handleSubmitBroadcast() {
    const dom = document.querySelector(`#profileBroadcast`)
    const result = await $validate(dom)
    if (!result.isValid) {
        return
    }
    // 再更新個人資料
    await repoUser.patchUserProfile(profileBroadcast)
    const patchedUser = Object.assign({}, repoAuth.state.user, profileBroadcast)
    repoAuth.setUser(patchedUser)
    $sweet.succeed()
}
async function logout() {
    repoAuth.userSignout()
    router.push({
        name: "index",
    })
}
function openModal() {
    state.bsModal.show()
}
function hideModal() {
    state.bsModal.hide()
}
async function showSecondConfirm() {
    const isConfirmed = await $sweet.alert('此動作無法復原。您確定要這麼做嗎？', {
        title: '確定要刪除嗎',
        icon: 'warning',
        confirmButtonText: '是的, 確定刪除',
        confirmButtonColor: '#dd5747',
        showCancelButton: true,
        cancelButtonText: '取消',
    })
    if (!isConfirmed.value) {
        return
    }
    hideModal()
    // 執行刪除流程
    $sweet.loader(true)
    switch (repoAuth.state.user.type) {
        case 'employee': {
            const res = await repoUser.deleteUser()
            if (res.status === 200) {
                repoAuth.userSignout()
                router.push({
                    name: 'index',
                })
                // 刪除帳號後重新整理避免Firebase資料快取
                setTimeout(() => {
                    if (process.client) {
                        location.reload()
                    }
                }, 300)
            }
            break;
        }
        case 'admin': {
            const res = await repoAdmin.deleteAdminCompany()
            if (res.status === 200) {
                repoAuth.userSignout()
                router.push({
                    name: 'admin',
                })
                // 刪除帳號後重新整理避免Firebase資料快取
                setTimeout(() => {
                    if (process.client) {
                        location.reload()
                    }
                }, 300)
            }
            break;
        }
        default:
            console.log('delete user type exception')
            break;
    }
}
</script>
<style lang="scss" scoped>
.setting {
    padding: 20px;

    .setting__header {
        color: var(--Grays-Prim, #222);

        /* Title/H1-36-Semibold */
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
        /* 100% */
    }

    .setting__hr {
        border-top: 0px;
        opacity: 1;
        border-bottom: 1px solid var(--Grays-Quat, #EDEAEA);
        margin: 30px 0px;
    }

    .setting__card {
        padding: 20px;
        display: flex;
        padding: 20px;
        flex-direction: column;
        gap: 30px;
        align-self: stretch;
        border-radius: 10px;
        background: var(--Grays-Quin, #FFF);

        .card__header {
            color: var(--Grays-Seco, #484848);

            /* H3-16-Medium */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }

        .card__subGroup {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .card__desc {
            color: var(--Grays-Seco, #484848);

            /* P-16-Rugular */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 26px;
            /* 162.5% */
        }
    }

    .setting__card--mt {
        margin-top: 40px;
    }

    .setting__btn {
        margin-top: 40px;
        width: 100%;
    }
}

@media screen and (min-width:996px) {
    .setting {
        padding: 0px;
        padding-left: 30px;
        padding-bottom: 70px;

        .setting__card {
            .card__subGroup {
                flex-direction: row;

                .subGroup__item {
                    width: 100%;
                }
            }
        }
    }
}
</style>