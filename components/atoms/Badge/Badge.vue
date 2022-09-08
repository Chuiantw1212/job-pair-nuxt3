<template>
    <div class="badge">
        <img class="badge__icon" src="./icons/triangle.svg" />
        <span class="badge__desc">{{ message }}</span>
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "",
        },
    },
}
</script>
<style lang="scss" scoped>
.badge {
    // background-color: rgba(240, 61, 62, 0.3);
    border-radius: 10px;
    padding: 8px 16px;
    .badge__icon {
        margin-right: 4px;
    }
    .badge__desc {
        margin-left: 4px;
    }
}
</style>