// src/router.ts
import { createRouter, createWebHistory } from "vue-router"
import AuthService from "@/services/auth.service"

export type RouteNames = "Landing" | "Home" | "Login"
export const goTo = (routeName: RouteNames) => router.push({ name: routeName })

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
  if (to.meta.requiresAuth && !AuthService.isAuthenticated()) {
    return { name: "Login" } // Redirect to login if not authenticated
  }
})

export default router
