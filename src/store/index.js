import { createStore } from "vuex"
import { generatorModule } from "./generatorModule"
import { labelModule } from "./labelModule"
import { authModule } from "./authModule"

export default createStore({
    state: () => ({
        theme: localStorage.getItem("theme") || 'light',
        language: localStorage.getItem("language") || 'ru',
        demoMode: sessionStorage.getItem("demoMode") === "true",
    }),
    mutations: {
        setDemoMode(state, value) {
            state.demoMode = value
            if (value)
                sessionStorage.setItem("demoMode", "true")
            else
                sessionStorage.removeItem("demoMode")
        },
        setTheme(state, value) {
            state.theme = value
            localStorage.setItem("theme", value)
        },
        setLanguage(state, value) {
            state.language = value
            localStorage.setItem("language", value)
        },
        exitAccount() {
            localStorage.clear()
            window.location.href = '/'
        },
    },
    modules: {
        generatorModule,
        labelModule,
        authModule,
    },
})
