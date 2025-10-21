// src/services/auth.service.ts
// Business logic layer that orchestrates authentication operations
// Coordinates between API calls and state management

import CookieUtils from "@/utils/cookie.utils"
import AuthApi from "./api/auth.api"
import { Result } from "@/utils/result"
import { useAuthStore } from "@/stores/auth.store"
import { goTo } from "@/utils/router"
import { debug } from "@/utils/utils"

const resultFailed = (operation:string, error: unknown) => 
    Result.failed(operation + ". " + (error instanceof Error ? error.message : `${error}`))

/*async function execute<T> (action: () => Promise<Result<T>>): Promise<Result<T>> {
    try {
        return await action()
    }
    catch(error: unknown) {
        return Result.failed(error instanceof Error ? error.message : `${error}`)
    }
}*/

export default class AuthService {
    /**
    * Handles complete login flow: API call, token storage, state update
    */
    static async login(
        username: string,
        password: string,
    ): Promise<Result<boolean>> {
        try {
            // Call API
            const apiResult = await AuthApi.login(username, password)

            if (apiResult.isSuccess) {
                // Store tokens
                CookieUtils.setCookie(
                  "AuthToken",
                  apiResult.value.accessToken,
                  apiResult.value.accessTokenExpiresAt,
                )

                CookieUtils.setCookie(
                  "RefreshToken",
                  apiResult.value.refreshToken,
                  apiResult.value.refreshTokenExpiresAt,
                )

                // Update store state
                const authStore = useAuthStore()
                authStore.setAuthenticated(apiResult.value.user)

                return Result.success(true)
            } else {
                return Result.failed(apiResult.error)
            }
        } catch (error: unknown) {
            // TODO: logger.error("Login failed.", error)
            console.warn("Login error:", error)
            return Result.failed(
                error instanceof Error ? error.message || "Login failed" : `${error}`,
            )
        }
    }

    /**
     * Handles complete logout flow: clear tokens, state, and navigation
     */
    static async logout(): Promise<void> {
        try {
            // Clear token
            CookieUtils.deleteCookie("AuthToken")
        } catch (error: unknown) {
            // TODO: logger.error("Logout failed.", error)
            console.warn("Logout error:", error)
        }

        // Clear store state
        const authStore = useAuthStore()
        authStore.clearAuthentication()

        // Navigate to landing page
        goTo("Landing")
    }


    /*
    static checkSessionValidity = () => execute(async () => {
        // check Auth token
        const authToken = CookieUtils.getCookie("AuthToken")
        if (!authToken) {
            // try to refrsh
            const refreshToken = CookieUtils.getCookie("RefreshToken")
            if (!refreshToken)
                return Result.failed("Session is expired")

            const refreshResult = await AuthApi.refreshToken(refreshToken) 
        }

        return Result.success(null)
    })
    */

    /**
     * Check if current Access Token is still valid. 
     * If not try to refresh it using the Refresh token.
     * @returns boolean saying if session is stil valid or not (requires new login)
     */
    static async checkSessionValidity(): Promise<Result<boolean>> {
        // check Auth token
        const authToken = CookieUtils.getCookie("AuthToken")
        if (!authToken) {
            // try to refresh
            const refreshToken = CookieUtils.getCookie("RefreshToken")
            if (!refreshToken) {
                debug("Session is expired")
                return Result.success(false)
            }

            const refreshResult = await AuthApi.refreshToken(refreshToken) 
            if (!refreshResult.isSuccess) 
                return Result.failed(refreshResult.error)
        }

        return Result.success(true)
    }

    static async refreshToken(): Promise<Result<boolean>> {
        try {
            const refreshToken = CookieUtils.getCookie("RefreshToken")
            if (!refreshToken) 
                return Result.failed("No refresh token available")

            const apiResult = await AuthApi.refreshToken(refreshToken)

            if (apiResult.isSuccess) {
                // Update tokens and expiration dates
                CookieUtils.setCookie(
                    "AuthToken",
                    apiResult.value.accessToken,
                    apiResult.value.accessTokenExpiresAt
                )
                CookieUtils.setCookie(
                    "RefreshToken",
                    apiResult.value.refreshToken,
                    apiResult.value.refreshTokenExpiresAt
                );

                return Result.success(true);
            } else {
                return Result.failed(apiResult.error);
            }
        } catch (error: unknown) {
            return resultFailed("Failed to refresh token", error)
        }
    }

    /**
     * Get current user information
     */
    static getCurrentUser(): { username: string | undefined } | null {
        const authStore = useAuthStore()
        return authStore.isLoggedIn ? { username: authStore.username } : null
    }

    /**
     * Initialize authentication state (e.g., on app startup)
     */
    static async initializeAuth(): Promise<void> {
        try {
            const token = CookieUtils.getCookie("AuthToken")
            if (token) {
                // TODO: Validate token with server if needed
                // For now, just check if token exists
                const authStore = useAuthStore()
                // If store has persisted data and token exists, we're good
                if (!authStore.isLoggedIn) {
                    // Token exists but store is not logged in - clear invalid state
                    this.logout()
                }
            } else {
                // No token, ensure store is cleared
                const authStore = useAuthStore()
                if (authStore.isLoggedIn) {
                    authStore.clearAuthentication()
                }
            }
        } catch (error: unknown) {
            console.warn("Auth initialization error:", error)
            // On error, clear everything
            this.logout()
        }
    }
}
