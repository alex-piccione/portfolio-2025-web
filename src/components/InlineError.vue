<template>
    <transition name="slide-fade">
        <div
            v-if="error"
            role="alert"
            class="error-notification"
            :class="[`position-${position}`]"
        >
            {{ error }}
        </div>
    </transition>
</template>

<script setup lang="ts">
import { toRefs } from "vue"

const props = withDefaults(
    defineProps<{
        //error: string | null
        error: unknown
        position?: "initial" | "center"
    }>(),
    {
        position: "initial",
    },
)

const { error, position } = toRefs(props)
</script>

<style scoped lang="scss">
@use "@/styles/theme" as *;

.error-notification {
    margin: $margin-small 0;
    padding: $padding-small $padding;
    border: 1px solid $error-color;
    border-radius: $border-radius;
    background: color-mix(in srgb, $error-color, transparent 90%);
    color: $error-color !important;
    text-align: center;

    &.position-initial {
        text-align: initial;
    }

    &.position-center {
        text-align: center;
    }
}
</style>
