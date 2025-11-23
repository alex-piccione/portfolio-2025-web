<!-- src/components/Holdings/HoldingTable.vue -->
<template>
    <InlineError :error="error" position="center" />
    <TableLayout>
        <template #commands>
            <button @click="handleAddNewHolding" class="ok">Add New Holding</button>
        </template>
        <table>
            <thead>
                <tr>
                    <th>Custodian</th>
                    <th>Currency</th>
                    <!--<th>Action</th>-->
                    <th>Amount</th>
                    <th>Amount in {{ authStore.mainCurrency?.symbol }}</th>
                    <th>Date</th>
                    <th style="min-width: 150px">Note</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="holding in holdings" :key="holding.id">
                    <td><AppCustodian :custodian="holding.custodian" /></td>
                    <td><AppCurrency :symbol="holding.currency.symbol" /></td>
                    <!--<td>{{ holding.action }}</td>-->
                    <td style="text-align: right">{{ holding.amount }}</td>
                    <td style="text-align: right">{{ holding.amountInMainCurrency }}</td>
                    <td>{{ formatDate(holding.date) }}</td>
                    <td>{{ holding.note }}</td>
                    <CommandsCell :can-edit="true" :can-delete="true" @edit="handleEdit(holding.id)" @delete="handleDelete(holding.id)" />
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3" style="text-align: right">Total:</th>
                    <th style="text-align: right">{{ holdings.reduce((sum, h) => sum + (h.amountInMainCurrency || 0), 0) }}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    </TableLayout>

    <HoldingModal :formMode="holdingModalMode" :is-open="holdingModalIsOpen" @cancel="holdingModalIsOpen = false" @created="handleCreated" @updated="handleUpdated" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import HoldingService from "@/services/holding.service"
import type Holding from "@/entities/Holding"
import { useAuthStore } from "@/stores/auth.store"
import { formatDate } from "@/components/format.helper"
import { debug } from "@/utils/utils"
import InlineError from "@/components/InlineError.vue"
import CommandsCell from "@/components/Table/CommandsCell.vue"
import AppCustodian from "@/components/Custodian/AppCustodian.vue"
import AppCurrency from "@/components/Currency/AppCurrency.vue"
import HoldingModal from "@/components/Holding/HoldingModal.vue"
import type { FormMode } from "@/components/Form/AppForm.vue"
import TableLayout from "../TableLayout.vue"

const error = ref<unknown>(null)
const holdings = ref<Holding[]>([])
const authStore = useAuthStore()
const holdingModalIsOpen = ref(false)
const holdingModalMode = ref<FormMode>({ mode: "new" })

onMounted(async () => {
    if (authStore.isLoggedIn === false) {
        console.warn("User not authenticated. Cannot fetch holdings.")
        return
    }

    await loadHoldings()
})

watch(
    () => authStore.mainCurrency,
    async (_) => {
        await loadHoldings()
    },
)

const loadHoldings = async () => {
    debug("load holdings")
    error.value = ""

    try {
        holdings.value = await HoldingService.list(authStore.userId!)
    } catch (err: unknown) {
        error.value = err
    }
}

const handleAddNewHolding = () => {
    holdingModalMode.value = { mode: "new" }
    holdingModalIsOpen.value = true
}

const handleEdit = (id: number) => {
    holdingModalMode.value = { mode: "update", id }
    holdingModalIsOpen.value = true
}

const handleDelete = async (id: number) => {
    error.value = null
    const result = await HoldingService.delete(id)
    if (result.isSuccess) await loadHoldings()
    else error.value = result.apiError
}

const handleCreated = async (_newId: number) => {
    holdingModalIsOpen.value = false
    await loadHoldings()
}

const handleUpdated = async () => {
    holdingModalIsOpen.value = false
    await loadHoldings()
}
</script>
