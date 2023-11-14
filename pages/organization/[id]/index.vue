<template>
    <div>
        {{ route.params }}
    </div>
</template>
<script setup>
const route = useRoute()
</script>