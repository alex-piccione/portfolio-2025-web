<template>
    <input ref="input" type="number" min="0" :step="step" v-model="value" />
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    modelValue: string | number
    decimals: number
    // required: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const value = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})

const step = computed(() => {
    if (props.decimals === 0) return 1
    else {
        let step = "0."
        for (let d = 1; d < props.decimals; d++) step += "0"
        return (step += "1")
    }
})
</script>

<style lang="scss" scoped>
input {
    font-family: monospace;
}
</style>
