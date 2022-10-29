import { useRouter, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default function setup() {
    const { $emitter, $alert } = useNuxtApp()
    const router = useRouter()
    const route = useRoute()
    const axiosComposable = useAxios()
    // Repositories
    const repoAuth = useRepoAuth()
    const repoJob = useRepoJob()
    const repoJobApplication = useRepoJobApplication()
    const repoCompany = useRepoCompany()
    // state
    const state = reactive({
        ui: null,
        unsubscribe: null,
        isSent: false,
        authResult: null,
        countdownInterval: null,
        cdDefault: 120,
        cdVisible: 0,
    })
    // methods
    function listenToAuthState() {
        const firebaseAuth = getAuth()
        state.unsubscribe = onAuthStateChanged(firebaseAuth, async (userInfo) => {
            if (!userInfo) {
                // 造成登入機制無法連貫
                if (repoAuth.state.user && repoAuth.state.user.uid) {
                    // 判斷為從登入變成登出
                    repoAuth.userSignout()
                    if (route.path.includes('admin')) {
                        this.$router.push({
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
            await signIn(user)
        })
    }
    async function handleAuthResult(authResult, type) {
        state.authResult = authResult
        const basicInfo = getBasicInfo(type)
        if (!basicInfo.email) {
            await $alert('請使用其他方式登入')
            return
        }
        if (basicInfo.emailVerified) {
            signIn(basicInfo)
        } else {
            sendEmailLink(type)
        }
    }
    async function signIn(user) {
        const auth = getAuth()
        if (!auth || !auth.currentUser) {
            return
        }
        // repoAuth.setUser(user) // 這行附加會造成某些程式碼被跳過
        const idToken = await auth.currentUser.getIdToken()
        axiosComposable.setToken(idToken)
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
            Object.assign(user, employee)
            await repoJob.getJobRecommended()
            await repoJobApplication.getUserJobs({
                userId: user.id,
            })
            repoAuth.setUser(user)
            $emitter.emit("hideUserModal")
            $emitter.emit('hideCompanyModal')
            if (route.path.includes('admin') || route.name === 'index') {
                router.push({
                    name: 'jobs'
                })
            }
            return
        }
        if (admin) {
            user.type = "admin"
            Object.assign(user, admin)
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
                repoCompany.setCompany(company)
                const whiteList = ['admin', 'about', 'pending', 'job']
                const isNotPermitted = whiteList.every(word => {
                    return !route.path.includes(word)
                })
                if (isNotPermitted) {
                    router.push({
                        name: 'admin'
                    })
                }
            } else {
                // 未完成註冊人資導向到公司註冊畫面
                router.push({
                    name: 'companyRegister'
                })
            }
            $emitter.emit("hideUserModal")
            $emitter.emit('hideCompanyModal')
            return
        }
        // 判斷是否為註冊到一半的求職者
        const userString = localStorage.getItem("user")
        const tempUser = JSON.parse(userString)
        if (!user.id && userString && tempUser.preference) {
            // 五題已經作答回最後一步驟，反之回去作答
            const questionKeys = ["partner", "variety", "env", "phase", "manage"]
            const answeredList = Object.keys(tempUser.preference)
            const allAnswered = questionKeys.every((question) => {
                return answeredList.includes(question)
            })
            if (allAnswered) {
                router.push({
                    name: "userRegister",
                })
            } else {
                router.push({
                    name: "questions",
                })
            }
            user.type = "employee"
            repoAuth.setUser(user)
            $emitter.emit("hideUserModal")
            $emitter.emit('hideCompanyModal')
            return
        }
        // 各種未完成註冊的用戶
        if (route.path.includes('admin')) {
            // 導向到公司註冊畫面
            user.type = "admin"
            router.push({
                name: 'companyRegister'
            })
        } else {
            user.type = "employee"
            router.push({
                name: "questions",
            })
        }
        repoAuth.setUser(user)
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
        sendEmailLink
    }
}