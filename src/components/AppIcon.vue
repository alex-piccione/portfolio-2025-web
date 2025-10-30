<template>
    <span
        class="icon"
        :class="sizeClass"
        :style="{
            '--icon-fill-color': iconColor,
            cursor: clickable ? 'pointer' : '',
        }"
        v-html="iconContent"
    ></span>
</template>

<script lang="ts" setup>
// *** https://pictogrammers.com/library/mdi  ***
import { computed } from "vue"
import bellIcon from "@/assets/icons/bell.svg?raw"
import accountIcon from "@/assets/icons/account.svg?raw"
import accountBoxIcon from "@/assets/icons/account-box.svg?raw"
import helpIcon from "@/assets/icons/help.svg?raw"
import tableLargeIcon from "@/assets/icons/table-large.svg?raw"
import editIcon from "@/assets/icons/pencil.svg?raw" // used for "edit" command
import deleteIcon from "@/assets/icons/delete.svg?raw" // used for "delete" command
import heartIcon from "@/assets/icons/heart.svg?raw"
import heartPlusIcon from "@/assets/icons/heart-plus.svg?raw"  // used to set Enabled
import heartOffOutlineIcon from "@/assets/icons/heart-off-outline.svg?raw"  // used to set Disabled

// use underscore to make easy to add the map key
type Icons =
    | "bell"
    | "account"
    | "account_box"
    | "help"
    | "tableLarge"
    | "edit"
    | "delete"
    | "heart"
    | "heart_plus"
    | "heart_off_outline"
type Sizes = "small" | "big"

const props = withDefaults(
    defineProps<{
        name: Icons
        size?: Sizes
        color?: "" | "edit" | "delete"
        clickable?: boolean
    }>(),
    {
        size: "small",
        color: "",
        clickable: false,
    },
)

// requires v 3.10 of Vite
//const {name, size="small"} = defineProps<{name:Icons, size?:Sizes}>()

const iconMap = {
    bell: bellIcon,
    account: accountIcon,
    account_box: accountBoxIcon,
    help: helpIcon,
    tableLarge: tableLargeIcon,
    edit: editIcon,
    delete: deleteIcon,
    heart: heartIcon,
    heart_plus: heartPlusIcon,
    heart_off_outline: heartOffOutlineIcon,
}

const colorMap = {
    "": "var(--icon-color-default",
    edit: "var(--icon-color-edit)",
    delete: "var(--icon-color-delete)",
    ok: "var(--icon-color-ok)",
    heart: "var(--icon-color-red)"
}

const iconContent = computed(() => iconMap[props.name])
const sizeClass = computed(() => props.size)
const iconColor = computed(() => colorMap[props.color])
</script>

<style lang="scss" scoped>
@use "@/styles/_theme.scss" as theme;

.icon {
    display: inline-block;
    vertical-align: -0.2rem; /* TODO: adjust as need */

    // Define CSS custom properties for colors here
    --icon-color-default: #{theme.$primary-color}; // theme.$text-color
    --icon-color-edit: #{theme.$text-color};
    --icon-color-delete: #{theme.$error-color};
    --icon-color-ok: #{theme.$ok-color};
    --icon-color-red: red;

    :deep(svg) {
        fill: var(--icon-fill-color); // Use fill instead of color
    }

    &.small {
        width: 1.2rem;
        height: 1.2rem;
    }

    &.big {
        width: 2rem;
        height: 2rem;
    }
}
</style>
