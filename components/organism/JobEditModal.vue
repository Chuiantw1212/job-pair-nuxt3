<template>
    <!-- Button trigger modal -->
    <button type="button" class="jobModal__btn" @click="openModal()">
        <div class="btn__text">
            {{ getJobName() }}
        </div>
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="`modal_${modelValue.identifier}`" tabindex="-1" aria-labelledby="jobModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl" data-bs-backdrop="static">
            <div v-if="state.job" class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="jobModalLabel">{{ getJobName() }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body jobItem" ref="jobItemRef">
                    <div v-if="repoSelect.state.selectByQueryRes" class="dropLayer__form">
                        <div class="form__header">職缺狀態</div>
                        <LazyAtomInputSwitch class="mt-1" width="91" height="32" fontSize="18" v-model="state.job.status">
                        </LazyAtomInputSwitch>
                        <LazyAtomInputText v-model="state.job.name" name="職缺名稱" required :disabled="state.disabled"
                            class="mt-4">
                        </LazyAtomInputText>
                        <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.occupationalCategory" name="職務類型"
                            :max="3" :flat="true" required class="mt-4">
                            <template v-slot:header>
                                <LazyMoleculeProfileSelectLabels v-model="state.job.occupationalCategory" placeholder="職務類型"
                                    :items="repoSelect.jobCategory">
                                </LazyMoleculeProfileSelectLabels>
                            </template>
                            <template v-slot:body>
                                <LazyMoleculeFilterCategory v-model="state.job.occupationalCategory"
                                    :items="repoSelect.jobCategory" :categoryMap="repoSelect.jobCategoryMap" :max="3"
                                    :isLarge="device.state.isLarge" required name="職務類型">
                                </LazyMoleculeFilterCategory>
                            </template>
                        </LazyMoleculeProfileSelectContainer>
                        <LazyAtomInputSelect v-model="state.job.responsibilities" name="職務職級" required
                            :items="repoSelect.state.selectByQueryRes.responsibilities" :disabled="state.disabled"
                            class="mt-4"></LazyAtomInputSelect>
                        <LazyMoleculeProfileSelectContainer v-model="state.filterOpen.employmentType" name="雇用性質" required
                            :disabled="state.disabled" class="mt-4">
                            <template v-slot:header>
                                <LazyMoleculeProfileSelectLabels v-model="state.job.employmentType" placeholder="雇用性質"
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
                                    :disabled="state.disabled" :min="getMinSalary()" required
                                    class="inputGroup__lowerBound">
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
                        <div class="d-lg-flex gap-2 mt-4">
                            <LazyAtomInputSelect v-model="state.job.addressRegion" class="w-10" name="工作縣市"
                                :items="repoSelect.state.locationRes.taiwan"
                                :disabled="state.disabled || state.job.jobLocationType === 'fullyRemote'"
                                :required="checkAddressRequired()" @change="clearAddress()" :placeholderDisabled="false">
                            </LazyAtomInputSelect>
                            <LazyAtomInputSelect
                                v-if="repoSelect.state.locationRes && state.job.addressRegion !== 'oversea'"
                                v-model="state.job.addressLocality" class="w-10" name="行政區"
                                :items="repoSelect.state.locationRes[state.job.addressRegion]"
                                :disabled="disabled || state.job.jobLocationType === 'fullyRemote'"
                                :placeholderDisabled="false" :required="checkAddressRequired()"></LazyAtomInputSelect>
                            <LazyAtomInputText v-model="state.job.streetAddress" class="w-100" name="詳細地址"
                                placeholder="詳細地址" :disabled="state.job.jobLocationType === 'fullyRemote'"
                                :required="checkAddressRequired()">
                            </LazyAtomInputText>
                        </div>
                        <LazyAtomInputText v-model="state.job.remark" class="w-100 mt-4" name="地址備註"
                            placeholder="例：全員全遠端工作，可自由選擇是否進辦公室" :disabled="state.job.jobLocationType === 'fullyRemote'">
                        </LazyAtomInputText>
                        <div class="d-flex mt-4">
                            <LazyAtomInputSelect v-if="repoSelect.state?.selectByQueryRes?.language"
                                v-model="state.job.language" name="外文" :items="repoSelect.state.selectByQueryRes.language"
                                :disabled="state.disabled">
                            </LazyAtomInputSelect>
                            <LazyAtomInputRadio v-if="repoSelect.state?.selectByQueryRes?.proficiency" name="程度"
                                class="ms-3" v-model="state.job.proficiency"
                                :items="repoSelect.state.selectByQueryRes.proficiency">
                            </LazyAtomInputRadio>
                        </div>
                        <LazyAtomInputCkeditor v-model="state.job.description" name="職責簡介" :disabled="state.disabled"
                            required :toolbar="state.toolbar" ref="description" class="mt-4">
                            <!-- <LazyOrganismChatGptModal name="職責簡介" :modelValue="state.job.description"
                                :chatRequest="handleChatDescription" @update:modelValue="setDescription($event)">
                            </LazyOrganismChatGptModal> -->
                        </LazyAtomInputCkeditor>
                        <LazyAtomInputCkeditor v-model="state.job.skills" name="條件要求" required :disabled="state.disabled"
                            :removePlatformLink="true" :toolbar="state.toolbar" ref="skills" class="mt-4">
                            <!-- <LazyOrganismChatGptModal name="條件要求" :modelValue="state.job.skills"
                                :chatRequest="handleChatSkills" @update:modelValue="setSkills($event)">
                            </LazyOrganismChatGptModal> -->
                        </LazyAtomInputCkeditor>
                        <div v-if="state.job.preference" class="form__preference mt-4">
                            <div class="preference__header">用人偏好</div>
                            <div class="preference__body">
                                <template v-for="(questionGroup, key1) in repoSelect.state.questionsRes" :key="key1">
                                    <div v-if="questionGroup.key !== 'culture'" class="body__questionGroup">
                                        <div class="questionGroup__description">
                                            <span class="text-danger">* </span>{{ questionGroup.descCompany }}
                                        </div>
                                        <input v-show="false" :value="state.job.preference[questionGroup.key]"
                                            :data-required="true" :data-name="questionGroup.descCompany">
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
                </div>
                <div class="modal-footer jobModal__footer">
                    <LazyAtomBtnSimple class="footer__button" @click="handleSave()">儲存</LazyAtomBtnSimple>
                    <LazyAtomBtnSimple class="footer__button btnSimple--outline--success" @click="closeModal()">取消
                    </LazyAtomBtnSimple>
                    <button class="jobModal__footer__btn" @click="showAlert()">
                        <img src="~/assets/admin/icon_delete_g.svg" label="刪除職缺">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $bootstrap, $sweet, $validate, $optionText, $requestSelector } = useNuxtApp()
const emit = defineEmits(['remove', 'save', 'update:modelValue'])
const repoSelect = useRepoSelect()
const repoJob = useRepoJob()
const repoAuth = useRepoAuth()
const repoChat = useRepoChat()
const device = useDevice()
const state = reactive({
    job: null,
    jobCategoryLevel2Dropdown: {},
    crawlerUrl: '',
    filterOpen: {
        occupationalCategory: false,
        employmentType: false,
    },
    bsModal: null,
    toolbar: [
        "heading",
        "|",
        'fontSize',
        "|",
        'bold',
        'italic',
        // 'link', // 正規表示式出來前，一律拿掉職缺超連結
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        '|',
        'removeFormat'
    ]
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return function () {
                return {}
            }
        },
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})
onMounted(() => {
    $requestSelector(`#modal_${props.modelValue.identifier}`, (element) => {
        const bsModal = new $bootstrap.Modal(element, {
            keyboard: false,
        })
        element.addEventListener('show.bs.modal', () => {
            setJob()
        })
        state.bsModal = bsModal
    })
})
watch(() => repoSelect.jobCategoryMap, () => {
    for (let key in repoSelect.jobCategoryMap) {
        state.jobCategoryLevel2Dropdown[key] = false
    }
}, { deep: true })
// methods
const instance = getCurrentInstance()
function setDescription(value) {
    instance.refs.description.setData(value)
}
function setSkills(value) {
    instance.refs.skills.setData(value)
}
async function handleChatDescription(value) {
    const res = await repoChat.postChatJobDescription({
        content: value,
    })
    return res
}
async function handleChatSkills(value) {
    const res = await repoChat.postChatJobDescription({
        content: value,
    })
    return res
}
function getJobName() {
    const { name = '' } = props.modelValue
    if (name && String(name).trim()) {
        return name
    } else {
        return '職缺草稿'
    }
}
async function showAlert() {
    const alertResult = await $sweet.warning('一經刪除，無法還原')
    if (alertResult.value) {
        const deleteRes = await repoJob.deleteJobItem(state.job)
        if (deleteRes.status !== 200) {
            return
        }
        emit("remove")
        closeModal()
    }
}
function openModal(status = null) {
    state.bsModal.show()
    if (status) {
        state.job.status = status
    }
}
function closeModal() {
    state.bsModal.hide()
}
function setJob() {
    const job = JSON.parse(JSON.stringify(props.modelValue))
    // 給定預設值
    if (!job.preference) {
        job.preference = {}
    }
    if (!job.salaryType) {
        job.salaryType = "monthly"
    }
    if (job.status != 'active') {
        job.status = "closed"
    }
    if (!job.adminId) {
        const { user } = repoAuth.state
        job.adminId = user.id
    }
    if (!job.jobLocationType) {
        job.jobLocationType = "onSite"
    }
    if (!job.industry) {
        const { company } = repoAuth.state
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
const jobItemRef = ref(null)
async function handleSave() {
    const jobItem = jobItemRef.value
    const job = state.job
    if (job.status === 'active') {
        const result = await $validate(jobItem)
        job.completeness = result.completeness
        if (!result.isValid) {
            return
        }
    } else {
        const result = await $validate(jobItem, {
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
    const updatedJob = response.data
    emit("update:modelValue", updatedJob)
    emit("save", updatedJob)
    closeModal()
}
defineExpose({
    openModal
})
</script>
<style lang="scss" scoped>
.jobModal__btn {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #5ea88e;
    border: none;
    background-color: inherit;

    .btn__text {
        max-width: 8rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;

    }

    &:hover {
        text-decoration: underline;
    }
}

.jobItem {

    .dropLayer__form {
        .form__header {
            font-size: 18px;
            font-weight: bold;
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

}

.jobModal__footer {
    display: flex;
    flex-wrap: nowrap;

    .jobModal__footer__btn {
        background-color: inherit;
        border: none;
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
</style>