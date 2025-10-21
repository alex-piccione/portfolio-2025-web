<template>
    <span class="icon" :class="sizeClass" v-html="iconContent"></span>
</template>

<script lang="ts" setup>
// *** https://pictogrammers.com/library/mdi  ***
import { computed } from "vue"
import bellIcon from "@/assets/icons/bell.svg?raw"
import accountIcon from "@/assets/icons/account.svg?raw"
import accountBoxIcon from "@/assets/icons/account-box.svg?raw"
import helpIcon from "@/assets/icons/help.svg?raw"
import tableLargeIcon from "@/assets/icons/table-large.svg?raw"

type Icons = "bell" | "account" | "account_box" | "help" | "tableLarge"
type Sizes = "small" | "big"

const props = withDefaults(defineProps<{ name: Icons; size?: Sizes }>(), {
    size: "small",
})

// requires v 3.10 of Vite
//const {name, size="small"} = defineProps<{name:Icons, size?:Sizes}>()

const iconMap = {
    bell: bellIcon,
    account: accountIcon,
    account_box: accountBoxIcon,
    help: helpIcon,
    tableLarge: tableLargeIcon,
}

const iconContent = computed(() => iconMap[props.name])
const sizeClass = computed(() => props.size)
</script>

<style lang="scss" scoped>
@use "@/styles/_theme.scss" as theme;

.icon {
    display: inline-block;
    vertical-align: -0.15rem; /* TODO: adjust as need */

    :deep(svg) {
        fill: theme.$text-color; // Use fill instead of color
    }

    &.small {
        width: 1rem;
        height: 1rem;
    }

    &.big {
        width: 2rem;
        height: 2rem;
    }
}
</style>
