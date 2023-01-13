<template>
    <div class="deleteModal">
        <button class="deleteModal__button" @click="openModal()">
            其他帳戶設定
        </button>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="body__content">
                            <div class="content__header">如何刪除帳號</div>
                            <div class="content__body">
                                如果想刪除帳號，請點選「<button class="body__badge"
                                    @click="showSecondConfirm()">永久刪除帳號</button>」即可。動作將刪除您在 Job Pair 上的任何資訊，包含您的履歷。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
const { $emitter, $bootstrap, $sweet, $requestSelector } = useNuxtApp()
const state = reactive({
    bsModal: null,
})
const router = useRouter()
const repoUser = useRepoUser()
const repoAuth = useRepoAuth()
// hooks
onMounted(() => {
    $requestSelector(`#deleteModal`, (modelElement) => {
        state.bsModal = new $bootstrap.Modal(modelElement, {
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
    const isConfirmed = await $sweet.alert('此動作無法復原。您確定要這麼做嗎？', {
        title: '確定要刪除嗎',
        icon: 'warning',
        confirmButtonText: '是的, 確定刪除',
        confirmButtonColor: '#dd5747',
        showCancelButton: true,
        cancelButtonText: '取消',
    })
    if (!isConfirmed.value) {
        return
    }
    hideModal()
    // 執行刪除流程
    const res = await repoUser.deleteUser()
    if (res.status === 200) {
        repoAuth.userSignout()
        router.push({
            name: 'index',
        })
        // 刪除帳號後重新整理避免Firebase資料快取
        setTimeout(() => {
            if (process.client) {
                location.reload()
            }
        })
    }
}
</script>
<style lang="scss">
.deleteModal {
    .deleteModal__button {
        background-color: inherit;
        border: none;
        color: #5ea88e;
    }


    .modal-header {
        border-bottom: none;
    }

    .body__content {
        padding: 0 20px 40px 20px;
        color: black;

        .content__body {
            margin-top: 20px;

            .body__badge {
                color: #5ea88e;
                background-color: white;
                border: none;
            }
        }
    }
}
</style>