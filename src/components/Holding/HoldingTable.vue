<!-- src/components/Holdings/HoldingTable.vue -->
<template>
    <div>
        <button @click="showAddHoldingModal = true" class="ok">Add New Holding</button>
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

  <NewHoldingModal :is-open="showAddHoldingModal"
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

const holdings = ref<Holding[]>([])
const authStore = useAuthStore()

onMounted(async () => {
    // ... existing code ...
    if (authStore.isLoggedIn === false) {
        console.warn("User not authenticated. Cannot fetch holdings.")
        return
    }

    holdings.value = await HoldingService.listforUser(authStore.userId!)
})

const showAddHoldingModal = ref(false)

const handleCreated = () => {
    showAddHoldingModal.value = false
    // TODO:
    // Refresh the holdings list after adding a new holding
    // This could be optimized to just add the new holding to the list
    // if the API returns it directly
    //onMounted()
}
</script>

<style scoped lang="scss"></style>
