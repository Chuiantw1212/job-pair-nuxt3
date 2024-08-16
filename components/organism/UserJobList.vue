<template>
    <ul v-if="modelValue.length" class="kanban__card__list">
        <li v-for="(item, index) in modelValue" class="card__list__item" :key="index">
            <div v-if="item.status === 'active'" class="list__item__job">
                <div class="job__header">
                    <NuxtLink class="header__logoGroup" :to="`/job/${item.identifier}`">
                        <div v-if="item.image" class="logoGroup__logo"
                            :style="{ 'background-image': `url(${item.image})` }">
                        </div>
                        <div v-else class="logoGroup__logo" :style="{ 'background-image': `url(${defaultLogo})` }">
                        </div>
                    </NuxtLink>
                    <button v-if="type === 'saved'" class="btn-close header__save" @click.prevent="unsafeJob(index)">
                    </button>
                </div>
                <NuxtLink class="job__name" :to="`/job/${item.identifier}`">{{ item.name }}</NuxtLink>
                <NuxtLink class="job__organizationName" :to="`/company/${item.organizationId}`">
                    {{ item.organizationName }}
                </NuxtLink>
                <div class="job__time">{{ getSavedTime(item) }}</div>
                <div v-if="item.applyFlow === 'rejected'" class="job__badge job__badge--rejected">已婉拒</div>
                <div v-else class="job__badge job__badge--active">招聘中</div>
            </div>
            <div v-if="item.status === 'closed'" class="list__item__job">
                <div class="job__header">
                    <div class="job__name">{{ item.name }} </div>
                </div>
                <div class="job__badge job__badge--closed">已結束</div>
                <div class="job__organizationName">{{ item.organizationName }}</div>
                <div class="job__time">{{ getSavedTime(item) }}</div>
            </div>
        </li>
    </ul>
    <div v-else class="kanban__card__noItem">
        <div class="noItem__imageGroup">
            <img class="noItem__imageGroup__image" src="@/assets/user/job/Frame48095775.png" />
            <div class="noItem__imageGroup__desc">目前還沒有紀錄</div>
        </div>
    </div>
</template>
<script setup>
// import defaultLogo from '@/assets/user/logo.png'
import defaultLogo from '@/assets/company/company.webp'
const emit = defineEmits(['update:modelValue'])
const repoAuth = useRepoAuth()
const repoJobApplication = useRepoJobApplication()
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
    const { user } = repoAuth.state
    if (!user || !user.id) {
        return
    }
    const job = props.modelValue[index]
    const response = await repoJobApplication.deleteJobSaved({
        userId: user.id,
        jobId: job.identifier,
    })
    if (response.status === 200) {
        localValue.value.splice(index, 1)
        emit("update:modelValue", localValue.value)
    }
}
async function hideJob(index) {
    const { user } = repoAuth.state
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0;
    padding: 0;


    .card__list__item {
        min-width: 320px;
        min-height: 114px;
    }

    .list__item__job {
        display: block;
        padding: 16px;
        background-color: #ffffff;
        border-radius: 10px;
        color: black;
        text-decoration: none;
        line-height: 1.3;

        .job__header {
            position: relative;
            display: flex;
            justify-content: space-between;

            .header__logoGroup {
                width: 40px;
                height: 40px;
                padding: 6px;
                border-radius: 10px;
                border: 1px solid var(--Grays-Quat, #EDEAEA);

                .logoGroup__logo {
                    width: 100%;
                    height: 100%;
                    background-position: center;
                    background-size: cover;
                }
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

        .job__name {
            display: -webkit-box;
            color: var(--Grays-Prim, #222);

            /* H3-16-Medium */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;

            text-decoration: none;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 10px;
            width: fit-content;

            &:hover {
                text-decoration: underline;
            }
        }

        .job__badge {
            color: var(--JP-Soft, #F5FFFB);
            /* Tag-10-Medium */
            font-family: "PingFang TC";
            font-size: 10px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            white-space: nowrap;
            width: fit-content;
            padding: 5px 20px;
            border-radius: 10px;
            background: var(--JP-Prim, #5EA88E);
            margin-top: 10px;
        }

        .job__badge--active {
            background-color: #5EA88E;
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
            color: var(--Grays-Prim, #222);

            /* H4-12-Medium */
            font-family: "PingFang TC";
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all 0.3s;
            text-decoration: none;

            margin-top: 10px;
            width: fit-content;

            &:hover {
                text-decoration: underline;
            }
        }

        .job__time {
            color: var(--Grays-Seco, #484848);
            /* H4-12-Regular */
            font-family: "PingFang TC";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-top: 10px;
            width: fit-content;
        }
    }
}

.kanban__card__noItem {
    display: flex;
    justify-content: center;

    .noItem__imageGroup {
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
        flex-direction: column;

        .card__list__item {
            min-width: unset;

            &:not(:first-child) {
                margin-top: 10px;
            }
        }

        .list__item__job {
            display: block;
            padding: 20px;
            background-color: #ffffff;
            // border: solid 1px #d3d3d3;
            border-radius: 10px;
            color: black;
            text-decoration: none;
            line-height: 1.3;

            .job__header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                white-space: nowrap;

                .job__name {
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
            font-size: 20px;
            display: flex;
            align-items: center;
        }
    }
}
</style>