<!-- src/components/Holdings/AddNewHoldingForm.vue -->
<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />
        <div class="form-group">
            <label for="date">Date</label>
            <input type="date" id="date" v-model="formData.date" required />
        </div>

        <!-- ATM we have only a fixed Action: Balance
        <div class="form-group">
            <label for="action">Action</label>
            <select id="action" v-model="formData.action" required>
                <option selected>Balance</option>
            </select>
        </div>
        -->

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
                >Add new custodian</AddNewRecordButton
            >
        </div>

        <div class="form-group">
            <label for="currency">Currency</label>
            <BaseSelect
                id="currency"
                v-model="formData.currencyId"
                required
                @change="handleCurrencyChange"
            >
                <option disabled value="">Please select one</option>
                <option
                    v-for="currency in currencies"
                    :key="currency.id"
                    :value="currency.id"
                >
                    <AppCurrency :symbol="currency.symbol" />
                </option>
            </BaseSelect>
        </div>

        <FormGroup
            id="amount"
            v-model="formData.amount"
            type="currency amount"
            required
            :decimals="selectedCurrency?.precision"
        />

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
                <button type="submit" class="ok">Create</button>
            </div>
            <InlineError :error="submitError" :autoclose="10" />
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
import { ref, onMounted, reactive, watch } from "vue"
import type Currency from "@/entities/Currency"
import type Custodian from "@/entities/Custodian"
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
import { useCustodianStore } from "@/stores/custodian.store"
import FormGroup from "../Form/FormGroup.vue"
import AppCurrency from "../Currency/AppCurrency.vue"
import type { ApiSuccess } from "@/services/api/helper"
import { type FormAction } from "@/components/Form/AppForm.vue"

const props = defineProps<{ action: FormAction }>()
const emit = defineEmits<{
    created: [number]
    updated: []
}>()

const authStore = useAuthStore()
const custodianStore = useCustodianStore()
const currencyStore = useCurrencyStore()
const custodians = ref<Custodian[]>([])
const currencies = ref<Currency[]>([])
const loadError = ref<unknown>(null)
const submitError = ref<unknown>(null)
const selectedCurrency = ref<Currency | null>(null)
const showNewCustodianModal = ref(false)

const formData = reactive({
    date: new Date().toISOString().split("T")[0] as string,
    action: "Balance", // FIXED
    custodianId: "",
    currencyId: "",
    amount: 0,
    note: "",
})

const initializeFormData = async () => {
    loadError.value = undefined

    if (props.action.kind === "new") {
        Object.assign(formData, {
            date: new Date().toISOString().slice(0, 10), // .split("T")[0] as string, // TODO: use a helper/format
            action: "Balance", // FIXED
            custodianId: "",
            currencyId: "",
            amount: 0,
            note: "",
        })
    } else {
        const result = await HoldingService.get(props.action.id)
        if (result.isSuccess) {
            const item = result.data
            Object.assign(formData, {
                date: item.date.toISOString().slice(0, 10),
                action: item.action,
                custodianId: item.custodianId.toString(),
                currencyId: item.currencyId.toString(),
                amount: item.amount,
                note: item.note || "",
            })
        } else loadError.value = result.getError()
    }
}

onMounted(async () => {
    debug("NewHoldingForm - onMounted")
    try {
        if ((await authStore.checkSessionValidity()) !== "SessionOk") 
            return; /* prettier-ignore */

        custodians.value = custodianStore.custodians
        currencies.value = currencyStore.currencies

        await initializeFormData()
    } catch (error: unknown) {
        loadError.value = error
    }
})

watch(props.action, async () => await initializeFormData())

const submitForm = async () => {
    debug(`HoldingForm - submitForm`)
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
        const result =
            props.action.kind === "new"
                ? await HoldingService.create(holdingData)
                : await HoldingService.update({
                      ...holdingData,
                      id: props.action.id,
                  })

        if (result.isSuccess) {
            if (props.action.kind === "new")
                emit("created", (result as ApiSuccess<number>).data)
            else emit("updated")
        } else submitError.value = result.apiError
    } catch (error) {
        submitError.value = error
    }
}

// Expose submitForm to be called from the parent where the "Save" button is located
/*defineExpose({
    submitForm,
})*/

const handleNewCustodian = async (newId: number) => {
    showNewCustodianModal.value = false
    custodians.value = custodianStore.custodians
    formData.custodianId = newId.toString()
}

const handleCurrencyChange = async (id: string) => {
    selectedCurrency.value = currencyStore.get(parseInt(id))
}
</script>

<style scoped lang="scss">
@use "@/styles/theme" as *;
.form-footer {
    &.buttons {
        display: flex;
        gap: $padding;
    }
}
</style>
