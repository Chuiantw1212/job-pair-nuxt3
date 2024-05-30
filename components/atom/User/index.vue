<template>
    <div class="userDropdown">
        <button class="userDropdown__btn" @click="isOpen = !isOpen">
            <img class="btn__icon" alt="avatar" :src="userImage">
        </button>
        <div class="userDropdown__layer" :class="{ 'userDropdown__layer--isOpen': isOpen }">
            <ul class="userDropdown__list">
                <li class="list__item">
                    <NuxtLink class="item__link" :to="{ 'name': 'user-profile' }">
                        個人檔案
                    </NuxtLink>
                </li>
                <li class="list__item">
                    <NuxtLink class="item__link" :to="{ 'name': 'user-consult-records' }">
                        生涯設計
                    </NuxtLink>
                </li>
                <li class="list__item">
                    登出
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const isOpen = ref(false)
const repoAuth = useRepoAuth()
const userImage = repoAuth.state.user.image
</script>
<style lang="scss" scoped>
.userDropdown {
    position: relative;

    .userDropdown__btn {
        background: inherit;
        border: none;

        .btn__icon {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            overflow: hidden;
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
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        background: var(--Grays-Quin, #FFF);
        padding: 0px;
        margin-top: 8px;

        .list__item {
            padding: 7px 14px;
            cursor: pointer;

            &:hover {
                background: var(--JP-Soft, #F5FFFB);
            }

            .item__link {
                text-decoration: none;
                color: black;
            }
        }
    }
}
</style>