<template>
    <AppModal :is-open :title :show-cancel-button="false" :show-confirm-button="false" @close="$emit('cancel')" @confirm="handleConfirm">
        <CustodianForm ref="form" :form-mode @created="handleCreated" @updated="handleUpdated" />
    </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal.vue"
import { computed, nextTick, ref, watch } from "vue"
import CustodianForm from "@/components/Custodian/CustodianForm.vue"
import { debug } from "@/utils/utils"
import type { FormMode } from "@/components/Form/AppForm.vue"

const props = defineProps<{
    formMode: FormMode
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: "cancel"): void
    (e: "created", newId: number): void
    (e: "updated"): void
}>()

const title = computed(() => (props.formMode.mode === "new" ? "Add New Custodian" : "Update Custodian"))
const form = ref<typeof CustodianForm | null>(null)

const handleConfirm = () => {
    debug("handleConfirm")
    form.value?.submitForm()
}

const handleCreated = (newId: number) => emit("created", newId)
const handleUpdated = () => emit("updated")

watch(
    () => props.isOpen,
    async (open) => {
        if (open) {
            await nextTick()
            //form.value?.focusFirstField()
        }
    },
)
</script>
