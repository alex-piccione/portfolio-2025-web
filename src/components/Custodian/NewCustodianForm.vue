<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="error" />

        <div class="form-group">
            <label for="name">Name</label>            
            <input id="name" v-model="form.name" type="text" required ref="autofocus" />
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input
                id="description"
                v-model="form.description"
                type="text"
                required
            />
        </div>
        <div class="form-group">
            <label for="kind">Custodian (primary) Kind</label>
            <!-- TODO: use a store -->
            <select id="kind" v-model="form.kind" class="form-control">
                <option value="Bank">Bank</option>
                <option value="Exchange">Exchange</option>
                <option value="Pension">Pension</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div class="form-group">
            <label for="url">URL</label>
            <input id="url" v-model="form.url" type="url" />
        </div>
        <div class="form-group">
            <label for="accountCountryCode">Account country code</label>
            <BaseSelect
                id="accountCountryCode"
                v-model="form.accountCountryCode"
                required
            >
                <option value="IT">IT (Italy)</option>
                <option value="UK">UK (United Kingdom)</option>
                <option value="US">US (United States of America)</option>
            </BaseSelect>
        </div>
<!--
        <div class="form-actions">
            <button type="button" class="cancel" @click="$emit('cancel')">
                Cancel
            </button>
            <button type="submit" class="ok">Create Custodian</button>
        </div>
        -->
    </form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import InlineError from "@/components/InlineError.vue"
import { useAuthStore } from "@/stores/auth.store"
import BaseSelect from "../Form/BaseSelect.vue"
import CustodianService, {
    type CreateRequest,
} from "@/services/custodian.service"
import { parseKindFromString } from "@/entities/Custodian"
import { debug } from "@/utils/utils"

const authStore = useAuthStore()
const error = ref<string | null>(null)

const emit = defineEmits(["created", "cancel"])

const autofocus = ref<HTMLInputElement | null>(null)

const form = reactive({
    name: "",
    description: "",
    kind: "Bank",
    url: "",
    accountCountryCode: "",
    walletAddress: "",
})

onMounted(async () => {
    // can I focus here, at least wjhen the form is NOT shown in hte modal ?
    try {
        if ((await authStore.checkSessionValidity()) !== "SessionExpired")
            return
    } catch (error: unknown) {
        console.error("NewCustodianForm - onMounted", error)
    }
})

const submitForm = async () => {
    debug("NewCustodianModal - submitForm")

    error.value = null
    try {
        const data: CreateRequest = {
            ...form,
            kind: parseKindFromString(form.kind),
        }

        const newId = await CustodianService.create(data)
        emit("created", newId)
    } catch (err: unknown) {
        error.value = (err as Error)?.message || `${err}`
    }
}

const focusFirstField = () => autofocus.value?.focus()

defineExpose({ submitForm, focusFirstField })
</script>
