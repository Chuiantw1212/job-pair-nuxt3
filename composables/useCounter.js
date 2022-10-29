import { defineStore } from 'pinia'
export const useCounter = defineStore('counter', {
    state: () => ({
        count: 100,
    }),
    actions: {
        increment() {
            this.count++
        },
    },
    getters: {
        getCount: (state) => state.count,
    },
})