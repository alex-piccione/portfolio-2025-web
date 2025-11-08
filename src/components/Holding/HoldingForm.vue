<!-- src/components/Holdings/AddNewHoldingForm.vue -->
<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />
        <div class="form-group">
            <label for="date">Date</label>
            <input type="date" id="date" v-model="formData.date" required />
        </div>
        <div class="form-group">
            <label for="custodian">Custodian</label>
            <AppSelect
                id="custodian"
                v-model="formData.custodianId"
                :options="
                    custodians.map((c) => ({
                        label: c.name,
                        value: c.id.toString(),
                        item: c,
                    }))
                "
            >
                <template #option="{ option }">
                    <AppCustodian :custodian="option.item as Custodian" />
                </template>
            </AppSelect>
            <AddNewRecordButton @click="showNewCustodianModal = true">Add new custodian</AddNewRecordButton>
        </div>
        <div class="form-group">
            <label for="currency">Currency</label>
            <AppSelect
                id="currency"
                v-model="formData.currencyId"
                required
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
        </div>
        <FormGroup id="amount" v-model="formData.amount" type="currency amount" required :decimals="selectedCurrency?.precision" />
        <FormGroup id="note" v-model="formData.note" type="textarea" :rows="3" />

        <div class="form-footer">
            <div class="buttons">
                <button type="submit" class="ok">{{ submitButtonText }}</button>
            </div>
            <InlineError :error="submitError" :autoclose="10" />
        </div>
    </form>

    <CustodianModal :form-mode="{ mode: 'new' }" :isOpen="showNewCustodianModal" @cancel="showNewCustodianModal = false" @created="handleNewCustodian" />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, computed } from "vue"
import type Currency from "@/entities/Currency"
import type Custodian from "@/entities/Custodian"
import HoldingService from "@/services/holding.service"
import { useAuthStore } from "@/stores/auth.store"
import { useCurrencyStore } from "@/stores/currency.store"
import InlineError from "@/components/InlineError.vue"
import { goTo } from "@/utils/router"
import CustodianModal from "@/components/Custodian/CustodianModal.vue"
import AddNewRecordButton from "../Form/AddNewRecordButton.vue"
import { debug } from "@/utils/utils"
import type { create } from "@/services/api/schemas/holding.schema"
import { createDatetime } from "../format.helper"
import { useCustodianStore } from "@/stores/custodian.store"
import FormGroup from "../Form/FormGroup.vue"
import AppCurrency from "../Currency/AppCurrency.vue"
import type { ApiSuccess } from "@/services/api/helper"
import { type FormMode } from "@/components/Form/AppForm.vue"
import AppCustodian from "@/components/Custodian/AppCustodian.vue"
import AppSelect from "@/components/Form/AppSelect.vue"

const props = defineProps<{ formMode: FormMode }>()
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
const submitButtonText = computed(() => (props.formMode.mode == "new" ? "Create" : "Update"))

const formData = reactive({
    date: new Date().toISOString().slice(0, 10), //.split("T")[0] as string,
    action: "Balance", // FIXED
    custodianId: "",
    currencyId: "",
    amount: 0,
    note: "",
})

const initializeFormData = async () => {
    loadError.value = undefined

    if (props.formMode.mode === "new") {
        Object.assign(formData, {
            date: new Date().toISOString().slice(0, 10), // .split("T")[0] as string, // TODO: use a helper/format
            action: "Balance", // FIXED
            custodianId: "",
            currencyId: "",
            amount: 0,
            note: "",
        })
    } else {
        const result = await HoldingService.get(props.formMode.id)
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

watch(props.formMode, async () => await initializeFormData())
watch(formData, () => {
    selectedCurrency.value = currencyStore.get(parseInt(formData.currencyId))
})

const submitForm = async () => {
    debug(`HoldingForm - submitForm`)
    submitError.value = null
    /*
    if (!authStore.userId) {
        submitError.value = "User not authenticated"
        return await goTo("Login")
    }*/

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
            props.formMode.mode === "new"
                ? await HoldingService.create(holdingData)
                : await HoldingService.update({
                      ...holdingData,
                      id: props.formMode.id,
                  })

        if (result.isSuccess) {
            if (props.formMode.mode === "new") emit("created", (result as ApiSuccess<number>).data)
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
