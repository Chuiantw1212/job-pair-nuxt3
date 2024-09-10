<template>
    <div class="profile">
        <div class="profile_header">
            我的履歷
        </div>
        <div class="profile__desc">
            Job Pair 為「將求職者隱私放在第一位」的求職平台，注重求職者隱私，在您沒有主動應徵前企業『不會看到您的私人資訊』，僅能看到您的『姓名、職務類別、個人簡歷』，防止您的重要資訊外洩。
        </div>
        <hr class="profile__hr">
        <div v-if="state.profileBasic" id="profileBasic" class="profile__card">
            <h2 class="card__header">基本資料</h2>
            <div class="profile__basic">
                <LazyAtomInputPhotoSingle v-model="state.profileBasic.image" class="basic__image" :size="'120px'">
                </LazyAtomInputPhotoSingle>
                <div class="basic__contact">
                    <LazyAtomInputText name="姓名" v-model="state.profileBasic.name"
                        :disabled="repoAuth.state.user && !!repoAuth.state.user.name" required></LazyAtomInputText>
                    <LazyAtomInputEmail name="Email" v-model="state.profileBasic.email" class="mt-3" disabled>
                    </LazyAtomInputEmail>
                    <LazyAtomInputMobile name="手機號碼" v-model="state.profileBasic.telephone" placeholder="請輸入手機"
                        class="mt-3" required>
                    </LazyAtomInputMobile>
                </div>
            </div>
            <LazyAtomInputSelect v-if="repoSelect.state.selectByQueryRes" name="僱傭模式"
                v-model="state.profileBasic.employmentType" :items="repoSelect.state.selectByQueryRes.employmentType"
                class="mt-3" required>
            </LazyAtomInputSelect>
            <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="欲申請職務類別" :max="3"
                class="mt-3" required>
                <template v-slot:header>
                    <LazyMoleculeProfileSelectLabels v-model="state.profileBasic.occupationalCategory"
                        placeholder="欲申請職務類別" :items="repoSelect.jobCategory">
                    </LazyMoleculeProfileSelectLabels>
                </template>
                <template v-slot:body>
                    <LazyMoleculeFilterCategory v-model="state.profileBasic.occupationalCategory"
                        :items="repoSelect.jobCategory" :categoryMap="repoSelect.jobCategoryMap" :max="3"
                        :isLarge="device.state.isLarge" required name="欲申請職務類別">
                    </LazyMoleculeFilterCategory>
                </template>
            </LazyMoleculeProfileSelectContainer>
            <LazyAtomInputCkeditor name="個人簡歷" v-model="state.profileBasic.description" hint="此區塊將會揭露給企業端參考"
                class="mt-3" :required="state.profileBroadcast.isActive"
                placeholder="請概述您過往的學經歷，凸顯個人優勢與專業領域，讓企業主對您留下深刻的第一印象。" ref="description">
                <LazyOrganismChatOptimizeIntroModal v-if="checkHasDescription()"
                    v-model="state.profileBasic.description" name="個人簡歷" @update:modelValue="setDescription($event)">
                </LazyOrganismChatOptimizeIntroModal>
                <LazyOrganismChatIntroModal v-else :occupationalCategory="state.profileBasic.occupationalCategory"
                    @update:modelValue="setDescription($event)">
                </LazyOrganismChatIntroModal>
            </LazyAtomInputCkeditor>
            <div class="card__footer">
                <LazyAtomBtnSimpleV2 :style="{ width: '205px' }" class="mt-3" @click="handleSubmitBasic()">儲存
                </LazyAtomBtnSimpleV2>
            </div>
        </div>
        <div v-if="state.profileAdvanced" id="profileAdvanced" name="進階求職資料" class="profile__card profile__card--mt">
            <h2 class="card__header">專業背景</h2>
            <LazyAtomInputUploader v-model="state.profileAdvanced.resumes" name="履歷" :size="5242880" :accept="'.pdf'"
                :max="3" :getFileBuffer="getUserResume">
            </LazyAtomInputUploader>
            <hr class="card__hr">
            <div class="profile__languageGroup  mt-3">
                <LazyAtomInputSelect class="profile__language" v-if="repoSelect.state?.selectByQueryRes?.language"
                    v-model="state.profileAdvanced.language" name="語言能力" placeholder="選擇語言"
                    :items="repoSelect.state.selectByQueryRes.language">
                    <LazyOrganismLanguageModal v-if="state.profileAdvanced.language === 'english'">
                    </LazyOrganismLanguageModal>
                </LazyAtomInputSelect>
                <LazyAtomInputRadio v-if="repoSelect.state?.selectByQueryRes?.proficiency"
                    class="languageGroup__proficiency" v-model="state.profileAdvanced.proficiency"
                    :items="repoSelect.state.selectByQueryRes.proficiency">
                </LazyAtomInputRadio>
            </div>
            <hr class="card__hr">
            <LazyAtomInputUploader class="mt-3" v-model="state.profileAdvanced.certificates"
                :getFileBuffer="getUserCertificate" name="專業證照與能力證明">
            </LazyAtomInputUploader>
            <hr class="card__hr">
            <LazyMoleculePortfolio v-model="state.profileAdvanced.portfolio" class="mt-3"></LazyMoleculePortfolio>
            <div class="card__footer">
                <LazyAtomBtnSimpleV2 :style="{ width: '205px' }" class="mt-3" @click="handleSubmitAdvanced()">儲存
                </LazyAtomBtnSimpleV2>
            </div>
        </div>
        <div v-if="state.profileBroadcast" id="profileBroadcast" name="精準推送" class="profile__card profile__card--mt">
            <h2 class="card__header">其他資訊</h2>
            <LazyAtomInputCalendar name="生日" v-model="state.profileBroadcast.birthDate" class="mt-3"
                :disabled="repoAuth.state.user && !!repoAuth.state.user.birthDate"
                :flatpickrConfig="{ maxDate: new Date() }">
            </LazyAtomInputCalendar>
            <LazyAtomInputSelect name="性別" v-model="state.profileBroadcast.gender"
                :items="repoSelect.state.selectByQueryRes.gender" class="mt-3">
            </LazyAtomInputSelect>
            <LazyAtomInputSelect name="最高學位" v-model="state.profileBroadcast.educationLevel"
                :items="repoSelect.state.selectByQueryRes.educationLevel" class="mt-3">
            </LazyAtomInputSelect>
            <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.educationCategory"
                :items="state.profileBroadcast.educationCategory" name="學科分類" :max="1" class="mt-3">
                <template v-slot:header>
                    <LazyMoleculeProfileSelectLabels v-model="state.profileBroadcast.educationCategory"
                        placeholder="學科分類" :items="repoSelect.state.selectByQueryRes.educationCategory">
                    </LazyMoleculeProfileSelectLabels>
                </template>
                <template v-slot:body>
                    <LazyMoleculeFilterCategory v-model="state.profileBroadcast.educationCategory"
                        :items="repoSelect.state.selectByQueryRes.educationCategory"
                        :categoryMap="repoSelect.educationCategoryMap" :max="1" :isLarge="device.state.isLarge"
                        name="學科分類">
                    </LazyMoleculeFilterCategory>
                </template>
            </LazyMoleculeProfileSelectContainer>
            <div class="card__footer">
                <LazyAtomBtnSimpleV2 :style="{ width: '205px' }" @click="handleSubmitBroadcast()">儲存
                </LazyAtomBtnSimpleV2>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $validate, $sweet, } = useNuxtApp()
const device = useDevice()
const repoAuth = useRepoAuth()
const repoUser = useRepoUser()
const repoSelect = useRepoSelect()
const router = useRouter()
const state = reactive({
    profileBasic: null,
    profileAdvanced: null,
    profileBroadcast: null,
    filterOpen: {
        occupationalCategory: false,
        educationCategory: false,
    },
    toggleChangePassword: false,
})
// hooks
useHead({
    title: '個人檔案 - 會員中心'
})
watch(() => repoAuth.state.user, (newValue, oldValue) => {
    if (newValue && !oldValue) {
        initialize()
    }
}, { immediate: true })
// methods
const instance = getCurrentInstance()
function initialize() {
    const { user = '' } = repoAuth.state
    if (!user) {
        return
    }
    const profile = JSON.parse(JSON.stringify(user))
    // profileBasic
    const {
        image,
        name = '',
        email = '',
        telephone = '',
        occupationalCategory = [],
        resumes = [],
        description = '',
        employmentType,
    } = profile
    const profileBasic = {
        image,
        name,
        email,
        telephone,
        occupationalCategory,
        description,
        employmentType,
    }
    state.profileBasic = profileBasic
    // profileAdvanced
    const {
        language = '',
        proficiency = '',
        portfolio = [],
        certificates = [],
    } = profile
    const profileAdvanced = {
        resumes,
        language,
        proficiency,
        certificates,
        portfolio,
    }
    state.profileAdvanced = profileAdvanced
    // profileBroadcast
    const {
        isActive = true,
        isSubscribed = true,
        birthDate = '',
        gender = '',
        educationLevel = '',
        educationCategory = []
    } = profile
    const profileBroadcast = {
        isActive,
        isSubscribed,
        birthDate,
        gender,
        educationLevel,
        educationCategory
    }
    state.profileBroadcast = profileBroadcast
}
function checkHasDescription() {
    const { description = '' } = state.profileBasic
    return description && description !== '<p></p>'
}
async function getUserCertificate(item = {}) {
    const { name = '', url = '', } = item
    $sweet.loader(true)
    const res = await repoUser.getUserCertificate({
        fileName: name,
    })
    $sweet.loader(false)
    if (res.status !== 200) {
        return
    }
    const buffer = res.data
    return buffer
}
async function getUserResume(item = {}) {
    const { name = '' } = item
    $sweet.loader(true)
    const res = await repoUser.getUserResume({
        fileName: name
    })
    $sweet.loader(false)
    if (res.status !== 200) {
        return
    }
    const buffer = res.data
    return buffer
}
function setDescription(value) {
    instance.refs.description.setData(value)
}
async function handleSubmitBasic() {
    if (state.profileBasic?.image?.buffer) {
        const image = await repoUser.putUserPhoto(state.profileBasic?.image)
        state.profileBasic.image = image
        const patchedUser = Object.assign({}, repoAuth.state.user, {
            image,
        })
        repoAuth.setUser(patchedUser)
    }
    // 檢核表單
    if (state.profileBasic.description === '<p></p>') {
        state.profileBasic.description = ''
    }
    const dom = document.querySelector(`#profileBasic`)
    const result = await $validate(dom)
    if (!result.isValid) {
        return
    }
    // 更新個人資料
    await repoUser.patchUserProfile(state.profileBasic)
    const patchedUser = Object.assign({}, repoAuth.state.user, state.profileBasic)
    repoAuth.setUser(patchedUser)
    await $sweet.succeed()
    // 判斷履歷數量
    if (!state.profileAdvanced.resumes.length) {
        await $sweet.info('上傳履歷後即可應徵工作', {
            title: '履歷未上傳',
        })
    }
}
async function handleSubmitAdvanced() {
    const dom = document.querySelector(`#profileAdvanced`)
    const result = await $validate(dom)
    if (!result.isValid) {
        return
    }
    // 更新履歷pdf
    $sweet.loader(true)
    const validResumes = state.profileAdvanced.resumes.filter((item) => item.url)
    const reseumeResponse = await repoUser.putUserResumes(validResumes)
    state.profileAdvanced.resumes = reseumeResponse.data
    // 更新Blobs
    const validPorfolio = state.profileAdvanced.portfolio.filter((item) => {
        const { name = "", url = "" } = item
        const hasName = !!name.trim()
        const hasUrl = !!url.trim()
        return hasName && hasUrl
    })
    state.profileAdvanced.portfolio = validPorfolio
    const validCertificates = state.profileAdvanced.certificates.filter((item) => item.url)
    const certificatesRes = await repoUser.putUserCertificates(validCertificates)
    state.profileAdvanced.certificates = certificatesRes.data
    // 更新個人資料
    await repoUser.patchUserProfile(state.profileAdvanced)
    const patchedUser = Object.assign({}, repoAuth.state.user, state.profileAdvanced)
    repoAuth.setUser(patchedUser)
    $sweet.succeed()
    // 判斷基本資料
    const { user } = repoAuth.state
    const requiredFieds = ['name', 'email']
    const incompleteFields = requiredFieds.filter(field => {
        return !user[field] || !String(user[field]).trim()
    })
    if (state.profileAdvanced.resumes.length && incompleteFields.length) {
        await $sweet.info('填寫基本資料後即可應徵工作', {
            title: '基本資料未完成',
        })
    }
}
async function handleSubmitBroadcast() {
    const domAdvanced = document.querySelector(`#profileBroadcast`)
    const resultAdvanced = await $validate(domAdvanced)
    if (!resultAdvanced.isValid) {
        return
    }
    // 再更新個人資料
    await repoUser.patchUserProfile(state.profileBroadcast)
    const patchedUser = Object.assign({}, repoAuth.state.user, state.profileBroadcast)
    repoAuth.setUser(patchedUser)
    $sweet.succeed()
}
</script>
<style lang="scss" scoped>
.profile {
    padding: 20px;

    .profile_header {
        color: var(--Grays-Prim, #222);

        /* Title/H1-36-Semibold */
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
        /* 100% */
    }

    .profile__desc {
        margin-top: 30px;
        text-align: justify;
    }

    .profile__hr {
        margin: 30px 0px;
        border-top: 0px;
        opacity: 1;
        border-bottom: 1px solid var(--Grays-Quat, #EDEAEA);
    }

    .profile__card {
        border-radius: 10px;
        background: var(--Grays-Quin, #FFF);
        padding: 20px;
        // box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

        .card__header {
            color: var(--Grays-Seco, #484848);

            /* H2-20-Regular */
            font-family: "PingFang TC";
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-bottom: 30px;
        }
    }

    .profile__card--mt {
        margin-top: 30px;
    }

    .profile__basic {
        .basic__image {
            display: flex;
            justify-content: center;
        }
    }

    .broadcast__subGroup {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        gap: 30px;

        .subGroup__item {
            flex-grow: 0.5;

            .isActive__desc {
                line-height: 1;
                white-space: pre-wrap;
            }
        }
    }

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

    .profile__management {
        display: flex;
        font-size: 18px;
        font-weight: bold;

        .managemement__others {
            color: #5ea88e;
        }
    }

    .profile__languageGroup {
        display: flex;
        flex-direction: column;
    }


    .profile__footer {
        display: flex;
        justify-content: center;
    }

    .card__hr {
        border-top: 0px;
        border-bottom: 1px solid var(--Grays-Quat, #EDEAEA);
        opacity: 1;
        margin: 30px 0px;
    }

    .card__footer {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }
}

@media screen and (min-width: 992px) {
    .profile {
        padding: 0px;
        padding-bottom: 70px;
        padding-left: 30px;

        .profile__basic {
            display: flex;
            gap: 32px;

            .basic__image {
                display: flex;
                justify-content: center;
            }

            .basic__contact {
                width: 100%;
            }
        }

        .broadcast__subGroup {
            flex-direction: row;
        }

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