<template>
    <div class="modal fade" :id="`model-${state.id}`" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered ">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <slot name="header"></slot>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" ref="modalBodyRef">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $uuid4, $optionText, $validate, $sweet, $requestSelector, $emitter } = useNuxtApp()
const state = reactive({
    modal: null,
})
onMounted(() => {
    state.id = $uuid4()
    // 編輯用modal
    $requestSelector(`#model-${state.id}`, (editableElement) => {
        state.modal = new window.bootstrap.Modal(editableElement, {
            keyboard: false,
            backdrop: "static",
        })
    })
})
// methods
function show() {
    state.modal.show()
}
defineExpose({
    show
})
</script>
<style lang="scss" scoped>
.modal {
    .modal-content {
        border-radius: 40px;
    }

    .modal-header {
        position: relative;
        border: none;
        padding: 40px;

        .modal-title {
            font-size: 36px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: #000;
            width: 100%;
        }

        .btn-close {
            position: absolute;
            // top: 50px;
            right: 50px;
        }
    }

    .modal-body {
        padding: 0 40px;
        min-height: 130px;
    }


    .modal-footer {
        border: none;
        display: flex;
        justify-content: center;
        padding: 15px 0;
        padding-bottom: 55px;
    }
}
</style>