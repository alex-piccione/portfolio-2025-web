<template>
    <AppModal
        :is-open="isOpen"
        title="Add New Holding"
        @close="$emit('cancel')"
        cancel-button-text="Cancel"
        @confirm="create"
        confirmButtonText="Create"
    >
        <NewHoldingForm
            ref="form"
            @cancel="$emit('cancel')"
            @created="handleCreated"
        />
    </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal.vue"
import NewHoldingForm from "@/components/Holding/NewHoldingForm.vue"
import { ref } from "vue"

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    cancel: []
    created: [number]
}>()

const form = ref<typeof NewHoldingForm | null>(null)

const create = () => {
    // submit the form
    form.value?.submitForm()
}

const handleCreated = (newId: number) => emit("created", newId)
</script>
