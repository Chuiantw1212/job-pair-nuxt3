<template>
    <div class="statusCard">
        <div class="statusCard__header">
            <slot name="header"></slot>
        </div>
        <div class="statusCard__body" :style="bodyStyle">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'jobCard',
    props: {
        bodyStyle: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
}
</script>
<style lang="scss" scoped>
.statusCard {
    height: 100%;

    .statusCard__header {
        background-color: #4bc49a;
        color: white;
        display: flex;
        align-items: center;
        padding: 15px 20px;
        line-height: 1.3;
    }

    .statusCard__body {
        overflow-y: auto;
        border: solid 1px #d3d3d3;
        background-color: white;
    }
}

@media screen and (min-width: 992px) {
    .statusCard {
        .statusCard__header {
            border-radius: 10px 10px 0px 0px;
            padding: 16px;
        }

        .statusCard__body {
            overflow-y: auto;
            border-radius: 0px 0px 10px 10px;
            height: calc(100% - 64px);
        }
    }
}
</style>