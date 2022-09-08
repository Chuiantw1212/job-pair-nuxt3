import mitt from 'mitt'
export default ({ app }, inject) => {
    inject('emitter', mitt())
}