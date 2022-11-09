import Fuse from "fuse.js"
export default defineNuxtPlugin(() => ({
    provide: {
        Fuse
    },
}))