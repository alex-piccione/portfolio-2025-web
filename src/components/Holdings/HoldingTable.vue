<!-- src/components/Holdings/HoldingTable.vue -->
<template>
    <div>
        <button @click="onAddNewHolding" class="ok add-holding-button">
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
                    <td>Not defined yet</td>
                    <td>{{ holding.currency.id }}</td>
                    <td>{{ formatDate(holding.date) }}</td>
                    <td>{{ holding.action }}</td>
                    <td>{{ holding.amount }}</td>
                    <td>{{ holding.note }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <AppModal
        :is-open="showAddHoldingModal"
        title="Add New Holding"
        @close="showAddHoldingModal = false"
    >
        <AddNewHoldingForm
            ref="addNewHoldingForm"
            @saved="handleSaved"
            @cancel="showAddHoldingModal = false"
        />
        <template #footer>
            <button class="cancel" @click="showAddHoldingModal = false">
                Cancel
            </button>
            <button class="ok">Save</button>
        </template>
    </AppModal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import HoldingService from "@/services/holding.service"
import type Holding from "@/entities/Holding"
import { useAuthStore } from "@/stores/auth.store"
import { formatDate } from "../format.helper"
import AppModal from "@/components/AppModal.vue"
import AddNewHoldingForm from "./AddNewHoldingForm.vue"

const holdings = ref<Holding[]>([])
const authStore = useAuthStore()

onMounted(async () => {
    // ... existing code ...
    if (authStore.isLoggedIn === false) {
        console.warn("User not authenticated. Cannot fetch holdings.")
        return
    }

    const holdingService = new HoldingService()
    holdings.value = await holdingService.listforUser(authStore.userId!)
})

const showAddHoldingModal = ref(false)

const onAddNewHolding = () => (showAddHoldingModal.value = true)
const handleSaved = () => {
    showAddHoldingModal.value = false
    // Refresh the holdings list after adding a new holding
    // This could be optimized to just add the new holding to the list
    // if the API returns it directly
    //onMounted()
}
</script>

<style scoped lang="scss">
@use "@/styles/table";
</style>
