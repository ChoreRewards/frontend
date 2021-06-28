import { makeAutoObservable } from "mobx"

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    loginState = null

    resetLoginError () {
        this.loginState.error = null
    }

    login ({username, password}) {
        if (!username || !password) {
            this.loginState = {
                error: 'Please provide username and password',
            }
        }
    }
}

const store = new Store()
export default store
