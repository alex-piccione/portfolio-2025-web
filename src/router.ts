// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/landing', // Redirect to the landing page
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
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('./components/Pages/LandingPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;