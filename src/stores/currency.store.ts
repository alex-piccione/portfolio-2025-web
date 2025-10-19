//src/stores/currency.store.ts
// Pure state management for currencies
// No business logic - just state getters and setters
import { defineStore } from "pinia"
import { ref } from "vue"
import type Currency from "@/entities/Currency"
import CurrencyService from "@/services/currency.service"

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
      try {
        const list = await CurrencyService.list()
        currencies.value = list
      } catch (e: unknown) {
        error.value =
          e instanceof Error ? e.message : "Failed to load currencies"
      } finally {
        isLoading.value = false
      }
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

    return {
      // state
      currencies,
      isLoading,
      error,
      // actions
      fetchCurrencies,
      refresh,
      clear,
    }
  },
  {
    persist: true,
  },
)
