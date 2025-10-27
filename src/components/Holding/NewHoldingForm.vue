<!-- src/components/Holdings/AddNewHoldingForm.vue -->
<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />
        <div class="form-group">
            <label for="date">Date</label>
            <input type="date" id="date" v-model="formData.date" required />
        </div>

        <div class="form-group">
            <label for="action">Action</label>
            <select id="action" v-model="formData.action" required>
                <option selected>Balance</option>
                <!--<option>Add</option>
                    <option>Remove</option>
                -->
            </select>
        </div>

        <div class="form-group">
            <label for="custodian">Custodian</label>
            <BaseSelect id="custodian" v-model="formData.custodianId" required>
                <option disabled value="">Please select one</option>
                <option
                    v-for="custodian in custodians"
                    :key="custodian.id"
                    :value="custodian.id"
                >
                    {{ custodian.name }}
                </option>
            </BaseSelect>
            <AddNewRecordButton @click="showNewCustodianModal = true"
                >add new custodian</AddNewRecordButton
            >
        </div>

        <div class="form-group">
            <label for="currency">Currency</label>
            <BaseSelect id="currency" v-model="formData.currencyId" required>
                <option disabled value="">Please select one</option>
                <option
                    v-for="currency in currencies"
                    :key="currency.id"
                    :value="currency.id"
                >
                    {{ currency.name }} ({{ currency.symbol }})
                </option>
            </BaseSelect>
        </div>

        <div class="form-group">
            <label for="amount">Amount</label>
            <input
                type="number"
                id="amount"
                v-model.number="formData.amount"
                required
                step="any"
            />
        </div>

        <div class="form-group">
            <label for="note">Note</label>
            <textarea
                rows="5"
                cols="30"
                id="note"
                v-model="formData.note"
            ></textarea>
        </div>

        <div class="form-footer">
            <div class="buttons">
                <!--<button type="button" @click="$emit('cancel')" class="close">Cancel</button>-->
                <button type="submit" class="ok">Create</button>
            </div>
            <InlineError :error="submitError" :autoclose="10"/>    
        </div>
    </form>

    <!-- Modal for new custodian -->
    <NewCustodianModal
        :isOpen="showNewCustodianModal"
        title="Add New Custodian"
        @cancel="showNewCustodianModal = false"
        @created="handleNewCustodian"
    >
    </NewCustodianModal>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import type Currency from "@/entities/Currency"
import type Custodian from "@/entities/Custodian"
//import type HoldingAction from "@/entities/Holding"
import CustodianService from "@/services/custodian.service"
import HoldingService from "@/services/holding.service"
import { useAuthStore } from "@/stores/auth.store"
import { useCurrencyStore } from "@/stores/currency.store"
import InlineError from "@/components/InlineError.vue"
import { goTo } from "@/utils/router"
import BaseSelect from "@/components/Form/BaseSelect.vue"
import NewCustodianModal from "@/components/Custodian/NewCustodianModal.vue"
import AddNewRecordButton from "../Form/AddNewRecordButton.vue"
import { debug } from "@/utils/utils"
import type { create } from "@/services/api/schemas/holding.schema"
import { createDatetime } from "../format.helper"

const authStore = useAuthStore()
const currencyStore = useCurrencyStore()
const custodians = ref<Custodian[]>([])
const currencies = ref<Currency[]>([])
const loadError = ref<unknown>(null)
const submitError = ref<unknown>(null)

const emit = defineEmits<{
    //cancel: []
    created: [number]
}>()

const showNewCustodianModal = ref(false)

const formData = reactive({
    date: new Date().toISOString().split("T")[0] as string,
    custodianId: "",
    action: "Balance", // as HoldingAction, // Kind "Balance",
    currencyId: "",
    amount: 0,
    note: "",
})

onMounted(async () => {
    debug("NewHoldingForm - onMounted")
    try {
        if ((await authStore.checkSessionValidity()) !== "SessionOk") 
            return; /* prettier-ignore */

        await currencyStore.fetchCurrencies()
        if (currencyStore.error) {
            console.error(
                "Error fetching currencies (onMount):",
                currencyStore.error,
            )
            loadError.value = "Failed to read currencies"
        }

        currencies.value = currencyStore.currencies
        custodians.value = await CustodianService.list()
    } catch (error: unknown) {
        loadError.value = error
    }
})

const submitForm = async () => {
    debug("NewHoldingForm - submitForm")
    submitError.value = null

    if (!authStore.userId) {
        submitError.value = "User not authenticated"
        return await goTo("Login")
    }

    const { date, currencyId, custodianId, action, amount, note } = formData

    const holdingData: create.Request = {
        date: createDatetime(date),
        currencyId: parseInt(currencyId),
        custodianId: parseInt(custodianId),
        action,
        amount,
        note: note.trim() || null,
    }

    try {
            //throw new Error("test error")
        const result = await HoldingService.create(holdingData)
        if (result.isSuccess) emit("created", result.value)
        else submitError.value = result.error
    } catch (error) {
        submitError.value = error
    }
}

// Expose submitForm to be called from the parent where the "Save" button is located
/*defineExpose({
    submitForm,
})*/

const handleNewCustodian = async (newId: string) => {
    showNewCustodianModal.value = false
    custodians.value = await CustodianService.list()
    formData.custodianId = newId
}
</script>

<style scoped lang="scss">
@use "@/styles/theme" as *;
.form-footer {
    /*padding: $padding;*/

    &.buttons {
        display: flex;
        gap: $padding;
    }
}
</style>
