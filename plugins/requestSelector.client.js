export default defineNuxtPlugin(() => {
    return {
        provide: {
            requestSelector: (selectorString, callback,) => {
                console.time(`Request element ${selectorString}`)
                let localCount = 0
                function step() {
                    if (localCount >= 100) {
                        console.error(`Cannot find element ${selectorString}`)
                        return
                    }
                    const queryResult = document.querySelector(selectorString)
                    if (queryResult) {
                        callback(queryResult)
                        console.timeEnd(`Request element ${selectorString}`)
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