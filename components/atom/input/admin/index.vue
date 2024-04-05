<template>
    <div class="input__admin">
        <ul class="admin__list">
            <li class="list__item">
                <img src="./User.svg">
                <div class="item__body">
                    <div>design@job-pair.co...</div>
                    <div>加入日期 2024-03-12</div>
                </div>
                <img src="./Trash.svg">
            </li>
            <li class="list__item">
                <img src="./User.svg">
                <div class="item__body">
                    <div>design@job-pair.co...</div>
                    <div>加入日期 2024-03-12</div>
                </div>
                <img src="./Trash.svg">
            </li>
        </ul>
        <button class="admin__add">新增管理員</button>
    </div>
</template>
<script setup>
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    }
})
</script>
<style lang="scss " scoped>
.input__admin {
    
    .admin__list {
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        flex-direction: column;
        gap:10px;
        .list__item {
            border-radius: 10px;
            overflow: hidden;
            align-items: center;
            display: flex;
            padding: 10px 20px;
            gap: 20px;
            background: #EDEAEA;
            .item__body {
                width: 100%;
                color: #222;
                font-family: "PingFang TC";
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }
        }
    }

    .admin__add {
        border-radius: 10px;
        border: 1px dashed #A6A6A6;
        margin-top: 30px;
        padding: 10px 0px;
        width: 100%;
        background-color: white;
        color: #000;
        font-family: "PingFang TC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
    }

}
</style>