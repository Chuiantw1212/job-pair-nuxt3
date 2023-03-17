// This function is executed before instantiating the app
// only in client-side.
// document: https://nuxtjs.org/docs/2.x/directory-structure/plugins 
import liff from '@line/liff'
// export default defineNuxtPlugin((nuxtApp) => ({
//     provide: {
//         liff: initResult,
//     },
// }))
// const emitter = mitt()
export default defineNuxtPlugin(async nuxtApp => {
    const config = useRuntimeConfig()
    try {
        const initResult = await liff.init({ liffId: config.public.liffId })
        console.log({
            initResult
        })
        console.log('liff.init() done');
        nuxtApp.provide('liff', initResult)
    } catch (error) {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
            console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.');
        }
    }
})
