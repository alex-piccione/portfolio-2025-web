<template>
    <div>
    <button @click="onAddNewHolding" class="add-holding-button">Add New Holding</button>
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HoldingService from '@/services/holding.service'
import type Holding from '@/entities/Holding'
import { useAuthStore } from '@/stores/auth.store'
import { formatDate } from '../format.helper'

const holdings = ref<Holding[]>([])
const authStore = useAuthStore()

onMounted(async () => {
    // ... existing code ...
    if(authStore.isLoggedIn === false) {
        console.warn("User not authenticated. Cannot fetch holdings.")
        return;
    }

    const holdingService = new HoldingService()
    holdings.value = await holdingService.listforUser(authStore.id!)
})

const onAddNewHolding = () => {
  console.log("Add New Holding button clicked!");
  // TODO: In a real application, you would navigate to a form
  //       or open a modal here to create a new holding.
}
</script>

<style scoped lang="scss">
@use "@/styles/table";
@use "@/styles/theme";

.add-holding-button {
  background-color: theme.$accent-color;
  color: theme.$text-color-emphasis; // Assuming emphasis text color works well on accent background
  padding: theme.$padding-small theme.$padding;
  border: none;
  border-radius: theme.$border-radius;
  cursor: pointer;
  margin-bottom: theme.$padding;
  font-size: 1rem; // Or use a theme font size variable if available
  font-family: theme.$primary-font;
  transition: background-color 0.2s ease; // Smooth transition for hover effect
}

.add-holding-button:hover {
  background-color: color-mix(in srgb, theme.$accent-color 85%, black);
}
</style>