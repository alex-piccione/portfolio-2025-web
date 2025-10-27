<template>
    <AppModal
        :is-open="isOpen"
        title="Add New Holding"        
        @close="$emit('cancel')"
        :show-cancel-button=false
        :show-confirm-button=false
    >
        <NewHoldingForm
            ref="form"            
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

const handleCreated = (newId: number) => emit("created", newId)
</script>
