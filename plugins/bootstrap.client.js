import { Modal } from "bootstrap"
export default defineNuxtPlugin(() => ({
    provide: {
        bootstrap: {
            Modal,
        },
    },
}))