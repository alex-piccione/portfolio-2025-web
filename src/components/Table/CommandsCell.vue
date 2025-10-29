<template>
    <td>
        <AppIcon
            v-if="canEdit"
            name="edit"
            @click="$emit('edit')"
            color="edit"
            clickable
        />
        <AppIcon
            v-if="canDelete"
            name="delete"
            @click="$emit('delete')"
            color="delete"
            clickable
        />
    </td>
</template>

<script setup lang="ts">
import AppIcon from "../AppIcon.vue"

defineProps<{
    canEdit: boolean
    canDelete: boolean
}>()

defineEmits(["edit", "delete"])
</script>
