<template>
    <AppModal :is-open="isOpen" :title @close="$emit('cancel')" :show-cancel-button="false" :show-confirm-button="false">
        <HoldingForm ref="form" :form-mode @created="handleCreated" @updated="handleUpdated" />
    </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal.vue"
import { computed, ref } from "vue"
import HoldingForm from "@/components/Holding/HoldingForm.vue"
import { type FormMode } from "@/components/Form/AppForm.vue"

const props = defineProps<{
    isOpen: boolean
    formMode: FormMode
}>()

const emit = defineEmits<{
    cancel: []
    created: [number]
    updated: []
}>()

const title = computed(() => (props.formMode.mode === "new" ? "Add New Holding" : "Update Holding"))

const form = ref<typeof HoldingForm | null>(null)

const handleCreated = (newId: number) => emit("created", newId)
const handleUpdated = () => emit("updated")
</script>
