import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
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
    const app = initializeApp(firebaseConfig)
    try {
        getAnalytics(app)
    } catch (error) {
        console.log('getAnalytics', error.message);
    }
    return {
        provide: {
            storageBucket: firebaseConfig.storageBucket
        }
    }
})
