import { Buffer } from 'buffer/'
export default defineNuxtPlugin(() => ({
    provide: {
        Buffer
    },
}))