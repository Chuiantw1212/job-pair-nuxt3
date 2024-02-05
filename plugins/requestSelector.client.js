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
            throttle(mainFunction, delay) {
                let timerFlag = null; // Variable to keep track of the timer

                // Returning a throttled version 
                return (...args) => {
                    if (timerFlag === null) { // If there is no timer currently running
                        mainFunction(...args); // Execute the main function 
                        timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
                            timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
                        }, delay);
                    }
                };
            }
        }
    }
})