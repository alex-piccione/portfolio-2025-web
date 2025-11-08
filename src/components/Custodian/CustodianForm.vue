<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />

        <FormGroup id="name" v-model="form.name" required autofocus />
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
                <button type="submit" class="ok">{{ submitButtonText }}</button>
            </div>
            <InlineError :error="submitError" :autoclose="10" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue"
import InlineError from "@/components/InlineError.vue"
import { useAuthStore } from "@/stores/auth.store"
import FormGroup from "@/components/Form/FormGroup.vue"
import ColorPicker from "@/components/Form/ColorPicker.vue"
import { useCustodianStore } from "@/stores/custodian.store"
import type { FormMode } from "@/components/Form/AppForm.vue"
import CustodianService from "@/services/custodian.service"
import type { ApiSuccess } from "@/services/api/helper"

const props = defineProps<{ formMode: FormMode }>()

const emit = defineEmits<{
    created: [number]
    updated: []
}>()

const authStore = useAuthStore()
const custodianStore = useCustodianStore()
const loadError = ref<unknown>(null)
const submitError = ref<unknown>(null)
//const autofocus = ref<HTMLInputElement | null>(null)
const submitButtonText = computed(() => (props.formMode.mode == "new" ? "Create" : "Update"))

const form = reactive({
    name: "",
    custodian: "",
    account: "",
    description: "",
    kind: "",
    colorCode: "",
})

const initializeFormData = async () => {
    loadError.value = undefined

    if (props.formMode.mode === "new") {
        Object.assign(form, {
            name: "",
            custodian: "",
            account: "",
            description: "",
            kind: "",
            colorCode: "",
        })
    } else {
        const result = await CustodianService.get(props.formMode.id)
        if (result.isSuccess) {
            Object.assign(form, {
                name: result.data.name,
                custodian: result.data.custodian,
                account: result.data.account,
                description: result.data.description,
                kind: result.data.kind,
                colorCode: result.data.colorCode,
            })
        } else loadError.value = result.getError()
    }
}

onMounted(async () => {
    try {
        if ((await authStore.checkSessionValidity()) !== "SessionOk") 
            return; /* prettier-ignore */

        await initializeFormData()
    } catch (error: unknown) {
        loadError.value = error
    }
})

const submitForm = async () => {
    submitError.value = null

    /*if (!authStore.userId) {
        submitError.value = "User not authenticated"
        return await goTo("Login")
    }*/

    /*const data: create.Request = {
            ...form,
            kind: parseKindFromString(form.kind),
        }*/

    try {
        const data = { ...form }

        const result = props.formMode.mode == "new" ? await custodianStore.createCustodian(data) : await custodianStore.updateCustodian({ ...data, id: props.formMode.id })

        if (result.isSuccess) {
            if (props.formMode.mode === "new") emit("created", (result as ApiSuccess<number>).data)
            else emit("updated")
        } else submitError.value = result.apiError
    } catch (error: unknown) {
        submitError.value = error
    }
}

// is this used because the form is re-used ??

//const focusFirstField = () => autofocus.value?.focus()

//defineExpose({ focusFirstField })
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
