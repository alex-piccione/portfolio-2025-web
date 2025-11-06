<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />

        <div class="form-group">
            <label for="name">Name</label>
            <input id="name" v-model="form.name" type="text" required ref="autofocus" />
        </div>

        <FormGroup id="custodian" v-model="form.custodian" required />
        <FormGroup id="account" v-model="form.account" />
        <FormGroup id="description" v-model="form.description" type="textarea" :rows="3" />

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
            <label for="color">Color</label>
            <ColorPicker id="color" v-model="form.colorCode" />
        </div>

        <div class="form-footer">
            <div class="buttons">
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
import { parseKindFromString } from "@/entities/Custodian"
import { debug } from "@/utils/utils"
import type { create } from "@/services/api/schemas/custodian.schema"
//import CustodianService from "@/services/custodian.service"
import FormGroup from "../Form/FormGroup.vue"
import ColorPicker from "../Form/ColorPicker.vue"
import { useCustodianStore } from "@/stores/custodian.store"

const authStore = useAuthStore()
const custodianStore = useCustodianStore()
const loadError = ref<unknown>(null)
const submitError = ref<unknown>(null)

const emit = defineEmits<{
    created: [number]
}>()

const autofocus = ref<HTMLInputElement | null>(null)

const form = reactive({
    name: "",
    custodian: "",
    account: "",
    description: "",
    kind: "Bank",
    colorCode: "",
})

onMounted(async () => {
    // can I focus here, at least wjhen the form is NOT shown in hte modal ?
    try {
        if ((await authStore.checkSessionValidity()) !== "SessionExpired") return
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

        const result = await custodianStore.createCustodian(data)

        if (result.isSuccess) emit("created", result.data)
        else submitError.value = result.apiError
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
