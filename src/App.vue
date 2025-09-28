<template>
    <img v-if="!isLoggedIn" src="/logo.png" class="logo" alt="Portfolio logo" />
    <Toolbar v-if="isLoggedIn" />
    <router-view />
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
import { computed, onMounted, onUnmounted, provide } from 'vue'
import { goTo } from './utils/router'
import { useAuthStore } from './stores/auth.store'
import Toolbar from './components/Toolbar.vue'
import { debug } from './utils/utils'


const authStore = useAuthStore()
const isLoggedIn = computed(() =>  authStore.isLoggedIn)

const storageChangeHandler = (event: StorageEvent) => {
  if (event.key === authStore.STORAGE_NAME) {
    try {
      const newState = JSON.parse(event.newValue || '{}')
      authStore.$patch(newState)

      debug(`auth event cathed. authStore.isLoggedIn:${authStore.isLoggedIn}, authStore.username:${authStore.username}.`)
      
      if(authStore.isLoggedIn) goTo('Home')
      else goTo("Landing")

    } catch (error) {
      console.error('Error parsing localStorage data:', error)
    }
  }
}

onMounted(async () => {
  window.addEventListener('storage', storageChangeHandler)

  // Check login status on app load
  if (authStore.isLoggedIn) {
    goTo('Home')
  }
})

onUnmounted(() => {
  window.removeEventListener('storage', storageChangeHandler)
})

</script>
