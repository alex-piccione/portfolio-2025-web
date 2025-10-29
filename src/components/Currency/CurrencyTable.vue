<template>
    <div class="search-bar"></div>
    <BaseTable>
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Kind</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="currency in currencies" :key="currency.id">
                <td>{{ currency.symbol }}</td>
                <td>{{ currency.name }}</td>
                <td><AppCurrency :symbol="currency.symbol" /></td>
                <td></td>
            </tr>
        </tbody>
    </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from "@/components/Table/BaseTable.vue"
import { useCurrencyStore } from "@/stores/currency.store"
import AppCurrency from "./AppCurrency.vue"

const currencyStore = useCurrencyStore()

const currencies = currencyStore.currencies
</script>
