<template>
    <img
        :src="iconPath"
        :alt="symbol"
        class="currency-icon"
        :class="{ cursor: clickable ? 'pointer' : '' }"
    />
    {{ symbol }}
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
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
}
</style>
