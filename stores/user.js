// import firebase from "firebase/app"
import { defineStore } from 'pinia'
export default defineStore('user', {
    state: () => ({
        user: null,
    }),
    getters: {
        user(state) {
            console.log(state.user)
            if (state.user) {
                return JSON.parse(JSON.stringify(state.user))
            }
        },
    },
    actions: {
        async deleteUser() {
            console.log({
                apiDefault
            })
            // const auth = firebase.auth()
            // if (!auth.currentUser) {
            //     return
            // }
            // const idToken = await auth.currentUser.getIdToken()
            // const response = await apiDefault.request(types.deleteUser, {
            //     url: `/user`,
            //     data: {
            //         idToken
            //     },
            // })
            // return response
        }
        // async logout() {
        //     // ...
        //     await useRequest('/logout', { method: 'post' })
        // }
    }
})