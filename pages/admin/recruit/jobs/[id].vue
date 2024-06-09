<template>
    <div v-if="repoSelect.state.selectByQueryRes && state.job" class="form">
        <LazyAtomQuickImport class="form__quick" name="職缺連結" @click="crawlFromLink($event)"
            :placeholder="'範例：https://www.104.com.tw/job/*'">
            在此貼上您的企業在104上「職缺瀏覽頁面」的網站連結，即可快速建立職缺基本資訊
            <br>
            範例：https://www.104.com.tw/job/*
        </LazyAtomQuickImport>
        <div class="job__card">
            <div class="form__header">
                職缺狀態
            </div>
            <LazyAtomInputSwitch class="mt-1" v-model="state.job.status"
                @update:modelValue="checkWalletBallance($event)">
            </LazyAtomInputSwitch>
            <LazyAtomInputText v-model="state.job.name" name="職缺名稱" required :disabled="state.disabled" class="mt-4">
            </LazyAtomInputText>
            <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="職務類型" :max="3"
                :flat="true" required class="mt-4">
                <template v-slot:header>
                    <LazyMoleculeProfileSelectLabels v-model="state.job.occupationalCategory" placeholder="職務類型"
                        :items="repoSelect.jobCategory">
                    </LazyMoleculeProfileSelectLabels>
                </template>
                <template v-slot:body>
                    <LazyMoleculeFilterCategory v-model="state.job.occupationalCategory" :items="repoSelect.jobCategory"
                        :categoryMap="repoSelect.jobCategoryMap" :max="3" :isLarge="device.state.isLarge" required
                        name="職務類型">
                    </LazyMoleculeFilterCategory>
                </template>
            </LazyMoleculeProfileSelectContainer>
            <LazyAtomInputSelect v-model="state.job.responsibilities" name="職務職級" required
                :items="repoSelect.state.selectByQueryRes.responsibilities" :disabled="state.disabled" class="mt-4">
            </LazyAtomInputSelect>
            <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.employmentType" name="僱傭模式" required
                :disabled="state.disabled" class="mt-4">
                <template v-slot:header>
                    <LazyMoleculeProfileSelectLabels v-model="state.job.employmentType" placeholder="僱傭模式"
                        :items="repoSelect.state.selectByQueryRes.employmentType">
                    </LazyMoleculeProfileSelectLabels>
                </template>
                <template v-slot:body>
                    <LazyAtomInputCheckMultiple v-model="state.job.employmentType"
                        :items="repoSelect.state.selectByQueryRes.employmentType" class="m-3">
                    </LazyAtomInputCheckMultiple>
                </template>
            </LazyMoleculeProfileSelectContainer>
            <div class="form__salary mt-4">
                <div class="salary__type">
                    <LazyAtomInputRadio v-model="state.job.salaryType" name="薪資類型" required
                        :items="repoSelect.state.selectByQueryRes.salaryType">
                    </LazyAtomInputRadio>
                </div>
                <div class="d-md-flex gap-2 mt-4">
                    <LazyAtomInputMoney v-model="state.job.salaryMin" :name="'經常性起薪'"
                        :placeholder="`請輸入最低${$optionText(state.job.salaryType, repoSelect.state.selectByQueryRes.salaryType)}`"
                        :disabled="state.disabled" :min="getMinSalary()" required class="inputGroup__lowerBound">
                    </LazyAtomInputMoney>
                    <LazyAtomInputMoney v-model="state.job.salaryMax" :name="'經常性頂薪'"
                        :placeholder="`請輸入最高${$optionText(state.job.salaryType, repoSelect.state.selectByQueryRes.salaryType)}`"
                        :disabled="state.disabled" :min="getMinSalary(state.job.salaryMin)"
                        class="inputGroup__upperBound">
                    </LazyAtomInputMoney>
                    <template v-if="state.job.salaryType === 'monthly'">
                        <LazyAtomInputMoney v-model="state.job.incentiveCompensation" :name="'全年非經常性薪資'"
                            placeholder="請輸入全年非經常性薪資" class="inputGroup__irregular" :disabled="state.disabled">
                        </LazyAtomInputMoney>
                    </template>
                </div>
            </div>
            <LazyAtomInputSelect v-model="state.job.jobLocationType" name="遠端工作彈性" required class="mt-4"
                :items="repoSelect.state.selectByQueryRes.jobLocationType" :disabled="state.disabled"
                @change="resetAddress()">
            </LazyAtomInputSelect>
            <div v-if="repoSelect.state.locationRes" class="form__addressGroup">
                <LazyAtomInputSelect class="addressGroup__addressRegion" v-model="state.job.addressRegion" name="工作縣市"
                    :items="repoSelect.state.locationRes.taiwan"
                    :disabled="state.disabled || state.job.jobLocationType === 'fullyRemote'"
                    :required="checkAddressRequired()" @change="clearAddress()" :placeholderDisabled="false">
                </LazyAtomInputSelect>
                <LazyAtomInputSelect v-if="repoSelect.state.locationRes && state.job.addressRegion !== 'oversea'"
                    class="addressGroup__addressRegion" v-model="state.job.addressLocality" name="行政區"
                    :items="repoSelect.state.locationRes[state.job.addressRegion]"
                    :disabled="disabled || state.job.jobLocationType === 'fullyRemote'" :placeholderDisabled="false"
                    :required="checkAddressRequired()"></LazyAtomInputSelect>
                <LazyAtomInputText v-model="state.job.streetAddress" class="w-100" name="詳細地址" placeholder="詳細地址"
                    :disabled="state.job.jobLocationType === 'fullyRemote'" :required="checkAddressRequired()">
                </LazyAtomInputText>
            </div>
            <!-- <LazyAtomInputText v-model="state.job.remark" class="w-100 mt-4" name="地址備註" placeholder="例：全員全遠端工作，可自由選擇是否進辦公室"
                :disabled="state.job.jobLocationType === 'fullyRemote'">
            </LazyAtomInputText> -->
            <div class="d-flex mt-4">
                <LazyAtomInputSelect v-if="repoSelect.state?.selectByQueryRes?.language" v-model="state.job.language"
                    name="外文" :items="repoSelect.state.selectByQueryRes.language" :disabled="state.disabled"
                    :placeholder="'請選擇'">
                </LazyAtomInputSelect>
                <LazyAtomInputRadio v-if="repoSelect.state?.selectByQueryRes?.proficiency" name="程度" class="ms-3"
                    v-model="state.job.proficiency" :items="repoSelect.state.selectByQueryRes.proficiency"
                    :listStyle="state.radioStyle">
                </LazyAtomInputRadio>
            </div>
            <LazyAtomInputCkeditor v-model="state.job.description" name="職責簡介" :disabled="state.disabled" required
                ref="description" class="mt-4">
                <LazyOrganismChatOptimizeJobContentModal v-if="checkHasDescription()" name="職責簡介"
                    :modelValue="state.job" :field="'description'" @update:modelValue="setUpdatedJob($event)">
                </LazyOrganismChatOptimizeJobContentModal>
                <LazyOrganismChatGenerateJobDescriptionModal v-else v-model="state.job"
                    @update:modelValue="setUpdatedJob($event)">
                </LazyOrganismChatGenerateJobDescriptionModal>
            </LazyAtomInputCkeditor>
            <LazyAtomInputCkeditor v-model="state.job.skills" name="條件要求" required :disabled="state.disabled"
                :removePlatformLink="true" ref="skills" class="mt-4">
                <LazyOrganismChatOptimizeJobContentModal v-if="checkHasSkills()" name="條件要求" :modelValue="state.job"
                    :field="'skills'" @update:modelValue="setUpdatedJob($event)">
                </LazyOrganismChatOptimizeJobContentModal>
                <LazyOrganismChatGenerateJobSkillModal v-else v-model="state.job"
                    @update:modelValue="setUpdatedJob($event)">
                </LazyOrganismChatGenerateJobSkillModal>
            </LazyAtomInputCkeditor>
            <div v-if="state.job.preference" class="form__preference mt-4">
                <div class="preference__header">用人偏好</div>
                <div class="preference__body">
                    <template v-for="(questionGroup, key1) in repoSelect.state.questionsRes" :key="key1">
                        <div v-if="questionGroup.key !== 'culture'" class="body__questionGroup">
                            <div class="questionGroup__description">
                                <span class="nameGroup__required">* </span>{{ questionGroup.descCompany }}
                            </div>
                            <input v-show="false" :value="state.job.preference[questionGroup.key]" :data-required="true"
                                :data-name="questionGroup.descCompany">
                            <template v-for="(question, key2) in questionGroup.items"
                                :key="`questionGroup_${key1}_${key2}`">
                                <label v-if="question.textCompany" class="questionGroup__question">
                                    <input v-show="false" v-model="state.job.preference[questionGroup.key]"
                                        :value="question.value" type="radio"
                                        :disabled="questionGroup.key === 'culture' || state.disabled"
                                        class="question__input" />
                                    <div class="label__circle">
                                        <div class="circle__ring">

                                        </div>
                                        <div v-if="state.job.preference[questionGroup.key] === question.value"
                                            class="circle__content">

                                        </div>
                                    </div>
                                    {{ question.textCompany }}
                                </label>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="recruitJob__footer">
            <AtomBtnSimple class="footer__btn" @click="handleSave()">儲存</AtomBtnSimple>
            <AtomBtnSimple class="footer__btn" @click="handlePreview()" outline :disabled="!state.job?.identifier">
                儲存並預覽職缺
            </AtomBtnSimple>
            <AtomBtnSimple class="footer__btn" @click="showAlert()" outline color="danger">刪除職缺</AtomBtnSimple>
        </div>
        <!-- <LazyOrganismWalletNoBalanceModal ref="noBallanceModal"></LazyOrganismWalletNoBalanceModal> -->
    </div>
</template>
<script>
export default {
    name: 'job-id',
}
</script>
<script setup>
const { $sweet, $validate, $optionText, } = useNuxtApp()
const emit = defineEmits(['remove', 'save', 'update:modelValue'])
const route = useRoute()
const router = useRouter()
const repoSelect = useRepoSelect()
const repoJob = useRepoJob()
const repoAuth = useRepoAuth()
const repoAdmin = useRepoAdmin()
const device = useDevice()
const repoCompany = useRepoCompany()
const state = reactive({
    job: null,
    jobCategoryLevel2Dropdown: {},
    filterOpen: {
        occupationalCategory: false,
        employmentType: false,
    },
    bsModal: null,
    radioStyle: {
        display: 'flex',
        'align-items': 'center',
        'flex-wrap': 'wrap',
    }
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        },
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})
onMounted(() => {
    setJob()
})
watch(() => repoSelect.jobCategoryMap, () => {
    for (let key in repoSelect.jobCategoryMap) {
        state.jobCategoryLevel2Dropdown[key] = false
    }
}, { deep: true })
// methods
async function crawlFromLink(crawlerUrl = '') {
    $sweet.loader(true)
    const jobRes = await repoJob.getJobCrawlResult({
        url: crawlerUrl
    })
    $sweet.loader(false)
    if (jobRes.status !== 200) {
        return
    }
    const { header = {}, jobDetail = {}, condition = {} } = jobRes.data
    const { jobName = '' } = header
    const { other = '' } = condition
    const {
        jobDescription = '',
        salaryType = 50,
        salaryMin = 0,
        salaryMax = 0,
        addressArea, // 縣市
        addressRegion, // 縣市+行政區
        addressDetail,
        jobType = 1,
        manageResp = '',
    } = jobDetail
    // 檢核必要正確性
    const identifier = state.job?.identifier
    if (!identifier) {
        alert('資料已永久毀損')
        return
    }
    // convert type
    const salaryTypeMap = {
        60: 'yearly',
        50: 'monthly',
        10: '' // 面議
    }
    const newJobSalaryType = salaryTypeMap[salaryType] || 'monthly'
    // compose new job
    const { locationRes = {}, selectByQueryRes = {} } = repoSelect.state
    const { salaryType: salaryTypeItems, } = selectByQueryRes
    // 職務職級
    let responsibilitiesValue = ''
    if (manageResp) {
        responsibilitiesValue = 'manager'
    }
    // 雇用性質
    const jobTypeMap = {
        1: 'fullTime',
        2: 'partTime',
    }
    const employmentTypeValue = jobTypeMap[jobType] || 'fullTime'
    const targetSalaryType = salaryTypeItems.find(item => {
        return item.value === newJobSalaryType
    })
    // 地址
    const formattedAddressRegion = addressArea.replace('臺', '台')
    const level1Items = locationRes.taiwan
    const targetRegion = level1Items.find(item => {
        return item.text === formattedAddressRegion
    })
    const formatLocality = addressRegion.replace('臺', '台').replace(targetRegion.text, '')
    const level2Items = locationRes[targetRegion.value]
    const targetLocality = level2Items.find(item => {
        return item.text === formatLocality
    })
    // 給定新資料預設值
    const { company = {}, } = repoAuth.state
    const minSalary = targetSalaryType.min ?? 0
    const newJob = {
        identifier,
        name: jobName,
        description: jobDescription,
        salaryType: targetSalaryType.value,
        salaryMin: Math.max(salaryMin, minSalary),
        salaryMax: Math.max(salaryMax, minSalary),
        addressRegion: targetRegion?.value || null, // 縣市
        addressLocality: targetLocality?.value || null, // 行政區
        streetAddress: addressDetail, // 詳細地址
        skills: other,
        employmentType: [employmentTypeValue],
        responsibilities: responsibilitiesValue,
        jobLocationType: 'onSite',
        // 保留舊資料的值
        preference: state.job.preference ?? company.preference,
        organizationId: state.job?.organizationId ?? company.id,
        organizationName: state.job?.organizationName ?? company.name,
        image: state.job?.image ?? company.logo,
        jobBenefitFlags: state.job?.jobBenefitFlags ?? company.jobBenefitFlags,
        status: 'draft',
    }
    state.job = newJob
    setDescription(newJob.description)
    setSkills(newJob.skills)
}
const instance = getCurrentInstance()
function checkHasDescription() {
    const { description = '' } = state.job
    return description && description !== '<p></p>'
}
function checkHasSkills() {
    const { skills = '' } = state.job
    return skills && skills !== '<p></p>'
}
async function checkWalletBallance(value) {
    if (value !== 'active') {
        return
    }
    // const res = await repoCompany.getCompanyWalletBalance()
    // if (res.status !== 200) {
    //     return
    // }
    // const noBallanceModal = instance.refs.noBallanceModal
    // if (!res.data || res.data.balance === 0 && noBallanceModal) {
    //     noBallanceModal.openModal()
    // }
}
function setUpdatedJob(value) {
    const { name = '', description = '', skills = '' } = value
    state.job.name = name
    setDescription(description)
    setSkills(skills)
}
function setDescription(value) {
    instance.refs.description.setData(value)
}
function setSkills(value) {
    instance.refs.skills.setData(value)
}
async function handlePreview() {
    const isSuccess = await saveJob()
    if (isSuccess) {
        const job = state.job
        const { origin } = window.location
        const url = `${origin}/job/${job.identifier}`
        window.open(url)
    }
}
async function showAlert() {
    const alertResult = await $sweet.warning('一經刪除，無法還原')
    if (alertResult.value) {
        const deleteRes = await repoJob.deleteJobItem(state.job)
        if (deleteRes.status !== 200) {
            return
        }
        router.push({
            name: 'admin-recruit-jobs'
        })
    }
}
async function setJob() {
    const jobResponse = await repoAdmin.getJobById({
        jobId: route.params.id,
    })
    if (!jobResponse.status === 200) {
        return
    }
    const job = jobResponse.data || {}
    // 給定預設值
    const { company = {}, preference = {} } = repoAuth.state
    if (!job.preference) {
        job.preference = preference
    }
    if (!job.salaryType) {
        job.salaryType = "monthly"
    }
    if (job.status != 'active') {
        job.status = "closed"
    }
    const { user } = repoAuth.state
    if (!job.adminId && user) {
        job.adminId = user.id
    }
    if (!job.jobLocationType) {
        job.jobLocationType = "onSite"
    }
    if (!job.industry) {
        const { industry = [] } = company
        job.industry = industry
    }
    if (job.employmentType) {
        if (!Array.isArray(job.employmentType)) {
            job.employmentType = [job.employmentType]
        }
    } else {
        job.employmentType = []
    }
    if (!job.responsibilities) {
        job.responsibilities = ''
    }
    if (!job.language) {
        job.language = ''
    }
    state.job = job
}
function clearAddress() {
    state.job.addressLocality = ''
    state.job.streetAddress = ''
}
function getMinSalary(salaryMin = 0) {
    const { salaryType } = state.job
    const { selectByQueryRes } = repoSelect.state
    if (!selectByQueryRes || !salaryType) {
        return
    }
    const salaryTypeItem = selectByQueryRes.salaryType.find((item) => {
        return item.value === salaryType
    })
    const legalMin = Number(salaryTypeItem.min)
    const inputMin = Number(salaryMin)
    return Math.max(legalMin, inputMin)
}
function resetAddress() {
    state.job.addressRegion = ''
    state.job.addressLocality = ''
    state.job.streetAddress = ''
}
function checkAddressRequired() {
    const { jobLocationType = '' } = state.job
    return jobLocationType !== 'fullyRemote'
}
async function goback() {
    router.push({
        name: 'admin-recruit-jobs'
    })
}
async function saveJob() {
    const job = state.job
    if (job.status === 'active') {
        const result = await $validate()
        job.completeness = result.completeness
        if (!result.isValid) {
            return false
        }
    } else {
        const result = await $validate(undefined, {
            title: '請再次確認',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: '取消',
        })
        job.completeness = result.completeness
        if (!result.value) {
            return
        }
    }
    // 依據id判斷是否為新增
    await $sweet.loader(true) // IMPORTANT
    let response = null
    if (job.identifier) {
        response = await repoJob.putJobItem(job)
    } else {
        response = await repoJob.postJobItem(job)
    }
    if (response.status !== 200) {
        return
    }
    await $sweet.loader(false) // IMPORTANT
    return true
}
async function handleSave() {
    const isSuccess = await saveJob()
    if (isSuccess) {
        goback()
    }
}
</script>
<style lang="scss" scoped>
.recruitJob__footer {
    display: flex;
    gap: 8px;
    flex-direction: column;
}

.form {
    .job__card {
        border-radius: 10px;
        border: 1px solid #EDEAEA;
        padding: 24px 32px;
    }

    .form__header {
        font-size: 18px;
        font-weight: bold;
        display: flex;
        gap: 10px;


        .header__wallet {
            font-size: 18px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #5ea88e;
            display: flex;
            align-items: center;
            gap: 5px;

            .wallet__balance {
                width: 22px;
                height: 20px;

            }
        }
    }

    .form__quick {
        // background-color: #fee997;
        border-radius: 10px;
        border: 1px solid #EDEAEA;
        padding: 24px 32px;
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

    .form__salary {

        .salary__type {
            display: flex;
            align-items: center;
        }
    }

    .form__preference {
        .preference__header {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .preference__body {
            display: grid;
            grid-template-columns: auto auto;

            .body__questionGroup {
                display: flex;
                flex-direction: column;
                margin-bottom: 24px;

                .questionGroup__question {
                    display: flex;
                    align-items: center;
                    margin-top: 8px;

                    .question__input {
                        width: 24px;
                        height: 24px;
                        border: 1px solid #d3d3d3;
                        margin-right: 8px;
                    }
                }
            }
        }
    }
}

.label__circle {
    position: relative;
    width: 24px;
    height: 24px;
    margin-right: 8px;

    .circle__background {
        position: absolute;
        top: 0;
        left: 0;
    }

    .circle__ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
        border: 1px solid #999999;
        border-radius: 50%;
    }

    .circle__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 14px;
        height: 14px;
        background-color: #5ea88e;
        border-radius: 50%;
    }
}

@media screen and (min-width:992px) {
    .dropLayer__form {
        .form__addressGroup {

            margin-top: 1.5rem;
            display: flex;
            gap: 0.5rem;

            .addressGroup__addressRegion {
                width: 8rem;

            }
        }
    }

    .recruitJob__footer {
        flex-direction: row;
        margin-top: 20px;

        .footer__btn {
            width: 226px;
        }
    }
}
</style>