<template>
  <div class="app-contaiuner">
    <img v-if="!isLoggedIn" src="/logo.png" class="logo" alt="Portfolio logo" />
    <Toolbar_2 v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@use "styles/theme" as theme;

.__app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Add padding to the top to account for the fixed toolbar */
:deep(.router-view-wrapper) {  // Use deep selector
  padding-top: 40px; /* Adjust value as needed based on toolbar height */
}

.logo {
  height: 12rem;
  padding: 1.5rem;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2rem theme.$primary-color);
}
</style>

<script setup lang="ts">
import { computed, onMounted, provide } from 'vue'
import { goTo } from './utils/router'
import { useAuthStore } from './stores/auth.store'
import Toolbar from './components/Toolbar.vue'
import Toolbar_2 from './components/Toolbar_2.vue'


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
