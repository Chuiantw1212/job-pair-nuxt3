export default defineNuxtPlugin(() => {
    return {
        provide: {
            requestSelector: (selectorString, callback,) => {
                let localCount = 0
                function step() {
                    if (localCount >= 100) {
                        console.error(`Cannot find element ${selectorString}`)
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
                step()
            },
            requestSelectorAll: (selectorString, callback,) => {
                let localCount = 0
                function step() {
                    if (localCount >= 100) {
                        console.error(`Cannot find element ${selectorString}`)
                        return
                    }
                    const queryResult = document.querySelectorAll(selectorString)
                    if (queryResult && queryResult.length !== 0) {
                        callback(queryResult)
                    } else {
                        localCount++
                        window.requestAnimationFrame(step)
                    }
                }
                step()
            },
        }
    }
})