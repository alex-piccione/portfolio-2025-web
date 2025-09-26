// src/components/Pages/HomePAge.vue
// This page is shown when an Account is found in the session
<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <!-- Add more dashboard content here -->

    <Icon name="bell" size="small"/>

    <Icon name="account" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Icon from '@/components/Icon.vue'

onMounted(() => {

})
</script>

<style scoped>
/* Add scoped styles here */
</style>
