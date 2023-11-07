import '@simonwep/pickr/dist/themes/nano.min.css';
import Pickr from '@simonwep/pickr';
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            Pickr,
        }
    }
})