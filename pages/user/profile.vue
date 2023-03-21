<template>
    <div class="profile">
        <template v-if="state.profile">
            <div class="profile__hint">
                <h1 class="hint__heaer">個人檔案</h1>
                <div class="hint__desc">
                    Job Pair 為「將求職者隱私放在第一位」的求職平台，注重求職者隱私，在您沒有主動應徵前企業『不會看到您的私人資訊』，
                    僅能看到您的『姓名、職務類別、個人簡歷』，防止您的重要資訊外洩。
                </div>
            </div>
            <LazyMoleculeProfileCard name="基本資料" class="mt-3">
                <div class="d-flex">
                    <LazyAtomInputPhotoSingle v-model="state.profile.image" name="大頭貼"
                        @update:modelValue="uploadImage($event)">
                    </LazyAtomInputPhotoSingle>
                </div>
                <LazyAtomInputText name="姓名" v-model="state.profile.name"
                    :disabled="repoAuth.state.user && !!repoAuth.state.user.name"></LazyAtomInputText>
                <LazyAtomInputEmail name="Email" v-model="state.profile.email" class="mt-3" disabled>
                </LazyAtomInputEmail>
                <LazyAtomInputText name="手機號碼" v-model="state.profile.telephone" placeholder="請輸入手機" class="mt-3" required>
                </LazyAtomInputText>
                <LazyAtomInputCalendar name="生日" v-model="state.profile.birthDate" class="mt-3"
                    :disabled="repoAuth.state.user && !!repoAuth.state.user.birthDate" required>
                </LazyAtomInputCalendar>
                <LazyAtomInputSelect name="性別" v-model="state.profile.gender"
                    :items="repoSelect.state.selectByQueryRes.gender" class="mt-3" required>
                </LazyAtomInputSelect>
                <LazyAtomInputSelect name="最高學位" v-model="state.profile.educationLevel"
                    :items="repoSelect.state.selectByQueryRes.educationLevel" class="mt-3">
                </LazyAtomInputSelect>
                <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.educationCategory"
                    :items="state.profile.educationCategory" name="學科分類" :max="1" class="mt-3">
                    <template v-slot:header>
                        <LazyMoleculeProfileSelectLabels v-model="state.profile.educationCategory" placeholder="學科分類"
                            :items="repoSelect.state.selectByQueryRes.educationCategory">
                        </LazyMoleculeProfileSelectLabels>
                    </template>
                    <template v-slot:body>
                        <LazyMoleculeFilterCategory v-model="state.profile.educationCategory"
                            :items="repoSelect.state.selectByQueryRes.educationCategory"
                            :categoryMap="repoSelect.educationCategoryMap" :max="1" :isDesktop="device.state.isDesktop"
                            name="學科分類">
                        </LazyMoleculeFilterCategory>
                    </template>
                </LazyMoleculeProfileSelectContainer>
                <div class="profile__management">
                    帳戶管理
                    <LazyOrganismDeleteModal class="managemement__others"></LazyOrganismDeleteModal>
                </div>
                <LazyAtomBtnSimple class="mt-2" :style="{ width: '145px' }" @click="logout()">登出</LazyAtomBtnSimple>
            </LazyMoleculeProfileCard>
            <LazyMoleculeProfileCard name="求職資訊" class="profile__information profile__doc mt-3 ">
                <LazyAtomInputCheckSingle class="information__isActive" v-model="state.profile.isActive" name="目前求職狀態">
                    <span class="isActive__desc">若有適合的職缺，我願意讓企業主主動寄信給我</span>
                </LazyAtomInputCheckSingle>
                <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="欲申請職務類別"
                    class="mt-4" :max="3" required>
                    <template v-slot:header>
                        <LazyMoleculeProfileSelectLabels v-model="state.profile.occupationalCategory" placeholder="欲申請職務類別"
                            :items="repoSelect.jobCategory">
                        </LazyMoleculeProfileSelectLabels>
                    </template>
                    <template v-slot:body>
                        <LazyMoleculeFilterCategory v-model="state.profile.occupationalCategory"
                            :items="repoSelect.jobCategory" :categoryMap="repoSelect.jobCategoryMap" :max="3"
                            :isDesktop="device.state.isDesktop" required name="欲申請職務類別">
                        </LazyMoleculeFilterCategory>
                    </template>
                </LazyMoleculeProfileSelectContainer>
                <div class="profile__languageGroup mt-4">
                    <LazyAtomInputSelect class="profile__language" v-if="repoSelect.state?.selectByQueryRes?.language"
                        v-model="state.profile.language" name="語言能力" placeholder="選擇語言"
                        :items="repoSelect.state.selectByQueryRes.language">
                        <!-- <a class="languageGroup__link" href="">程度說明</a> -->
                    </LazyAtomInputSelect>
                    <LazyAtomInputRadio v-if="repoSelect.state?.selectByQueryRes?.proficiency"
                        class="languageGroup__proficiency" v-model="state.profile.proficiency"
                        :items="repoSelect.state.selectByQueryRes.proficiency">
                    </LazyAtomInputRadio>
                </div>
                <LazyAtomInputUploader class="mt-3" v-model="state.profile.certificates" name="證照與證明">
                </LazyAtomInputUploader>
                <LazyAtomInputCkeditor name="個人簡歷" v-model="state.profile.description" hint="此區塊將會揭露給企業端參考"
                    class="resume__introduction mt-3" :required="state.profile.isActive"
                    placeholder="請概述您過往的學經歷，凸顯個人優勢與專業領域，讓企業主對您留下深刻的第一印象。" :hasBtn="true">
                    <slot>
                        <!-- <AtomBtnSimple class="ms-1" @click="openEditResult()" size="sm">一鍵優化</AtomBtnSimple> -->
                        <LazyOrganismChatGptModal :modelValue="state.profile.description"></LazyOrganismChatGptModal>
                    </slot>
                </LazyAtomInputCkeditor>
                <!-- ChatGPT -->
                <!--  -->
            </LazyMoleculeProfileCard>
            <LazyMoleculeProfileCard name="履歷作品集" class="profile__information profile__doc mt-3 ">
                <LazyAtomInputUploader v-model="state.profile.resumes" name="履歷" :size="5242880" :accept="'.pdf'" :max="3"
                    :required="device.state.isDesktop">
                </LazyAtomInputUploader>
                <LazyMoleculePortfolio v-model="state.profile.portfolio"></LazyMoleculePortfolio>
            </LazyMoleculeProfileCard>
            <div class="profile__footer">
                <LazyAtomBtnSimple :style="{ width: '205px' }" class="mt-3" @click="handleSubmit()">儲存
                </LazyAtomBtnSimple>
            </div>
        </template>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { reactive, onMounted, watch, } from 'vue'
const { $validate, $sweet, } = useNuxtApp()
const device = useDevice()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
const repoChat = useRepoChat()
const repoSelect = useRepoSelect()
const router = useRouter()
const state = reactive({
    profile: null,
    filterOpen: {
        occupationalCategory: false,
        educationCategory: false,
    },
    toggleChangePassword: false,
})
// hooks
useSeoMeta({
    title: `個人檔案 - 會員中心 - Job Pair`,
})
onMounted(() => {
    initialize()
})
watch(() => repoAuth.state.user, (newValue, oldValue) => {
    if (newValue && !oldValue) {
        initialize()
    }
})
// methods
function initialize() {
    const { user } = repoAuth.state
    if (!user || !user.id) {
        return
    }
    // 生成預設格式
    const profile = JSON.parse(JSON.stringify(user))
    const { resumes = [], portfolio = [], isActive = true, educationCategory = [] } = user
    profile.resumes = resumes ?? []
    profile.portfolio = portfolio ?? []
    profile.isActive = isActive ?? true
    profile.educationCategory = educationCategory ? educationCategory : []
    state.profile = profile
}
async function logout() {
    repoAuth.userSignout()
    router.push({
        name: "index",
    })
}
async function uploadImage(photo) {
    const response = await repoUser.putUserPhoto(photo)
    if (response.status === 200) {
        const image = response.data
        state.profile.image = image
        const patchedUser = Object.assign({}, repoAuth.user, {
            image,
        })
        repoAuth.setUser(patchedUser)
    }
}
async function handleSubmit() {
    // 檢核必填寫欄位
    if (state.profile.description === '<p></p>') {
        state.profile.description = ''
    }
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    const validPorfolio = state.profile.portfolio.filter((item) => {
        const { name = "", url = "" } = item
        const hasName = !!name.trim()
        const hasUrl = !!url.trim()
        return hasName && hasUrl
    })
    state.profile.portfolio = validPorfolio
    // 更新履歷pdf
    $sweet.loader(true)
    const validResumes = state.profile.resumes.filter((item) => item.url)
    const reseumeResponse = await repoUser.putUserResumes(validResumes)
    state.profile.resumes = reseumeResponse.data
    // 更新語言證明
    const validCertificates = state.profile.certificates.filter((item) => item.url)
    const certificatesRes = await repoUser.putUserCertificates(validCertificates)
    state.profile.certificates = certificatesRes.data
    // 再更新個人資料
    await repoUser.patchUserProfile(state.profile)
    // 收尾
    const patchedUser = Object.assign({}, repoAuth.user, state.profile)
    repoAuth.setUser(patchedUser)
    $sweet.succeed()
}
</script>
<style lang="scss" scoped>
.profile {
    .profile__hint {
        background-color: #d8e4eb;
        padding: 40px 24px;
        margin-bottom: 20px;

        .hint__heaer {
            font-size: 20px;
            text-align: center;
            font-weight: bold;
        }

        .hint__desc {
            font-size: 18px;
            margin-top: 12px;
            line-height: 1.5;
            text-align: center;
        }
    }

    .profile__information {

        .information__isActive {
            .isActive__desc {
                line-height: 1;
                white-space: pre-wrap;
            }
        }


    }

    .profile__management {
        margin-top: 20px;
        display: flex;

        .managemement__others {
            color: #5ea88e;
        }
    }

    .profile__languageGroup {
        display: flex;
        flex-direction: column;

        .languageGroup__proficiency {
            // margin-top: 8px;
        }
    }


    .profile__footer {
        display: flex;
        justify-content: center;
    }
}

@media screen and (min-width: 992px) {
    .profile {

        .profile__language {
            min-width: 232px;
        }

        .profile__languageGroup {
            flex-direction: row;

            .languageGroup__proficiency {
                margin-top: 24px;
                margin-left: 20px;
            }
        }

        .profile__hint {
            padding: 30px 50px;
            border-radius: 10px;
        }
    }
}
</style>