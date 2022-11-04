<template>
    <div class="inputRadio">
        <div v-if="name">
            {{ name }}
        </div>
        <div class="inputRadio__body">
            <label v-for="(item, key) in items" :key="key">
                <input v-model="localValue" :value="item.value" type="radio" />
                {{ item.text }} </label><br />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: {
            default: null
        },
        items: {
            type: Array,
            default: function () {
                return []
            },
        },
        itemText: {
            type: String,
            default: "text",
        },
        itemValue: {
            type: String,
            default: "value",
        },
        name: {
            type: String,
            default: ''
        }
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit("update:modelValue", newValue)
            },
        },
    },
}
</script>
<style lang="scss" scoped>
.inputRadio {
    .inputRadio__body {
        display: flex;
        gap: 8px;
    }
}
</style>