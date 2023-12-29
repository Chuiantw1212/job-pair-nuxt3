<template>
    <div>
        <LazyAtomInputBanner v-model="state.companyBanner"></LazyAtomInputBanner>
        <div class="profile">
            <LazyAtomQuickImport v-if="state.isNewCompay" @click="crawlCompanyFromPlatform($event)">
                在此貼上您的企業在104、Yourator上「公司介紹頁面」的網站連結，即可快速建立企業基本資訊
                <br>
                範例：www.104.com.tw/companyInfo/*,
                www.yourator.co/companies/*
            </LazyAtomQuickImport>
            <div class="profile__body">
                <div class="body__basicInfo">
                    <h2 class="basicInfo__header">基本資料</h2>
                    <div class="basicInfo__desc">
                        以下資訊將會顯示給求職者查看，完整填答將有助於求職者對您的企業獲得更深入的認識
                    </div>
                    <div class="row basicInfo__body">
                        <div>Logo (建議：60px*60px)</div>
                        <LazyAtomInputPhotoSingle v-model="state.companyLogo" :placeholder="placeholderImage" class="mb-2">
                        </LazyAtomInputPhotoSingle>
                        <LazyAtomInputText v-model="state.companyInfo.name" name="企業名稱" required class="mb-2"
                            placeholder="請輸入企業法人名稱">
                        </LazyAtomInputText>
                        <LazyAtomInputText v-if="state.isNewCompay || state.companyInfo.taxID !== '90230587'"
                            v-model="state.companyInfo.taxID" name="統一編號" required placeholder="請輸入企業的統一編號（共8位阿拉伯數字）"
                            class="mb-2" :maxLength="8" :minLength="8">
                        </LazyAtomInputText>
                        <LazyAtomInputText v-else :modelValue="'Job Pair 無統編合作夥伴'" name="統一編號" required
                            placeholder="請輸入企業的統一編號（共8位阿拉伯數字）" class="mb-2" :maxLength="8" :minLength="8" :disabled="true">
                        </LazyAtomInputText>
                        <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.industry" name="產業類別" :max="5"
                            required class="mb-2">
                            <template v-slot:header>
                                <LazyMoleculeProfileSelectLabels v-model="state.companyInfo.industry" placeholder="產業類別"
                                    :items="repoSelect.industryItems">
                                </LazyMoleculeProfileSelectLabels>
                            </template>
                            <template v-slot:body>
                                <LazyMoleculeFilterCategory v-model="state.companyInfo.industry"
                                    :items="repoSelect.industryItems" :categoryMap="repoSelect.industryCategoryMap" :max="5"
                                    :isLarge="device.state.isLarge" required name="產業類別">
                                </LazyMoleculeFilterCategory>
                            </template>
                        </LazyMoleculeProfileSelectContainer>
                        <LazyAtomInputMobile v-model="state.companyInfo.telephone" name="手機號碼 (僅供Job Pair團隊聯繫使用)"
                            class="mb-2" required>
                        </LazyAtomInputMobile>
                        <div class="d-block d-md-flex gap-2">
                            <LazyAtomInputSelect v-if="repoSelect.state.locationRes"
                                v-model="state.companyInfo.addressRegion" name="總公司縣市" required placeholder="請選擇縣市"
                                :items="repoSelect.state.locationRes.taiwan"
                                @change="state.companyInfo.addressLocality = ''" class="mb-2">
                            </LazyAtomInputSelect>
                            <LazyAtomInputSelect v-if="repoSelect.state.locationRes"
                                v-model="state.companyInfo.addressLocality" name="行政區" class="mb-2" placeholder="請選擇鄉鎮市區"
                                :items="repoSelect.state.locationRes[state.companyInfo.addressRegion]" required>
                            </LazyAtomInputSelect>
                            <LazyAtomInputText v-model="state.companyInfo.streetAddress" name="詳細地址"
                                placeholder="請輸入道路或街名與巷弄號及樓層" class="mb-2 w-100" required>
                            </LazyAtomInputText>
                        </div>
                        <!-- <LazyAtomInputText v-model="state.companyInfo.remark" name="地址備註"
                            placeholder="例：全員全遠端工作，可自由選擇是否進辦公室" class="mb-2">
                        </LazyAtomInputText> -->
                        <LazyAtomInputText v-model="state.companyInfo.capital" name="資本額" placeholder="請輸入阿拉伯數字"
                            class="mb-2">
                        </LazyAtomInputText>
                        <LazyAtomInputText v-model="state.companyInfo.numberOfEmployees" name="員工人數" placeholder="請輸入阿拉伯數字"
                            class="mb-2">
                        </LazyAtomInputText>
                        <LazyAtomInputText v-if="state.companyInfo.url" name="官方網站" v-model="state.companyInfo.url.default"
                            class="mb-2">
                        </LazyAtomInputText>
                        <LazyAtomInputUploader v-model="state.companyImages" name="企業環境照片" :size="1048576"
                            :accept="'image/*'" :max="12">
                        </LazyAtomInputUploader>
                    </div>
                </div>
                <div class="body__companyInfo">
                    <LazyAtomInputCkeditor id="descriptionRef" v-model="state.companyInfo.description" name="企業介紹" required
                        class="mb-2" ref="descriptionRef">
                        <!-- <LazyOrganismChatCvModal v-model="state.companyInfo.description" name="企業介紹"
                            :chatRequest="handleChatRequest" @update:modelValue="setDescription($event)">
                        </LazyOrganismChatCvModal> -->
                    </LazyAtomInputCkeditor>
                    <LazyAtomInputCkeditor id="jobBenefitsRef" v-model="state.companyInfo.jobBenefits" name="福利制度" required
                        class="mb-1" ref="jobBenefitsRef" :removePlatformLink="true" @update:modelValue="setWelfareFlags()">
                        <!-- <LazyOrganismChatCvModal v-model="state.companyInfo.jobBenefits" name="福利制度"
                            :chatRequest="handleChatRequest" @update:modelValue="setJobBenefits($event)">
                        </LazyOrganismChatCvModal> -->
                    </LazyAtomInputCkeditor>
                    <div v-if="repoSelect.state.selectByQueryRes" class="companyInfo__welfare mb-2">
                        <div>
                            ※ 系統自動偵測項目
                        </div>
                        <ul>
                            <template v-for="(item, index) in repoSelect.state.selectByQueryRes.jobBenefits" :key="index">
                                <li v-if="state.jobBenefits[item.value].length" class="content__item">
                                    {{ item.text }}：{{ getWelfareString(item.value) }}
                                </li>
                            </template>
                        </ul>
                    </div>
                    <LazyAtomInputCheckMultiple v-if="repoSelect.state.questionsRes && state.companyInfo.preference"
                        v-model="state.companyInfo.preference.culture" name="企業文化風格" required
                        :items="repoSelect.state.questionsRes[5].items" :max="2" :itemText="'textCompany'">
                    </LazyAtomInputCheckMultiple>
                </div>
            </div>
            <div class="profile__footerGroup">
                <template v-if="state.isNewCompay">
                    <button class="footerGroup__submit" type="button"
                        @click="saveCompanyInfo({ validate: true, to: '/admin/recruit/jobs' })">
                        下一步
                    </button>
                </template>
                <template v-else>
                    <NuxtLink class="footerGroup__submit" :to="{ 'name': 'admin-design' }">
                        客製公司頁面
                    </NuxtLink>
                    <NuxtLink v-if="state.companyInfo.seoName" class="footerGroup__submit" target="_blank" :to="{
                        name: 'company-id',
                        params: {
                            id: state.companyInfo.seoName
                        }
                    }">
                        檢視公司頁面
                    </NuxtLink>
                    <NuxtLink v-else class="footerGroup__submit" target="_blank" :to="`/company/${state.companyInfo.id}`">
                        檢視公司頁面
                    </NuxtLink>
                    <button class="footerGroup__submit" type="button" @click="saveCompanyInfo({ validate: true })">
                        儲存
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'companyProfile',
}
</script>
<script setup>
import placeholderImage from './company.webp'
const jobBenefitsConfig = await import('./jobBenefits.json')
const { $validate, $sweet, } = useNuxtApp()
const device = useDevice()
const repoAuth = useRepoAuth()
const repoAdmin = useRepoAdmin()
const repoCompany = useRepoCompany()
const repoSelect = useRepoSelect()
const router = useRouter()
const currentInstance = getCurrentInstance()
const state = reactive({
    isNewCompay: false,
    companyInfo: {
        image: null,
        url: {
            default: ''
        },
        preference: {
            culture: []
        }
    },
    companyLogo: null,
    companyBanner: null,
    companyImages: [],
    imageRenderKey: Math.random(),
    filterOpen: {
        industry: false
    },
    jobBenefits: {
        learning: [],
        bonus: [],
        time: [],
        activity: [],
        subsidy: [],
        facility: [],
    },
    benefitFlags: ['learning', 'bonus', 'time', 'activity', 'subsidy', 'facility']
})
// hooks
watch(() => repoAuth.state.user, () => {
    initializeCompanyInfo()
}, { immediate: true })
onMounted(async () => {
    // 防求職者誤入
    const { user = {} } = repoAuth.state
    const isEmployee = user && user.type === 'employee'
    if (isEmployee) {
        await $sweet.alert('此E-mail已註冊身份為求職者，如要進行企業註冊請使用其他E-mail信箱。')
        router.push({
            name: 'index'
        })
    }
})
// methods
function getWelfareString(key) {
    const labels = state.jobBenefits[key]
    return labels.join(" ,")
}
function setWelfareFlags() {
    if (!state.companyInfo) {
        return
    }
    const { jobBenefits = "" } = state.companyInfo
    let welfareCopy = JSON.parse(JSON.stringify(jobBenefits))
    state.benefitFlags.forEach((welfareType) => {
        const labels = jobBenefitsConfig[welfareType]
        state.jobBenefits[welfareType] = labels.filter((keyword) => {
            return welfareCopy.includes(keyword)
        })
        state.jobBenefits[welfareType].forEach((label) => {
            welfareCopy = welfareCopy.replaceAll(label, "")
        })
    })
}
function getDefaultCompany(id = '') {
    const companyInfo = {
        id,
        jobBenefits: '',
        description: "",
        jobBenefitFlags: {
            learning: false,
            bonus: false,
            time: false,
            activity: false,
            subsidy: false,
            facility: false,
            blacklist: false,
        },
        preference: {
            culture: [],
        },
        url: {
            default: ''
        },
        remark: ''
    }
    return companyInfo
}
async function initializeCompanyInfo() {
    // 生成本地端company資料
    const { user } = repoAuth.state
    if (!user || !user.id || state.companyInfo.id) {
        return
    }
    // Load from store
    let companyInfo = getDefaultCompany()
    if (repoAuth.state.company) {
        companyInfo = JSON.parse(JSON.stringify(repoAuth.state.company))
    } else {
        const companyRes = await repoAdmin.getAdminCompany()
        // $sweet.loader(false)
        if (companyRes.status !== 200) {
            return
        }
        if (companyRes.data === false) {
            // 尚未註冊導回註冊畫面
            router.replace(`/admin/register`)
            state.isNewCompay = true
        }
        if (companyRes.data) {
            companyInfo = JSON.parse(JSON.stringify(companyRes.data))
        }
    }
    // Set company to local
    state.companyInfo = companyInfo
    state.companyLogo = companyInfo.logo
    state.companyBanner = companyInfo.banner
    state.companyImages = companyInfo.images ?? []

    const descriptionRef = currentInstance.refs.descriptionRef
    const jobBenefitsRef = currentInstance.refs.jobBenefitsRef
    if (descriptionRef) {
        descriptionRef.setData(state.companyInfo.description)
    }
    if (jobBenefitsRef) {
        jobBenefitsRef.setData(state.companyInfo.jobBenefits)
    }
    setWelfareFlags()
}
async function crawlCompanyFromPlatform(crawlerUrl = '') {
    const whiteList = ['.104.com.tw/company/', '.yourator.co/companies/', '.cakeresume.com/companies/']
    const targetPlatform = whiteList.find(url => {
        return crawlerUrl.includes(url)
    })
    if (!targetPlatform) {
        $sweet.alert('網址有誤')
        return
    }
    // 清空原有資料
    state.companyInfo = getDefaultCompany(state.companyInfo.id)
    $sweet.loader(true)
    const response = await repoCompany.getCompanyByCrawler({
        url: crawlerUrl,
    })
    if (response.status !== 200) {
        return
    }
    $sweet.loader(false)
    const crawlerCompany = response.data
    if (targetPlatform === '.104.com.tw/company/') {
        await set104CompanyInfo(crawlerCompany)
    }
    if (targetPlatform === '.yourator.co/companies/') {
        await setYouratorCompanyInfo(crawlerCompany)
    }
    if (targetPlatform === '.cakeresume.com/companies/') {
        await setCakeresumeCompanyInfo(crawlerCompany)
    }
    // 拿掉被占用的欄位
    if (state.companyInfo.telephone === '暫不提供') {
        state.companyInfo.telephone = ''
    }
    // 設定CKEditor文字
    currentInstance.refs.descriptionRef.setData(state.companyInfo.description)
    currentInstance.refs.jobBenefitsRef.setData(state.companyInfo.jobBenefits)
}
async function setCakeresumeCompanyInfo(response) {
    const {
        name = '',
        products = '',
        mission = '',
        media = '',
        jobBenefits = '',
        addressRegion = '',
        addressLocality = '',
        numberOfEmployees = 0,
        streetAddress = '',
        capital = null,
        url = {
            default: '',
        },
        profile = '',
        idea = '',
        story = '',
        logo,
    } = response
    let description = ""
    if (description) {
        description += `公司介紹`
        description += `${response.description}<br>`
    }
    if (products) {
        description += `產品或服務`
        description += `${products}<br>`
    }
    if (mission) {
        description += `使命`
        description += `${mission}<br>`
    }
    if (media) {
        description += `媒體曝光`
        description += `${media}<br>`
    }
    const companyInfo = {
        name,
        description,
        jobBenefits,
        addressRegion,
        addressLocality,
        numberOfEmployees,
        streetAddress,
        capital,
        url,
        profile,
        idea,
        story,
        logo,
    }
    state.companyLogo = JSON.parse(JSON.stringify(companyInfo.logo))
    delete companyInfo.logo
    state.companyInfo = Object.assign(state.companyInfo, companyInfo)
}
async function setYouratorCompanyInfo(response) {
    const {
        addressRegion = '',
        addressLocality = '',
        numberOfEmployees = 0,
        streetAddress = '',
        capital = 0,
        url = {
            default: '',
        },
        profile = '',
        jobBenefits = '',
        idea = '',
        story = '',
        name,
        logo,
        welfare,
    } = response
    // 合併欄位
    let description = ""
    if (profile) {
        description += `公司介紹`
        description += `${profile}`
    }
    if (idea) {
        description += `公司理念`
        description += `${idea}`
    }
    if (story) {
        description += `創辦故事`
        description += `${story}`
    }
    // 合成資料
    const companyInfo = {
        streetAddress,
        addressRegion, // 市
        addressLocality, // 區
        name,
        capital,
        numberOfEmployees,
        telephone: '',
        url,
        jobBenefits,
        description,
        logo,
    }
    state.companyLogo = JSON.parse(JSON.stringify(companyInfo.logo))
    delete companyInfo.logo
    state.companyInfo = Object.assign(state.companyInfo, companyInfo)
}
async function set104CompanyInfo(response) {
    const {
        legalTagNames = [],
        tagNames = [],
        custName,
        // industryDesc,
        // indcat,
        empNo,
        capital,
        address,
        custLink,
        profile,
        product,
        // jobBenefits,
        management,
        // phone,
        // fax,
        // hrName,
        // news,
        addrNoDesc,
        logo,
    } = response
    // 先找到第一級行政區
    const addressRegionText = address.slice(0, 3)
    const upperTaiDivision = addressRegionText.replace('臺', '台')
    const targetDivision = repoSelect.state.locationRes.taiwan.find((item) => {
        return item.text === upperTaiDivision
    })
    const addressRegion = targetDivision.value
    const addressLocalityItems = repoSelect.state.locationRes[addressRegion]
    const addressLocalityText = address.slice(3, 6)
    const targetDivisionLevel2 = addressLocalityItems.find((item) => {
        return item.text === addressLocalityText
    })
    const addressLocality = targetDivisionLevel2.value
    // 找到第二級行政區
    const addressDesc = address.replace(addrNoDesc, "")
    // 合併四個欄位
    let description = ""
    if (profile) {
        description += `企業簡介<br>`
        description += `${profile}<br>`
    }
    if (product) {
        description += `<br>主要商品或服務<br>`
        description += `${product}<br>`
    }
    if (management) {
        description += `<br>經營理念<br>`
        description += `${management}<br>`
    }
    // benefit tags
    let jobBenefits = response.welfare
    if (legalTagNames.length) {
        const legalItemList = legalTagNames.join(', ')
        const legalItems = `法定項目<br>
                ${legalItemList}<br><br>`
        jobBenefits += legalItems
    }
    if (tagNames.length) {
        const tagNameList = tagNames.join(', ')
        const tagNameItems = `其他福利<br>
                ${tagNameList}<br><br>`
        jobBenefits += tagNameItems
    }
    // 合成資料
    const companyInfo = {
        streetAddress: addressDesc,
        addressRegion, // 市
        addressLocality, // 區
        name: custName,
        capital,
        numberOfEmployees: empNo,
        // telephone: phone, // 限制只能用手機
        url: {
            default: custLink,
        },
        profile,
        product,
        description,
        logo,
        jobBenefits,
    }
    if (typeof companyInfo.logo === 'object') {
        state.companyLogo = JSON.parse(JSON.stringify(companyInfo.logo))
        delete companyInfo.logo
    }
    state.companyInfo = Object.assign(state.companyInfo, companyInfo)
}
async function saveCompanyInfo(config) {
    const { validate = false, to = '' } = config
    if (validate) {
        const result = await $validate()
        if (!result.isValid) {
            return
        }
    }
    state.companyInfo.jobBenefitFlags = {}
    state.benefitFlags.forEach(welfareType => {
        const labels = jobBenefitsConfig[welfareType]
        if (Array.isArray(labels)) {
            const findResult = labels.find(word => {
                return state.companyInfo.jobBenefits.includes(word)
            })
            if (findResult) {
                state.companyInfo.jobBenefitFlags[welfareType] = true
            }
        }
    })
    /**
     * 這個時間點admin已經註冊，
     * 但寫入一律用user.uid操作
     */
    $sweet.loader(true)
    let companyRes = null
    if (state.companyInfo.id) {
        companyRes = await repoCompany.patchCompany(state.companyInfo)
    } else {
        const { user } = repoAuth.state
        state.companyInfo.email = user.email
        state.companyInfo.admins = [user.id]
        companyRes = await repoAdmin.postAdminNewCompany(state.companyInfo)
    }
    if (companyRes.status !== 200) {
        return false
    }
    // set blobs
    if (state.companyBanner && typeof state.companyBanner !== 'string') {
        try {
            repoCompany.putCompanyBannerBlob(state.companyBanner)
        } catch (error) {
            console.log(error.message);
        }
    }
    if (state.companyLogo && typeof state.companyLogo !== 'string') {
        try {
            repoCompany.putCompanyLogoBlob(state.companyLogo)
        } catch (error) {
            console.log(error.message);
        }
    }
    if (state.companyImages.length) {
        try {
            repoCompany.putCompanyPhotos(state.companyImages)
        } catch (error) {
            console.log(error.message);
        }
    }
    // set company
    const updatedResult = companyRes.data
    repoAuth.setCompany(updatedResult)
    if (to) {
        await $sweet.info('可以發佈職缺囉！記得至e-mail信箱收身份驗證信。', {
            title: '身分驗證',
            icon: 'info',
            confirmButtonText: '發佈職缺',
        })
        router.push(to)
    } else {
        $sweet.succeed()
    }
}
</script>
<style lang="scss" scoped>
.profile {
    background-color: white;
    padding: 48px 32px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    margin-top: 20px;
    border-radius: 10px;

    .profile__body {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;

        .body__basicInfo {
            flex-grow: 0.5;
            margin-bottom: 24px;

            .basicInfo__header {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 4px;
            }

            .basicInfo__desc {
                font-size: 12px;
                margin-bottom: 16px;
            }
        }
    }

    .profile__footerGroup {
        display: flex;
        justify-content: flex-end;
        gap: 24px;

        .footerGroup__submit {
            border: none;
            color: white;
            background-color: #29b0ab;
            border-radius: 10px;
            padding: 12px 16px;
            text-decoration: none;
        }
    }
}
</style>