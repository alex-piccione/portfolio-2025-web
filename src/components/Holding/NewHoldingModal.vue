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
            @created="$emit('created')"
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

defineEmits(["cancel", "created"])

const form = ref<typeof NewHoldingForm | null>(null)

const create = () => {
    // submit the form
    form.value?.submitForm()
}

</script>
