// import VuexApi from './.vuexApi.js'
const test = new vuexApi({
    baseURL: `${import.meta.env.VITE_APP_API_DEFAULT}`,
})
console.log({
    test
})
export default test
// console.log({
//     VuexApi
// })
// class ApiDefault extends VuexApi {
//     constructor(config) {
//         super(config)
//     }
//     request(type, options) {
//         return super.request(type, options,)
//     }
// }

// export default new ApiDefault({
//     baseURL: `${import.meta.env.VITE_APP_API_DEFAULT}`,
// })