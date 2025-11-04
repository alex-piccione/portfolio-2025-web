<template>
    <AppModal
        :is-open="isOpen"
        title="Add New Holding"
        @close="$emit('cancel')"
        :show-cancel-button="false"
        :show-confirm-button="false"
    >
        <HoldingForm ref="form" @save="handleSave" />
    </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal.vue"
import NewHoldingForm from "@/components/Holding/NewHoldingForm.vue"
import { ref } from "vue"
import HoldingForm from "./HoldingForm.vue"

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    cancel: []
    created: [number]
}>()

const form = ref<typeof NewHoldingForm | null>(null)

const handleSave = (newId: number) => emit("created", newId)
</script>
