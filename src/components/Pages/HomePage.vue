// src/components/Pages/Home.vue
<template>
    <div>
        <h1>Holdings</h1>
        <HoldingTable />

        <!--
    <Icon name="bell" size="small"/>
    <Icon name="account" />
    --></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import HoldingTable from "@/components/Holding/HoldingTable.vue"
import { debug } from "@/utils/utils"
import { useCustodianStore } from "@/stores/custodian.store"
import { useCurrencyStore } from "@/stores/currency.store"

onMounted(async () => {
    //const currencies = await CurrencyService.list()

    // load stores
    debug("HomePage.vue - onounted | load stores")
    await useCustodianStore().refresh()
    await useCurrencyStore().refresh()
})
</script>
