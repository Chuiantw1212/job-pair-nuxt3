<template>
    <div class="userDropdown">
        <img src="./Ellipse.png">
        <div>
            <ul class="userDropdown__list">
                <li class="list__item">個人檔案</li>
                <li class="list__item">生涯設計</li>
                <li class="list__item">設計</li>
                <li class="list__item">登出</li>
            </ul>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.userDropdown {
    .userDropdown__list {
        list-style: none;
        border-radius: 10px;
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        background: var(--Grays-Quin, #FFF);
        padding: 0px;

        .list__item {
            padding: 7px 14px;
            cursor: pointer;

            &:hover {
                background: var(--JP-Soft, #F5FFFB);
            }
        }
    }
}
</style>