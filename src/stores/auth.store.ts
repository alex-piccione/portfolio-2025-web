// src/stores/auth.store.ts
// Manages the application's authentication state. This is the single source of truth for whether the user is logged in, their username, roles, and any other relevant authentication-related information that the UI needs to know.
import { defineStore } from "pinia"
import { ref } from "vue"
import AuthService from "@/services/auth.service"
import { Result } from "@/utils/result"

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false)
  const username = ref<string | undefined>(undefined)

  async function login(email: string, password: string): Promise<Result<boolean>> {
    try {
      const result = await AuthService.login(email, password) 
      isLoggedIn.value = true
      username.value = result.email  // use the email for now      
      return Result.success(true)
    } catch (error: any) {
      console.warn("login error")
      isLoggedIn.value = false
      username.value = undefined
      return Result.failed(error)
    }
  }

  async function logout() {
    isLoggedIn.value = false
    username.value = undefined
  }

  async function getLogin() {
    return isLoggedIn.value ?
    { username } : null
  } 
    
  return { isLoggedIn, username, login, logout}
}, 
{
  persist: true // by default it use localStorage that is shared across browser tabs (not sessionStorage)
})
