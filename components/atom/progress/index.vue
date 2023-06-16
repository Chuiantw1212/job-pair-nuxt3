<template>
    <div class="custom-progress">
        <hr class="progress__line" />
        <ul class="progress__list">
            <li v-for="(item, index) in items" :key="index" class="progress__item">
                <div class="progress__item__content">
                    <div class="item__content__badge" :class="{ 'item__content__badge--active': checkIsActive(index) }">
                        <img class="badge__icon" src="./icon_Check.svg" />
                    </div>
                    {{ item.text }}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'question-progress',
}
</script>
<script setup>
const route = useRoute()
const props = defineProps({
    items: {
        type: Array,
        default: function () {
            return [
                {
                    text: '求職偏好',
                    name: 'questions-preference'
                },
                {
                    text: '個人資料',
                    name: 'questions-profile'
                },
                {
                    text: '註冊結果',
                    name: 'questions-result'
                }
            ]
        }
    }
})
const questionId = computed({
    get() {
        return route.params.id || 0
    }
})
// methods
function checkIsActive(itemIndex) {
    const currentRouteName = route.name
    const currentIndex = props.items.findIndex(item => {
        return item.name === currentRouteName
    })
    if (currentIndex !== -1) {
        return itemIndex <= currentIndex
    }
}
</script>
<style lang="scss" scoped>
.custom-progress {
    position: relative;
    margin-bottom: 18px;
    // max-width: 248px;

    .progress__line {
        position: absolute;
        width: calc(101% - 45px);
        top: 12px;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
    }

    .progress__list {
        display: flex;
        list-style: none;
        padding: 0;
        width: 100%;
        justify-content: space-between;
        position: relative;

        .progress__item {
            .progress__item__content {
                text-align: center;
                color: #999999;
                font-size: 13px;

                .item__content__badge {
                    width: 24px;
                    height: 24px;
                    background-color: #c4c4c4;
                    position: relative;
                    border-radius: 50%;
                    margin: auto auto 12px auto;

                    .badge__icon {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }

                .item__content__badge--active {
                    background-color: #5ea88e;
                }
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .custom-progress {
        // max-width: 480px;

        .progress__list {
            .progress__item {
                .progress__item__content {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>