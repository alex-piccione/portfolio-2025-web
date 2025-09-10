<template>
  <h1>Currencies</h1>
  <ul>
    <li v-for="currency in currencies" :key="currency.id">
      {{ currency.name }} ({{ currency.symbol }})
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { CurrencyProvider } from "../providers/currency.provider"
import type Currency from "../entities/Currency"

const currencies = ref<Currency[]>([])

onMounted(async () => {
  currencies.value = await CurrencyProvider.list()
})
</script>
