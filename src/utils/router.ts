// src/router.ts
import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/auth.store"
import { debug } from "@/utils/utils"

export type RouteNames = "Landing" | "Home" | "Login" | "Currencies"
export const goTo = (routeName: RouteNames) => router.push({ name: routeName })

export const goToLogin = async () => {
    try {
        debug("goToLogin - before")
        await goTo("Login")
        debug("goToLogin - after")
    } catch (error) {
        console.error("Error navigating to login page:", error)
    }
}

const routes = [
    {
        path: "/",
        redirect: "/landing", // Redirect to the landing page
    },
    {
        path: "/landing",
        name: "Landing",
        component: () => import("@/components/Pages/LandingPage.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/components/Pages/LoginPage.vue"),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/components/Pages/HomePage.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/currencies",
        name: "Currencies",
        component: () => import("@/components/Pages/CurrenciesPage.vue"),
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    debug(`Navigation from ${from.name?.toString()} to ${to.name?.toString()}`)
    const authStore = useAuthStore()

    // Redirect to login if not authenticated
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        debug("Navigation - not logged in, go to Login")
        return { name: "Login" }
    }
})

export default router
