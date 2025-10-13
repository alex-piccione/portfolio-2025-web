// src/components/Pages/Home.vue
<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>

    <Icon name="bell" size="small"/>
    <Icon name="account" />

    <hr />

    <HoldingTable />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Icon from '@/components/Icon.vue'
import HoldingTable from '@/components/Holdings/HoldingTable.vue'
import CurrencyService from '@/services/currency.service'

const a = undefined

onMounted(async () => {
  const currencies = await CurrencyService.list()
})
</script>

<style scoped lang="scss">
/* Add scoped styles here */
</style>
