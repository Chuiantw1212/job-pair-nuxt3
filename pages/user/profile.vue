<template>
    <div v-if="state.profile" class="state.profile">
        <div class="profile__hint">
            <h1 class="hint__heaer">個人檔案</h1>
            <div class="hint__desc">
                Job Pair 為「將求職者隱私放在第一位」的求職平台，注重求職者隱私，在您沒有主動應徵前企業『不會看到您的私人資訊』，
                僅能看到您的『姓名、職務類別、個人簡歷』，防止您的重要資訊外洩。
            </div>
        </div>
        <MoleculeProfileCard name="基本資料" class="mt-3">
            <div class="d-flex">
                <AtomInputPhotoSingle v-model="state.profile.image" name="大頭貼" @update:modelValue="uploadImage($event)">
                </AtomInputPhotoSingle>
            </div>
            <AtomInputText name="姓名" v-model="state.profile.name" :disabled="user && !!user.name"></AtomInputText>
            <AtomInputEmail name="Email" v-model="state.profile.email" class="mt-3" disabled></AtomInputEmail>
            <AtomInputText name="手機號碼" v-model="state.profile.telephone" placeholder="請輸入手機" class="mt-3" required>
            </AtomInputText>
            <AtomInputCalendar name="生日" v-model="state.profile.birthDate" class="mt-3" :disabled="user && !!user.birthDate"
                required>
            </AtomInputCalendar>
            <AtomInputSelect name="性別" v-model="state.profile.gender" :items="selectByQueryRes.gender" class="mt-3"
                required>
            </AtomInputSelect>
            <AtomInputSelect name="最高學位" v-model="state.profile.educationLevel" :items="selectByQueryRes.educationLevel"
                class="mt-3">
            </AtomInputSelect>
            <AtomProfileSelectContainer v-model="state.filterOpen.educationCategory" name="學科分類" :max="1" class="mt-3">
                <template v-slot:header>
                    <AtomProfileSelectLabels v-model="state.profile.educationCategory"
                        :jobCategoryMap="educationCategoryMap" placeholder="學科分類"
                        :items="selectByQueryRes.educationCategory">
                    </AtomProfileSelectLabels>
                </template>
                <template v-slot:body>
                    <FilterCategory v-model="state.profile.educationCategory"
                        :items="selectByQueryRes.educationCategory" :categoryMap="educationCategoryMap" :max="1"
                        :isDesktop="device.state.isDesktop" name="學科分類">
                    </FilterCategory>
                </template>
            </AtomProfileSelectContainer>
            <div class="profile__management">
                帳戶管理
                <OrganismDeleteModal class="managemement__others"></OrganismDeleteModal>
            </div>
            <BtnSimple class="mt-2" :style="{ width: '145px' }" @click="logout()">登出</BtnSimple>
        </MoleculeProfileCard>
        <MoleculeProfileCard name="求職資訊" class="profile__information profile__doc mt-3 ">
            <AtomProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="欲申請職務類別" :max="3" required>
                <template v-slot:header>
                    <AtomProfileSelectLabels v-model="state.profile.occupationalCategory" :jobCategoryMap="jobCategoryMap"
                        :items="jobCategory">
                    </AtomProfileSelectLabels>
                </template>
                <template v-slot:body>
                    <FilterCategory v-model="state.profile.occupationalCategory" :items="jobCategory"
                        :categoryMap="jobCategoryMap" :max="3" :isDesktop="device.state.isDesktop" required
                        name="欲申請職務類別">
                    </FilterCategory>
                </template>
            </AtomProfileSelectContainer>
            <AtomInputCheckSingle class="information__isActive mt-3" v-model="state.profile.isActive" name="目前求職狀態">
                <span class="isActive__desc">若有適合的職缺，我願意讓企業主主動寄信給我</span>
            </AtomInputCheckSingle>
            <AtomInputTextarea name="個人簡歷" v-model="state.profile.description" hint="此區塊將會揭露給企業端參考"
                class="resume__introduction mt-3" rows="8" placeholder="請概述您過往的學經歷，凸顯個人優勢與專業領域，讓企業主對您留下深刻的第一印象。"
                :required="state.profile.isActive">
            </AtomInputTextarea>
        </MoleculeProfileCard>
        <MoleculeProfileCard name="履歷作品集" class="profile__information profile__doc mt-3 ">
            <AtomInputUploader v-model="state.profile.resumes" :size="5242880" :accept="'.pdf'" :max="3" required>
            </AtomInputUploader>
            <InputPortfolioVue v-model="state.profile.portfolio"></InputPortfolioVue>
        </MoleculeProfileCard>
        <div class="profile__footer">
            <AtomBtnSimple :style="{ width: '205px' }" class="mt-3" @click="handleSubmit()">儲存</AtomBtnSimple>
        </div>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { reactive, onMounted, onUnmounted, watch, nextTick, ref, watchEffect, computed, defineEmits } from 'vue'
const { $toggleLoader, $validate, $alert, $succeed } = useNuxtApp()
const device = useDevice()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
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
    // 先更新pdf
    $toggleLoader(true)
    const validResumes = state.profile.resumes.filter((item) => item.url)
    const reseumeResponse = await repoUser.putUserResumes(validResumes)
    state.profile.resumes = reseumeResponse.data
    // 再更新履歷資料
    await repoUser.patchUserProfile(state.profile)
    // 收尾
    const patchedUser = Object.assign({}, repoAuth.user, state.profile)
    repoAuth.setUser(patchedUser)
    $succeed()
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

    .profile__footer {
        display: flex;
        justify-content: center;
    }
}

@media screen and (min-width: 992px) {
    .profile {
        // margin-right: 8px;

        .profile__hint {
            padding: 30px 50px;
            border-radius: 10px;
        }
    }
}
</style>