<template>
    <LazyAtomBtnSimple class="modal__button" @click="showModal()">
        儲存
    </LazyAtomBtnSimple>
    <AtomModalFrame ref="modal">
        <template #header>
            SEO設定
        </template>
        <template #body>
            <LazyAtomInputText v-model="localValue.seoName" name="你的自訂網址" placeholder="可輸入你的公司名稱（僅限英文）" :types="['english']"
                :key="state.renderKey">
                <template #prefix>
                    <div class="input__prefix">jobpair.com/company/</div>
                </template>
            </LazyAtomInputText>
            <LazyAtomInputTextarea v-model="localValue.seoDescription" name="搜尋引擎描述" class="mt-2" rows="4"
                :key="state.renderKey">
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
const { $uuid4, } = useNuxtApp()
const emit = defineEmits(['update:modelValue', 'confirm'])
const repoAuth = useRepoAuth()
const state = reactive({
    modal: null,
    renderKey: Math.random()
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                seoName: '',
                seoDescription: '',
            }
        }
    }
})
onMounted(() => {
    state.id = $uuid4()
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
function extractContent(content) {
    const span = document.createElement('span');
    span.innerHTML = content;
    return span.textContent || span.innerText;
}
function showModal() {
    if (!localValue.value.seoName) {
        localValue.value.seoName = repoAuth.state.company.id
    }
    if (!localValue.value.seoDescription) {
        localValue.value.seoDescription = extractContent(repoAuth.state.company.description)
    }
    state.renderKey = Math.random()
    modal.value.show()
}
function handleConfirm() {
    modal.value.hide()
    emit('confirm')
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