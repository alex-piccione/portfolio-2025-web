<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />

        <div class="form-group">
            <label for="name">Name</label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                required
                ref="autofocus"
            />
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

        <div class="form-footer">
            <div class="buttons">
                <!--<button type="button" @click="$emit('cancel')" class="close">Cancel</button>-->
                <button type="submit" class="ok">Create</button>
            </div>
            <InlineError :error="submitError" :autoclose="10" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import InlineError from "@/components/InlineError.vue"
import { useAuthStore } from "@/stores/auth.store"
import BaseSelect from "../Form/BaseSelect.vue"
import { parseKindFromString } from "@/entities/Custodian"
import { debug } from "@/utils/utils"
import type { create } from "@/services/api/schemas/custodian.schema"
import CustodianService from "@/services/custodian.service"
import { Result } from "@/utils/result"

const authStore = useAuthStore()
const loadError = ref<unknown>(null)
const submitError = ref<unknown>(null)

const emit = defineEmits<{
    created: [number]
}>()

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
        loadError.value = error
    }
})

const submitForm = async () => {
    debug("NewCustodianModal - submitForm")

    submitError.value = null
    try {
        const data: create.Request = {
            ...form,
            kind: parseKindFromString(form.kind),
        }

        const result = await CustodianService.create(data)
        const newId = Result.valueOrError<number>(result)
        emit("created", newId)
    } catch (error: unknown) {
        submitError.value = error
    }
}

const focusFirstField = () => autofocus.value?.focus()

defineExpose({ focusFirstField })
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
