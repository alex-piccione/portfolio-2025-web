//src/stores/currency.store.ts
// Pure state management for currencies
// No business logic - just state getters and setters
import { defineStore } from "pinia"
import { ref } from "vue"
import type Currency from "@/entities/Currency"
import CurrencyService from "@/services/currency.service"
import { fail } from "@/utils/utils"

const STORAGE_NAME = "currency"

export const useCurrencyStore = defineStore(
    STORAGE_NAME,
    () => {
        // ---------- State ----------
        const currencies = ref<Currency[]>([])
        const isLoading = ref(false)
        const error = ref<string | null>(null)

        // ---------- Actions ----------
        /** Load all currencies from the API via the service */
        async function fetchCurrencies() {
            isLoading.value = true
            error.value = null

            // TODO: add retry
            const result = await CurrencyService.list()
            const _ = result.isSuccess
                ? (currencies.value = result.value)
                : (error.value = result.error)

            isLoading.value = false
        }

        /** Refresh the list – useful after a create / update operation */
        async function refresh() {
            await fetchCurrencies()
        }

        /** Optional: clear state (e.g. on logout) */
        function clear() {
            currencies.value = []
            error.value = null
            isLoading.value = false
        }

        // ---------- Getters ----------
        /** Get custodian by ID or throw error if not found */
        const get = (id: number): Currency =>
            currencies.value.find((c) => c.id === id) ||
            fail(`Cannot find a Currency with id: ${id}.`)

        return {
            // state
            currencies,
            isLoading,
            error,
            // actions
            fetchCurrencies,
            refresh,
            clear,
            get,
        }
    },
    {
        persist: true,
    },
)
