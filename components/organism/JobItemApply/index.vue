<template>
    <div class="jobItemPanel">
        <LazyAtomBtnSimple v-if="!state.application.applyFlow" class="panel__store" @click.stop="handleSaveJob()"
            :disabled="checkIsAdmin()">
            <img class="store__icon" src="./heart.svg" alt="save" />儲存
        </LazyAtomBtnSimple>
        <LazyAtomBtnSimple v-if="state.application.applyFlow === 'saved'" class="panel__store panel__store--saved"
            @click.stop="handleUnsavedJob()">
            <img class="store__icon" src="./icon_Heart.svg" alt="saved" /> 已儲存
        </LazyAtomBtnSimple>
        <LazyAtomBtnSimple v-if="state.application.applyFlow === 'invited' && state.application.visibility !== 'visible'"
            class="panel__store" @click.stop="handleSaveJob()">
            <img class="store__icon" src="./heart.svg" alt="save" />儲存
        </LazyAtomBtnSimple>
        <LazyAtomBtnSimple v-if="state.application.applyFlow === 'invited' && state.application.visibility === 'visible'"
            class="panel__store" @click.stop="handleUnsavedJob()">
            <img class="store__icon" src="./heart.svg" alt="saved" />已儲存
        </LazyAtomBtnSimple>
        <LazyAtomBtnSimple v-if="['applied', 'notified'].includes(state.application.applyFlow)"
            class="panel__store panel__store--applied" :disabled="true">
            <img class="store__icon" src="./icon_Rocke_Grey.svg" alt="applied" /> 已應徵
        </LazyAtomBtnSimple>
        <LazyAtomBtnSimple v-if="['rejected'].includes(state.application.applyFlow)"
            class="panel__store panel__store--applied" :disabled="true">
            <img class="store__icon" src="./icon_Rocke_Grey.svg" alt="rejected" /> 已婉拒
        </LazyAtomBtnSimple>
    </div>
</template>
<script>
export default {
    name: 'jobItemPanel',
}
</script>
<script setup>
const { $uuid4, $emitter, $rank, } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoJobApplication = useRepoJobApplication()
const route = useRoute()
const state = reactive({
    id: null,
    application: {},
    navigator: {},
    shareButtonToolTip: null,
    shareButtonTitle: "點擊複製連結",
})
if (process.client) {
    state.navigator = window.navigator
}
const props = defineProps({
    modelValue: {
        type: [Object, Boolean],
        default: function () {
            return {}
        },
    },
    showShareButton: {
        type: Boolean,
        default: false
    },
    jobDetailsException: {
        type: Boolean,
        default: false,
    },
})
const routeName = computed(() => {
    return route.name
})
// hooks
watch(() => props.modelValue, () => {
    if (process.client && props.modelValue) {
        const { origin } = window.location
        const url = `${origin}/job/${props.modelValue.identifier}`
        state.copiedTitle = `已複製: ${url}`
        initialilzeTooltip()
    }
}, { immediate: true })
watch(() => repoJobApplication.state.userJobs, (userJobs) => {
    const jobKeys = Object.keys(userJobs)
    if (!jobKeys.length) {
        return
    }
    const jobId = props.modelValue.identifier
    const matchedJob = userJobs[jobId]
    if (matchedJob) {
        state.application = matchedJob
    }
}, { immediate: true, deep: true })
// methods
function showLoginModal() {
    $emitter?.emit("showUserModal")
}
function checkIsAdmin() {
    // 登入使用者與匿名造訪者都開放點按
    const { user } = repoAuth.state
    const isAdmin = user?.id && user?.type === 'admin'
    return isAdmin
}
function getRankedSimilarity() {
    const { user } = repoAuth.state
    const isValidUser = user?.id && user?.type === 'employee'
    let score = isValidUser ? 0 : '？'
    if (props.modelValue?.similarity) {
        score = $rank(props.modelValue.similarity)
    }
    return score
}
function checkPanelDisplay() {
    const { user } = repoAuth.state
    return user?.id
}
function initialilzeTooltip() {
    if (props.showShareButton && !state.navigator.share) {
        state.id = $uuid4()
        nextTick(() => {
            const element = document.querySelector(`#tooltip-${state.id}`)
            if (element) {
                state.shareButtonToolTip = new window.bootstrap.Tooltip(element)
            }
        })
    }
}
async function handleUnsavedJob() {
    const { user } = repoAuth.state
    const response = await repoJobApplication.deleteJobSaved({
        userId: user.id,
        jobId: props.modelValue.identifier,
    })
    if (response.status === 200) {
        state.application = {}
    }
}
async function handleSaveJob() {
    const { user } = repoAuth.state
    if (!user || !user.id) {
        $emitter?.emit("showUserModal")
        return
    }
    const response = await repoJobApplication.postJobSaved({
        userId: user.id,
        jobId: props.modelValue.identifier,
    })
    if (response.status === 200) {
        const application = response.data
        state.application = application
    }
}
async function shareLinkNative() {
    const { origin } = window.location
    const url = `${origin}/job/${props.modelValue.identifier}?openExternalBrowser=1`
    await navigator.share({
        title: `在Job Pair上應徵${props.modelValue.name}`,
        text: `在Job Pair上應徵${props.modelValue.name}`,
        url,
    })
}
async function shareLinkBootstrap() {
    // 不支援貼到記憶體裡面
    const { origin } = window.location
    const url = `${origin}/job/${props.modelValue.identifier}?openExternalBrowser=1`
    await navigator.clipboard.writeText(url)
    state.shareButtonToolTip.hide()
}
</script>
<style lang="scss" scoped>
.jobItemPanel {
    margin-left: auto;
    text-align: center;

    .panel__body {
        .panel__score {
            color: #4887e4;
            font-size: 40px;
            font-weight: bold;
            font-family: Roboto;
            background-color: inherit;
            border: none;
        }

        .panel__desc {
            font-size: 16px;
            line-height: 1.5;
            color: #999;
            text-align: center;
        }
    }

    .panel__body--jobDetails {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        border-radius: 5px;
        background-color: #eef6ed;
        padding: 10px;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;

        .panel__score {
            color: #4887e4;
            font-size: 40px;
            font-weight: bold;
            font-family: Roboto;
        }

        .panel__desc {
            font-size: 16px;
            line-height: 1.5;
            color: #999;
            text-align: center;
        }
    }



    .panel__footer {
        margin-top: 16px;
        display: flex;
        gap: 16px;
        white-space: nowrap;
        justify-content: center;

       
    }
}

@media screen and (min-width: 992px) {
    .jobItemPanel {
        display: flex;
        flex-direction: column;
        align-items: center;

        .panel__body--jobDetails {
            // display: flex;
            flex-direction: column;
            align-items: initial;
            border-radius: initial;
            background-color: initial;
            padding: initial;
            justify-content: initial;
            gap: initial;
            margin-top: initial;

            .panel__score {
                font-size: 70px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1;
                letter-spacing: normal;
            }

            .panel__desc {
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                color: #999;
            }
        }

        .panel__body {
            .panel__score {
                font-size: 78px;
                font-weight: bold;
                line-height: 1;
            }

            .panel__desc {
                font-size: 20px;
                font-weight: normal;
                margin-top: 10px;
                line-height: 1.5;
            }
        }
    }
}
</style>