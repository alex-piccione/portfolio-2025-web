<template>
    <span class="custodian" :style="{ color: custodian.colorCode }">{{
        custodian.name
    }}</span>
</template>

<script setup lang="ts">
import type Custodian from "@/entities/Custodian"

defineProps<{
    custodian: Custodian
}>()
</script>

<style scoped lang="scss">
.custodian {
    font-size: 120%;
    font-weight: bold;

    &::first-letter {
        font-size: 150%;
        font-weight: bold;
    }
}
</style>
