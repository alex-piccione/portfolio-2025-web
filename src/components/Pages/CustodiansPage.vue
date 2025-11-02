<template>
    <InlineError :error />
    <BaseTable>
        <thead>
            <tr>
                <th>Name</th>
                <th>Custodian</th>
                <th>Account</th>
                <th>Type</th>
                <th>Color</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="custodian in custodians" :key="custodian.name">
                <td>{{ custodian.name }}</td>
                <td>{{ custodian.custodian }}</td>
                <td>{{ custodian.account }}</td>
                <td>{{ custodian.colorCode }}</td>
            </tr>
        </tbody>
    </BaseTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import BaseTable from "@/components/Table/BaseTable.vue"
import type Custodian from "@/entities/Custodian"
import InlineError from "../InlineError.vue"
import { useCustodianStore } from "@/stores/custodian.store"

const error = ref<unknown>()
const custodians = ref<Custodian[]>([])
const custodianStore = useCustodianStore()

onMounted(async () => {
    custodians.value = custodianStore.custodians
})
</script>
