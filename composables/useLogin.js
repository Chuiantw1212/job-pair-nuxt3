import { useRouter, useRoute } from 'vue-router'
import firebase from "firebase";
export default function setup() {
    const { $emitter, $sweet, } = useNuxtApp()
    const router = useRouter()
    const route = useRoute()
    const jobPairApi = useJobPairApi()
    // Repositories
    const repoAuth = useRepoAuth()
    const repoJob = useRepoJob()
    const repoJobApplication = useRepoJobApplication()
    const repoCompany = useRepoCompany()
    const repoSelect = useRepoSelect()
    // state
    const state = reactive({
        ui: null,
        isSent: false,
        authResult: null,
        countdownInterval: null,
        cdDefault: 120,
        cdVisible: 0,
        basicInfo: {
            email: ''
        },
    })
    // methods
    function listenToAuthState() {
        const auth = firebase.auth()
        auth.onAuthStateChanged(async (userInfo) => {
            $sweet.loader(false)
            return
            if (!userInfo) {
                // 造成登入機制無法連貫
                if (repoAuth.state.user && repoAuth.state.user.uid) {
                    // 判斷為從登入變成登出
                    repoAuth.userSignout()
                    // 導回個別的首頁
                    if (route.path.includes('admin')) {
                        router.push({
                            name: 'admin',
                        })
                    } else {
                        router.push({
                            name: 'index',
                        })
                    }
                }
                return
            }
            if (!userInfo.emailVerified) {
                return
            }
            const { uid, displayName, email, photoURL, phoneNumber } = userInfo
            const user = {
                uid,
                name: displayName,
                email,
                image: photoURL,
                telephone: phoneNumber,
            }
            $sweet.loader(true)
            await signIn(user)
            $sweet.loader(false)
        })
    }
    async function handleAuthResult(authResult, type) {
        state.authResult = authResult
        const basicInfo = getBasicInfo(type)
        console.log('handleAuthResult', basicInfo);
        if (!basicInfo.email) {
            await $sweet.alert('請使用其他方式登入')
            return
        }
        $sweet.loader(true)
        if (basicInfo.emailVerified) {
            await signIn(basicInfo)
        } else {
            await sendEmailLink(type)
        }
        $sweet.loader(false)
    }
    async function setIdToken() {
        const auth = firebase.auth();
        if (!auth || !auth.currentUser) {
            console.log('setIdToken no auth', auth);
            return
        }
        const idToken = await auth.currentUser.getIdToken()
        jobPairApi.setToken(idToken)
        return idToken
    }
    async function signIn(user) {
        const idToken = await setIdToken()
        if (!idToken) {
            console.log('signIn no idToken')
            return
        }
        const signInResult = await repoAuth.postSignin(idToken)
        if (!signInResult) {
            // 避免人求職者與人資Mixin，重複打API
            return
        }
        if (signInResult.status !== 200) {
            // 任何錯誤導回首頁
            router.replace({
                name: 'index'
            })
            return
        }
        /**
         * 求職者
         * 人資已註冊完成
         * 人資尚未註冊完成
         * 其他狀況
         */
        const { employee = false, admin = false, company = false } = signInResult.data
        if (employee) {
            // 代表已經完整註冊過會員
            Object.assign(user, employee, {
                type: 'employee'
            })
            await repoJob.getJobRecommended()
            await repoJobApplication.getUserJobs({
                userId: user.id,
            })
            repoAuth.setUser(user)
            hideModals()
            if (route.path.includes('admin') || route.name === 'index') {
                router.push({
                    name: 'jobs'
                })
                return
            }
            return
        }
        if (admin) {
            user.type = "admin"
            Object.assign(user, admin, {
                type: 'admin'
            })
            repoAuth.setUser(user)
            if (company) {
                $emitter.emit("setMenuType", 'admin')
                // 有取得公司資料代表已完成註冊人資
                const organizationId = company.id
                if (organizationId) {
                    const jobsResponse = await repoCompany.getCompanyJobs({
                        organizationId,
                        status: ['active'],
                    })
                    const { data = [] } = jobsResponse
                    company.hasActiveJobs = !!data.length
                }
                repoAuth.setCompany(company)
                const whiteList = ['admin', 'about', 'job', 'company']
                const isNotPermitted = whiteList.every(word => {
                    return !route.path.includes(word)
                })
                if (isNotPermitted) {
                    router.push({
                        name: 'admin'
                    })
                } else if (route.name === 'admin') {
                    router.push({
                        name: 'admin-recruit-jobs'
                    })
                }
            } else {
                // 未完成註冊人資導向到公司註冊畫面
                router.push(`/admin/register`)
            }
            hideModals()
            return
        }
        // 判斷是否為註冊到一半的求職者
        const userString = localStorage.getItem("user")
        const tempUser = JSON.parse(userString)
        if (!user.id && userString && tempUser.preference) {
            // 已經作答跳最後一步驟，反之回去作答
            const notInQuestionFlow = !route.name.includes('questions')
            if (notInQuestionFlow) {
                let questionsRes = repoSelect.state.questionsRes
                if (!questionsRes) {
                    questionsRes = new Promise(resolve => {
                        function step() {
                            if (repoSelect.state.questionsRes) {
                                resolve(repoSelect.state.questionsRes)
                            } else {
                                window.requestAnimationFrame(step)
                            }
                        }
                        window.requestAnimationFrame(step)
                    })
                }
                const questionKeys = questionsRes.map(item => item.key)
                const unAnsweredIndex = questionKeys.findIndex((key) => {
                    const isAnswered = tempUser.preference.hasOwnProperty(key)
                    return !isAnswered
                })
                const categorySelected = user.occupationalCategory && user.occupationalCategory.length
                if (unAnsweredIndex !== -1) {
                    router.push(`/questions/${unAnsweredIndex + 1}`)
                }
                else if (!categorySelected) {
                    router.push(`/questions/result`)
                }
            }
            // 不論是否答題完成都要跑以下程式碼
            user.type = "employee"
            repoAuth.setUser(user)
            hideModals()
            return
        }
        // 各種未完成註冊的用戶
        if (route.path.includes('admin')) {
            // 導向到公司註冊畫面
            user.type = "admin"
            router.push(`/admin/register`)
        } else {
            user.type = "employee"
            router.push(`/questions/1`)
        }
        repoAuth.setUser(user)
        hideModals()
    }
    function hideModals() {
        $emitter.emit("hideSwitchModal")
        $emitter.emit("hideUserModal")
        $emitter.emit('hideCompanyModal')
    }
    function getBasicInfo(type) {
        const user = state.authResult.user
        const { displayName, email, uid, phoneNumber, photoURL, emailVerified } = user
        const basicInfo = {
            name: displayName,
            email,
            uid,
            telephone: phoneNumber,
            image: photoURL,
            type,
            emailVerified,
        }
        state.basicInfo = basicInfo
        return basicInfo
    }
    async function sendEmailLink(type) {
        const basicInfo = getBasicInfo(type)
        const response = await repoAuth.postVerificationEmail(basicInfo)
        if (response.status !== 200) {
            return false
        }
        state.countdownInterval = true
        state.cdVisible = state.cdDefault
        state.countdownInterval = setInterval(() => {
            state.cdVisible -= 1
            if (state.cdVisible < 1) {
                clearInterval(state.countdownInterval)
                state.countdownInterval = null
            }
        }, 1000)
        state.isSent = true
    }
    return {
        state,
        listenToAuthState,
        signIn,
        handleAuthResult,
        sendEmailLink,
        setIdToken,
    }
}