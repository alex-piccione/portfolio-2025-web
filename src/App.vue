<template>
  <div class="app-contaiuner">
    <img v-if="!isLoggedIn" src="/logo.png" class="logo" alt="Portfolio logo" />
    <Toolbar v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@use "styles/theme" as theme;

.logo {
  height: 12rem;
  padding: 1.5rem;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
   filter: drop-shadow(0 0 2rem theme.$primary-color);
 }
}
</style>

<script setup lang="ts">
import { computed, onMounted, provide } from 'vue'
import { goTo } from './utils/router'
import { useAuthStore } from './stores/auth.store'
import Toolbar from './components/Toolbar.vue'

/*
const authService = new AuthService()

// provide the service to all th descendant component
provide("authService", authService)
*/

const authStore = useAuthStore()
const isLoggedIn = computed(() =>  authStore.isLoggedIn)

onMounted(async () => {
  // Check login status on app load
  if (authStore.isLoggedIn) {
    goTo('Dashboard')
  }
})

</script>
