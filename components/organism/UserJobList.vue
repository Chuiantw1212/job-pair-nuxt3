<template>
    <ul v-if="modelValue.length" class="kanban__card__list">
        <li v-for="(item, index) in modelValue" class="card__list__item" :key="index">
            <NuxtLink v-if="item.status === 'active'" class="list__item__job" :to="`/job/${item.identifier}`">
                <div class="job__header">
                    <div class="header__name">{{ item.name }}</div>
                    <button v-if="type === 'saved'" class="btn-close header__save" @click.prevent="unsafeJob(index)">
                    </button>
                </div>
                <div v-if="item.applyFlow === 'rejected'" class="job__badge job__badge--rejected">已婉拒</div>
                <div v-else class="job__badge job__badge--active">招聘中</div>
                <div class="job__organizationName">{{ item.organizationName }}</div>
                <div class="job__time">{{ getSavedTime(item) }}</div>
            </NuxtLink>
            <div v-if="item.status === 'closed'" class="list__item__job">
                <div class="job__header">
                    <div class="header__name">{{ item.name }} </div>
                </div>
                <div class="job__badge job__badge--closed">已結束</div>
                <div class="job__organizationName">{{ item.organizationName }}</div>
                <div class="job__time">{{ getSavedTime(item) }}</div>
            </div>
        </li>
    </ul>
    <div v-else class="kanban__card__noItem">
        <div class="noItem__imageGroup">
            <img class="noItem__imageGroup__image" src="~/assets/user/job/Frame.svg" />
            <div class="noItem__imageGroup__desc">目前還沒有紀錄</div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed, nextTick } from 'vue'
const emit = defineEmits(['update:modelValue'])
const repoAuth = useRepoAuth()
const { user } = repoAuth.state
const repoJobApplication = useRepoJobApplication()
const repoSelect = useRepoSelect()
const props = defineProps({
    modelValue: {
        type: Array,
        default: function () {
            return []
        },
    },
    type: {
        type: String,
        default: false
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
async function unsafeJob(index) {
    if (!user || !user.id) {
        return
    }
    const job = props.modelValue[index]
    const response = await repoJobApplication.deleteJobSaved({
        userId: user.id,
        jobId: job.identifier,
    })
    if (response.status === 200) {
        localValue.splice(index, 1)
    }
}
async function hideJob(index) {
    if (!user || !user.id) {
        return
    }
    const job = props.modelValue[index]
    await repoJobApplication.patchJobVisibility({
        userId: user.id,
        jobId: job.identifier,
    })
    localValue.splice(index, 1)
}
function getSavedTime(item) {
    // 配合後端的資料更新上時間
    const { applyFlow = '' } = item
    const time = item[`${applyFlow}Time`]
    const date = new Date(time)
    const formatter = new Intl.DateTimeFormat("zh", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    })
    const formatResult = formatter.format(date)
    return formatResult
}
</script>
<style lang="scss" scoped>
.kanban__card__list {
    list-style: none;
    width: 100%;

    .card__list__item {
        &:not(:first-child) {
            margin-top: 10px;
        }
    }

    .list__item__job {
        display: block;
        padding: 16px;
        background-color: #ffffff;
        border: solid 1px #d3d3d3;
        border-radius: 10px;
        color: black;
        text-decoration: none;
        line-height: 1.3;

        .job__header {
            position: relative;
            display: flex;

            .header__name {
                font-size: 18px;
                font-weight: bold;
                white-space: normal;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .header__save {
                display: flex;
                align-items: center;
                justify-content: center;
                align-self: baseline;
                cursor: pointer;
                border: none;
            }
        }

        .job__badge {
            font-size: 11px;
            font-weight: bold;
            padding: 3px 6px;
            margin-top: 8px;
            border-radius: 2px;
            white-space: nowrap;
            width: fit-content;
        }

        .job__badge--active {
            background-color: #0ab378;
            color: white;
        }

        .job__badge--rejected {
            background-color: #dd5747;
            color: white;
        }

        .job__badge--closed {
            background-color: #d3d3d3;
        }

        .job__organizationName {
            font-size: 16px;
            margin-top: 8px;
            line-height: 1.3;
        }

        .job__time {
            margin-top: 8px;
            font-size: 14px;
            font-weight: normal;
            color: #7f7f7f;
        }
    }
}

.kanban__card__noItem {
    display: flex;
    justify-content: center;

    .noItem__imageGroup {
        margin-top: 207px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .noItem__imageGroup__desc {
            margin-top: 20px;
            font-size: 16px;
        }
    }
}

@media screen and (min-width: 992px) {
    .kanban__card__list {
        list-style: none;
        padding: 0;
        width: 100%;

        .card__list__item {
            &:not(:first-child) {
                margin-top: 10px;
            }
        }

        .list__item__job {
            display: block;
            padding: 20px;
            background-color: #ffffff;
            border: solid 1px #d3d3d3;
            border-radius: 10px;
            color: black;
            text-decoration: none;
            line-height: 1.3;

            .job__header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                white-space: nowrap;

                .header__name {
                    font-size: 22px;
                    font-weight: bold;
                }

                .job__badge {
                    font-size: 13px;
                    font-weight: bold;
                    padding: 3px 6px;
                    margin-left: 6px;
                }

                .job__badge--active {
                    background-color: #0ab378;
                    color: white;
                }

                .job__badge--closed {
                    background-color: #d3d3d3;
                }
            }

            .job__organizationName {
                font-size: 20px;
                // margin-top: 20px;
            }

            .job__time {
                margin-top: 10px;
                font-size: 18px;
                font-weight: normal;
                color: #7f7f7f;
            }
        }
    }

    .kanban__card__noItem {
        display: flex;
        justify-content: center;

        .noItem__imageGroup {
            margin-top: 292px;
            font-size: 20px;
            display: flex;
            align-items: center;
        }
    }
}
</style>