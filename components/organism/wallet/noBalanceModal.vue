<template>
    <div class="noBallanceModal">
        <button class="noBallanceModal__button" @click="openModal()">
            其他帳戶設定
        </button>
        <div class="modal fade" id="noBallanceModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="body__content">
                            <div class="content__header">餘額不足，請先儲值</div>
                            <!-- <div class="content__body">
                                如果想刪除帳號，請點選「<button class="body__badge" @click="showSecondConfirm()">永久刪除帳號</button>」即可。{{
                                    info }}
                            </div> -->
                            <div class="content__footer">
                                <LazyAtomBtnSimple class="footer__button btnSimple--outline--success" @click="closeModal()">
                                    查看明細
                                </LazyAtomBtnSimple>
                                <LazyAtomBtnSimple class="footer__button" @click="handleSave()">去儲值</LazyAtomBtnSimple>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="modal-footer ">
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted, } from 'vue'
const { $emitter, $bootstrap, $sweet, $requestSelector } = useNuxtApp()
const state = reactive({
    bsModal: null,
})
const router = useRouter()
const repoUser = useRepoUser()
const repoAuth = useRepoAuth()
const repoAdmin = useRepoAdmin()
// hooks
const props = defineProps({
    info: {
        type: String,
        default: '動作將刪除您在 Job Pair 上的任何資訊。'
    }
})
onMounted(() => {
    $requestSelector(`#noBallanceModal`, (modelElement) => {
        state.bsModal = new window.bootstrap.Modal(modelElement, {
            keyboard: false,
            backdrop: "static",
        })
    })
})
// methods
function openModal() {
    state.bsModal.show()
}
function hideModal() {
    state.bsModal.hide()
}
async function showSecondConfirm() {
    // const isConfirmed = await $sweet.alert('此動作無法復原。您確定要這麼做嗎？', {
    //     title: '確定要刪除嗎',
    //     icon: 'warning',
    //     confirmButtonText: '是的, 確定刪除',
    //     confirmButtonColor: '#dd5747',
    //     showCancelButton: true,
    //     cancelButtonText: '取消',
    // })
    // if (!isConfirmed.value) {
    //     return
    // }
    hideModal()
}
defineExpose({
    openModal
})
</script>
<style lang="scss" scoped>
.noBallanceModal {
    .noBallanceModal__button {
        background-color: inherit;
        border: none;
        color: #5ea88e;
    }


    .modal-header {
        border-bottom: none;
    }

    .body__content {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.3;
        letter-spacing: normal;
        text-align: center;
        color: #333;

        .content__body {
            margin-top: 20px;

            .body__badge {
                color: #5ea88e;
                background-color: white;
                border: none;
            }
        }

        .content__footer {
            display: flex;
            gap: 20px;
            margin-top: 30px;
            justify-content: center;

            .footer__button {
                width: 200px;
            }
        }
    }
}
</style>