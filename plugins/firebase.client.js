import { auth } from "firebaseui"
// import { initializeApp } from "firebase/app"
// Create App
let firebaseConfig = {}
if (false) {
    // firebaseConfig = {
    //     apiKey: "AIzaSyBXP_LIxi5mOtbwaueWFRArAfinuK7XgTc",
    //     authDomain: "job-pair-taiwan-prd.firebaseapp.com",
    //     projectId: "job-pair-taiwan-prd",
    //     storageBucket: "job-pair-taiwan-prd.appspot.com",
    //     messagingSenderId: "539306285865",
    //     appId: "1:539306285865:web:bb7589ad6fcafdd7a63538",
    //     measurementId: "G-80H8KDK7FK"
    // }
} else {
    firebaseConfig = {
        apiKey: "AIzaSyC8nz4h8U9CHPBCtmgZAzGRj3sFS_E8VOY",
        authDomain: "job-pair-taiwan-dev.firebaseapp.com",
        projectId: "job-pair-taiwan-dev",
        storageBucket: "job-pair-taiwan-dev.appspot.com",
        messagingSenderId: "595667998910",
        appId: "1:595667998910:web:afc6e05ee9f0ca1ff4a6ef",
        measurementId: "G-4W7V4ZKXGR"
    }
}
// const firebaseApp = initializeApp(firebaseConfig)
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            firebaseuiAuth: auth,
            // firebaseApp
        }
    }
})
