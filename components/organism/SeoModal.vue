<template>
    <LazyAtomBtnSimple class="modal__button" @click="showModal()">
        儲存
    </LazyAtomBtnSimple>
    <AtomModalFrame ref="modal">
        <template #header>
            設定網址
        </template>
        <template #body>
            <LazyAtomInputText v-model="modelValue.organizationName" name="你的自訂網址" placeholder="可輸入你的公司名稱（僅限英文）">
                <template #prefix>
                    <div class="input__prefix">jobpair.com/company/</div>
                </template>
            </LazyAtomInputText>
        </template>
        <template #footer>
            <LazyAtomBtnSimple class="d-md-none">
                完成發布
            </LazyAtomBtnSimple>
            <LazyAtomBtnSimple class="d-lg-block" size="lg">
                完成發布
            </LazyAtomBtnSimple>
        </template>
    </AtomModalFrame>
    <!-- <div class="modal fade" :id="`seo-${state.id}`" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">設定網址</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" ref="modalBodyRef">
                    <LazyAtomInputText v-model="modelValue.organizationName" name="你的自訂網址" placeholder="可輸入你的公司名稱（僅限英文）"
                        required>
                    </LazyAtomInputText>
                </div>
                <div class="modal-footer">
                    <div class="footer__buttonGroup">
                        <LazyAtomBtnSimple class="footer__button  btnSimple--outline--success">完成發布
                        </LazyAtomBtnSimple>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>
<script setup>
const modal = ref(null)
const { $bootstrap, $uuid4, $optionText, $validate, $sweet, $requestSelector, $emitter } = useNuxtApp()
const state = reactive({
    modal: null
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                organizationName: '',
            }
        }
    }
})
onMounted(() => {
    state.id = $uuid4()
    // 編輯用modal
    // $requestSelector(`#seo-${state.id}`, (editableElement) => {
    //     state.modal = new window.bootstrap.Modal(editableElement, {
    //         keyboard: false,
    //         backdrop: "static",
    //     })
    // })
})
// methods
function showModal() {
    console.log('modal', modal);
    modal.value.show()
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