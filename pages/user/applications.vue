<template>
    <div v-if="repoSelect.state.selectByQueryRes" class="userStatus">
        <h1 class="userStatus__header">求職狀態</h1>
        <hr class="userStatus__hr">
        <ul class="userStatus__list">
            <li class="list__item">
                <button class="item__btn" @click="state.jobType = 'saved'">儲存的職缺</button>
            </li>
            <li class="list__item">
                <button class="item__btn" @click="state.jobType = 'applied'">應徵紀錄</button>
            </li>
            <li class="list__item">
                <button class="item__btn" @click="state.jobType = 'notified'">面試紀錄</button>
            </li>
        </ul>
        <!-- <div>共 ${}</div> -->
        <LazyOrganismUserJobList v-if="state.jobType === 'saved'" v-model="state.jobSaved" type="saved"
            @update:modelValue="setJobComparable()">
        </LazyOrganismUserJobList>
        <LazyOrganismUserJobList v-if="state.jobType === 'applied'" v-model="state.jobApplied" type="applied"
            @update:modelValue="setJobComparable()">
        </LazyOrganismUserJobList>
        <LazyOrganismUserJobList v-if="state.jobType === 'notified'" v-model="state.jobNotified" type="notified"
            @update:modelValue="setJobComparable()">
        </LazyOrganismUserJobList>
        <!-- <div class="userStatus__kanban">
            <LazyMoleculeJobCard class="userStatus__card" :bodyStyle="{
                height: 'calc(100% - 64px)', padding: '20px'
            }">
                <template v-slot:header>
                    <div class="card__header">
                        <img class="card__header__icon" src="~/assets/user/job/icon_Heart.svg" />
                        <span class="card__header__desc">
                            儲存的職缺 <template v-if="state.jobSaved.length"> (共 {{ state.jobSaved.length }} 筆)
                            </template>
</span>
</div>
</template>
<template v-slot:body>
                </template>
</LazyMoleculeJobCard>
<LazyMoleculeJobCard class="userStatus__card" :bodyStyle="{ height: 'calc(100% - 64px)', padding: '20px' }">
    <template v-slot:header>
                    <div class="card__header">
                        <img class="card__header__icon" src="~/assets/user/job/icon_Rocket.svg" />
                        <span class="card__header__desc">
                            應徵紀錄 <template v-if="state.jobApplied.length"> (共 {{ state.jobApplied.length }} 筆)
                            </template>
    </span>
    </div>
    </template>
    <template v-slot:body>
                    <LazyOrganismUserJobList v-model="state.jobApplied" type="applied"></LazyOrganismUserJobList>
                </template>
</LazyMoleculeJobCard>
<LazyMoleculeJobCard class="userStatus__card" :bodyStyle="{ height: 'calc(100% - 64px)', padding: '20px' }">
    <template v-slot:header>
                    <div class="card__header">
                        <img class="card__header__icon" src="~/assets/user/job/icon_Comment.svg" />
                        <span class="card__header__desc">
                            面試紀錄 <template v-if="state.jobNotified.length"> (共 {{ state.jobNotified.length }} 筆)
                            </template>
    </span>
    </div>
    </template>
    <template v-slot:body>
                    <LazyOrganismUserJobList v-model="state.jobNotified" type="notified"></LazyOrganismUserJobList>
                </template>
</LazyMoleculeJobCard>
</div> -->
    </div>
</template>
<script setup>
const repoAuth = useRepoAuth()
const repoJobApplication = useRepoJobApplication()
const repoSelect = useRepoSelect()
const state = reactive({
    jobSaved: [],
    jobApplied: [],
    jobNotified: [],
    jobComparable: [],
    jobCompareId1: null,
    jobCompareId2: null,
    jobCompareId3: null,
    jobCompare: {
        first: {},
        second: {},
        third: {},
    },
    jobType: 'saved',
})
// hooks
useHead({
    title: '求職狀態 - 會員中心'
})
onMounted(() => {
    initialize()
})
watch(() => repoAuth.state.user, () => {
    initialize()
})
//methds
async function initialize() {
    const { user } = repoAuth.state
    if (!user || !user.id) {
        return
    }
    const response = await repoJobApplication.getUserJobs({
        userId: user.id,
    })
    const jobs = response.data
    jobs.sort((a, b) => {
        return String(b.applyFlowTime).localeCompare(String(a.applyFlowTime))
    })
    state.jobSaved = jobs.filter((job) => ["saved", "invited"].includes(job.applyFlow) && job.savedTime)
    state.jobApplied = jobs.filter((job) => ["applied", "rejected"].includes(job.applyFlow))
    state.jobNotified = jobs.filter((job) => job.applyFlow === "notified")
    setJobComparable()
}
function setJobComparable() {
    state.jobComparable = [...state.jobSaved, ...state.jobApplied, ...state.jobNotified,]
    // 設定三個預設比較
    const firstSavedJob = state.jobComparable[0]
    if (firstSavedJob) {
        state.jobCompareId1 = firstSavedJob.identifier
        state.jobCompare.first = firstSavedJob
    }
    const secondSavedJob = state.jobComparable[1]
    if (secondSavedJob) {
        state.jobCompareId2 = secondSavedJob.identifier
        state.jobCompare.second = secondSavedJob
    }
    const thirdSavedJob = state.jobComparable[2]
    if (thirdSavedJob) {
        state.jobCompareId3 = thirdSavedJob.identifier
        state.jobCompare.third = thirdSavedJob
    }
}
</script>
<style lang="scss" scoped>
.userStatus {
    padding: 20px;

    .userStatus__header {
        color: var(--Grays-Prim, #222);

        /* Title/H1-36-Semibold */
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
        /* 100% */
    }

    .userStatus__hr {
        border: 1px solid var(--Grays-Quat, #EDEAEA);
        margin: 30px 0px;
    }

    .userStatus__list {
        list-style: none;
        padding: 0px;
        margin-top: 0px;
        display: flex;
        gap: 10px;

        .list__item {
            .item__btn {
                border-radius: 8px;
                background: #FFF;
                padding: 10px;
                border: none;

                /* H4-12-Regular */
                font-family: "PingFang TC";
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                transition: all 0.3s;

                &:hover {
                    color: var(--JP-Prim, #5EA88E);
                }
            }
        }
    }

    .userStatus__card {
        width: 100%;

        .card__header {
            font-size: 22px;
            font-weight: bold;

            .card__header__icon {
                width: 24px;
                height: 24px;
            }

            .card__header__desc {
                margin-left: 10px;
                font-size: 18px;
                white-space: nowrap;
            }
        }

        .card__list__item {
            &:not(:first-child) {
                margin-top: 10px;
            }
        }

        .card__table {
            margin-bottom: 0;
            vertical-align: middle;

            .card__table__th {
                max-width: 0;
            }

            .card__table__select {
                max-width: 100%;
            }

            .card__table__cell {
                line-height: 1.3;

                .cell__header {
                    font-size: 14px;
                    color: #484848;
                }

                .cell__body {
                    font-size: 18px;
                    font-weight: normal;
                    color: #333;
                }

                .cell__body--left {
                    text-align: left !important;
                }

                .cell__body--bold {
                    font-size: 28px;
                    font-weight: bold;
                    color: #4bc49a;
                }
            }
        }
    }

    .userStatus__kanban {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;

        .kanban__card__list {
            list-style: none;
            padding: 0;
            width: 100%;
        }
    }

    .table__btn {
        border-radius: 10px;
        border: solid 1px #5ea88e;
        color: #5ea88e;
        background-color: white;
        padding: 12px 32px;
        font-size: 18px;
        margin: 20px auto;
        transition: all 0.3s;
        text-decoration: none;
        display: block;
        max-width: 155px;
        white-space: nowrap;

        &:hover {
            background-color: #5ea88e;
            color: white;
        }
    }

    .testRow {
        --bs-table-accent-bg: none;
    }
}

@media screen and (min-width:992px) {
    .userStatus {
        padding: 0px;
        padding-left: 30px;

        .userStatus__card {
            width: 100%;

            .card__header {
                font-size: 22px;
                font-weight: bold;
                display: flex;
                align-items: center;

                .card__header__icon {
                    width: 32px;
                    height: 32px;
                }

                .card__header__desc {
                    margin-left: 10px;
                    white-space: nowrap;
                }
            }

            .card__list__item {
                &:not(:first-child) {
                    margin-top: 10px;
                }
            }

            .card__table {
                .card__table__cell {
                    padding: 29px 0;
                    min-width: 5em;
                }
            }
        }

        .userStatus__kanban {
            display: flex;
            flex-direction: row;
            gap: 20px;
            height: 788px;
            width: 100%;

            .userStatus__card {
                height: 100%;
                width: 33%;
            }
        }

        .table__btn {
            border-radius: 10px;
            border: solid 1px #5ea88e;
            color: #5ea88e;
            background-color: white;
            padding: 14px 50px;
            font-size: 22px;
            margin: 40px auto;
            transition: all 0.3s;
            text-decoration: none;
            display: block;
            max-width: 210px;
            white-space: nowrap;

            &:hover {
                background-color: #5ea88e;
                color: white;
            }
        }

        .testRow {
            --bs-table-accent-bg: none;
        }
    }
}
</style>