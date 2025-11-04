<template>
    <AppModal
        :is-open="isOpen"
        :title
        @close="$emit('cancel')"
        :show-cancel-button="false"
        :show-confirm-button="false"
    >
        <HoldingForm
            ref="form"
            :action
            @created="handleCreated"
            @updated="handleUpdated"
        />
    </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal.vue"
import { computed, ref } from "vue"
import HoldingForm from "@/components/Holding/HoldingForm.vue"
import { type FormAction } from "@/components/Form/AppForm.vue"

const props = defineProps<{
    isOpen: boolean
    action: FormAction
}>()

const emit = defineEmits<{
    cancel: []
    created: [number]
    updated: []
}>()

const title = computed(() =>
    props.action.kind === "new" ? "Add New Holding" : "Update Holding",
)

const form = ref<typeof HoldingForm | null>(null)

const handleCreated = (newId: number) => emit("created", newId)
const handleUpdated = () => emit("updated")
</script>
