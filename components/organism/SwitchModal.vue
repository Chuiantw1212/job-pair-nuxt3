<template>
    <div class="register">
        <div class="modal fade" id="switchModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" @click="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <h3 class="body__header">歡迎來到Job Pair！</h3>
                        <div v-if="true" class="body__subheader">
                            <div>
                                ※系統偵測到內嵌瀏覽器※<br>
                                可能不符合Google安全瀏覽器政策，並造成網站異常，請用原生(預設)瀏覽器開啟此網站<br>
                            </div>
                        </div>
                        <div class="body__body">
                            <div class="body__card" @click="showEmployeeModal()">
                                <div class="body__card__imageWrap">
                                    <img classs="card__image card__image--employee" src="./assets/img_candidate.png">
                                </div>
                                <div class="card__title">我是求職者</div>
                                <div class="card__desc">個人身份註冊/登入</div>
                                <AtomBtnSimple class="card__btn">開始找工作</AtomBtnSimple>
                            </div>
                            <div class="body__card" @click="showAdminModal()">
                                <div class="body__card__imageWrap">
                                    <img classs="card__image card__image--employee" src="./assets/img_Enterprise.png">
                                </div>
                                <div class="card__title">我是企業端</div>
                                <div class="card__desc">人資、企業主註冊/登入</div>
                                <AtomBtnSimple class="card__btn">開始找人才</AtomBtnSimple>
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
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/stores/user'
const test = useNuxtApp()
console.log(test.$bootstrap)
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const state = reactive({
    bsModal: null,
})
onMounted(() => {
    $emitter.on("showUserModal", showModal)
    $emitter.on("hideUserModal", hideModal)
    if (process.client) {
        state.bsModal = new $bootstrap.Modal(document.getElementById("switchModal"), {
            keyboard: false,
            backdrop: "static",
        })
    }
})
// methods
function hideModal() {
    state.isSent = false
    state.bsModal.hide()
}
function showModal() {
    state.bsModal.show()
    // this.renderFirebaseUI()
}
function showEmployeeModal() {
    state.bsModal.hide()
    router.replace({
        name: 'home'
    })
    // $emitter.emit("showUserModal")
}
function showAdminModal() {
    state.bsModal.hide()
    router.replace({
        name: 'admin'
    })
    // $emitter.emit("showCompanyModal")
}
// export default {
//     data: function () {
//         return {
//             bsModal: null,
//         }
//     },
//     created() {
//         this.$emitter.on("showSwitchModal", this.showModal)
//         this.$emitter.on("hideSwitchModal", this.hideModal)
//     },
//     async mounted() {

//     },
//     beforeUnmount() {
//         if (this.ui) {
//             this.ui.delete()
//         }
//     },
//     methods: {
//         hideModal() {
//             this.bsModal.hide()
//         },
//         showModal() {
//             this.bsModal.show()
//         },
//     },
// }
</script>
<style lang="scss" scoped>
.modal-content {
    border-radius: 20px;
    padding: 40px 40px 40px 40px;

    .modal-header {
        border: none;
        padding: 0;
    }

    .modal-body {
        min-height: 24rem;
        padding: 0;

        .body__header {
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            color: #333;
        }

        .body__subheader {
            color: red;
            text-align: center;
        }

        .body__body {
            display: flex;
            gap: 30px;
            margin-top: 30px;
            padding: 0;
            flex-direction: column;

            .body__card {
                border-radius: 10px;
                border: solid 1px #d3d3d3;
                width: 100%;
                text-align: center;
                padding: 30px;

                .body__card__imageWrap {
                    min-height: 105px;
                }

                .card__title {
                    font-size: 28px;
                    font-weight: bold;
                    color: #333;
                    margin-top: 30px;
                }

                .card__image--employee {
                    width: 150px;
                    height: 105px;
                }

                .card__desc {
                    margin-top: 10px;
                }

                .card__btn {
                    margin-top: 30px;
                }
            }
        }

        .body__desc {
            text-align: center;
            font-size: 14px;
        }

        .body__emailSent {
            text-align: center;
            padding: 20px 0 0 0;

            .emailSent__header {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 4px;
            }

            .emailSent__desc {
                font-size: 14px;
                margin-bottom: 2rem;
            }

            .emailSent__footer {
                display: flex;
                justify-content: center;

                .emailSent__resend {
                    width: 226px;
                }
            }
        }
    }
}

@media screen and (min-width:992px) {
    .modal-content {
        .modal-body {
            .body__body {
                flex-direction: row;
            }
        }
    }
}
</style>