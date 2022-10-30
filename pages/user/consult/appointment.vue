<template>
    <div class="appointment">
        <AppointmentCard class="appointment__theme">
            <template v-slot:header>
                選擇諮詢主題
            </template>
            <template v-slot:body>
                <div class="appointment__theme__body">
                    <InputSelect v-model="appointmentForm.service" name="預約服務" :items="selectByQueryRes.consultService"
                        @change="replaceRoute()" class="details__dropdown" required></InputSelect>
                    <InputTextarea v-model="appointmentForm.question" name="諮詢提問" class="mt-2" placeholder="請對諮詢師提問"
                        required>
                    </InputTextarea>
                </div>
            </template>
        </AppointmentCard>
        <AppointmentCard class="appointment__consultant">
            <template v-slot:header>
                選擇諮詢師
            </template>
            <template v-slot:body>
                <ul class="appointment__tab">
                    <li v-for="(consultant, index) in consultants" :key="index" class="appointment__tab__item"
                        :class="{ 'appointment__tab__item--active': activeTab === consultant.id }"
                        @click="switchConsultant(consultant)">
                        {{ consultant.name }}</li>
                </ul>
                <template v-for="(consultant, index) in consultants" :key="index">
                    <template v-if="activeTab === consultant.id">
                        <template v-if="consultant.id === 'recommend'">
                            <div class="appointment__consultant__header">
                                <img class="appointment__consultant__image" src="./assets/default.webp"
                                    onerror="this.style.display = 'none'" />
                                <div class="appointment__consultant__name">
                                    {{ consultant.name }}
                                </div>
                            </div>
                            <div class="appointment__consultant__body">
                                <div class="body__header">關於我</div>
                                <div class="body__text">
                                    我們將針對您的經歷，安排最適合的諮詢師。
                                </div>
                            </div>
                            <FeedbackList v-model="consultantFeedbacks"></FeedbackList>
                            <ConsultTime v-model="appointmentForm.time" :consultant="{ id: 'recommend' }"
                                :key="consultant.key"></ConsultTime>
                        </template>
                        <template v-else>
                            <div class="appointment__consultant__header">
                                <img class="appointment__consultant__image" :src="getEnvImage(consultant.name)"
                                    onerror="this.style.display = 'none'" />
                                <div class="appointment__consultant__name">
                                    {{ consultant.name }}
                                </div>
                            </div>
                            <div class="appointment__consultant__body">
                                <div class="body__header">關於我</div>
                                <div class="body__text">
                                    {{ consultant.descLong }}
                                </div>
                            </div>
                            <FeedbackList v-model="consultant.feedbacks"></FeedbackList>
                            <ConsultTime v-model="appointmentForm.time" :consultant="consultant" :key="consultant.key">
                            </ConsultTime>
                        </template>
                    </template>
                </template>
            </template>
        </AppointmentCard>
        <div class="appointment__footer">
            <button class="footer__button" @click="submitAppointment()">確認預約</button>
        </div>
    </div>
</template>
<script setup>
const { $toggleLoader } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const repoConsult = useRepoConsult()
const state = reactive({
    activeTab: 'recommend',
    consultants: [],
    serviceOptions: [],
    timeOptions: [
        {
            text: "平日白天",
            value: "weekdayDay",
        },
        {
            text: "平日晚上",
            value: "weekdayNight",
        },
        {
            text: "假日上午",
            value: "weekendMorning",
        },
        {
            text: "假日晚上",
            value: "weekendEvening",
        },
        {
            text: "假日晚上",
            value: "weekendNight",
        },
    ],
    appointmentForm: {
        consultantId: 'recommend',
        service: '',
        question: '',
        time: {},
    },
})
onMounted(() => {
    loadConsultants()
})
const service = computed(() => {
    const { id = 'life' } = route.params
    return id
})
watchEffect(() => {
    state.appointmentForm.service = service
})
// methods
async function loadConsultants() {
    const response = await repoConsult.getConsultants()
    if (response.status !== 200) {
        return
    }
    // 建構預設諮詢師
    const recommendConsultant = {
        name: "為您安排",
        id: "recommend",
    }
    const shuffled = shuffle(response.data)
    const consultants = [recommendConsultant, ...shuffled]
    const allFeedBacks = []
    consultants.forEach(consultant => {
        const { feedbacks = [] } = consultant
        feedbacks.forEach(feedback => {
            feedback.to = consultant.name
            allFeedBacks.push(feedback)
        })
        consultant.key = Math.random()
    })
    this.consultants = consultants
    this.consultantFeedbacks = this.shuffle(allFeedBacks)
}
function replaceRoute() {
    this.$router.replace({
        name: this.$route.name,
        params: {
            id: this.appointmentForm.service
        }
    })
}
function switchConsultant(consultant) {
    consultant.key = Math.random()
    this.activeTab = consultant.id
    this.appointmentForm = Object.assign(this.appointmentForm, {
        consultantId: consultant.id,
        service: this.service,
        time: {},
    })
}
function getEnvImage(id) {
    return `https://storage.googleapis.com/${this.$storageBucket}/consultant/${id}/photo.webp`
}
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[rand]] = [array[rand], array[i]]
    }
    return array
}
function onConsultantChange(consultantId = "") {
    // 請選擇時重設
    this.appointmentForm.service = ''
    if (!consultantId) {
        this.$router.replace({
            name: this.$route.name,
        })
        return
    }
    this.$router.replace({
        name: this.$route.name,
        params: {
            id: consultantId,
        },
    })
    // 預設時全部開放
    if (consultantId === "recommend") {
        this.serviceOptions = this.selectByQueryRes.consultService
        return
    }
    // 設定選項
    const selectedConsultant = this.consultants.find((item) => {
        return item.id === consultantId
    })
    if (selectedConsultant) {
        const { services = [] } = selectedConsultant
        if (services.length === 1) {
            this.appointmentForm.service = services[0].value
        }
        this.serviceOptions = services
    }
}
async function submitAppointment() {
    const result = await this.$validate()
    if (!result.isValid) {
        return
    }
    this.appointmentForm.userId = this.user.id
    const VITE_APP_ECPAY_AMOUNT = `${import.meta.env.VITE_APP_ECPAY_AMOUNT}`
    this.appointmentForm.amount = VITE_APP_ECPAY_AMOUNT // IMPORTANT
    const response = await this.postConsultAppointment(this.appointmentForm)
    if (response.status !== 200) {
        this.consultants.forEach(item => {
            item.key = Math.random()
        })
        this.appointmentForm = {
            consultantId,
            service,
            question,
            time: {}, // 重新設定時段就好
        }
        return
    }
    document.write(response.data)
}
</script>
<style lang="scss" scoped>
.appointment {
    .appointment__tab {
        list-style: none;
        padding: 0;
        display: flex;
        border-bottom: 1px solid #ddd;
        width: 100%;
        overflow-x: auto;

        .appointment__tab__item {
            padding: 0 10px;
            white-space: nowrap;
            border-bottom: 2px solid white;
            color: #5ea88e;
            font-size: 15px;
            line-height: 1.3;
            cursor: pointer;
            transition: all 0.3s;
        }

        .appointment__tab__item--active {
            border-bottom: 2px solid #5ea88e;
        }
    }

    .appointment__consultant {
        margin-top: 20px;

        .appointment__consultant__header {
            padding: 0 20px;
            display: flex;
            align-items: center;

            .appointment__consultant__image {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-right: 10px;
            }

            .appointment__consultant__name {
                font-size: 20px;
                font-weight: bold;
            }
        }

        .appointment__consultant__body {
            padding: 20px;

            .body__header {
                font-size: 16px;
                font-weight: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #999;
                // margin-top: 20px;
            }

            .body__text {
                font-size: 16px;
                font-weight: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #333;
            }
        }

    }

    .appointment__theme {

        .appointment__theme__body {
            padding: 0 20px;
        }

    }

    .appointment__footer {
        padding: 0 20px;
        width: 100%;

        .footer__button {
            margin: auto;
            margin-top: 20px;
            width: 218px;
            height: 46px;
            border: none;
            border-radius: 10px;
            background-color: #5ea88e;
            color: #fff;
            font-size: 20px;
            line-height: 20px;
            padding: 12px 0;
            display: block;
            text-decoration: none;
            text-align: center;
            white-space: nowrap;
        }
    }
}

@media screen and(min-width: 992px) {
    .appointment {

        .appointment__footer {
            padding: 0;

            .footer__button {
                width: 226px;
                height: 60px;
            }
        }
    }
}
</style>