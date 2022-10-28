// import firebase from "firebase/app"
import { defineStore } from 'pinia'
import { getAuth, } from "firebase/auth"
export default defineStore('user', () => {
    // we won't expose this element directly
    const state = reactive({
        ui: null,
        unsubscribe: null,
        isSent: false,
        authResult: null,
        countdownInterval: null,
        cdDefault: 120,
        cdVisible: 0,
    })
    return state
}
// export default defineStore('user', {
    // state: () => ({
    //     user: null,
    // }),
    // actions: {
    //     async userSignout() {

    //     },
    //     async deleteUser() {
    //         // const firebaseAuth = getAuth()
    //         // if (!firebaseAuth.currentUser) {
    //         //     return
    //         // }
    //         // const idToken = await firebaseAuth.currentUser.getIdToken()
    //         // const response = await apiDefault.request(types.deleteUser, {
    //         //     url: `/user`,
    //         //     data: {
    //         //         idToken
    //         //     },
    //         // })
    //         // return response
    //     }
    // }
// })