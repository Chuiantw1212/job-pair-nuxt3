import mitt from 'mitt'
export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('$emitter', mitt())
}