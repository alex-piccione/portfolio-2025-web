<template>
    <AppModal
        :is-open="isOpen"
        title="Add New Custodian"
        @close="$emit('cancel')"
        @confirm="handleConfirm"
    >
        <NewCustodianForm
            ref="form"
            @cancel="$emit('cancel')"
            @created="handleCreated"
        >
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
    (e: "created", newId: string): void
}>()

const form = ref<typeof NewCustodianForm | null>(null)

const handleConfirm = () => {
    debug("handleConfirm")
    form.value?.submitForm()
}

const handleCreated = (newId: string) => emit("created", newId)

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
