import { auth } from "firebaseui"
import firebaseApp from "firebase/compat/app"
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            firebaseuiAuth: auth,
            firebaseApp
        }
    }
})
