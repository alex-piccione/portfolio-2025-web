<template>
    <button @click="showAddCustodianModal = true" class="ok">
        Add New Custodian
    </button>
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
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="custodian in custodians" :key="custodian.name">
                <td><AppCustodian :custodian="custodian" /></td>
                <td>{{ custodian.custodian }}</td>
                <td>{{ custodian.account }}</td>
                <td>{{ custodian.kind }}</td>
                <td style="text-align: center;"><span class="color-square" :style="{backgroundColor: custodian.colorCode}"></span></td>
                <td>{{ custodian.description?.slice(0, 50) }}</td>
                <CommandsCell
                    :can-edit="false"
                    :can-delete="true"
                    @delete="remove(custodian.id)"
                />
            </tr>
        </tbody>
    </BaseTable>

    <NewCustodianModal
        :is-open="showAddCustodianModal"
        @created="handleCreated"
        @cancel="showAddCustodianModal = false"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import BaseTable from "@/components/Table/BaseTable.vue"
import type Custodian from "@/entities/Custodian"
import InlineError from "../InlineError.vue"
import { useCustodianStore } from "@/stores/custodian.store"
import AppCustodian from "../Custodian/AppCustodian.vue"
import CommandsCell from "../Table/CommandsCell.vue"
import NewCustodianModal from "../Custodian/NewCustodianModal.vue"

const error = ref<unknown>()
const custodians = ref<Custodian[]>([])
const custodianStore = useCustodianStore()
const showAddCustodianModal = ref(false)

onMounted(async () => {
    custodians.value = custodianStore.custodians
})

const remove = async (id: number) => {
    error.value = null
    const result = await custodianStore.deleteCustodian(id)
    if (result.isSuccess) {
        await custodianStore.fetchCustodians()
        custodians.value = custodianStore.custodians
    } else error.value = result.getError()
}

const handleCreated = (_newId: number) => {
    error.value = null
    custodians.value = custodianStore.custodians
    showAddCustodianModal.value = false
}
</script>
