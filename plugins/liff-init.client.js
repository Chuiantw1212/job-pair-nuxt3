// This function is executed before instantiating the app
// only in client-side.
// document: https://nuxtjs.org/docs/2.x/directory-structure/plugins 

// import NPM version LIFF JS SDK
import liff from '@line/liff';

export default () => {
  const runtimeConfig = useRuntimeConfig()
  const { LIFF_ID = '' } = runtimeConfig.public

  nuxtApp.provide('liff', liff)
  // inject('liff', liff);

  // execute liff.init()
  const initResult = liff.init({ liffId: LIFF_ID })
    .then((test) => {
      console.log('liff.init() done', test);
    })
    .catch(error => {
      console.log(`liff.init() failed: ${error}`);
      if (!LIFF_ID) {
        console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.');
      }
      return Promise.reject(error);
    });

  // You can access liff.init()'s return value (Promise object)
  // as this.$liffInit() by inject()x
  nuxtApp.provide('liffInit', initResult)
}
