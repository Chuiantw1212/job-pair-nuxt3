import { Modal, Collapse, Tooltip } from "bootstrap"
export default defineNuxtPlugin(() => ({
    provide: {
        bootstrap: {
            Modal,
            Collapse,
            Tooltip
        },
    },
}))