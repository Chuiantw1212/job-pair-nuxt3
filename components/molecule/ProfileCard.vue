<template>
    <div class="profile__card">
        <div class="card__header">
            {{ name }}
        </div>
        <hr class="card__line" />
        <div class="card__body">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
defineProps({
    name: {
        type: String,
        default: "標題",
    },
})
</script>
<style lang="scss" scoped>
.profile__card {
    background-color: white;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

    .card__header {
        background-color: #5ea88e;
        padding: 16px 20px;
        font-size: 18px;
        font-weight: bold;
        color: white;
    }

    .card__line {
        margin: 0;
    }

    .card__body {
        padding: 20px;
    }
}

@media screen and  (min-width: 992px) {
    .profile__card {
        border-radius: 10px;

        .card__header {
            border-radius: 10px 10px 0 0;
        }
    }
}
</style>