export default defineNuxtPlugin(() => {
    return {
        provide: {
            requestSelector: (selectorString, callback,) => {
                function step() {
                    const queryResult = document.querySelector(selectorString)
                    if (queryResult) {
                        callback(queryResult)
                    } else {
                        window.requestAnimationFrame(step)
                    }
                }
                window.requestAnimationFrame(step)
            }
        }
    }
})