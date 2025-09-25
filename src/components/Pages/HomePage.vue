// src/components/Pages/HomePAge.vue
// This page is shown when an Account is found in the session
<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <!-- Add more dashboard content here -->
  </div>
</template>

<script setup lang="ts">
import { goTo } from '@/router';
import AuthUtils from '@/utils/auth.utils';
import { onMounted } from 'vue';


onMounted(() => {

  AuthUtils.getLoginStatus("Home page")
  .then(result => {
    if (result.isLoggedIn === false) {
      console.warn("user is not logged in")
      goTo("Landing")
    } 
  })
  .catch(error => {
    console.error(error)
    goTo("Landing")
  })
})
</script>

<style scoped>
/* Add scoped styles here */
</style>


