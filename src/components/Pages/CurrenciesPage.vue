<template>
    <InlineError :error="error" />
    <div class="currencies-page">
        <div class="currencies-page__left">
            <h4>Enabled</h4>
            <CurrenciesTable
                :inUse="true"
                :currencies="currenciesInUse"
                @update="handleUpdate"
            />
        </div>
        <div class="currencies-page__right">
            <h4>Disabled</h4>
            <CurrenciesTable
                :inUse="false"
                :currencies="currenciesNotUsed"
                @update="handleUpdate"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import CurrenciesTable from "@/components/Currency/CurrenciesTable.vue"
import type { UserCurrency } from "@/entities/Currency"
import CurrencyService from "@/services/currency.service"
import { onMounted, ref } from "vue"
import InlineError from "../InlineError.vue"

const error = ref<unknown>()
const currenciesInUse = ref<UserCurrency[]>([])
const currenciesNotUsed = ref<UserCurrency[]>([])

onMounted(async () => {
    await load()
})

const load = async () => {
    const result = await CurrencyService.listOfUser()

    if (result.isSuccess) {
        currenciesInUse.value = result.value.filter((c) => c.isUsed)
        currenciesNotUsed.value = result.value.filter((c) => c.isUsed == false)
    } else {
        error.value = result.error
    }
}

const handleUpdate = async (currencyId: number, enable: boolean) => {
    error.value = null
    const result = await CurrencyService.enableForUser(currencyId, enable)
    if (!result.isSuccess) error.value = result.error

    await load()
}
</script>

<style lang="scss" scoped>
.currencies-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        flex-direction: row;
    }

    &__left,
    &__right {
        flex: 1; // Each div takes up equal space when in a row
    }
}
</style>
