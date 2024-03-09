<template>
    <div class="consultTime">
        <h2 class="consultTime__header">選擇您想預約的時段</h2>
        <div class="consultTime__grid">
            <input v-show="false" :value="checkIsValid()" :data-required="true" data-name="預約時段">
            <template v-if="consultant.id === 'recommend'">
                <label v-for="(option, index) in state.recommendTimes" :key="index" class="consultTime__grid__item"
                    :class="{ 'consultTime__grid__item--active': localValue.includes(option.value), }">
                    {{ option.text }}
                    <input v-model="localValue" :value="option.value" class="invisible" type="checkbox" />
                </label>
            </template>
            <template v-else>
                <button v-for="(timeString, index) in state.consultTimes" :key="index" class="consultTime__grid__item"
                    :class="{
                        'consultTime__grid__item--active': timeString === localValue.start,
                        'consultTime__grid__item--disabled': state.reservedTimeMap[timeString]
                    }" :disabled="state.reservedTimeMap[timeString]" @click="handleTimeChange(timeString)">
                    {{ filterTime(timeString) }}
                </button>
            </template>
        </div>
    </div>
</template>
<script setup>
const repoConsult = useRepoConsult()
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    recommendTimes: [
        {
            text: '平日上午',
            value: 'weekday.morning',
        },
        {
            text: '平日下午',
            value: 'weekday.afternoon',
        },
        {
            text: '平日晚上',
            value: 'weekday.evening',
        },
        {
            text: '假日上午',
            value: 'weekend.morning',
        },
        {
            text: '假日下午',
            value: 'weekend.afternoon',
        },
        {
            text: '假日晚上',
            value: 'weekend.evening',
        },
    ],
    consultTimes: [],
    reservedTimeMap: {}
})
const props = defineProps({
    consultant: {
        type: Object,
        default: function () {
            return {}
        }
    },
    modelValue: {
        type: [Object, Array],
        default: function () {
            return {
                start: '',
                end: ''
            }
        }
    }
})
const localValue = computed({
    get() {
        if (props.consultant.id === 'recommend' && !Array.isArray(props.modelValue)) {
            return []
        } else {
            return props.modelValue
        }
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
// hooks
onMounted(() => {
    setConsultTime()
    setDisabledTime()
})
// methods
function checkIsValid() {
    if (Array.isArray(localValue.value)) {
        return localValue.value.length !== 0
    } else {
        const { start = '', end = '' } = localValue.value
        return start && end
    }
}
async function setConsultTime() {
    const { workingDays = [], workingHours = {}, id } = props.consultant
    if (id === 'recommend') {
        return
    }
    let consultTimes = []
    const scheduleInMonth = 30
    const noScheduleDays = 2
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    for (let i = noScheduleDays; i < scheduleInMonth; i++) {
        const dayInstance = new Date()
        const currentDate = dayInstance.getDate()
        dayInstance.setDate(currentDate + i)
        const day = dayInstance.getDay() // from 0 ~ 6
        const weekday = dayMap[day]
        if (workingDays.includes(weekday)) {
            const consultTimeFrams = workingHours[weekday]
            if (consultTimeFrams) {
                const { morning = [], afternoon = [], evening = [] } = consultTimeFrams
                const options1 = getTimeOptions(dayInstance, morning)
                const options2 = getTimeOptions(dayInstance, afternoon)
                const options3 = getTimeOptions(dayInstance, evening)
                consultTimes = [...consultTimes, ...options1, ...options2, ...options3]
            }
        }
    }
    state.consultTimes = consultTimes
}
async function setDisabledTime() {
    if (props.consultant.id === 'recommend') {
        return
    }
    const dateInstance = new Date()
    const response = await repoConsult.getConsultRecords({
        consultantId: props.consultant.id,
        timeStart: dateInstance.toISOString(),
        status: ['scheduled'],
    })
    if (!response.status === 200) {
        return
    }
    response.data.forEach(item => {
        const { start = '', end = '' } = item.time
        state.reservedTimeMap[start] = true
    })
}
function filterTime(dateString) {
    const date = new Date(dateString)
    const monthDay = new Intl.DateTimeFormat("zh", {
        month: "2-digit",
        day: "2-digit",
    })
    const formatResult1 = monthDay.format(date)
    const dayIndex = date.getDay()
    const weekday = ['日', '一', '二', '三', '四', '五', '六']
    const character = weekday[dayIndex]
    const hourMinute = new Intl.DateTimeFormat("zh", {
        hour: "2-digit",
        minute: "2-digit",
    })
    const formatResult2 = hourMinute.format(date)
    return `${formatResult1}(${character}) ${formatResult2}`
}
function getTimeOptions(date, time) {
    const startTimeString = time.start.substr(0, 2)
    const endTimeString = time.end.substr(0, 2)
    const startTime = Number(startTimeString)
    const endTime = Number(endTimeString)
    const hoursDiff = endTime - startTime
    const timeStrings = []
    for (let i = 0; i < hoursDiff; i++) {
        date.setHours(startTime + i, 0, 0, 0)
        const isoString = date.toISOString()
        timeStrings.push(isoString)
    }
    return timeStrings
}
function handleTimeChange(startTimeString) {
    const date = new Date(startTimeString)
    const startHours = date.getHours()
    date.setHours(startHours + 1)
    const endTimeString = date.toISOString()
    localValue.value = {
        start: startTimeString,
        end: endTimeString
    }
}
</script>
<style lang="scss" scoped>
.consultTime {
    padding: 20px;
    border-top: 1px solid #d3d3d3;

    .consultTime__header {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.2;
        color: #333;
    }

    .consultTime__grid {
        display: grid;
        padding: 0;
        list-style: none;
        grid-template-rows: auto auto;
        grid-auto-flow: column;
        gap: 10px;
        overflow-x: auto;
        margin-top: 14px;

        .consultTime__grid__item {
            border-radius: 10px;
            border: solid 1px #4bc49a;
            padding: 11px 15px 10px;
            font-size: 16px;
            line-height: 1.3;
            color: #4bc49a;
            white-space: nowrap;
            background-color: white;
            transition: all 0.3s;
            cursor: pointer;

            &:disabled {
                cursor: unset
            }
        }

        .consultTime__grid__item--disabled {
            border: solid 1px #b6b6b6;
            color: #b6b6b6;
        }

        .consultTime__grid__item--active {
            border: solid 1px #4bc49a;
            background-color: #4bc49a;
            color: white;
        }
    }
}
</style>