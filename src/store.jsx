import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

class Store {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increase() {
        this.secondsPassed += 1
    }

    reset() {
        this.secondsPassed = 0
    }
}

const store = new Store()
export default store
