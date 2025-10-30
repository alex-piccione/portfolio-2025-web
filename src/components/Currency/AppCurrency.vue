<template>
    <span class="nowrap">
        <img
            :src="iconPath"
            :alt="symbol"
            class="currency-icon"
            :class="{ cursor: clickable ? 'pointer' : '' }"
        />
        {{ symbol }}
    </span>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
    defineProps<{
        symbol: string
        clickable?: boolean
    }>(),
    {
        clickable: false,
    },
)

const iconPath = computed(
    () => `/src/assets/icons/currencies/${props.symbol.toLowerCase()}.svg`,
)
</script>

<style lang="scss" scoped>
.currency-icon {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    /*vertical-align: middle;*/
    vertical-align: -0.2rem; /* TODO: adjust as need */
}
</style>
