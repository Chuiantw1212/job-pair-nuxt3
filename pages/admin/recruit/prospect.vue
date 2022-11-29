<template>
    <div class="appliedList">
        <div class="appliedList__form">
            <div class="form__selectGroup">
                <LazyAtomInputSelect v-model="state.searchForm.jobIdentifier" name="職缺選擇" placeholder="職缺選擇"
                    :items="getActiveJobs()" :itemValue="'identifier'" :itemText="'name'">
                </LazyAtomInputSelect>
                <LazyAtomInputSelect v-if="repoSelect.state.selectByQueryRes" v-model="state.searchForm.workLocation"
                    name="地點(預設為總公司地點)" :items="getOrderedLocations()">
                </LazyAtomInputSelect>
                <LazyAtomInputNumber v-model="state.searchForm.similairy" name="適配度門檻" :max="100" :min="0">
                </LazyAtomInputNumber>
            </div>
        </div>
        <ul v-if="state.applications.length" class="appliedList__list">
            <li v-for="(item, index) in  state.applications" :key="index">
                <div class="list__item__content">
                    <div class="item__content__body">
                        <div class="content__profile">
                            <div class="profile__header">
                                <img v-if="item.image" class="header__image" :src="item.image"
                                    onerror="this.style.display='none'">
                                <div class="header__info">
                                    <div class="header__info__item header__info__item--name">
                                        {{ item.name }}
                                    </div>
                                    <div class="header__info__itemGroups">
                                        <div class="header__info__item">
                                            <img class="info__item__icon" src="~/assets/admin/icon_category.svg">
                                            <div class="info__item__badgeGroups">
                                                <span v-for="(item, index) in item.occupationalCategory" :key="index"
                                                    class="header__info__item__badge">
                                                    {{ $filter.optionText(item, repoSelect.jobCategory) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-none d-lg-block header__similarity">
                                    <div class="similarity__score">
                                        {{ $filter.rank(item.similarity) }}
                                    </div>
                                    <div class="similarity__text">
                                        適配度
                                    </div>
                                </div>
                            </div>
                            <div class="profile__similarity d-lg-none">
                                <div class="similarity__text">
                                    適配度
                                </div>
                                <div class="similarity__score">
                                    {{ $filter.rank(item.similarity) }}
                                </div>
                            </div>
                            <hr>
                            <div class="profile__body" :class="{ 'profile__body--isOpen': state.isItemOpen[index] }">
                                <LazyAtomInputCkeditor v-model="item.description" :toolbar="[]" :disabled="true">
                                </LazyAtomInputCkeditor>
                            </div>
                            <br>
                            <div class="profile__footer">
                                <div class="footer__date">
                                    {{ getInvitedTime(item) }}
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="content__panel">
                            <LazyAtomBtnSimple v-if="item.invitedTime" :disabled="true">已邀約</LazyAtomBtnSimple>
                            <LazyOrganismInvitationModal v-else v-model="state.applications[index]" :job="state.job">
                            </LazyOrganismInvitationModal>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="appliedList__notFound">
            <img src="~/assets/admin/img_empty.svg">
            <p class="notFound__desc">-目前尚無資料-</p>
        </div>
    </div>
</template>
<script setup>
const { $filter } = useNuxtApp()
const repoCompany = useRepoCompany()
const repoSelect = useRepoSelect()
const repoAuth = useRepoAuth()
const repoJob = useRepoJob()
const state = reactive({
    searchLike: '',
    searchForm: {
        jobIdentifier: '',
        workLocation: null,
        similairy: 50
    },
    job: {},
    filterOpen: {
        occupationalCategory: false
    },
    statusItems: [
        {
            text: '全部',
            value: null
        },
        {
            text: '尚未回覆',
            value: 'applied'
        },
        {
            text: '已通知面試',
            value: 'notified'
        },
        {
            text: '已婉拒',
            value: 'rejected'
        }
    ],
    applications: [],
    isItemOpen: [],
})
const props = defineProps({
    modelValue: {
        type: Array,
        default: function () {
            return []
        }
    }
})
// hooks
useHead({
    title: `潛在人選 - 招募中心 - Job Pair`
})
watch(() => state.searchForm, () => {
    const { companyJobsRes } = repoCompany.state
    if (!companyJobsRes) {
        return
    }
    debounce(async () => {
        // 設定職缺
        const jobs = companyJobsRes
        const targetJob = jobs.find(item => {
            return item.identifier === state.searchForm.jobIdentifier
        })
        if (targetJob) {
            state.job = targetJob
        } else {
            state.job = null
        }
        // 撈選職缺
        await initializeSearch()
    })()
}, { deep: true })
watch(() => repoAuth.state.company, (companyInfo) => {
    const items = getActiveJobs()
    if (items && items.length) {
        state.searchForm.jobIdentifier = items[0].identifier
    }
    if (companyInfo && companyInfo.addressRegion) {
        state.searchForm.workLocation = companyInfo.addressRegion
    }
}, { immediate: true })
// methods
function getOrderedLocations() {
    const { locationRes } = repoSelect.state
    if (!locationRes || !locationRes.taiwan) {
        return []
    }
    locationRes.taiwan.sort((a, b) => {
        return a.order - b.order
    })
    return [{ text: '不限', value: null }, ...locationRes.taiwan]
}
function getInvitedTime(item) {
    const { applyFlow, invitedTime } = item
    if (!applyFlow || !invitedTime) {
        return
    }
    const currentTime = new Date().getTime()
    const updatedTime = new Date(invitedTime).getTime()
    const timeDiff = currentTime - updatedTime
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
    // Line: 投遞履歷的時間，超過三天，顯示投遞日期
    if (dayDiff < 1) {
        return `最近`
    } else if (dayDiff < 4) {
        return `${dayDiff} 天前`
    } else {
        return `${$filter.date(updatedTime)}邀約`
    }
}
function getActiveJobs() {
    const { companyJobsRes } = repoCompany.state
    if (companyJobsRes) {
        const jobs = companyJobsRes
        const activeJobs = jobs.filter(item => item.status === 'active')
        return [...activeJobs]
    }
}
function debounce(func, delay = 250) {
    return (...args) => {
        clearTimeout(state.debounceTimer)
        state.debounceTimer = setTimeout(() => {
            state.debounceTimer = undefined
            func.apply(this, args)
        }, delay)
    }
}
async function initializeSearch() {
    const { company } = repoAuth.state
    if (!company || !state.searchForm.jobIdentifier) {
        return
    }
    // 依照適配度排序
    const results = await repoJob.getJobProspect(state.searchForm)
    state.applications = []
    const items = [...results.data,]
    items.sort((a, b) => {
        return b.similarity - a.similarity
    })
    const unhandledItems = items.filter(item => {
        return !['notified', 'rejected'].includes(item.applyFlow)
    })
    const handledItems = items.filter(item => {
        return ['notified', 'rejected'].includes(item.applyFlow)
    })
    state.applications = [...unhandledItems, ...handledItems]

}
</script>
<style lang="scss" scoped>
.appliedList {

    .appliedList__form {
        background-color: white;
        padding: 20px;

        .form__selectGroup {
            gap: 13px;
        }
    }

    .appliedList__list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;

        .list__item__content {
            border-radius: 10px;
            background-color: #fff;
            padding: 20px;

            .item__content__body {
                // display: flex;
                // gap: 40px;
                // margin-top: 20px;
            }

            .content__header {
                font-size: 16px;
                font-weight: bold;
                color: #333;
                display: flex;
                align-items: center;
                border: none;
                background-color: inherit;

                .header__span {
                    font-size: 16px;
                    font-weight: normal;
                    color: #a9a9a9;
                }

                .header__icon {
                    display: block;
                    margin-left: 8px;
                }
            }

            .content__profile {
                border-radius: 10px;
                width: 100%;


                .profile__header {
                    display: flex;
                    position: relative;

                    .header__image {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin-right: 20px;
                    }

                    .header__info {
                        font-size: 14px;

                        .header__info__itemGroups {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                        }

                        .header__info__item {
                            display: flex;

                            .info__item__icon {
                                margin-right: 5px;
                                display: block;
                            }

                            .info__item__badgeGroups {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 4px;
                            }

                            .header__info__item__badge {
                                padding: 5px 12px;
                                border-radius: 10px;
                                border: solid 1px #d3d3d3;
                                font-size: 13px;
                                color: #333;
                                white-space: nowrap;
                            }
                        }

                        .header__info__item--name {
                            font-size: 20px;
                            font-weight: bold;
                            color: #333;
                            margin-bottom: 1rem;
                        }
                    }

                    .header__similarity {
                        position: absolute;
                        right: 0;
                        top: 0;
                        text-align: center;

                        .similarity__score {
                            font-size: 36px;
                            font-weight: bold;
                            color: #333;
                        }

                        .similarity__text {
                            font-size: 16px;
                            font-weight: normal;
                            color: #333;
                        }
                    }
                }

                .profile__similarity {
                    padding: 20px 0;
                    border-radius: 5px;
                    background-color: #eef6ed;
                    margin-top: 20px;
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    align-items: center;

                    .similarity__text {
                        font-size: 16px;
                        color: #333;
                    }

                    .similarity__score {
                        font-size: 30px;
                        font-weight: bold;
                        color: #333;
                    }
                }

                .profile__body {
                    margin-top: 20px;

                    .body__coverLetter {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: all 0.3s;

                    }
                }

                .profile__body--isOpen {
                    .body__coverLetter {
                        -webkit-line-clamp: unset;
                    }
                }

                .profile__toggle {
                    color: #5ea88e;
                    cursor: pointer;
                }

                .profile__footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .footer__date {
                        font-size: 16px;
                        font-weight: normal;
                        color: #a9a9a9;
                    }

                    .footer__preview {
                        font-size: 16px;
                        font-weight: normal;
                        border: none;
                        background-color: #5ea88e;
                        color: white;
                        border-radius: 5px;
                        background-color: #5ea88e;
                        padding: 8px 16px;
                        text-decoration: none;
                    }
                }
            }

            .content__panel {
                display: flex;
                gap: 10px;
                font-size: 16px;

                .panel__btn {
                    padding: 8px 12px;
                    border-radius: 5px;
                    border: solid 1px #5ea88e;
                    background-color: inherit;
                    line-height: 1;
                    white-space: nowrap;
                    color: #5ea88e;
                    font-size: 16px;
                }
            }
        }
    }

    .appliedList__notFound {
        padding: 40px 0;
        border-radius: 10px;
        background-color: #fff;
        margin-top: 20px;
        text-align: center;

        .notFound__desc {
            white-space: nowrap;
            margin-top: 30px;
        }
    }
}

@media screen and (min-width:992px) {
    .appliedList {

        .appliedList__form {

            .form__selectGroup {
                display: flex;

                >* {
                    min-width: 264px;
                }
            }
        }

        .appliedList__list {
            .list__item__content {
                padding: 40px;

                .item__content__body {
                    display: flex;
                    gap: 40px;
                }

                .content__profile {
                    max-width: calc(100% - 145px);

                    .profile__header {
                        .header__image {
                            width: 80px;
                            height: 80px;
                        }
                    }
                }

                .content__panel {
                    flex-direction: column;
                    min-width: 7rem;
                }
            }
        }
    }
}
</style>