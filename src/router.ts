// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';

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
    component: () => import('./components/Pages/LandingPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./components/Pages/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./components/Pages/HomePage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;