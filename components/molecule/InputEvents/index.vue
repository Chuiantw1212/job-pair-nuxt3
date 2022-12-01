<template>
    <div class="profile__portfolio">
        <h1 class="portfolio__header">
            <span v-if="required" class="text-danger">* </span>
            {{ name }}(至少提供一個以上，讓安排面試更有效率)
        </h1>
        <div class="portfolio__inputGroup" v-for="(work, index) in localValue" :key="index">
            <input v-show="false" :value="validTimes.length !== 0" :data-name="name" :data-required="true">
            <LazyAtomInputCalendar v-model="localValue[index].startDate" class="portfolio__work" :flatpickrConfig="{
                enableTime: true,
                time_24hr: true,
                minDate: getCurrentHour(),
            }"></LazyAtomInputCalendar>
            <button class="doc__btn" @click="deleteWork(index)" :disabled="disabled">
                <img class="btn__icon" src="./icon_delete_g.svg" />
            </button>
        </div>
        <label class="doc__buttonWrapper" v-if="!disabled">
            <button class="doc__btn" @click="newWork()" :disabled="disabled">
                <img class="btn__icon" src="./Add.svg" />
            </button>
        </label>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    name: {
        type: String,
        default: '面試時間'
    },
    modelValue: {
        type: Array,
        default: function () {
            return []
        }
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
const validTimes = computed(() => {
    return localValue.value.filter(item => !!item.startDate)
})
// methods
function getCurrentHour() {
    const currentDate = new Date()
    currentDate.setMinutes(0)
    return currentDate
}
function deleteWork(index) {
    localValue.value.splice(index, 1)
}
function newWork() {
    localValue.value.push({
        url: "",
        name: "",
    })
}
</script>
<style lang="scss">
.profile__portfolio {
    margin-top: 20px;

    .portfolio__inputGroup {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        align-items: center;
    }

    .portfolio__header {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .portfolio__work {
        width: 100%;
    }
}

.doc__buttonWrapper {
    border-radius: 10px;
    border: dashed 1px #ababab;
    width: 100%;
    padding: 8px 0;
    display: flex;

    .doc__btn {
        width: 100%;
    }
}

.doc__btn {
    background-color: inherit;
    border: none;
    padding: 0;

    .btn__icon {
        margin: auto;
        display: block;
        width: 32px;
        height: 32px;
    }
}
</style>