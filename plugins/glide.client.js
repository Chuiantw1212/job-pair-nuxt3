import Glide, { Autoplay, Controls } from '@glidejs/glide/dist/glide.modular.esm'
export default defineNuxtPlugin(() => ({
    provide: {
        Glide: {
            Default: Glide,
            Controls,
            Autoplay,
        },
    },
}))