<template>
    <div class="userDropdown" ref="menuDiv">
        <button class="userDropdown__btn" :class="{ 'userDropdown__btn--isOpen': isOpen }" @click="isOpen = !isOpen">
            <div v-if="repoAuth.state.user?.image" class="btn__avatar"
                :style="{ 'background-image': `url(${repoAuth.state.user?.image})` }">
            </div>
            <div v-else class="btn__avatar" :style="{ 'background-image': `url(${avatarImage})` }">

            </div>
            <img class="btn__arrow" src="./Down.svg">
        </button>
        <div class="userDropdown__layer" :class="{ 'userDropdown__layer--isOpen': isOpen }">
            <ul class="userDropdown__list">
                <li class="list__item">
                    <NuxtLink class="item__link" :to="{ 'name': 'user-profile' }" @click="isOpen = false">
                        個人檔案
                    </NuxtLink>
                </li>
                <li class="list__item">
                    <NuxtLink class="item__link" :to="{ 'name': 'user-consult-records' }" @click="isOpen = false">
                        生涯設計
                    </NuxtLink>
                </li>
                <li class="list__item">
                    <NuxtLink class="item__link" :to="{ 'name': 'user-setting' }" @click="isOpen = false">
                        設定
                    </NuxtLink>
                </li>
                <li class="list__item">
                    <button class="item__link" @click="logout()">
                        登出
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import avatarImage from '@/assets/user/Avatar.svg'
const isOpen = ref(false)
const router = useRouter()
const repoAuth = useRepoAuth()
// hooks
onMounted(() => {
    toggleClickOutside(true)
})
onBeforeUnmount(() => {
    toggleClickOutside(false)
})
const menuDiv = ref(null)
// methods
function toggleClickOutside() {
    if (!process.client) {
        return
    }
    if (menuDiv) {
        document.addEventListener("click", handleClickoutSide)
    } else {
        document.removeEventListener("click", handleClickoutSide)
    }
}
function handleClickoutSide(event) {
    const area = menuDiv.value
    if (!area.contains(event.target)) {
        isOpen.value = false
    }
}
async function logout() {
    repoAuth.userSignout()
    router.push({
        name: 'index',
    })
}
</script>
<style lang="scss" scoped>
.userDropdown {
    position: relative;

    .userDropdown__btn {
        background: inherit;
        border: none;
        display: flex;
        gap: 5px;
        align-items: center;

        .btn__avatar {
            width: 42px;
            height: 42px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 50%;
            overflow: hidden;
        }

        .btn__arrow {
            transition: all 0.3s;
        }
    }

    .userDropdown__btn--isOpen {
        .btn__arrow {
            transform: translateY(-1);
        }
    }

    .userDropdown__layer {
        max-height: 0px;
        transition: all 0.3s;
        overflow: hidden;
        position: absolute;
        right: 0px;
        width: 140px;
    }

    .userDropdown__layer--isOpen {
        max-height: 100vh;
    }

    .userDropdown__list {
        list-style: none;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        background: var(--Grays-Quin, #FFF);
        padding: 0px;
        margin-top: 8px;

        .list__item {
            cursor: pointer;
            display: block;

            &:hover {
                background: var(--JP-Soft, #F5FFFB);
            }

            .item__link {
                display: block;
                padding: 7px 14px;
                text-decoration: none;
                color: black;
                background: inherit;
                border: none;
                width: 100%;
                text-align: left;
            }
        }
    }
}
</style>