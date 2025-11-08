<template>
    <InlineError :error :autoclose="10" />
    <TableLayout>
        <template #commands>
            <button @click="handleAddNewCustodian" class="ok">Add New Custodian</button>
        </template>
        <slot>
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
                        s
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="custodian in custodians" :key="custodian.name">
                        <td><AppCustodian :custodian="custodian" /></td>
                        <td>{{ custodian.custodian }}</td>
                        <td>{{ custodian.account }}</td>
                        <td>{{ custodian.kind }}</td>
                        <td style="text-align: center">
                            <span
                                class="color-square"
                                :style="{
                                    backgroundColor: custodian.colorCode,
                                }"
                            ></span>
                        </td>
                        <td>{{ custodian.description?.slice(0, 50) }}</td>
                        <CommandsCell can-edit can-delete @edit="edit(custodian.id)" @delete="remove(custodian.id)" />
                    </tr>
                </tbody>
            </BaseTable>
        </slot>
    </TableLayout>

    <CustodianModal :is-open="custodianModalIsOpen" :form-mode="custodianModalMode" @cancel="custodianModalIsOpen = false" @created="handleCreated" @updated="handleUpdated" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import CommandsCell from "@/components/Table/CommandsCell.vue"
import AppCustodian from "@/components/Custodian/AppCustodian.vue"
import CustodianModal from "@/components/Custodian/CustodianModal.vue"
import type Custodian from "@/entities/Custodian"
import { useCustodianStore } from "@/stores/custodian.store"
import InlineError from "@/components/InlineError.vue"
import TableLayout from "@/components/TableLayout.vue"
import BaseTable from "@/components/Table/BaseTable.vue"
import type { FormMode } from "@/components/Form/AppForm.vue"

const error = ref<unknown>()
const custodians = ref<Custodian[]>([])
const custodianStore = useCustodianStore()
const custodianModalIsOpen = ref(false)
const custodianModalMode = ref<FormMode>({ mode: "new" })

onMounted(async () => {
    custodians.value = custodianStore.custodians
})

const handleAddNewCustodian = () => {
    error.value = null
    custodianModalMode.value = { mode: "new" }
    custodianModalIsOpen.value = true
}

const edit = (id: number) => {
    error.value = null
    custodianModalMode.value = { mode: "update", id }
    custodianModalIsOpen.value = true
}

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
    custodianModalIsOpen.value = false
}

const handleUpdated = () => {
    error.value = null
    custodians.value = custodianStore.custodians
    custodianModalIsOpen.value = false
}
</script>
