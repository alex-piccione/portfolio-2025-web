<template>
    <transition name="slide-fade">
        <div
            v-if="error && isVisible"
            role="alert"
            class="error-notification"
            :class="[`position-${position}`]"
        >
            <span v-if="errorText">{{ errorText }}</span>
            <ul v-if="formErrors.length > 0">
                <li v-for="value in formErrors" :key="value">{{ value }}</li>
            </ul>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { isApiError } from "@/services/api/helper"
import { toRefs, ref, watch } from "vue"

const props = withDefaults(
    defineProps<{
        error: unknown
        position?: "initial" | "center"
        autoclose?: boolean | number
    }>(),
    {
        position: "initial",
        autoclose: false,
    },
)

const { error, position, autoclose } = toRefs(props)
const isVisible = ref(false)

const errorText = ref<string | null>(null)
const formErrors = ref<string[]>([])

let timeoutId: number | null = null
watch(
    error,
    (newError) => {
        // If a hide timer is in progress, cancel it
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }

        if (newError) {
            // A new error has arrived, so make it visible
            isVisible.value = true

            errorText.value = null
            formErrors.value = []

            if (isApiError(newError)) {
                if (newError.type === "form") {
                    /*errorText.value = "Form contains some errors"*/
                    formErrors.value = newError.errors
                    /*.map(
                        (e) => `${e.field}: ${e.error}`,
                    )*/
                } else errorText.value = newError.error
            } else {
                errorText.value = `${newError}`
            }

            // If autoclose is enabled, set a timer to hide it
            if (autoclose.value) {
                const secs =
                    typeof autoclose.value === "number" ? autoclose.value : 5 // default autoclose seconds
                timeoutId = setTimeout(() => {
                    isVisible.value = false
                }, secs * 1000)
            }
        } else {
            // If the error prop is cleared, hide the message
            isVisible.value = false
        }
    },
    { immediate: true },
)
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
    /*text-align: center;*/

    &.position-initial {
        text-align: initial;
    }

    &.position-center {
        text-align: center;
    }

    width: 100h;

    & ul {
        margin-top: 0;
        margin-bottom: 0;
    }
}
</style>
