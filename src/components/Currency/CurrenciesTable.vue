<template>
    <div class="search-bar"></div>
    <BaseTable :class="inUse ? 'enabled': 'disabled'">
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
                <td><AppCurrency :symbol="currency.symbol" /></td>
                <td>{{ currency.name }}</td>
                <td>{{ currency.kind }}</td>
                <td>
                    <span
                        class="nowrap clickable"
                        @click="$emit('update', currency.id, !inUse)"
                    >
                        <AppIcon
                            :name="inUse ? 'heart_off_outline' : 'heart_plus'"
                            :color="inUse ? 'delete' : 'heart'"
                        />
                        {{ inUse ? "disable" : "enable" }}
                    </span>
                </td>
            </tr>
        </tbody>
    </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from "@/components/Table/BaseTable.vue"
import AppCurrency from "./AppCurrency.vue"
import type { UserCurrency } from "@/entities/Currency"
import AppIcon from "../AppIcon.vue"

defineProps<{
    currencies: UserCurrency[]
    inUse: boolean
}>()

defineEmits<{
    update: [number, boolean]
}>()

</script>

<style lang="scss" scoped>
@use "@/styles/theme" as theme;

.enabled {
    box-shadow: 0 0 5px 0.1rem theme.$ok-color;
}

.disabled {
    box-shadow: 0 0 5px 0.1rem theme.$error-color;
}

table {
    @media (min-width: 768px) {
        min-width: 320px;
    }
}
</style>
