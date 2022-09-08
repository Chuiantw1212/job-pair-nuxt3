<template>
    <div>
        <div v-for="(item, key) in items" :key="key">
            <label>
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