<template>
    <AppModal
        :is-open="isOpen"
        title="Add New Custodian"
        :show-cancel-button="false"
        :show-confirm-button="false"
        @close="$emit('cancel')"
        @confirm="handleConfirm"
    >
        <NewCustodianForm ref="form" @created="handleCreated">
        </NewCustodianForm>
    </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal.vue"
import { nextTick, ref, watch } from "vue"
import NewCustodianForm from "@/components/Custodian/NewCustodianForm.vue"
import { debug } from "@/utils/utils"

const props = defineProps<{
    isOpen: boolean
    title: string
}>()

const emit = defineEmits<{
    (e: "cancel"): void
    (e: "created", newId: number): void
}>()

const form = ref<typeof NewCustodianForm | null>(null)

const handleConfirm = () => {
    debug("handleConfirm")
    form.value?.submitForm()
}

const handleCreated = (newId: number) => emit("created", newId)

watch(
    () => props.isOpen,
    async (open) => {
        if (open) {
            await nextTick()
            form.value?.focusFirstField()
        }
    },
)
</script>
