<!-- src/components/Holdings/HoldingTable.vue -->
<template>
    <InlineError :error="error" position="center" />
    <div>
        <button @click="showAddHoldingModal = true" class="ok">
            Add New Holding
        </button>
        <table>
            <thead>
                <tr>
                    <th>Custodian</th>
                    <th>Currency</th>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Amount</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="holding in holdings" :key="holding.id">
                    <td>{{ holding.custodian.name }}</td>
                    <td>{{ holding.currency.name }}</td>
                    <td>{{ formatDate(holding.date) }}</td>
                    <td>{{ holding.action }}</td>
                    <td>{{ holding.amount }}</td>
                    <td>{{ holding.note }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <NewHoldingModal
        :is-open="showAddHoldingModal"
        @cancel="showAddHoldingModal = false"
        @created="handleCreated"
    ></NewHoldingModal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import HoldingService from "@/services/holding.service"
import type Holding from "@/entities/Holding"
import { useAuthStore } from "@/stores/auth.store"
import { formatDate } from "@/components/format.helper"
import NewHoldingModal from "./NewHoldingModal.vue"
import { debug } from "@/utils/utils"
import InlineError from "../InlineError.vue"

const error = ref<unknown>(null)
const holdings = ref<Holding[]>([])
const authStore = useAuthStore()
const showAddHoldingModal = ref(false)

onMounted(async () => {
    if (authStore.isLoggedIn === false) {
        console.warn("User not authenticated. Cannot fetch holdings.")
        return
    }

    await loadHoldings()
})

const loadHoldings = async () => {
    debug("load holdings")
    error.value = ""

    try {
        holdings.value = await HoldingService.list(authStore.userId!)
    } catch (err: unknown) {
        error.value = err
    }
}

const handleCreated = async (_newId: number) => {
    showAddHoldingModal.value = false
    await loadHoldings()
}
</script>

<style scoped lang="scss"></style>
