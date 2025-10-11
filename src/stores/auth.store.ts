// src/stores/auth.store.ts
// Manages the application's authentication state. This is the single source of truth for whether the user is logged in, their username, roles, and any other relevant authentication-related information that the UI needs to know.
import { defineStore } from "pinia"
import { ref } from "vue"
import AuthService from "@/services/auth.service"
import { Result } from "@/utils/result"
import { goTo } from "@/utils/router"

const STORAGE_NAME = "auth"

export const useAuthStore = defineStore(STORAGE_NAME, () => {
  const isLoggedIn = ref(false)
  const username = ref<string | undefined>(undefined)

  async function login(username_: string, password: string): Promise<Result<boolean>> {
    try {
      const result = await AuthService.login(username_, password) 
      if (result.isSuccess) {
        isLoggedIn.value = true
        username.value = result.value.username // use the email for now      
      return Result.success(true)
      } else {
        return Result.failed(result.error)
      }
    } catch (error: any) {
      console.warn("login error")
      isLoggedIn.value = false
      username.value = undefined
      return Result.failed(error || "Login failed")
    }
  }

  async function logout() {
    isLoggedIn.value = false
    username.value = undefined

    goTo("Landing")
  }

  async function getLogin() {
    return isLoggedIn.value ?
    { username } : null
  }

  return { STORAGE_NAME, isLoggedIn, username, login, logout}
}, 
{
  persist: true // by default it use localStorage that is shared across browser tabs (not sessionStorage)
})
