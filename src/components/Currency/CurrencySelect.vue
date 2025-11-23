<template>
    <AppSelect
        :model-value="modelValue"
        @update:model-value="(value) => emit('update:modelValue', value)"
        v-bind="$attrs"
        :options="
            currencies.map((c) => ({
                label: c.symbol,
                value: c.id.toString(),
                item: c,
            }))
        "
    >
        <template #option="{ option }">
            <AppCurrency :symbol="(option.item as Currency).symbol" />
        </template>
    </AppSelect>
</template>

<script setup lang="ts">
import type Currency from "@/entities/Currency"
import AppCurrency from "@/components/Currency/AppCurrency.vue"
import AppSelect from "@/components/Form/AppSelect.vue"
import { ref } from "vue"
import { useCurrencyStore } from "@/stores/currency.store"

const props = withDefaults(
    defineProps<{
        modelValue: string
        onlyMajor?: boolean
    }>(),
    {
        onlyMajor: false,
    },
)

const emit = defineEmits(["update:modelValue"])

const currencyStore = useCurrencyStore()
const currencies = ref(props.onlyMajor ? currencyStore.majorCurrencies : currencyStore.currencies)
</script>
