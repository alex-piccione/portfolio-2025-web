// src/services/auth.service.ts
// Business logic layer that orchestrates authentication operations
// Coordinates between API calls and state management

import CookieUtils from "@/utils/cookie.utils"
import AuthApi from "./api/auth.api"
import { Result } from "@/utils/result"
import { useAuthStore } from "@/stores/auth.store"
import { goTo } from "@/utils/router"

export default class AuthService {

    /**
     * Handles complete login flow: API call, token storage, state update
     */
    static async login(username: string, password: string): Promise<Result<boolean>> {
        try {
            // Call API
            const apiResult = await AuthApi.login(username, password)

            if (apiResult.isSuccess) {
                // Store tokens
                CookieUtils.setCookie(
                    "AuthToken", 
                    apiResult.value.accessToken, 
                    apiResult.value.accessTokenExpiresAt
                )

                CookieUtils.setCookie(
                    "RefreshToken",
                    apiResult.value.refreshToken,
                    apiResult.value.refreshTokenExpiresAt
                )

                // Update store state
                const authStore = useAuthStore()
                authStore.setAuthenticated(username)

                return Result.success(true)
            } else {
                return Result.failed(apiResult.error)
            }
        } catch (error: any) {
            // TODO: logger.error("Login failed.", error)
            console.warn("Login error:", error)
            return Result.failed(error?.message || "Login failed")
        }
    }

    /**
     * Handles complete logout flow: clear tokens, state, and navigation
     */
    static async logout(): Promise<void> {
        try {
            // Clear token
            CookieUtils.deleteCookie("AuthToken")
        } catch (error: any) {
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
        } catch (error: any) {
            console.warn("Refresh token error:", error);
            return Result.failed(error?.message || "Failed to refresh token");
        }
    }
    */

    /**
     * Check if user is currently authenticated
     */
    static isAuthenticated(): boolean {
        const authStore = useAuthStore()
        return authStore.isLoggedIn
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
        } catch (error: any) {
            console.warn("Auth initialization error:", error)
            // On error, clear everything
            this.logout()
        }
    }

}