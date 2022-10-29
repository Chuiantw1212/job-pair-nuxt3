import { Modal } from "bootstrap"
import { Collapse } from "bootstrap"
export default defineNuxtPlugin(() => ({
    provide: {
        bootstrap: {
            Modal,
            Collapse
        },
    },
}))