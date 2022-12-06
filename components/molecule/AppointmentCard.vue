<template>
    <div class="card">
        <div class="card__header">
            <div class="header__hl"></div>
            <slot name="header"></slot>
        </div>
        <div class="card__body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'appointmentCard',
}
</script>
<style lang="scss" scoped>
.card {
    overflow: hidden;
    padding: 20px 0;
    border-radius: 0;

    .card__header {
        padding: 0px 20px;

        .header__hl {
            width: 5px;
            background-color: #4bc49a;
            height: 36px;
            margin-right: 10px;
        }

        margin: 0;
        color: #4bc49a;
        font-size: 16px;
        font-weight: normal;
        line-height: 1.3;
        display: flex;
        align-items: center;
    }

    .card__body {
        padding-top: 20px;
        background-color: white;
    }
}

@media screen and (min-width: 992px) {
    .card {
        .card__header {
            font-size: 22px;
        }
    }
}
</style>