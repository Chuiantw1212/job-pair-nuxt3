<template>
    <div class="tabsGroup">
        <div class="tabsGroup__lineHidder"></div>
        <ul class="tabs">
            <li v-for="(item, index) in items" :key="index" class="tabs__item">
                <button class="item__content" @click="handleScroll(item)">
                    {{ item.text }}
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            default: function () {
                return []
            },
        },
    },
    methods: {
        handleScroll(item) {
            const targetDom = document.querySelector(item.value)
            if (targetDom) {
                targetDom.scrollIntoView()
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.tabsGroup {
    position: relative;
}

.tabs {
    display: flex;
    list-style: none;
    padding: 9px 16px;
    justify-content: space-between;
    margin: 0;
    background-color: #f9f9f9;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    .tabs__item {
        width: 100%;

        .item__content {
            width: 100%;
            white-space: nowrap;
            font-size: 15px;
            transition: all 0.3s;
            border: none;
            background-color: #f9f9f9;
            color: #5ea88e;
            border-bottom: 2px solid #f9f9f9;
        }

        .item__content--active {
            border-bottom: 2px solid #5ea88e;
        }
    }
}
</style>