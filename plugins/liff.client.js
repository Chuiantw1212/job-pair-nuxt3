// This function is executed before instantiating the app
// only in client-side.
// document: https://nuxtjs.org/docs/2.x/directory-structure/plugins 
import liff from '@line/liff'
console.log({
    liff
});
export default defineNuxtPlugin(async nuxtApp => {
    const config = useRuntimeConfig()
    try {
        const initResult = await liff.init({ liffId: config.public.LIFF_ID })
        console.log({
            initResult
        })
        console.log('liff.init() done');
        nuxtApp.provide('liff', initResult)
    } catch (error) {
        console.log(`liff.init() failed: ${error}`);
        if (!config.public.LIFF_ID) {
            console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.');
        }
    }
})
// export default defineNuxtPlugin(nuxtApp => {
//     console.log({
//         nuxtApp
//     });
//     const config = useRuntimeConfig()
//     const initResult = liff.init({ liffId: config.public.LIFF_ID })
//         .then((test) => {
//             console.log({
//                 test
//             })
//             console.log('liff.init() done');
//         })
//         .catch(error => {
//             console.log(`liff.init() failed: ${error}`);
//             if (!config.public.LIFF_ID) {
//                 console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.');
//             }
//             return Promise.reject(error);
//         });
//     console.log({
//         initResult
//     });
//     nuxtApp.provide('liff', initResult)
// })
