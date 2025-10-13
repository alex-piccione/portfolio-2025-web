<template>
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
    if(authStore.isLoggedIn === false) {
        console.warn("User not authenticated. Cannot fetch holdings.")
        return;
    }

    const holdingService = new HoldingService()
    holdings.value = await holdingService.listforUser(authStore.id!)
})
</script>

<style scoped lang="scss">
@use "/src/styles/_table.scss";

</style>