// import firebase from "firebase/app"
import { defineStore } from 'pinia'
import { getAuth, } from "firebase/auth"
export default defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async userSignout() {

        },
        async deleteUser() {
            const firebaseAuth = getAuth()
            if (!firebaseAuth.currentUser) {
                return
            }
            const idToken = await firebaseAuth.currentUser.getIdToken()
            const response = await apiDefault.request(types.deleteUser, {
                url: `/user`,
                data: {
                    idToken
                },
            })
            return response
        }
    }
})