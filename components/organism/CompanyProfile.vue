<template>
    <InputBanner v-model="state.companyBanner"></InputBanner>
    <div class="profile">
        <div v-if="state.isNewCompay" class="profile__quick">
            <h1 class="quick__header">快速建檔</h1>
            <div class="quick__desc">
                在此貼上您的企業在104、Yourator、Cakeresume上「公司介紹頁面」的網站連結，即可快速建立企業基本資訊
                <br>
                範例：https://www.104.com.tw/companyInfo/*,
                https://www.yourator.co/companies/*, https://www.cakeresume.com/companies/*
            </div>
            <div class="quick__inputGroup">
                <label class="inputGroup__label">
                    <input v-model="state.crawlerUrl" class="inputGroup__url"
                        placeholder="https://www.104.com.tw/companyInfo/*, https://www.yourator.co/companies/*, https://www.cakeresume.com/companies/*" />
                </label>
                <button class="inputGroup__button" @click="crawlCompanyFromPlatform()">一鍵帶入</button>
            </div>
        </div>
        <div class="profile__body">
            <div class="body__basicInfo">
                <h2 class="basicInfo__header">基本資料</h2>
                <div class="basicInfo__desc">
                    以下資訊將會顯示給求職者查看，完整填答將有助於求職者對您的企業獲得更深入的認識
                </div>
                <div class="row basicInfo__body">
                    <div>Logo (建議：60px*60px)</div>
                    <InputPhotoSingle v-model="state.companyLogo" class="mb-2">
                    </InputPhotoSingle>
                    <InputText v-model="state.companyInfo.name" name="企業名稱" required class="mb-2"
                        placeholder="請輸入企業法人名稱">
                    </InputText>
                    <InputText v-model="state.companyInfo.taxID" name="統一編號" required placeholder="請輸入企業的統一編號（共8位阿拉伯數字）"
                        class="mb-2" :max="8" :min="8">
                    </InputText>
                    <ProfileSelectContainer v-model="state.filterOpen.industry" name="產業類別" :max="5" required
                        class="mb-2">
                        <template v-slot:header>
                            <ProfileSelectLabels v-model="state.companyInfo.industry"
                                :jobCategoryMap="repoSelect.industryCategoryMap" placeholder="產業類別"
                                :items="repoSelect.industryItems">
                            </ProfileSelectLabels>
                        </template>
                        <template v-slot:body>
                            <FilterCategory v-model="state.companyInfo.industry" :items="repoSelect.industryItems"
                                :categoryMap="repoSelect.industryCategoryMap" :max="5"
                                :isDesktop="device.state.isDesktop" required name="產業類別">
                            </FilterCategory>
                        </template>
                    </ProfileSelectContainer>
                    <div class="d-block d-md-flex gap-2">
                        <InputSelect v-if="repoSelect.state.locationRes" v-model="state.companyInfo.addressRegion"
                            name="總公司縣市" required placeholder="請選擇縣市" :items="repoSelect.state.locationRes.taiwan"
                            @change="state.companyInfo.addressLocality = ''" class="mb-2">
                        </InputSelect>
                        <InputSelect v-if="repoSelect.state.locationRes" v-model="state.companyInfo.addressLocality"
                            name="行政區" class="mb-2" placeholder="請選擇鄉鎮市區"
                            :items="repoSelect.state.locationRes[state.companyInfo.addressRegion]" required>
                        </InputSelect>
                        <InputText v-model="state.companyInfo.streetAddress" name="詳細地址" placeholder="請輸入道路或街名與巷弄號及樓層"
                            class="mb-2 w-100" required>
                        </InputText>
                    </div>
                    <InputText v-model="state.companyInfo.telephone" name="電話 (僅供Job Pair團隊聯繫使用)" class="mb-2" required>
                    </InputText>
                    <InputText v-model="state.companyInfo.capital" name="資本額" placeholder="請輸入阿拉伯數字" class="mt-3 mb-2">
                    </InputText>
                    <InputText v-model="state.companyInfo.numberOfEmployees" name="員工人數" placeholder="請輸入阿拉伯數字"
                        class="mb-2">
                    </InputText>
                    <InputText v-if="state.companyInfo.url" name="官方網站" v-model="state.companyInfo.url.default"
                        class="mb-2">
                    </InputText>
                    <InputUploader v-model="state.companyImages" name="企業環境照片" :size="1048576" :accept="'image/*'"
                        :max="12">
                    </InputUploader>
                </div>
            </div>
            <div class="body__companyInfo">
                <InputCKEditor v-model="state.companyInfo.description" name="企業介紹" required class="mb-2"
                    :ref="'description'">
                </InputCKEditor>
                <InputCKEditor v-model="state.companyInfo.jobBenefits" name="福利制度" required class="mb-1"
                    :ref="'jobBenefits'" @update:modelValue="setWelfareFlags()">
                </InputCKEditor>
                <div v-if="repoSelect.state.selectByQueryRes" class="companyInfo__welfare mb-2">
                    <div>
                        ※ 系統自動偵測項目
                    </div>
                    <ul>
                        <template v-for="(item, index) in repoSelect.state.selectByQueryRes.jobBenefits" :key="index">
                            <li v-if="jobBenefits[item.value].length" class="content__item">
                                {{ item.text }}：{{ getWelfareString(item.value) }}
                            </li>
                        </template>
                    </ul>
                </div>
                <InputCheckMultiple v-if="repoSelect.state.questionsRes && state.companyInfo.preference"
                    v-model="state.companyInfo.preference.culture" name="企業文化風格" required
                    :items="repoSelect.state.questionsRes[5].items" :max="2" :itemText="'textCompany'">
                </InputCheckMultiple>
            </div>
        </div>
        <div class="profile__footerGroup">
            <template v-if="state.isNewCompay">
                <!-- <button class="footerGroup__submit" type="button" @click="saveCompanyInfo({ validate: false })">
                    暫存
                </button> -->
                <button class="footerGroup__submit" type="button"
                    @click="saveCompanyInfo({ validate: true, next: 'companyJobs' })">
                    下一步
                </button>
            </template>
            <template v-else>
                <button class="footerGroup__submit" type="button" @click="saveCompanyInfo({ validate: true })">
                    儲存
                </button>
            </template>
        </div>
    </div>
</template>
<script setup>
const { test } = await import('~/assets/jobBenefits.json')
const device = useDevice()
const repoSelect = useRepoSelect()
const state = reactive({
    crawlerUrl: "",
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
})
// import { mapActions, mapGetters, mapMutations } from "vuex"
// import jobBenefitsConfig from "./jobBenefits.json"
// import isDesktopMixin from "@/libs/desktopMixin.js"
// import { defineAsyncComponent } from 'vue'
// export default {
//     mixins: [isDesktopMixin],
//     components: {
//         InputBanner: defineAsyncComponent(() =>
//             import('@/components/atoms/input/InputBanner/InputBanner.vue')
//         ),
//         InputUploader: defineAsyncComponent(() =>
//             import('@/components/molecules/InputUploader/InputUploader.vue')
//         ),
//         ProfileSelectContainer: defineAsyncComponent(() =>
//             import('@/components/molecules/ProfileSelectContainer/ProfileSelectContainer.vue')
//         ),
//         ProfileSelectLabels: defineAsyncComponent(() =>
//             import('@/components/molecules/ProfileSelectContainer/ProfileSelectLabels.vue')
//         ),
//         FilterCategory: defineAsyncComponent(() =>
//             import('@/components/molecules/FilterCategory.vue')
//         ),
//     },
//     data: function () {
//         return {
//         }
//     },
//     computed: {
//         ...mapGetters([
//             "selectByQueryRes",
//             "userProfileRes",
//             "user",
//             "locationRes",
//             "questionsRes",
//             "industryCategoryMap",
//             "industryItems",
//             "company",
//         ]),
//     },
//     watch: {
//         user: {
//             handler: function (userValue) {
//                 this.initializeCompanyInfo(userValue)
//             },
//             immediate: true
//         },
//     },
//     methods: {
//         getWelfareString(key) {
//             const labels = this.jobBenefits[key]
//             return labels.join(" ,")
//         },
//         setWelfareFlags() {
//             if (!this.companyInfo) {
//                 return
//             }
//             const { jobBenefits = "" } = this.companyInfo
//             let welfareCopy = JSON.parse(JSON.stringify(jobBenefits))
//             for (let welfareType in jobBenefitsConfig) {
//                 if (welfareType === "blacklist") {
//                     continue
//                 }
//                 const labels = jobBenefitsConfig[welfareType]
//                 this.jobBenefits[welfareType] = labels.filter((keyword) => {
//                     return welfareCopy.includes(keyword)
//                 })
//                 this.jobBenefits[welfareType].forEach((label) => {
//                     welfareCopy = welfareCopy.replaceAll(label, "")
//                 })
//             }
//         },
//         getDefaultCompany(id = '') {
//             const companyInfo = {
//                 id,
//                 jobBenefits: '',
//                 description: "",
//                 jobBenefitFlags: {
//                     learning: false,
//                     bonus: false,
//                     time: false,
//                     activity: false,
//                     subsidy: false,
//                     facility: false,
//                     blacklist: false,
//                 },
//                 preference: {
//                     culture: [],
//                 },
//                 url: {
//                     default: ''
//                 },
//             }
//             return companyInfo
//         },
//         async initializeCompanyInfo(user) {
//             // 生成本地端company資料
//             if (!user || !user.id || this.companyInfo.id) {
//                 return
//             }
//             const companyRes = await this.getAdminCompany()
//             if (companyRes.status !== 200) {
//                 return
//             }
//             if (companyRes.data === false) {
//                 // 尚未註冊導回註冊畫面
//                 this.$router.replace({
//                     name: 'companyRegister'
//                 })
//                 this.isNewCompay = true
//             }
//             let companyInfo = this.getDefaultCompany()
//             if (companyRes.data) {
//                 companyInfo = JSON.parse(JSON.stringify(companyRes.data))
//             }
//             this.companyInfo = companyInfo
//             this.companyLogo = companyInfo.logo
//             this.companyBanner = companyInfo.banner
//             this.companyImages = companyInfo.images ?? []

//             if (this.$refs.description) {
//                 this.$refs.description.setData(this.companyInfo.description)
//             }
//             if (this.$refs.jobBenefits) {
//                 this.$refs.jobBenefits.setData(this.companyInfo.jobBenefits)
//                 this.setWelfareFlags()
//             }
//         },
//         async crawlCompanyFromPlatform() {
//             if (!this.crawlerUrl) {
//                 return
//             }
//             const whiteList = ['.104.com.tw/company/', '.yourator.co/companies/', '.cakeresume.com/companies/']
//             const targetPlatform = whiteList.find(url => {
//                 return this.crawlerUrl.includes(url)
//             })
//             if (!targetPlatform) {
//                 this.$alert('網址有誤')
//                 return
//             }
//             // 清空原有資料
//             this.companyInfo = this.getDefaultCompany(this.companyInfo.id)
//             this.$toggleLoader(true)
//             const response = await this.getCompanyByCrawler({
//                 url: this.crawlerUrl,
//             })
//             if (response.status !== 200) {
//                 return
//             }
//             this.$toggleLoader(false)
//             const crawlerCompany = response.data
//             if (targetPlatform === '.104.com.tw/company/') {
//                 await this.set104CompanyInfo(crawlerCompany)
//             }
//             if (targetPlatform === '.yourator.co/companies/') {
//                 await this.setYouratorCompanyInfo(crawlerCompany)
//             }
//             if (targetPlatform === '.cakeresume.com/companies/') {
//                 await this.setCakeresumeCompanyInfo(crawlerCompany)
//             }
//             // 拿掉被占用的欄位
//             if (this.companyInfo.telephone === '暫不提供') {
//                 this.companyInfo.telephone = ''
//             }
//             // 設定CKEditor文字
//             this.$refs.description.setData(this.companyInfo.description)
//             this.$refs.jobBenefits.setData(this.companyInfo.jobBenefits)
//         },
//         async setCakeresumeCompanyInfo(response) {
//             const {
//                 name = '',
//                 // description = '',
//                 products = '',
//                 mission = '',
//                 media = '',
//                 jobBenefits = '',
//                 addressRegion = '',
//                 addressLocality = '',
//                 numberOfEmployees = 0,
//                 streetAddress = '',
//                 capital = null,
//                 url = {
//                     default: '',
//                 },
//                 profile = '',
//                 idea = '',
//                 story = '',
//                 logo,
//             } = response
//             let description = ""
//             if (description) {
//                 description += `公司介紹`
//                 description += `${response.description}<br>`
//             }
//             if (products) {
//                 description += `產品或服務`
//                 description += `${products}<br>`
//             }
//             if (mission) {
//                 description += `使命`
//                 description += `${mission}<br>`
//             }
//             if (media) {
//                 description += `媒體曝光`
//                 description += `${media}<br>`
//             }
//             const companyInfo = {
//                 name,
//                 description,
//                 jobBenefits,
//                 addressRegion,
//                 addressLocality,
//                 numberOfEmployees,
//                 streetAddress,
//                 capital,
//                 url,
//                 profile,
//                 idea,
//                 story,
//                 logo,
//             }
//             this.companyLogo = JSON.parse(JSON.stringify(companyInfo.logo))
//             delete companyInfo.logo
//             this.companyInfo = Object.assign(this.companyInfo, companyInfo)
//         },
//         async setYouratorCompanyInfo(response) {
//             const {
//                 addressRegion = '',
//                 addressLocality = '',
//                 numberOfEmployees = 0,
//                 streetAddress = '',
//                 capital = 0,
//                 url = {
//                     default: '',
//                 },
//                 profile = '',
//                 jobBenefits = '',
//                 idea = '',
//                 story = '',
//                 name,
//                 logo,
//                 welfare,
//             } = response
//             // 合併欄位
//             let description = ""
//             if (profile) {
//                 description += `公司介紹`
//                 description += `${profile}`
//             }
//             if (idea) {
//                 description += `公司理念`
//                 description += `${idea}`
//             }
//             if (story) {
//                 description += `創辦故事`
//                 description += `${story}`
//             }
//             // 合成資料
//             const companyInfo = {
//                 streetAddress,
//                 addressRegion, // 市
//                 addressLocality, // 區
//                 name,
//                 capital,
//                 numberOfEmployees,
//                 telephone: '',
//                 url,
//                 jobBenefits,
//                 description,
//                 logo,
//             }
//             this.companyLogo = JSON.parse(JSON.stringify(companyInfo.logo))
//             delete companyInfo.logo
//             this.companyInfo = Object.assign(this.companyInfo, companyInfo)
//         },
//         async set104CompanyInfo(response) {
//             const {
//                 legalTagNames = [],
//                 tagNames = [],
//                 custName,
//                 // industryDesc,
//                 // indcat,
//                 empNo,
//                 capital,
//                 address,
//                 custLink,
//                 profile,
//                 product,
//                 // jobBenefits,
//                 management,
//                 phone,
//                 // fax,
//                 // hrName,
//                 // news,
//                 addrNoDesc,
//                 logo,
//             } = response
//             // 先找到第一級行政區
//             const addressRegionText = address.slice(0, 3)
//             const upperTaiDivision = addressRegionText.replace('台', '臺')
//             const targetDivision = this.locationRes.taiwan.find((item) => {
//                 return item.text === upperTaiDivision
//             })
//             const addressRegion = targetDivision.value
//             const addressLocalityItems = this.locationRes[addressRegion]
//             const addressLocalityText = address.slice(3, 6)
//             const targetDivisionLevel2 = addressLocalityItems.find((item) => {
//                 return item.text === addressLocalityText
//             })
//             const addressLocality = targetDivisionLevel2.value
//             // 找到第二級行政區
//             const addressDesc = address.replace(addrNoDesc, "")
//             // 合併四個欄位
//             let description = ""
//             if (profile) {
//                 description += `企業簡介<br>`
//                 description += `${profile}<br>`
//             }
//             if (product) {
//                 description += `<br>主要商品或服務<br>`
//                 description += `${product}<br>`
//             }
//             if (management) {
//                 description += `<br>經營理念<br>`
//                 description += `${management}<br>`
//             }
//             // benefit tags
//             let jobBenefits = response.welfare
//             if (legalTagNames.length) {
//                 const legalItemList = legalTagNames.join(', ')
//                 const legalItems = `法定項目<br>
//                 ${legalItemList}<br><br>`
//                 jobBenefits += legalItems
//             }
//             if (tagNames.length) {
//                 const tagNameList = tagNames.join(', ')
//                 const tagNameItems = `其他福利<br>
//                 ${tagNameList}<br><br>`
//                 jobBenefits += tagNameItems
//             }
//             // 合成資料
//             const companyInfo = {
//                 streetAddress: addressDesc,
//                 addressRegion, // 市
//                 addressLocality, // 區
//                 name: custName,
//                 capital,
//                 numberOfEmployees: empNo,
//                 telephone: phone,
//                 url: {
//                     default: custLink,
//                 },
//                 profile,
//                 product,
//                 description,
//                 logo,
//                 jobBenefits,
//             }
//             this.companyLogo = JSON.parse(JSON.stringify(companyInfo.logo))
//             delete companyInfo.logo
//             this.companyInfo = Object.assign(this.companyInfo, companyInfo)
//         },
//         async saveCompanyInfo(config) {
//             const { validate = false, next = '' } = config
//             if (validate) {
//                 const result = await this.$validate()
//                 if (!result.isValid) {
//                     return
//                 }
//             }
//             this.$toggleLoader(true)
//             const updatedCompany = await this.refineAndUpdateCompanyInfo()
//             if (!updatedCompany) {
//                 return
//             }
//             this.setCompany(updatedCompany)
//             if (next) {
//                 await this.$alert('請至E-mail 信箱內回覆身份驗證信', {
//                     title: '身分驗證',
//                     icon: 'info'
//                 })
//                 this.$router.push({
//                     name: next,
//                 })
//             } else {
//                 this.$succeed()
//             }
//         },
//         async refineAndUpdateCompanyInfo() {
//             const jobBenefitTypes = this.selectByQueryRes.jobBenefits.map(item => item.value)
//             this.companyInfo.jobBenefitFlags = {}
//             jobBenefitTypes.forEach(welfareType => {
//                 const labels = jobBenefitsConfig[welfareType]
//                 if (Array.isArray(labels)) {
//                     const findResult = labels.find(word => {
//                         return this.companyInfo.jobBenefits.includes(word)
//                     })
//                     if (findResult) {
//                         this.companyInfo.jobBenefitFlags[welfareType] = true
//                     }
//                 }
//             })
//             // update company infomation
//             /**
//              * 這個時間點admin已經註冊，
//              * 但寫入一律用user.uid操作
//              */
//             const adminUid = this.user.uid
//             let companyRes = null
//             if (this.companyInfo.id) {
//                 companyRes = await this.patchCompany(this.companyInfo)
//             } else {
//                 this.companyInfo.email = this.user.email
//                 this.companyInfo.admins = [this.user.id]
//                 companyRes = await this.postAdminNewCompany(this.companyInfo)
//             }
//             if (companyRes.status !== 200) {
//                 return false
//             }
//             //
//             const updatedResult = companyRes.data
//             const blobPromises = []
//             if (this.companyBanner && typeof this.companyBanner !== 'string') {
//                 const promise = this.putCompanyBannerBlob(this.companyBanner)
//                 blobPromises.push(promise)
//             }
//             if (this.companyLogo && typeof this.companyLogo !== 'string') {
//                 const promise = this.putCompanyLogoBlob(this.companyLogo)
//                 blobPromises.push(promise)
//             }
//             if (this.companyImages.length) {
//                 const promise = this.putCompanyPhotos(this.companyImages)
//                 blobPromises.push(promise)
//             }
//             const results = await Promise.all(blobPromises)
//             const hasError = results.some(result => result.status !== 200)
//             if (hasError) {
//                 return false
//             }
//             return updatedResult
//         },
//         ...mapActions([
//             "getCompanyByCrawler",
//             "patchCompany",
//             "putCompanyPhotos",
//             "getCompany104Logo",
//             "postAdminNewCompany",
//             "putCompanyLogoBlob",
//             "getAdminCompany",
//             "putCompanyBannerBlob",
//         ]),
//         ...mapMutations(['setCompany'])
//     },
// }
</script>
<style lang="scss" scoped>
.profile {
    background-color: white;
    padding: 48px 32px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    margin-top: 20px;

    .profile__quick {
        background-color: #fee997;
        padding: 24px 32px;
        border-radius: 5px;
        margin-bottom: 45px;

        .quick__header {
            font-size: 28px;
            font-weight: bold;
        }

        .quick__desc {
            font-size: 12px;
            margin-bottom: 16px;
        }

        .quick__inputGroup {
            display: flex;
            gap: 8px;

            .inputGroup__label {
                padding: 12px 16px;
                width: 100%;
                background-color: white;
                border-radius: 10px;

                .inputGroup__url {
                    width: 100%;
                    border: none;

                    &:focus {
                        outline: none;
                    }
                }
            }

            .inputGroup__button {
                padding: 12px 16px;
                background-color: #29b0ab;
                color: white;
                border-radius: 10px;
                white-space: nowrap;
                border: none;
            }
        }
    }

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

        .body__companyInfo {}
    }

    // }
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
        }
    }
}

@media screen and (min-width: 992px) {
    .profile {
        // margin-right: 8px;

        .profile__body {
            // flex-direction: row;
        }
    }
}
</style>