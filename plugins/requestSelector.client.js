export default defineNuxtPlugin(() => {
    return {
        provide: {
            requestSelector: (selectorString, callback,) => {
                let localCount = 0
                function step() {
                    if (localCount >= 100) {
                        console.log(`Cannot find element ${selectorString}`)
                        return
                    }
                    const queryResult = document.querySelector(selectorString)
                    if (queryResult) {
                        callback(queryResult)
                    } else {
                        localCount++
                        window.requestAnimationFrame(step)
                    }
                }
                window.requestAnimationFrame(step)
            }
        }
    }
})