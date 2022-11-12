<template>
    <div class="appointment">
        <MoleculeAppointmentCard class="appointment__theme">
            <template v-slot:header>
                選擇諮詢主題
            </template>
            <template v-slot:body>
                <div class="appointment__theme__body">
                    <AtomInputSelect v-if="repoSelect.state.selectByQueryRes" v-model="state.appointmentForm.service"
                        name="預約服務" :items="repoSelect.state.selectByQueryRes.consultService" @change="replaceRoute()"
                        class="details__dropdown" required></AtomInputSelect>
                    <AtomInputTextarea v-model="state.appointmentForm.question" name="諮詢提問" class="mt-2"
                        placeholder="請詳述你目前的職涯困擾" required>
                    </AtomInputTextarea>
                </div>
            </template>
        </MoleculeAppointmentCard>
        <MoleculeAppointmentCard class="appointment__consultant">
            <template v-slot:header>
                選擇諮詢師
            </template>
            <template v-slot:body>
                <ul class="appointment__tab">
                    <li v-for="(consultant, index) in state.consultants" :key="index" class="appointment__tab__item"
                        :class="{ 'appointment__tab__item--active': state.activeTab === consultant.id }"
                        @click="switchConsultant(consultant)">
                        {{ consultant.name }}</li>
                </ul>
                <template v-for="(consultant, index) in state.consultants" :key="index">
                    <template v-if="state.activeTab === consultant.id">
                        <template v-if="consultant.id === 'recommend'">
                            <div class="appointment__consultant__header">
                                <img class="appointment__consultant__image" src="~/assets/consult/default.webp"
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
                            <MoleculeFeedbackList v-model="state.consultantFeedbacks"></MoleculeFeedbackList>
                            <OrganismConsultTime v-model="state.appointmentForm.time" :consultant="{ id: 'recommend' }"
                                :key="consultant.key"></OrganismConsultTime>
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
                            <MoleculeFeedbackList v-model="consultant.feedbacks"></MoleculeFeedbackList>
                            <OrganismConsultTime v-model="state.appointmentForm.time" :consultant="consultant"
                                :key="consultant.key">
                            </OrganismConsultTime>
                        </template>
                    </template>
                </template>
            </template>
        </MoleculeAppointmentCard>
        <div class="appointment__footer">
            <button class="footer__button" @click="submitAppointment()">確認預約</button>
        </div>
    </div>
</template>
<script setup>
const { $storageBucket, $validate } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const repoConsult = useRepoConsult()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const config = useRuntimeConfig()
const state = reactive({
    activeTab: 'recommend',
    consultants: [],
    consultantFeedbacks: [],
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
// hooks
useHead({
    title: `職涯諮詢 - 會員中心 - Job Pair`,
})
onMounted(() => {
    const service = route.params.service || 'life'
    state.appointmentForm.service = service
    loadConsultants()
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
    state.consultants = consultants
    state.consultantFeedbacks = shuffle(allFeedBacks)
}
function replaceRoute() {
    router.replace(`/user/consult/appointment/${state.appointmentForm.service}`)
}
function switchConsultant(consultant) {
    consultant.key = Math.random()
    state.activeTab = consultant.id
    state.appointmentForm = Object.assign({}, state.appointmentForm, {
        consultantId: consultant.id,
        time: {},
    })
}
function getEnvImage(id) {
    return `https://storage.googleapis.com/${$storageBucket}/consultant/${id}/photo.webp`
}
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[rand]] = [array[rand], array[i]]
    }
    return array
}
async function submitAppointment() {
    const result = await $validate()
    if (!result.isValid) {
        return
    }
    state.appointmentForm.userId = repoAuth.state.user.id
    const VITE_APP_ECPAY_AMOUNT = `${config.public.VITE_APP_ECPAY_AMOUNT}`
    state.appointmentForm.amount = VITE_APP_ECPAY_AMOUNT // IMPORTANT
    const response = await repoConsult.postConsultAppointment(state.appointmentForm)
    if (response.status !== 200) {
        state.consultants.forEach(item => {
            item.key = Math.random()
        })
        state.appointmentForm = {
            consultantId,
            service: service,
            question,
            time: {}, // 重新設定時段就好
        }
        return
    }
    if (process.client) {
        document.write(response.data)
    }
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

@media screen and (min-width: 992px) {
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