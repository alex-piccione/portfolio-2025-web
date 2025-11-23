// src/stores/auth.store.ts
// Pure state management for authentication
// No business logic - just state getters and setters

import { defineStore } from "pinia"
import { ref } from "vue"
import AuthService from "@/services/auth.service"
import UserService from "@/services/user.service"
import { goTo } from "@/utils/router"
import { debug } from "@/utils/utils"
import type Currency from "@/entities/Currency"
import { useCurrencyStore } from "@/stores/currency.store"

const STORAGE_NAME = "auth"

export const useAuthStore = defineStore(
    STORAGE_NAME,
    () => {
        const isLoggedIn = ref(false)
        const userId = ref<string | undefined>(undefined)
        const username = ref<string | undefined>(undefined)
        const mainCurrency = ref<Currency | undefined>(undefined)
        const currencyStore = useCurrencyStore()

        /**
         * Set user as authenticated with username
         */
        function setAuthenticated(user: { id: string; username: string; mainCurrency: Currency }) {
            isLoggedIn.value = true
            userId.value = user.id
            username.value = user.username
            mainCurrency.value = user.mainCurrency
        }

        /**
         * Clear authentication state
         */
        function clearAuthentication() {
            isLoggedIn.value = false
            userId.value = undefined
            username.value = undefined
            mainCurrency.value = undefined
        }

        /**
         * Get current authentication state
         */
        function getAuthState() {
            return {
                isLoggedIn: isLoggedIn.value,
                userId: userId.value,
                username: username.value,
                mainCurrency: mainCurrency.value,
            }
        }

        /**
         * Checks session validity and updates state
         * @returns {Promise<boolean>} True if session is valid
         */
        async function checkSessionValidity(): Promise<"SessionOk" | "SessionCheckFailed" | "SessionExpired"> {
            if (!isLoggedIn.value) {
                debug("checkSessionValidity: SessionExpired: not loggedIn")
                //clearAuthentication()
                await goTo("Login") // not logged in
                return "SessionExpired"
            }

            const checkSessionrResult = await AuthService.checkSessionValidity()
            if (!checkSessionrResult.isSuccess) {
                debug(`checkSessionValidity: SessionCheckFailed. Failed to check ${checkSessionrResult.error}`)
                clearAuthentication()

                await goTo("Login") // failed to check
                return "SessionCheckFailed"
            }

            if (!checkSessionrResult.value) {
                debug(`checkSessionValidity: session expired`)
                clearAuthentication()

                await goTo("Login") // session expired
                return "SessionExpired"
            }

            return "SessionOk"
        }

        async function setMainCurrencyById(currencyId: number | null) {
            if (currencyId !== null) {
                await UserService.updateCurrency({ currencyId: currencyId })
                mainCurrency.value = currencyStore.get(currencyId)
                return
            } else {
                mainCurrency.value = undefined
            }
        }

        return {
            STORAGE_NAME,
            // State
            isLoggedIn,
            userId,
            username,
            mainCurrency,
            // Actions
            setAuthenticated,
            clearAuthentication,
            getAuthState,
            checkSessionValidity,
            setMainCurrencyById,
        }
    },
    {
        persist: true, // by default it uses localStorage that is shared across browser tabs (not sessionStorage)
    },
)
