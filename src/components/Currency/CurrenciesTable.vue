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
                <td><AppCurrency :symbol="currency.symbol" /></td>
                <td>{{ currency.name }}</td>
                <td>{{ currency.kind }}</td>
                <td>
                    <span style="white-space: nowrap;">
                    <AppIcon 
                        :name="inUse ? 'heart_off_outline' : 'heart_plus'" 
                        :color="inUse ? 'delete' : 'heart'" 
                        @click="$emit('update', {id: currency.id, enable: !inUse})" clickable /> 
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
import AppIcon from "../AppIcon.vue";

defineProps<{
    currencies: UserCurrency[]
    inUse: boolean
}>()

defineEmits<{
    update: [{id: number, enable: boolean}]
}>()

</script>

<style lang="scss" scoped>
@use "@/styles/theme" as theme;

table {
    border-color: theme.$ok-color;
}
</style>
