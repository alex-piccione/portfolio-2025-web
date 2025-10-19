<template>
  <h1>Currencies</h1>
  <ul class="currency-list">
    <li v-for="currency in currencyStore.currencies" :key="currency.id" class="currency-list__item">
      {{ currency.name }} ({{ currency.symbol }})
    </li>

    <li v-if="currencyStore.isLoading" class="currency-list__loading">
      Loading…
    </li>

    <li v-if="currencyStore.error" class="currency-list__error">
      {{ currencyStore.error }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import type Currency from "@/entities/Currency"
import CurrencyService from "@/services/currency.service"
import { useCurrencyStore } from "@/stores/currency.store"

const currencies = ref<Currency[]>([])

const currencyStore = useCurrencyStore()


onMounted(async () => {
  currencies.value = await CurrencyService.list()
  if (!currencyStore.currencies.length) {
    currencyStore.fetchCurrencies()
  }
})
</script>

<style scoped lang="scss">
@use "@/styles/_general" as *;

.currency-list {
  /*&__item {  }*/
  &__loading { color: gray; }
  &__error { color: red; }
}

</style>