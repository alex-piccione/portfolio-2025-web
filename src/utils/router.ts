// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

export type RouteNames = "Landing" | "Dashboard" | "Login"
export const goTo = (routeName: RouteNames) => router.push({ name: routeName })

const routes = [
  {
    path: '/',
    redirect: '/landing', // Redirect to the landing page
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import("@/components/Pages/LandingPage.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Pages/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/Pages/HomePage.vue'),
    meta: { requiresAuth: true}
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      console.warn(`Missing Auth for access ${to}`)
      // Delay navigation until authStore is initialized to prevent race condition
      await nextTick()
      next({name: "Landing"})
    }
  }

  next()
})

export default router