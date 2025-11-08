<template>
    <div class="custodian" :style="{ '--color': custodian.colorCode }">{{ custodian.name }}</div>
</template>

<script setup lang="ts">
import type Custodian from "@/entities/Custodian"

defineProps<{
    custodian: Custodian
}>()
</script>

<style scoped lang="scss">
@use "@/styles/theme" as *;
.custodian {
    font-size: 100%;
    /*font-weight: bold;*/
    text-align: center;

    border: 1px solid var(--color);
    border-radius: $border-radius;
    padding: 0px 3px;

    background: color-mix(in srgb, var(--color), transparent 90%);

    &:hover {
        background: color-mix(in srgb, var(--color), transparent 75%);
    }

    //text-shadow: 2px 2px 2px #000d;
    //text-shadow: 1px 1px 0px #FFF9;
    //text-shadow: 1px 1px #000C;
    //text-shadow: -1px 0px #FFF6,  1px 0px #0006;

    /*&::first-letter {
        font-size: 120%;
        font-weight: bold;
        color: var(--color);
    }*/
}
</style>
