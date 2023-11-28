<template>
    <LazyAtomBtnSimple class="modal__button" @click="showModal()">
        <slot></slot>
    </LazyAtomBtnSimple>
    <AtomModalFrame ref="modal">
        <template #header>
            SEO設定
        </template>
        <template #body>
            <LazyAtomInputText v-model="state.localValue.seoName" name="你的自訂網址" placeholder="可輸入你的公司名稱（僅限英文）"
                :types="['english']" required>
                <template #prefix>
                    <div class="input__prefix">jobpair.com/o/</div>
                </template>
            </LazyAtomInputText>
            <LazyAtomInputTextarea v-model="state.localValue.description" name="搜尋引擎描述" class="mt-2" rows="4" required>
            </LazyAtomInputTextarea>
        </template>
        <template #footer>
            <LazyAtomBtnSimple class="d-lg-none" @click="handleConfirm()">
                完成發布
            </LazyAtomBtnSimple>
            <LazyAtomBtnSimple class="d-none d-lg-block" size="lg" @click="handleConfirm()">
                完成發布
            </LazyAtomBtnSimple>
        </template>
    </AtomModalFrame>
</template>
<script setup>
const modal = ref(null)
const { $uuid4, $validate, } = useNuxtApp()
const emit = defineEmits(['update:modelValue', 'confirm'])
const state = reactive({
    localValue: {
        seoName: '',
        description: '',
    },
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                seoName: '',
                description: ''
            }
        }
    }
})
onMounted(() => {
    state.id = $uuid4()
})
watch(() => props.modelValue, (newValue = {}) => {
    state.localValue = newValue
}, { immediate: true })
// methods
function showModal() {
    const description = extractContent(props.modelValue.description)
    state.localValue.description = description
    modal.value.show()
}
async function handleConfirm() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    modal.value.hide()
    emit('update:modelValue', state.localValue)
    emit('confirm',)
}
function extractContent(content = '') {
    const span = document.createElement('span');
    span.innerHTML = content;
    return span.textContent || span.innerText;
    // const target = content.replaceAll("<[^>]*>", "");
    // return target
}
</script>
<style lang="scss" scoped>
.modal {
    .modal-header {
        border: none;
    }

    .modal-body {
        padding: 55px 40px;

        .input__prefix {
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1;
            letter-spacing: normal;
            color: #fff;
            background-color: #5ea88e;
            padding: 10px 20px;
        }
    }
}

.modal__button {
    font-size: 14px;
}

@media screen and (min-width: 992px) {
    .modal__button {
        padding: 15px 30px;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
    }
}
</style>