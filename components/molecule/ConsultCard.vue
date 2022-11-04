<template>
    <div class="card">
        <div class="card__header">
            <slot name="header"></slot>
        </div>
        <hr class="card__line" />
        <div class="card__content">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    overflow: hidden;

    .card__header {
        padding: 10px;
        margin: 0;
        background-color: #5ea88e;
        color: white;
        font-size: 16px;
        line-height: 1.3;
        display: flex;
        align-items: center;
    }

    .card__line {
        margin: 0;
        border-color: #c4c4c4;
    }

    .card__content {
        background-color: white;
    }
}

@media screen and (min-width: 992px) {
    .card {
        .card__header {
            font-size: 22px;
            padding: 20px;
            font-weight: bold;
        }
    }
}
</style>