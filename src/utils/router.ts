// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import AuthService from '@/services/auth.service'

export type RouteNames = "Landing" | "Home" | "Login"
export const goTo = (routeName: RouteNames) => router.push({ name: routeName })

const routes = [
  {
    path: '/',
    redirect: '/landing', // Redirect to the landing page
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import("@/components/Pages/Landing.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Pages/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/Pages/Home.vue'),
    meta: { requiresAuth: true}
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth && !(await AuthService.isAuthenticated())) {
    return { name: 'Login' } // Redirect to login if not authenticated
  }
  next()
})

export default router