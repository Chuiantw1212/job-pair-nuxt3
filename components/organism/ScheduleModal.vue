<template>
    <LazyAtomBtnSimple class="modal__button" @click="handleApply()" :disabled="getBtnDisabled()">
        安排面試
    </LazyAtomBtnSimple>
    <div class="modal fade" :id="`schedule${state.id}`" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">面試邀約信件</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" ref="modalBodyRef">
                    <LazyAtomInputText v-model="state.form.subject" name="信件主旨" :placeholder="'例如：XX公司面試邀約__王大雄__資深前端工程師'"
                        required>
                    </LazyAtomInputText>
                    <LazyAtomInputCkeditor v-model="state.form.templateHeader" name="前言" class="mt-3"
                        :ref="'templateHeaderRef'" required>
                    </LazyAtomInputCkeditor>
                    <LazyMoleculeInputEvents v-model="state.form.events" required></LazyMoleculeInputEvents>
                    <LazyAtomInputSelect v-model="state.form.duration" name="面試時長" :items="state.durationItems" required
                        class="content__duration mt-3">
                    </LazyAtomInputSelect>
                    <LazyAtomInputCkeditor v-model="state.form.templateFooter" name="結尾" class="mt-3"
                        :ref="'templateFooterRef'" required>
                    </LazyAtomInputCkeditor>
                </div>
                <div class="modal-footer">
                    <div class="footer__buttonGroup">
                        <LazyAtomBtnSimple class="footer__button  btnSimple--outline--primary" @click="closeEditModal()">取消
                        </LazyAtomBtnSimple>
                        <LazyAtomBtnSimple class="footer__button" @click="generateTemplate()">預覽</LazyAtomBtnSimple>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" :id="`preview${state.id}`" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">預覽信件</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <LazyAtomInputText v-model="state.form.subject" name="信件主旨" :placeholder="'例如：XX公司面試邀約__王大雄__資深前端工程師'"
                        :disabled="true" required>
                    </LazyAtomInputText>
                    <LazyAtomInputCkeditor v-model="state.form.template" name="信件內容" :disabled="true" :preview="true"
                        :toolbar="[]" :ref="'templateContentRef'" class="mt-3" required>
                    </LazyAtomInputCkeditor>
                </div>
                <div class="modal-footer">
                    <div class="footer__buttonGroup">
                        <LazyAtomBtnSimple class="footer__button  btnSimple--outline--primary" @click="showEditModal()">回上一步
                        </LazyAtomBtnSimple>
                        <LazyAtomBtnSimple class="footer__button" @click="sendInterviewRequest()">送出</LazyAtomBtnSimple>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
const { $bootstrap, $uuid4, $optionText, $validate, $sweet, $requestSelector, $emitter } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const repoJob = useRepoJob()
const repoJobApplication = useRepoJobApplication()
const router = useRouter()
const emit = defineEmits(['update:modelValue'])
const currentInstance = getCurrentInstance()
const state = reactive({
    id: null,
    editModal: null,
    previewModal: null,
    formTemplateParts: {
        header: '',
        body: '',
        footer: '',
    },
    form: {
        subject: '',
        templateHeader: '',
        templateFooter: '',
        duration: "",
        events: [
            {
                startDate: '',
                endDate: '',
            },
        ],
    },
    flatpickrInstances: [],
    numberZhMap: {
        0: '日',
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
    },
    durationItems: [
        {
            text: "0.5小時",
            value: 30,
        },
        {
            text: "1小時",
            value: 60,
        },
        {
            text: "1.5小時",
            value: 90,
        },
        {
            text: "2小時",
            value: 120,
        },
        {
            text: "2.5小時",
            value: 150,
        },
        {
            text: "3小時",
            value: 180,
        },
        {
            text: "3.5小時",
            value: 210,
        },
        {
            text: "4小時",
            value: 240,
        },
        {
            text: "4.5小時",
            value: 270,
        },
        {
            text: "5小時",
            value: 300,
        },
        {
            text: "5.5小時",
            value: 330,
        },
        {
            text: "6小時",
            value: 360,
        },
    ],
    job: null,
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
    },
})
onMounted(() => {
    if (process.client) {

        state.id = $uuid4()
        // 編輯用modal
        $requestSelector(`#schedule${state.id}`, (editableElement) => {
            state.editModal = new $bootstrap.Modal(editableElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
        // 預覽用modal
        $requestSelector(`#preview${state.id}`, (previewElement) => {
            state.previewModal = new $bootstrap.Modal(previewElement, {
                keyboard: false,
                backdrop: "static",
            })
        })
    }
})
onBeforeUnmount(() => {
    closeEditModal()
})
// methods
function getBtnDisabled() {
    const { user } = repoAuth.state
    return !user || !user.id
}
function getLocationText() {
    const { company } = repoAuth.state
    if (!company) {
        return
    }
    const { addressRegion, addressLocality, streetAddress } = company
    const text1 = $optionText(addressRegion, repoSelect.state.locationRes.taiwan)
    const items = repoSelect.state.locationRes[addressRegion]
    const text2 = $optionText(addressLocality, items)
    return `${text1}${text2}${streetAddress}`
}
function filterTime(item, duration) {
    const { startDate = '', } = item
    const isoStartDate = startDate.replace(' ', 'T')
    const startDateInstnace = new Date(isoStartDate)
    const endDateInstnace = new Date(isoStartDate)
    const minutes = endDateInstnace.getMinutes()
    endDateInstnace.setMinutes(minutes + Number(duration))
    const monthDay = new Intl.DateTimeFormat("zh", {
        month: "numeric",
        day: "2-digit",
    })
    const formatResult1 = monthDay.format(startDateInstnace)
    const dayIndex = startDateInstnace.getDay()
    const weekday = state.numberZhMap
    const character = weekday[dayIndex]
    const hourMinute = new Intl.DateTimeFormat("zh", {
        hour: "2-digit",
        minute: "2-digit",
    })
    const startHHMM = hourMinute.format(startDateInstnace)
    const endHHMM = hourMinute.format(endDateInstnace)
    return `${formatResult1}(${character}) ${startHHMM} ~ ${endHHMM}`
}
// console.log('getCurrentInstance', getCurrentInstance());
async function handleApply() {
    const { user, company } = repoAuth.state
    if (user && user.id) {
        // 先取得職缺相關資訊
        if (!state.job) {
            const jobResponse = await repoJob.getJobById({
                jobId: props.modelValue.jobId,
            })
            if (jobResponse.status !== 200) {
                return
            }
            state.job = jobResponse.data
        }
        // set data
        state.editModal.show()
        const { templateHeader = '', templateFooter = '', subject = '', duration = 0 } = state.job
        const defaultSubject = `${company.name}${state.job.name}面試通知`
        state.form.subject = subject ? subject : defaultSubject
        state.form.duration = duration ?? ""
        // Header
        const applicantName = props.modelValue.name
        const defaultHeader = `
                    ${applicantName} 您好<br>
                    我是${company.name}的HR ${user.name}，透過Job Pair收到您的履歷，並對您的經驗感到印象深刻。在與部門的主管討論後，想邀請您來參加第一階段的面試！<br>
                    <div>以下提供幾個面試時段供選擇：</div>
                `
        state.form.templateHeader = templateHeader ? recoverTemplate(templateHeader) : defaultHeader
        currentInstance.refs.templateHeaderRef.setData(state.form.templateHeader)
        // Footer
        const defaultFooter = `
                    當天將有 部門的 主管將與您進行面試，若有相關的文件可一併於面試時攜帶。<br>
                    公司地址：${getLocationText()}<br>
                    公司電話：${company.telephone ? company.telephone : '暫不提供'}<br>
                    公司官網：${company.url.default ? company.url.default : '暫不提供'}<br>
                    <br>
                    若您有意願參加面試，再麻煩回覆方便面試的時段，收到後我們與您會再次確認。<br>
                    <br>
                    若有任何問題，也歡迎透過E-mail信箱：${user.email}    聯絡我，期待您的回覆，謝謝！
                `
        state.form.templateFooter = templateFooter ? recoverTemplate(templateFooter) : defaultFooter
        currentInstance.refs.templateFooterRef.setData(state.form.templateFooter)
    } else {
        router.push('/')
    }
}
async function generateTemplate() {
    const form = currentInstance.refs.modalBodyRef
    const result = await $validate(form)
    if (!result.isValid) {
        return
    }
    // 加工時段
    const { events = [], duration = '' } = state.form
    const listItems = events.map(item => {
        const { startDate = '', endDate } = item
        if (startDate) {
            const timeString = filterTime(item, duration)
            return `<li>${timeString} </li>`
        }
    })
    const durationText = $optionText(duration, state.durationItems)
    const templateBody = `<ul>
                ${listItems}
            </ul><br>
            面試時間為${durationText}。<br>
            `
    // Handle Template
    const { templateHeader, templateFooter } = state.form
    const template = `${templateHeader}${templateBody}${templateFooter}`
    state.form.template = template
    const editorComponent = currentInstance.refs.templateContentRef
    editorComponent.setData(state.form.template)
    state.form.templateHeader = preserveTemplate(templateHeader)
    state.form.templateFooter = preserveTemplate(templateFooter)
    state.editModal.hide()
    state.previewModal.show()
}
async function sendInterviewRequest() {
    // 找出求職者姓名取代並更新申請文件
    const { user } = repoAuth.state
    const application = Object.assign({}, props.modelValue, state.form, {
        applicantId: props.modelValue.applicantId,
        jobId: props.modelValue.jobId,
        adminUid: user.uid,
        applyFlow: 'notified',
    })
    // 送出申請
    const patchResult = await repoJobApplication.patchJobApplicant(application)
    if (patchResult.status === 200) {
        await $sweet.succeed()
        state.editModal.hide()
        state.previewModal.hide()
        const updatedResult = Object.assign({}, application, patchResult.data)
        emit('update:modelValue', updatedResult)
    }
}
function preserveTemplate(template) {
    const { company, user } = repoAuth.state
    const companyName = company.name
    const companyEmail = company.email
    const companyPhone = company.telephone
    const companyWebsite = company.url.default
    const companyAddress = getLocationText()
    const applicantName = props.modelValue.name
    template = template.replaceAll(`${applicantName}`, `{{applicantName}}`)
    if (companyName) {
        template = template.replaceAll(companyName, `{{companyName}}`)
    }
    if (companyEmail) {
        template = template.replaceAll(companyEmail, `{{companyEmail}}`)
    }
    if (companyPhone) {
        template = template.replaceAll(companyPhone, `{{companyPhone}}`)
    }
    if (companyWebsite) {
        template = template.replaceAll(companyWebsite, `{{companyWebsite}}`)
    }
    if (companyAddress) {
        template = template.replaceAll(companyAddress, `{{companyAddress}}`)
    }
    const jobName = state.job.name
    if (jobName) {
        template = template.replaceAll(jobName, `{{jobName}}`)
    }
    const hrName = user.name
    if (hrName) {
        template = template.replaceAll(hrName, `{{hrName}}`)
    }
    const hrEmail = user.email
    if (hrEmail) {
        template = template.replaceAll(hrEmail, `{{hrEmail}}`)
    }
    return template
}
function recoverTemplate(template) {
    const { company, user } = repoAuth.state
    const applicantName = props.modelValue.name
    template = template.replaceAll(`{{applicantName}}`, `${applicantName}`)
    const companyName = company.name
    template = template.replaceAll('{{companyName}}', companyName)
    const companyPhone = company.telephone
    template = template.replaceAll(`{{companyPhone}}`, companyPhone)
    const companyWebsite = company.url.default
    template = template.replaceAll(`{{companyWebsite}}`, companyWebsite)
    const companyEmail = company.email
    template = template.replaceAll(`{{companyEmail}}`, companyEmail)
    const companyAddress = getLocationText()
    template = template.replaceAll(`{{companyAddress}}`, companyAddress)
    const jobName = state.job.name
    template = template.replaceAll(`{{jobName}}`, jobName)
    const hrName = user.name
    template = template.replaceAll(`{{hrName}}`, hrName)
    const hrEmail = user.email
    template = template.replaceAll(`{{hrEmail}}`, hrEmail)
    return template
}
function closeEditModal() {
    state.editModal.hide()
}
function showEditModal() {
    // 從模板拼湊
    const { templateHeader = '', templateFooter = '', } = state.form
    state.form.templateHeader = recoverTemplate(templateHeader)
    state.form.templateFooter = recoverTemplate(templateFooter)
    state.editModal.show()
    state.previewModal.hide()
}
</script>
<style lang="scss" scoped>
.modal__button {
    padding: 13px 16px;
}

.modal-content {
    border-radius: 10px;

    .modal-header {
        border: none;
        position: relative;
        text-align: center;

        .modal-title {
            width: 100%;
            font-weight: bold;
        }

        .btn-close {
            position: absolute;
            right: 24px;
            top: 24px;
        }
    }

    .modal-body {
        padding: 0 50px 30px 50px;

        .body__ckeditor {
            border-radius: 10px;
            border: solid 1px #d9d9d9;
            overflow: hidden;
        }

        .body__fieldName {
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.4;
            letter-spacing: normal;
            text-align: left;
            color: #1f1f1f;
            white-space: nowrap;
        }

        .body__hint {
            text-align: center;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.25;
            letter-spacing: 0.48px;
            text-align: center;
            color: #595959;
            width: 100%;
            margin-top: 17px;
        }

        .body__list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;

            .body__list__item {
                .body__list__item__content {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .content__header {
                        font-size: 16px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.4;
                        letter-spacing: normal;
                        text-align: left;
                        color: #1f1f1f;
                        white-space: nowrap;
                    }

                    .content__timePickerGroup {
                        display: flex;
                        flex-direction: column;
                        height: 54px;
                        margin-left: 32px;
                        width: 100%;

                        .timePickerGroup__timePicker {
                            padding: 16px 24px;
                            border: 1px solid #d9d9d9;
                            border-radius: 10px;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 1.25;
                            letter-spacing: 0.48px;
                            text-align: left;
                            color: #1f1f1f;

                            .picker__input {
                                border: none;

                                &:focus {
                                    outline: none;
                                }
                            }
                        }
                    }

                    .content__duration {
                        margin-left: 8px;
                    }
                }
            }
        }
    }

    .modal-footer {
        border: none;

        .footer__buttonGroup {
            display: flex;
            gap: 16px;

            .footer__button {
                width: 120px;
            }
        }
    }
}
</style>