<template>
  <header class="toolbar">
    <div class="toolbar-left">
      <router-link to="/">Home</router-link>
      <!-- Add more menu items here -->
    </div>
    <div class="toolbar-right">
      <span v-if="authStore.isLoggedIn">
        Welcome, {{ authStore.username }}!
        <button @click="logout">Logout</button>
      </span>
      <span v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </span>
      <!-- Add user icon or settings here -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { goTo } from '@/utils/router';

const authStore = useAuthStore();

const logout = async () => await authStore.logout()
</script>

<style scoped lang="scss">
@use "/src/styles/_theme.scss" as theme;

.toolbar {
  background-color: theme.$background-color;

  position: fixed; /* Fixed position */
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px; /* Add horizontal padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */

  .toolbar-left {
    /* Style for left-side menu items */
  }

  .toolbar-right {
    /* Style for right-side user info and settings */
  }
}
</style>