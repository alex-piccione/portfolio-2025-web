// src/stores/custodian.store.ts
// Pure state management for custodians
// No business logic - just state getters and setters
import { defineStore } from "pinia"
import { ref } from "vue"
import type Custodian from "@/entities/Custodian"
import CustodianService from "@/services/custodian.service"
import { fail } from "@/utils/utils"

const STORAGE_NAME = "custodian"

export const useCustodianStore = defineStore(
    STORAGE_NAME,
    () => {
        // ---------- State ----------
        const custodians = ref<Custodian[]>([])
        const isLoading = ref(false)
        const error = ref<string | null>(null)

        // ---------- Actions ----------
        /** Load all custodians from the API via the service */
        async function fetchCustodians() {
            isLoading.value = true
            error.value = null

            const result = await CustodianService.list()
            const _ = result.isSuccess
                ? (custodians.value = result.value)
                : (error.value = result.error)

            isLoading.value = false
        }

        /** Refresh the list – useful after a create / update operation */
        async function refresh() {
            await fetchCustodians()
        }

        /** Optional: clear state (e.g. on logout) */
        function clear() {
            custodians.value = []
            error.value = null
            isLoading.value = false
        }

        // ---------- Getters ----------
        /** Get custodian by ID or throw error if not found */
        const get = (id: number): Custodian =>
            custodians.value.find((c) => c.id === id) ||
            fail(`Cannot find a Custodian with id: ${id}.`)

        return {
            // state
            custodians,
            isLoading,
            error,
            // actions
            fetchCustodians,
            refresh,
            clear,
            get,
        }
    },
    {
        persist: true,
    },
)
