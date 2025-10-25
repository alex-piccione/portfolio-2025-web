<template>
    <span class="add-new-record-button" @click="$emit('click')">
        <slot><!-- text here --></slot>
    </span>
</template>

<script setup lang="ts">
defineEmits(["click"])
</script>
