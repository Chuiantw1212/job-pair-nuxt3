<template>
    <div class="input__admin">
        <ul class="admin__list">
            <li v-for="(item, index) in modelValue" class="list__item" :key="index">
                <img v-if="item.image" class="item__image" :src="item.image">
                <img v-else class="item__image" src="./User.svg">
                <div class="item__body">
                    <div>{{ item.email }}</div>
                    <div v-if="item.dateCreated">加入日期 {{ $filter.date(item.dateCreated) }}</div>
                </div>
                <button v-if="modelValue.length > 1" class="item__remove" @click="emit('remove', item)">
                    <img src="./Trash.svg">
                </button>
            </li>
        </ul>
    </div>
</template>
<script setup>
const emit = defineEmits(['remove'])
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    }
})
</script>
<style lang="scss" scoped>
.input__admin {
    .admin__list {
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        flex-direction: column;
        gap: 10px;

        .list__item {
            border-radius: 10px;
            overflow: hidden;
            align-items: center;
            display: flex;
            padding: 10px 20px;
            gap: 20px;
            background: #EDEAEA;

            .item__image {
                width: 20px;
                height: 20px;
            }

            .item__body {
                width: 100%;
                color: #222;
                font-family: "PingFang TC";
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }

            .item__remove {
                background-color: inherit;
                border: none;
            }
        }
    }
}
</style>