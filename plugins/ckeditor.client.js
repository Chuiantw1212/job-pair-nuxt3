import Editor from 'ckeditor5-custom-build'
console.log({
    Editor
})
export default defineNuxtPlugin(() => ({
    provide: {
        Editor,
    },
}))