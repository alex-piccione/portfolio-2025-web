<!-- src/components/Holdings/AddNewHoldingForm.vue -->
<template>
  <form @submit.prevent="submitForm">
    <InlineError :error="error" />
    <div class="form-group">
      <label for="date">Date</label>
      <input type="date" id="date" v-model="formData.date" required />
    </div>

    <div class="form-group">
      <label for="action">Action</label>
      <select id="action" v-model="formData.action" required>
        <option>Balance</option>
        <!--<option>Add</option>
        <option>Remove</option>
      --></select>
    </div>

    <div class="form-group">
      <label for="custodian">Custodian</label>
      <BaseSelect id="custodian" v-model="formData.custodianId" required >
        <!--<option value="" >Please select one</option>-->
        <option
          v-for="custodian in custodians"
          :key="custodian.id"
          :value="custodian.id"
        >
          {{ custodian.name }}
        </option>
        <option>Add new</option>
      </BaseSelect>
    </div>

    <div class="form-group">
      <label for="currency">Currency</label>
      <BaseSelect id="currencyId" v-model="formData.currencyId" required>
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
      <textarea rows="5" cols="30" id="note" v-model="formData.note"></textarea>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import type Currency from "@/entities/Currency"
import type Custodian from "@/entities/Custodian"
import CustodianService from "@/services/custodian.service"
import HoldingService from "@/services/holding.service"
import { useAuthStore } from "@/stores/auth.store"
import { useCurrencyStore } from "@/stores/currency.store"
import InlineError from "@/components/InlineError.vue"
import { goTo } from "@/utils/router"
import BaseSelect from "../Form/BaseSelect.vue"

const authStore = useAuthStore()
const currencyStore = useCurrencyStore()
const custodians = ref<Custodian[]>([])
const currencies = ref<Currency[]>([])
const error = ref<string | null>(null)

const emit = defineEmits(["saved", "cancel"])

const formData = ref({
  date: new Date().toISOString().split("T")[0],
  custodianId: "",
  action: "Balance",
  currencyId: "",
  amount: 0,
  note: "",
})


onMounted(async () => {

  if (!authStore.checkSessionValidity())
    return;

  await currencyStore.fetchCurrencies()
  if (currencyStore.error) {
    console.error("Error fetching currencies (onMount):", currencyStore.error)
    error.value = "Failed to read currencies"
  }

  currencies.value = currencyStore.currencies
  custodians.value = await CustodianService.list()
})

const submitForm = async () => {
  if (!authStore.userId) {
    console.error("User not authenticated")
    await goTo("Login")
    return;
  }

  const { date, currencyId } = formData.value

  const holdingService = new HoldingService()

  const holdingData = {
    date,
    currency: { id: parseInt(currencyId) },
    user: { id: authStore.userId },
  }

  try {
    await holdingService.create(holdingData)
    emit("saved")
  } catch (err) {
    console.error("Error creating holding:", err)
    error.value = "Failed to save holding. Please try again."
  }
}

// Expose submitForm to be called from the parent where the "Save" button is located
defineExpose({
  submitForm,
})
</script>

<style scoped lang="scss">
@use "@/styles/form.scss";
</style>
