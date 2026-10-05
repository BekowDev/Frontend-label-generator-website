import AuthVue from "@/pages/Auth.vue"
import GeneratorVue from "@/pages/Generator.vue"
import LabelsVue from "@/pages/Labels.vue"
import LandingVue from "@/pages/Landing.vue"

import { createRouter, createWebHistory } from "vue-router"

const authGuard = function (to, from, next) {
    const isAuthorized = localStorage.hasOwnProperty("token")
    const isDemoMode = sessionStorage.getItem("demoMode") === "true"
    !isAuthorized && !isDemoMode ? next({ path: "/auth" }) : next()
}
const authorized = function (to, from, next) {
    const isAuthorized = localStorage.hasOwnProperty("token")
    const isDemoMode = sessionStorage.getItem("demoMode") === "true"
    isAuthorized || isDemoMode ? next({ path: "/labels" }) : next()
}

const routes = [
    {
        path: "/",
        component: LandingVue,
    },
    {
        path: "/auth",
        component: AuthVue,
        beforeEnter: authorized,
    },
    {
        path: "/generator",
        component: GeneratorVue,
        beforeEnter: authGuard,
    },
    {
        path: "/labels",
        component: LabelsVue,
        beforeEnter: authGuard,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router
