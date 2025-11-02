<template>
    <span v-if="!required" style="font-size: 70%">(optional)</span>
</template>
<script setup lang="ts">
defineProps<{ required: boolean }>()
</script>
