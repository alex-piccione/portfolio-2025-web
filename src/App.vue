<template>
  <div>
    <img src="/logo.png" class="logo" alt="Portfolio logo" />
  </div>
  
  <router-view />

</template>

<style scoped lang="scss">
@use "styles/theme" as theme;

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
import { provide } from 'vue'
import AuthService from '@/services/auth.service'

const authService = new AuthService()

// provide the service to all th descendant component
provide("authService", authService)

</script>
