// src/router.ts
import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/auth.store"

export type RouteNames = "Landing" | "Home" | "Login"
export const goTo = (routeName: RouteNames) => router.push({ name: routeName })

export const goToLogin = async () => {
    try {
        await goTo("Login")
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
        component: () => import("@/components/Pages/HomePageNew.vue"),
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore()

    // Redirect to login if not authenticated
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        return { name: "Login" }
    }
})

export default router
