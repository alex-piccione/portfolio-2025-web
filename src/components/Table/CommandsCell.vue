<template>
    <td>
        <div class="container">
            <AppIcon v-if="canEdit" name="edit" @click="$emit('edit')" color="edit" clickable />
            <AppIcon v-if="canDelete" name="delete" @click="$emit('delete')" color="delete" clickable />
        </div>
    </td>
</template>

<script setup lang="ts">
import AppIcon from "@/components/AppIcon.vue"

defineProps<{
    canEdit: boolean
    canDelete: boolean
}>()

defineEmits(["edit", "delete"])
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    gap: 8px;
}
</style>
