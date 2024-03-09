<template>
    <AtomInputText v-model="localValue" :name="name" :types="['english', 'number']" :required="required"
        :validate="validateTaiwanUid">

    </AtomInputText>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    RegionToDecimal: {
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        G: 16,
        H: 17,
        I: 34,
        J: 18,
        K: 19,
        L: 20,
        M: 21,
        N: 22,
        O: 35,
        P: 23,
        Q: 24,
        R: 25,
        S: 26,
        T: 27,
        U: 28,
        V: 29,
        W: 32,
        X: 30,
        Y: 31,
        Z: 33
    }
})
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: '身分證號碼'
    },
    required: {
        type: Boolean,
        default: false,
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
// methods
function validateTaiwanUid(inputValue = '') {
    const taiwanUidRegex = /^[A-Z]{1}[1-2]${1}[0-9]${8}$/
    const isRegexCorrect = taiwanUidRegex.test(inputValue)
    if (!isRegexCorrect) {
        return `格式錯誤`
    }
    // 計算末碼的檢查號碼
    const firstChar = String(inputValue[0]).toUpperCase()
    const otherChars = inputValue.slice(1, inputValue.length)
    const moduleNumber = state.RegionToDecimal[firstChar]
    const uidDecimals = `${moduleNumber}${otherChars}`
    const weightForEachDecimals = `1987654321`
    // check sum
    let sum = 0
    Array.from(weightForEachDecimals).forEach((weight, index) => {
        const decimal = uidDecimals[index]
        sum += Math.floor(Number(decimal) * Number(weight))
    })
    const checkDigit = Number(uidDecimals[uidDecimals.length - 1])
    sum += checkDigit
    // 整除為合法Id
    const remains = sum % 10
    return !remains
}
</script>