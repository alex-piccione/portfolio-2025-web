// src/stores/auth.store.ts
// Pure state management for authentication
// No business logic - just state getters and setters

import { defineStore } from "pinia"
import { ref } from "vue"

const STORAGE_NAME = "auth"

export const useAuthStore = defineStore(
  STORAGE_NAME,
  () => {
    const isLoggedIn = ref(false)
    const id = ref<string | undefined>(undefined)
    const username = ref<string | undefined>(undefined)

    /**
     * Set user as authenticated with username
     */
    function setAuthenticated(user: { id: string; username: string }) {
      isLoggedIn.value = true
      id.value = user.id
      username.value = user.username
    }

    /**
     * Clear authentication state
     */
    function clearAuthentication() {
      isLoggedIn.value = false
      id.value = undefined
      username.value = undefined
    }

    /**
     * Get current authentication state
     */
    function getAuthState() {
      return {
        isLoggedIn: isLoggedIn.value,
        id: id.value,
        username: username.value,
      }
    }

    return {
      STORAGE_NAME,
      // State
      isLoggedIn,
      id,
      username,
      // Actions
      setAuthenticated,
      clearAuthentication,
      getAuthState,
    }
  },
  {
    persist: true, // by default it uses localStorage that is shared across browser tabs (not sessionStorage)
  },
)
