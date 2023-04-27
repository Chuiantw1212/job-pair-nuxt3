import { auth } from "firebaseui"
// import { initializeApp } from "firebase/app"
import firebase from "firebase"
export default defineNuxtPlugin(() => {
    // Create App
    const runtimeConfig = useRuntimeConfig()
    let firebaseConfig = {}
    if (runtimeConfig.public.VITE_APP_FIREBASE_ENV === 'production') {
        firebaseConfig = {
            apiKey: "AIzaSyBXP_LIxi5mOtbwaueWFRArAfinuK7XgTc",
            authDomain: "job-pair-taiwan-prd.firebaseapp.com",
            projectId: "job-pair-taiwan-prd",
            storageBucket: "job-pair-taiwan-prd.appspot.com",
            messagingSenderId: "539306285865",
            appId: "1:539306285865:web:bb7589ad6fcafdd7a63538",
            measurementId: "G-80H8KDK7FK"
        }
    } else {
        firebaseConfig = {
            apiKey: "AIzaSyC8nz4h8U9CHPBCtmgZAzGRj3sFS_E8VOY",
            authDomain: "job-pair-taiwan-dev.firebaseapp.com",
            projectId: "job-pair-taiwan-dev",
            storageBucket: "job-pair-taiwan-dev.appspot.com",
            messagingSenderId: "595667998910",
            appId: "1:595667998910:web:afc6e05ee9f0ca1ff4a6ef",
            measurementId: "G-H0LNN14FD5"
        }
    }
    const firebaseApp = firebase.initializeApp(firebaseConfig)
    console.log('initializeApp', firebaseApp);
    // https://stackoverflow.com/questions/71823473/i-am-seeing-following-error-while-trying-to-add-firebase-analytics
    try {
        // getAnalytics(firebaseApp)
    } catch (error) {
        console.log(error.message);
    }
    return {
        provide: {
            firebaseuiAuth: auth,
            storageBucket: firebaseConfig.storageBucket
        }
    }
})
